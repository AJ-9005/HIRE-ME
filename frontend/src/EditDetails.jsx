import { useState } from 'react'
import { useNavigate, useLocation } from 'react-router-dom'
function EditDetails({ handleUserEdit }){
    const location = useLocation()
    const [tempUser, setTempUser] = useState(location.state?.draftUser)
    const navigate = useNavigate()
    const [skillinp, setskillinp] = useState("")
    const [allskills, setallskills] = useState(location.state?.draftUser?.details?.skillset || []);
    const [newResume, setNewResume] = useState(null)
    function handleFileChange(e){
        setNewResume(e.target.files[0])
    }
    function handleChange(e){
        const {name, value} = e.target
        setTempUser({...tempUser, details: {...tempUser.details, [name]: value}})
    }
    function setskills(e){
        if(e.key == ","){
            e.preventDefault()
            const value = skillinp.trim().toLowerCase().replace(',', '')
            if(value && !allskills.includes(value)){
                const newSkills = [...allskills, value]
                setallskills(newSkills)
                setTempUser({...tempUser, details:{...tempUser.details, skillset: newSkills}})
                setskillinp("")
            }
        }
    }
    function removeSkill(removalIndex){
        const updatedSkills = allskills.filter((_, index) => index != removalIndex)
        setallskills(updatedSkills)
        setTempUser({...tempUser, details:{...tempUser.details, skillset: updatedSkills}})
    }
    function handleSubmit(e){
        e.preventDefault()
        handleUserEdit(tempUser, newResume)
    }
    return(
        <div className="full">
            {tempUser?.role == "Employer" && (
                <div className="formwrapper">
                    <form action="" method="POST" className="loginform" onSubmit={handleSubmit} autoComplete='off'>
                        <label for="compname">Name of your organisation</label>
                        <input type="text" id="compname" name="companyname" onChange={handleChange} value={tempUser.details.companyname} required /><br />
                        <label for="origin">Place of Origin Of the Organisation (City, Country)</label>
                        <input type="text" id="origin" name="origin" onChange={handleChange} value={tempUser.details.origin} required /><br />
                        <label for="established">Year Founded</label>
                        <input type="number" min="1950" max={new Date().getFullYear()} id="established" name="established" onChange={handleChange} value={tempUser.details.established} required /><br />
                        <label for="weblink">Website Link (If any)</label>
                        <input type="text" id="weblink" name="weblink" onChange={handleChange} value={tempUser.details.website} /><br />
                        <button className="btn" type="submit">Submit</button>
                    </form>
                </div>)}
            {tempUser?.role == "Candidate" && (
                <div className="formwrapper">
                    <form action="" method="POST" className="loginform" onSubmit={handleSubmit} autoComplete='off'>
                        <label for="qualification">Highest qualification</label>
                        <select name="qualification" className="dropdowns" onChange={handleChange} value={tempUser.details.qualification}>
                            <option value="">--Select here--</option>
                            <option value="Matriculate (10th Pass)">Matriculate (10th Pass)</option>
                            <option value="Intermediate (12th Pass)">Intermediate (12th Pass)</option>
                            <option value="Undergraduate">Undergraduate</option>
                            <option value="Post-graduate">Post-graduate</option>
                            <option value="PHD">PHD</option>
                        </select><br />
                        <label for="dob">Date Of Birth(dd/mm/yyyy)</label>
                        <input type="date" name="dob" onChange={handleChange} value={tempUser.details.dob} /><br />
                        <label for="skillset">Skills</label>
                        <div className="tag-container">
                            {allskills.map((skill, index) => (
                                <div className="tag" key={index}>
                                    <span>{skill}</span>
                                    <i onClick={() => removeSkill(index)}>&times;</i>
                                </div>
                            ))}
                        </div>
                        <input type="text" id="origin" name="skillset" onChange={(e) => setskillinp(e.target.value)} onKeyDown={setskills} value={skillinp} /><br />
                        <label for="expereince">Prior work expereince (if any)</label>
                        <textarea name="expereince" id="" onChange={handleChange} value={tempUser.details.expereince} ></textarea><br />
                        <label for="maritalstatus">Marital Status</label>
                        <label for="married"><input type="radio" name="maritalstatus" value="Married" onChange={handleChange} checked={tempUser.details.maritalstatus=="Married"} />Married <input type="radio" name="maritalstatus" value="Unmarried" onChange={handleChange} checked={tempUser.details.maritalstatus=="Unmarried"} />Unmarried</label>
                        <label htmlFor="resume">Resume (PDF only) (Only Upload if u want to change your resume)</label>
                        <input type="file" name="resume" accept=".pdf" onChange={handleFileChange} /><br />
                        <button className="btn" type="submit">Submit</button>
                    </form>
                </div>
            )}
        </div>
    )
}
export default EditDetails