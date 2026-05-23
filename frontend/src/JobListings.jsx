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
        <div className="bg-background text-on-surface">
            <h1 className="heading pt-5">Job Listings</h1>
            <main className="pt-3 pb-stack-xl px-margin-desktop max-w-container-max mx-auto grid grid-cols-12 gap-gutter">
                <aside className="col-span-3 space-y-stack-md">
                    <div className="bg-surface-container-low p-stack-md rounded-xl border border-outline-variant/30 sticky top-28">
                        <div className="flex items-center justify-between mb-stack-md">
                            <h2 className="font-headline-sm text-headline-sm text-primary">Filters</h2>
                            <button className="text-label-sm font-label-sm text-secondary hover:underline">Clear All</button>
                        </div>
                        <div className="space-y-stack-sm mb-stack-md">
                            <p className="font-label-md text-label-md text-on-surface uppercase tracking-wider">Salary Range</p>
                            <div className="space-y-3">
                                <input type="range" min="5000" max="100000" value={filters.minSalary} step="5000" name="minSalary" className="w-full accent-primary h-2 bg-surface-container rounded-lg appearance-none cursor-pointer" placeholder="0" onChange={filterChange}/>
                                <div className="flex justify-between text-label-sm text-on-surface-variant">
                                    <span>Rs. 1000</span>
                                    <span>{filters.minSalary}</span>
                                    <span>Rs. 1,00,000+</span>
                                </div>
                            </div>
                        </div>
                        <div className="space-y-stack-sm mb-stack-md">
                            <p className="font-label-md text-label-md text-on-surface uppercase tracking-wider">Education Level</p>
                            <select name="education" id="" className="w-full bg-surface-container-lowest border border-outline-variant rounded-lg p-2 text-body-sm text-on-surface focus:ring-primary focus:border-primary" onChange={filterChange}>
                                <option value="All">Any Education</option>
                                <option value="Undergraduate">Undergraduate</option>
                                <option value="Post-graduate">Post-graduate</option>
                                <option value="PHD">PHD</option>
                            </select>
                        </div>
                        <div className="space-y-stack-sm mb-stack-md">
                            <p className="font-label-md text-label-md text-on-surface uppercase tracking-wider">Skills</p>
                            <div className="space-y-3 mt-stack-sm">
                                <div className="relative flex items-center">
                                <input type="text" placeholder="Type a skill and press comma" value={skillInput} onKeyDown={(e) => setskills(e)} onChange={(e) => setSkillInput(e.target.value)} className="filter-input"/>    
                                </div>
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
                    </div>
                </aside>
                <section className="col-span-9 space-y-stack-md">
                    <div className="bg-surface-container-lowest p-4 rounded-full shadow-md flex items-center gap-4 border border-outline-variant/50">
                        <div className="flex-1 flex items-center gap-3 pl-4 border-r border-outline-variant">
                            <span className="material-symbols-outlined text-secondary">search</span>
                            <input className="w-full bg-transparent border-none focus:ring-0 text-body-md placeholder:text-outline" type="text" name="search" placeholder="Search here" onChange={(e) => setsearch(e.target.value)}/>
                        </div>
                    </div>
                    <div className="space-y-stack-sm">
                        {filteredJobs && filteredJobs.length>0?filteredJobs.map((job) => (
                        <div className="bg-surface-container-lowest border border-outline-variant/20 rounded-xl p-stack-md hover:shadow-lg transition-all duration-300 group cursor-pointer" onClick={() => navigate(`/jobdetails/${job.id}`)}>
                            <div className="flex gap-stack-md">
                                <div className="flex-1">
                                    <div className="flex justify-between items-start">
                                        <div>
                                            <h3 className="font-headline-sm text-headline-sm text-on-surface group-hover:text-primary transition-colors">{job?.jobrole}</h3>
                                            <p className="font-label-md text-label-md text-secondary">{job?.company}</p>
                                        </div>
                                    </div>
                                    <div className="mt-4 flex flex-wrap gap-4 text-body-sm text-on-surface-variant">
                                        <span className="flex items-center gap-1"><span className="material-symbols-outlined text-[18px]">work</span>{job?.jobtype}</span>
                                        <span className="flex items-center gap-1"><span className="material-symbols-outlined text-[18px]">location_on</span>{job?.location}</span>
                                        <span className="flex items-center gap-1 font-bold text-primary"><span className="material-symbols-outlined text-[18px]">payments</span>INR {job?.salary}/- per month</span>
                                    </div>
                                </div>
                            </div>
                        </div>  
                        )): (
                        <p>No jobs posted yet.</p>
                        )}
                    </div>
                </section>
            </main>
        </div>
    )
}
export default JobListings