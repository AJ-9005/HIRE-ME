import { useEffect, useState } from "react"
import { useFetcher, useNavigate } from "react-router-dom"
import { API_URL } from "./config/api"
function JobListings(){
    const [jobs, setJobs] = useState([])
    const [page, setPage] = useState(1)
    async function fetchJobs(page, filters, append = true){
        try{
            const response = await fetch(`${API_URL}/api/getJobs?`,{
                method: 'POST',
                headers: {'Content-Type': 'application/json'},
                body: JSON.stringify({page: page, filters: filters})
            })
            const data = await response.json()
            if(response.ok){
                if(append){
                    setJobs(prev => [...prev, ...data.jobs])
                }
                else{
                    setJobs(data.jobs)
                }
            }
            else{
                console.log(`Error: ${ data.message }`)
            }
        }
        catch(err){
            console.error(err)
        }
    }
    useEffect(() => {fetchJobs(page, filters)}, [page])
    const [filters, setFilters] = useState({
        search: "",
        minSalary: 0,
        minExp: 0,
        education: "All",
        filterSkills: []
    })
    const [skillInput, setSkillInput] = useState("")
    const navigate = useNavigate()
    function filterChange(e){
        const {name, value} = e.target
        setFilters(prev => ({...prev, [name]: value}))
    }
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
    function applyfilters(){}
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
                                <input type="range" min="5000" max="100000" value={filters?.minSalary} step="5000" name="minSalary" className="w-full accent-primary h-2 bg-surface-container rounded-lg appearance-none cursor-pointer" placeholder="0" onChange={filterChange}/>
                                <div className="flex justify-between text-label-sm text-on-surface-variant">
                                    <span>Rs. 1000</span>
                                    <span>{filters?.minSalary}</span>
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
                                    {filters?.filterSkills.map((s, i) => (
                                        <div className="tag" key={i}>
                                            {s}
                                            <span onClick={() => removeSkill(i)}>&times;</span>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>
                        <button className="btn-apply" onClick={() => fetchJobs(1, filters, false)}>Apply filters</button>
                    </div>
                </aside>
                <section className="col-span-9 space-y-stack-md">
                    <div className="bg-surface-container-lowest p-4 rounded-full shadow-md flex items-center gap-4 border border-outline-variant/50">
                        <div className="flex-1 flex items-center gap-3 pl-4 border-r border-outline-variant">
                            <span className="material-symbols-outlined text-secondary">search</span>
                            <input className="w-full bg-transparent border-none focus:ring-0 text-body-md placeholder:text-outline" type="text" name="search" placeholder="Search here" onChange={filterChange}/>
                            <button className="btn-apply w-1/4" onClick={() => fetchJobs(1, filters, false)}>Search</button>
                        </div>
                    </div>
                    <div className="space-y-stack-sm">
                        {jobs && jobs.length>0?jobs.map((job) => (
                        <div className="bg-surface-container-lowest border border-outline-variant/20 rounded-xl p-stack-md hover:shadow-lg transition-all duration-300 group cursor-pointer" onClick={() => navigate(`/jobdetails/${job._id}`)}>
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
                    <div className="flex w-full justify-center">
                        <button className="btn" onClick={() => setPage(prev => prev+1)}> + Load More</button>
                    </div>
                </section>
            </main>
        </div>
    )
}
export default JobListings