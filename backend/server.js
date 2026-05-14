const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const multer = require('multer');
const path = require('path');
const fs = require('fs');
require('dotenv').config({ path: "./config.env" });

const app = express();
app.use(express.json());
app.use(cors());

// --- 1. MONGODB CONNECTION ---
mongoose.connect(process.env.ATLAS_URI)
    .then(() => console.log("✅ Connected to MongoDB Atlas"))
    .catch(err => console.error("❌ MongoDB Connection Error:", err));

// --- 2. SCHEMAS & MODELS ---
const UserSchema = new mongoose.Schema({
    username: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    urname: { type: String, required: true },
    contactno: { type: String, required: true },
    email: { type: String, required: true },
    role: String,
    id: Number, // Keeping your local Date.now() ID for frontend compatibility
    details: mongoose.Schema.Types.Mixed,
    selected: { type: Object, default: {} }
});

const JobSchema = new mongoose.Schema({
    id: Number,
    jobrole: String,
    company: String,
    location: String,
    salary: String,
    workexp: String,
    jobtype: String,
    education: String,
    skills: [String],
    description: String,
    postedby: String,
    applicants: { type: Array, default: [] }
});

const User = mongoose.model('User', UserSchema);
const Job = mongoose.model('Job', JobSchema);

// --- 3. MULTER SETUP (FOR FILES) ---
const resumesDir = path.join(__dirname, 'resumes');
if (!fs.existsSync(resumesDir)) fs.mkdirSync(resumesDir);

app.use('/resumes', express.static(resumesDir));

const storage = multer.diskStorage({
    destination: (req, file, cb) => cb(null, 'resumes/'),
    filename: (req, file, cb) => cb(null, Date.now() + '-' + file.originalname)
});
const upload = multer({ storage: storage });

// --- 4. API ROUTES ---

// Get all data (React app initialization)
app.get('/api/data', async (req, res) => {
    try {
        const usersList = await User.find({});
        const jobsList = await Job.find({});
        
        // Convert array to the object format your React app expects for users
        const usersObj = {};
        usersList.forEach(u => { usersObj[u.username] = u; });
        
        res.json({ users: usersObj, jobs: jobsList });
    } catch (err) {
        res.status(500).json({ message: "Error fetching data" });
    }
});

// Signup Route
app.post('/api/signup', upload.single('resume'), async (req, res) => {
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
        await newUser.save();
        res.status(201).json({ message: "User registered!", user: newUser });
    } catch (err) {
        if (err.code === 11000) return res.status(400).json({ message: "Username already taken!" });
        res.status(500).json({ message: "Signup failed", error: err.message });
    }
});

// Update Selection (Shortlist/Reject)
app.post('/api/update-selection', async (req, res) => {
    const { username, selected } = req.body;
    try {
        const updatedUser = await User.findOneAndUpdate(
            { username: username },
            { $set: { selected: selected } },
            { new: true }
        );
        if (!updatedUser) return res.status(404).json({ message: "User not found" });
        res.json({ message: "Selection updated!" });
    } catch (err) {
        res.status(500).json({ message: "Update failed" });
    }
});

// Add Job Route
app.post('/api/add-job', async (req, res) => {
    try {
        const newJob = new Job(req.body);
        await newJob.save();
        res.status(201).json({ message: "Job posted!", job: newJob });
    } catch (err) {
        res.status(500).json({ message: "Failed to post job" });
        console.log(err)
    }
});

// Apply to Job Route
app.post('/api/apply', async (req, res) => {
    const { jobId, currentUser } = req.body;
    try {
        // Find job by your custom ID field
        const job = await Job.findOne({ id: jobId });
        if (!job) return res.status(404).json({ message: "Job not found" });

        const alreadyApplied = job.applicants.some(a => a.username === currentUser.username);
        if (alreadyApplied) return res.status(400).json({ message: "Already applied!" });

        job.applicants.push(currentUser);
        await job.save();
        res.json({ message: "Application submitted!" });

        await User.findOneAndUpdate(
            { username: currentUser.username },
            { $set: { [`selected.${jobId}`]: "pending" } }
        );
    } catch (err) {
        res.status(500).json({ message: "Application failed" });
    }
});

app.put('/api/edit-user/:username', upload.single('resume'), async (req, res) => {
    try{
        const { username } = req.params
        const updatedData = JSON.parse(req.body.userData)
        if(req.file){
            updatedData.details.resume = {
                name: req.file.originalname,
                url: `http://localhost:5000/resumes/${req.file.filename}`
            }
        }
        const user = await User.findOneAndUpdate(
            { username: username },
            { $set: updatedData },
            { new: true }
        )
        res.json({message: "Update succesfull!", user})
    }
    catch(err){
        res.status(500).json({message: "Server error during update!"})
    }
})

app.put('/api/edit-job/:id', async (req, res) => {
    try{
        const{id} = req.params
        const updatedJob = await Job.findOneAndUpdate(
            {id: id},
            {$set: req.body},
            {new: true}
        )
        res.json({message: "Updated Succesfully!", updatedJob})
    }
    catch(err){
        res.status(500).json({message: "Server Error!"})
    }
})

const PORT = 5000;
app.listen(PORT, () => console.log(`🚀 MongoDB Server running at http://localhost:${PORT}`));