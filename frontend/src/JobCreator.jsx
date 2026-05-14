import { useState } from "react"
import { useNavigate } from "react-router-dom"

function JobCreator({ addJob }){
    const navigate = useNavigate()
    const [skillinp, setskillinp] = useState("")
    const [allskills, setallskills] = useState([])
    const [jobdetails, setjobdetails] = useState({
        jobrole:"",
        salary:"",
        location:"",
        jobtype: "",
        education: "",
        skills: [],
        workexp:"No prior expereince",
        description:"",
        postedby: "",
    })
    const handleChange = (e) => {
        const { name, value } = e.target
        setjobdetails((prev) => ({
            ...prev,
            [name]: value
        }))
    }
    function postJob(e){
        e.preventDefault()
        if (allskills.length < 1){
            alert("Please enter atleast 1 required skill")
            return
        }
        addJob(jobdetails)
        navigate("/creations")
        alert("Job created!")
    }
    function setskills(e){
        if(e.key == ","){
            e.preventDefault()
            const value = skillinp.trim().toLowerCase().replace(',', '')
            if(value && !allskills.includes(value)){
                const newSkills = [...allskills, value]
                setallskills(newSkills)
                setjobdetails({...jobdetails, skills: newSkills})
                setskillinp("")
            }
        }
    }
    function removeSkill(removalIndex){
        const updatedSkills = allskills.filter((_, index) => index != removalIndex)
        setallskills(updatedSkills)
        setjobdetails({...jobdetails, skills: updatedSkills})
    }
    return(
        <div className="full">
            <div className="formwrapper">
                <form action="" method="POST" className="loginform" onSubmit={postJob} autoComplete="off">
                    <label for="jobrole">Job Role:</label>
                    <input type="text" name="jobrole" onChange={handleChange}/>
                    <label for="salary">Salary Provided(Rs./month)</label>
                    <input type="number" name="salary" onChange={handleChange}/>
                    <label for="location">Location (City, Country)</label>
                    <input type="text" name="location" onChange={handleChange}/>
                    <label>Job type</label>
                    <label for="jobtype"><input type="radio" name="jobtype" value="Part-time" onChange={handleChange}/>
                        Part-Time
                    <input type="radio" name="jobtype" value="Full-time" onChange={handleChange}/>
                    Full-Time
                    </label>
                    <label for="workexp">Required Qualification (Highest)</label>
                    <select name="education" className="dropdowns" onChange={handleChange}>
                        <option value="">--Select here--</option>
                        <option value="Matriculate (10th Pass)">Matriculate (10th Pass)</option>
                        <option value="Intermediate (12th Pass)">Intermediate (12th Pass)</option>
                        <option value="Undergraduate">Undergraduate</option>
                        <option value="Post-graduate">Post-graduate</option>
                        <option value="PHD">PHD</option>
                </select><br />
                    <label for="workexp">Required Skills</label>
                    <div className="tag-container">
                        {allskills.map((skill, index) => (
                            <div className="tag" key={index}>
                                <span>{skill}</span>
                                <i onClick={() => removeSkill(index)}>&times;</i>
                            </div>
                        ))}
                    </div>
                    <input type="text" name="skills" onChange={(e) => setskillinp(e.target.value)} onKeyDown={setskills} value={skillinp}/>
                    <label for="workexp">Required Work Expereince</label>
                    <input type="text" name="workexp" onChange={handleChange}/>
                    <label for="description">Description</label>
                    <input type="textarea" name="description" onChange={handleChange}/>
                    <button type = "submit" className="btn" style={{alignSelf:"center", margin: "15px"}}>Post</button>
                </form>
            </div>
        </div>
    )
}
export default JobCreator