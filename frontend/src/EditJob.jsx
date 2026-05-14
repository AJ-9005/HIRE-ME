import { useState } from "react"
import { useLocation } from "react-router-dom"
function EditJob({ handleJobEdit }){
    const location = useLocation()
    const [job, setJob] = useState(location.state?.job)
    const [skillinp, setskillinp] = useState("")
    const [allskills, setallskills] = useState(location.state?.job?.skills || [])
    console.log(job)
    function handleChange(e){
        const {name, value} = e.target
        setJob((prev) => ({...prev, [name]: value}))
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
    function handleSubmit(e){
        e.preventDefault()
        handleJobEdit(job)
    }
    return(
        <div className="full">
            <div className="formwrapper">
                <form action="" method="POST" className="loginform" onSubmit={handleSubmit}>
                    <label for="jobrole">Job Role:</label>
                    <input type="text" name="jobrole" onChange={handleChange} value={job.jobrole} />
                    <label for="salary">Salary Provided(Rs./month)</label>
                    <input type="number" name="salary" onChange={handleChange} value={job.salary} />
                    <label for="location">Location (City, Country)</label>
                    <input type="text" name="location" onChange={handleChange} value={job.location} />
                    <label>Job type</label>
                    <label for="jobtype"><input type="radio" name="jobtype" value="Part-time" onChange={handleChange} checked={job.jobtype=="Part-time"} />
                        Part-Time
                    <input type="radio" name="jobtype" value="Full-time" onChange={handleChange} checked={job.jobtype=="Full-time"} />
                    Full-Time
                    </label>
                    <label for="workexp">Required Qualification (Highest)</label>
                    <select name="education" className="dropdowns" onChange={handleChange} value={job.education} >
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
                    <input type="text" name="workexp" onChange={handleChange} value={job.workexp}/>
                    <label for="description">Description</label>
                    <input type="textarea" name="description" onChange={handleChange} value={job.description}/>
                    <button type = "submit" className="btn" style={{alignSelf:"center", margin: "15px"}}>Post</button>
                </form>
            </div>
        </div>
    )
}
export default EditJob