const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const multer = require('multer');
const path = require('path');
const fs = require('fs');
const { resumeUpload, avatarUpload } = require('./utils/multer')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const isLoggedIn = require('./utils/isLoggedIn')
const cookieParser = require('cookie-parser')

require('dotenv').config({ path: "./config/config.env" });
const User = require('./models/user')
const Job = require('./models/job');

const app = express();
app.use(express.json());
app.use(cookieParser())
app.use(cors({origin: "http://localhost:5173", credentials: true}));

mongoose.connect(process.env.ATLAS_URI)
    .then(() => console.log("✅ Connected to MongoDB Atlas"))
    .catch(err => console.error("❌ MongoDB Connection Error:", err));

const resumesDir = path.join(__dirname, 'resumes');
if (!fs.existsSync(resumesDir)) fs.mkdirSync(resumesDir);

app.use(express.static('public'));

const storage = multer.diskStorage({
    destination: (req, file, cb) => cb(null, 'resumes/'),
    filename: (req, file, cb) => cb(null, Date.now() + '-' + file.originalname)
});
const upload = multer({ storage: storage });

app.post('/api/getJobs', async (req, res) => {
    try {
        const {page, filters} = req.body
        const query = {}
        if (filters.search.trim() !== "") {
            query.$or = [
                { jobrole: { $regex: filters.search, $options: "i" } },
                { company: { $regex: filters.search, $options: "i" } },
                { location: { $regex: filters.search, $options: "i" } },
                { description: { $regex: filters.search, $options: "i" } }
            ];
        }
        if (filters.minSalary > 0) {
            query.salary = {
                $gte: filters.minSalary.toString()
            };
        }
        if (filters.education !== "All") {
            query.education = filters.education;
        }
        if (filters.filterSkills.length > 0) {
            query.skills = {
                $in: filters.filterSkills
            };
        }
        const jobs = await Job.find(query)
        .sort({ postedOn: -1 })
        .skip((page - 1) * 10)
        .limit(10);
        res.status(200).json({ message: "Jobs found!", jobs: jobs })
    } catch (err) {
        console.error(err)
        res.status(401).json({ message: "Error fetching data" });
    }
});

app.post('/api/signup', resumeUpload.single('resume'), async (req, res) => {
    try {
        if (!req.body.userData) return res.status(400).json({ message: "No data received" });
        const userData = JSON.parse(req.body.userData);

        if (req.file) {
            userData.details.resume = {
                name: req.file.originalname,
                url: `http://localhost:5000/resumes/${req.file.filename}`
            };
        }

        const newUser = new User(userData);
        const hashedPass = await bcrypt.hash(newUser.password, 10)
        newUser.password = hashedPass;
        await newUser.save();
        const access_token = jwt.sign({userid: newUser._id}, process.env.JWT_ACCESS_KEY, {expiresIn: "15m"})
        const refresh_token = jwt.sign({userid: newUser._id}, process.env.JWT_REFRESH_KEY, {expiresIn: "7d"})
        res.cookie('access', access_token, {httpOnly: true, secure: true, sameSite: "lax"})
        res.cookie('refresh', refresh_token, {httpOnly: true, secure: true, sameSite: "lax"})
        res.status(201).json({ message: "User registered!", user: {id: newUser._id, username: newUser.username, role: newUser.role} });
    } catch (err) {
        if (err.code === 11000) return res.status(400).json({ message: "Username already taken!" });
        res.status(500).json({ message: "Signup failed", error: err.message });
    }
});

app.post('/api/login', async(req, res) => {
    try{
        const userData = req.body
        const tempUser = await User.findOne({ username: userData.username })
        if(tempUser){
            if(await bcrypt.compare(userData.password, tempUser.password)){
                const access_token = jwt.sign({userid: tempUser._id}, process.env.JWT_ACCESS_KEY, {expiresIn: "15m"})
                const refresh_token = jwt.sign({userid: tempUser._id}, process.env.JWT_REFRESH_KEY, {expiresIn: "7d"})
                res.cookie('access', access_token, {httpOnly: true, secure: true, sameSite: "lax"})
                res.cookie('refresh', refresh_token, {httpOnly: true, secure: true, sameSite: "lax"})
                res.status(200).json({ message: "Login successful!", user: { id: tempUser._id, username: tempUser.username, role: tempUser.role } });
            }
            else{
                res.status(401).send({ message: "some problem occurred" })
            }
        }
        else{
            res.status(401).send({ message: "some problem occurred" })
        }
    }
    catch(err){
        res.status(500).send({ error: err.message })
    }
})

app.get('/myprofile', isLoggedIn, async(req, res) => {
    try{
        const user = await User.findOne({_id: req.query.profileID})
        const loggerID = req.userid
        const owner = loggerID == req.query.profileID
        let myjobs = []
        if(owner){
            if(user.role == "Candidate"){
                myjobs = await Job.find({applicants: req.userid})
            }
            else{
                myjobs = await Job.find({postedby: req.userid})
            }
        }
        if(user){
            res.status(200).send({ user: user, jobs: myjobs.lenght!=0?myjobs:[], owner:owner })
        }
    }
    catch(err){
        res.status(500).send({ message: err })
        console.log(err)
    }
})

