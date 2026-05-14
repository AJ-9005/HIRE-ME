import { useState } from "react"
import { useNavigate } from "react-router-dom"
function JobListings({ jobs }){
    const [filters, setFilters] = useState({
        search: "",
        minSalary: 0,
        minExp: 0,
        education: "All",
        filterSkills: []
    })
    const [skillInput, setSkillInput] = useState("")
    const [ search, setsearch ] = useState("")
    const navigate = useNavigate()
    function filterChange(e){
        const {name, value} = e.target
        setFilters(prev => ({...prev, [name]: value}))
    }
    const filteredJobs = jobs.filter(job => {
        const matchesSearch = job.jobrole.toLowerCase().includes(search.toLowerCase()) ||
        job.company.toLowerCase().includes(search.toLowerCase()) ||
        job.location.toLowerCase().includes(search.toLowerCase()) ||
        job.description.toLowerCase().includes(search.toLowerCase())

        const matchesSalary = Number(job.salary) >= Number(filters.minSalary)
        const matchesEdu = filters.education == "All" || job.education == filters.education
        const matchesSkills = filters.filterSkills.length == 0 || filters.filterSkills.some(s => job.skills.includes(s))
        return matchesSearch && matchesSalary && matchesEdu && matchesSkills
    })
    function setskills(e){
        if(e.key == ","){
            e.preventDefault()
            const value = skillInput.trim().toLowerCase().replace(',', '')
            if(value && !filters.filterSkills.includes(value)){
                const newSkills = [...filters.filterSkills, value]
                setFilters((prev) => ({...prev, filterSkills: newSkills}))
                setSkillInput("")
            }
        }
    }
    function removeSkill(removalIndex){
        const updatedSkills = filters.filterSkills.filter((_, index) => index != removalIndex)
        setFilters((prev) => ({...prev, filterSkills: updatedSkills}))
    }
    return(
        <div className="full">
            <h1 className="heading">Job Listings</h1>
            <div className="center-items"><input type="text" name="search" placeholder="Search here" onChange={(e) => setsearch(e.target.value)} className="searchbar"/> </div>
            <div className="interface">
                <div className="filters">
                    <div className="filter-group">
                        <label>Min Salary (Monthly)</label>
                        <input type="number" name="minSalary" className="filter-input" placeholder="0" onChange={filterChange} />
                    </div>
                    <div className="filter-group">
                        <label htmlFor="">Education</label>
                        <select name="education" id="" className="dropdowns" onChange={filterChange}>
                            <option value="All">Any Education</option>
                            <option value="Undergraduate">Undergraduate</option>
                            <option value="Post-graduate">Post-graduate</option>
                            <option value="PHD">PHD</option>
                        </select>
                    </div>
                    <div className="filter-group">
                        <label htmlFor="">Filter by skills</label>
                        <input type="text" placeholder="Type a skill and press comma" value={skillInput} onKeyDown={(e) => setskills(e)} onChange={(e) => setSkillInput(e.target.value)} className="filter-input"/>
                        <div className="tag-container">
                            {filters.filterSkills.map((s, i) => (
                                <div className="tag" key={i}>
                                    {s}
                                    <span onClick={() => removeSkill(i)}>&times;</span>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
                <div className="list">
                {filteredJobs && filteredJobs.length>0?(
                    filteredJobs.map((job, index) => (
                    <div key={job.id || index} className="listbox" onClick={() => navigate(`/jobdetails/${job.id}`)}>
                        <h2>{job.jobrole}</h2>
                        <h3>{job.company}</h3>
                        <div className="badges">
                            <p>{job.workexp}</p>
                            <p>{job.salary}</p>
                            <p>{job.jobtype}</p>
                        </div>
                    </div>
            ))):
            (
                <p style={{ textAlign: 'center', marginTop: '20px' }}> No jobs posted yet. </p>
            )}
            </div>
            </div>
        </div>
    )
}
export default JobListings