app.post('/update-selection', async (req, res) => {
    const { applicantID, status, jobid } = req.body;
    try {
        const user = await User.findOne({_id: applicantID})
        if(user){
            user.selected[jobid] = status
            user.markModified("selected")
            await user.save()
            res.status(200).send({message: "Response registered!"})
        }
        else{
            res.status(404).json({message: "User not found!"})
        }
    } catch (err) {
        res.status(500).json({ message: "Update failed" });
        console.log(err)
    }
});

app.post('/api/add-job', isLoggedIn, async (req, res) => {
    try {
        console.log(req.userid)
        const user = await User.findById(req.userid)
        if(user.role == "Employer"){
            const newJob = new Job(req.body);
            newJob.postedby = user._id
            newJob.company = user.details.companyname
            await newJob.save();
            res.status(200).json({ message: "Job posted!", job: newJob });
        }
        else{
            res.status(401).json({ message: "An employer account is required to create jobs!" })
        }
    } catch (err) {
        res.status(500).json({ message: "Failed to post job" });
    }
});

app.get('/getJobProfile', isLoggedIn, async (req, res) => {
    try{
        const id = req.query.id
        const user = await User.findOne({_id: req.userid})
        const status = user.role == "Employer" ? 0 : (user.selected[id]?user.selected[id]:0)
        if(id){
            const job = await Job.findOne({_id: id})
            if(job){
                const owner = job.postedby.equals(req.userid) ? true : false
                res.status(200).send({message: "job found!", job: job, owner: owner, status: status})
            }
            else{
                res.status(500).send({message: "job not found!"})
            }
        }
    }
    catch(err){
        console.error(err)
        res.status(500).send({message: "Server error!"})
    }
})

app.post('/applytojob', isLoggedIn, async (req, res) => {
    try {
        const job = await Job.findOne({ _id: req.body.jobid });
        const user = await User.findOne({_id: req.userid})

        if (!job) return res.status(500).json({ message: "Job not found" });

        job.applicants.push(req.userid);
        user.selected[job._id] = 1
        user.markModified("selected");
        await job.save();
        await user.save()
        res.json({ message: "Application submitted!", status: user.status });
    } catch (err) {
        res.status(500).json({ message: err });
    }
});

app.put('/api/edit-user', isLoggedIn, resumeUpload.single('resume'), async (req, res) => {
    try{
        const updatedData = JSON.parse(req.body.userData)
        if(req.file){
            updatedData.details.resume = {
                name: req.file.originalname,
                url: `http://localhost:5000/resumes/${req.file.filename}`
            }
        }
        const user = await User.findOneAndUpdate(
            { _id: req.userid },
            { $set: updatedData },
            { new: true }
        )
        res.status(200).json({message: "Update succesfull!", user})
    }
    catch(err){
        res.status(500).json({message: "Server error during update!"})
    }
})

app.put('/api/edit-job', isLoggedIn, async (req, res) => {
    try{
        const id = req.query.jobid
        const updatedJob = await Job.findOneAndUpdate(
            {_id: id},
            {$set: req.body},
            {new: true}
        )
        res.status(200).json({message: "Updated Succesfully!"})
    }
    catch(err){
        res.status(500).json({message: "Server Error!"})
    }
})

app.get('/getFeaturedJobs', isLoggedIn, async (req, res) => {
    try{
        const user = await User.findOne({_id: req.userid})
        const jobs = await Job.find();
        const educationRank = {
            "Matriculate": 1,
            "Intermediate": 2,
            "Undergraduate": 3,
            "Postgraduate": 4
        };
        const userEducation = educationRank[user.details.qualification];
        const userSkills = user.details.skillset || [];
        const featuredJobs = [];
        for (const job of jobs) {

            const jobEducation = educationRank[job.education];
            if (jobEducation > userEducation) continue;

            let score = 0;
            if (jobEducation === userEducation) {
                score += 30;
            }
            else {
                score += 15;
            }
            for (const skill of userSkills) {
                if (job.skills.includes(skill.toLowerCase())) {
                    score += 20;
                }
            }

            featuredJobs.push({
                ...job.toObject(),
                score
            });
        }
        featuredJobs.sort((a, b) => b.score - a.score);
        const appliedJobs = await Job.find({applicants: req.userid});
        const companies = [...new Set(appliedJobs.map(job => job.company))];
        const historyJobs = await Job.find({company: {$in: companies}}).sort({postedOn: -1})
        res.status(200).json({featuredJobs: featuredJobs, historyJobs: historyJobs, user: user})
    }
    catch(err){
        console.error(err)
        res.send({message: "Some problem occured!"})
    }

})

app.post('/logout', isLoggedIn, (req, res) => {
    res.clearCookie('access', {httpOnly: true, sameSite: "lax"})
    res.clearCookie('refresh', {httpOnly: true, sameSite: "lax"})
    res.status(200).json({ message: "Logged out succesfully!" })
})

module.exports = app

const PORT = 5000;
app.listen(PORT, () => console.log(`🚀 MongoDB Server running at http://localhost:${PORT}`));

//repair browse jobs
//see storage of resumes and profile phtos