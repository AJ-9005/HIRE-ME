import { useState } from "react"
import { useLocation } from "react-router-dom"
function EditJob({ handleJobEdit }){
    const location = useLocation()
    const [job, setJob] = useState(location.state?.job)
    const [skillinp, setskillinp] = useState("")
    const [allskills, setallskills] = useState(location.state?.job?.skills || [])
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
    return (
    <div className="min-h-screen flex items-center justify-center py-stack-lg px-margin-mobile bg-background text-on-background">
        <main className="w-full max-w-[800px] mx-auto text-on-surface selection:bg-secondary-fixed selection:text-on-secondary-fixed">
            <div className="text-center mb-stack-md">
                <h1 className="font-display-lg text-display-lg text-primary mb-2">Edit Job Listing</h1>
                <p className="font-body-md text-body-md text-on-surface-variant max-w-md mx-auto">Update your job listing constraints, core criteria, and role overview details below.</p>
            </div>
            <div className="bg-surface-container-lowest executive-shadow rounded-xl p-stack-md md:p-stack-lg border border-surface-variant">
                <form action="" method="POST" className="space-y-stack-md" onSubmit={handleSubmit} autoComplete="off">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-stack-md">
                        <div className="space-y-stack-xs">
                            <label className="block font-label-md text-label-md text-on-surface-variant" htmlFor="jobrole">Job Role:</label>
                            <input className="w-full bg-surface border border-outline-variant rounded-lg px-4 py-3 font-body-md text-body-md focus:ring-1 focus:ring-primary focus:border-primary outline-none transition-all text-on-surface" type="text" name="jobrole" onChange={handleChange} value={job.jobrole} />
                        </div>
                        <div className="space-y-stack-xs">
                            <label className="block font-label-md text-label-md text-on-surface-variant" htmlFor="salary">Salary Provided(Rs./month)</label>
                            <input className="w-full bg-surface border border-outline-variant rounded-lg px-4 py-3 font-body-md text-body-md focus:ring-1 focus:ring-primary focus:border-primary outline-none transition-all text-on-surface" type="number" name="salary" onChange={handleChange} value={job.salary} />
                        </div>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-stack-md">
                        <div className="space-y-stack-xs">
                            <label className="block font-label-md text-label-md text-on-surface-variant" htmlFor="location">Location (City, Country)</label>
                            <div className="relative">
                                <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-outline text-[20px]" data-icon="location_on">location_on</span>
                                <input className="w-full bg-surface border border-outline-variant rounded-lg pl-10 pr-4 py-3 font-body-md text-body-md focus:ring-1 focus:ring-primary focus:border-primary outline-none transition-all text-on-surface" type="text" name="location" onChange={handleChange} value={job.location} />
                            </div>
                        </div>
                        <div className="space-y-stack-xs">
                            <label className="block font-label-md text-label-md text-on-surface-variant" htmlFor="workexp">Required Work Experience</label>
                            <input className="w-full bg-surface border border-outline-variant rounded-lg px-4 py-3 font-body-md text-body-md focus:ring-1 focus:ring-primary focus:border-primary outline-none transition-all text-on-surface" type="text" name="workexp" onChange={handleChange} value={job.workexp} />
                        </div>
                    </div>
                    <div className="space-y-stack-xs">
                        <span className="block font-label-md text-label-md text-on-surface-variant">Job type</span>
                        <div className="flex flex-wrap gap-stack-md py-2">
                            {['Full-time', 'Part-time', 'Internship', 'Other'].map((type) => (
                                <label key={type} className="flex items-center space-x-2 cursor-pointer group" htmlFor="">
                                    <input className="w-5 h-5 text-primary border-outline-variant focus:ring-primary accent-primary cursor-pointer" type="radio" name="jobtype" value={type} onChange={handleChange} checked={job.jobtype == type} />
                                    <span className="font-body-md text-body-md text-on-surface group-hover:text-primary transition-colors">{type}</span>
                                </label>
                            ))}
                        </div>
                    </div>
                    <div className="space-y-stack-xs">
                        <label className="block font-label-md text-label-md text-on-surface-variant" htmlFor="education">Required Qualification (Highest)</label>
                        <div className="relative">
                            <select className="w-full bg-surface border border-outline-variant rounded-lg px-4 py-3 font-body-md text-body-md focus:ring-1 focus:ring-primary focus:border-primary outline-none transition-all appearance-none cursor-pointer text-on-surface" name="education" onChange={handleChange} value={job.education}>
                                <option value="">--Select here--</option>
                                <option value="Matriculate (10th Pass)">Matriculate (10th Pass)</option>
                                <option value="Intermediate (12th Pass)">Intermediate (12th Pass)</option>
                                <option value="Undergraduate">Undergraduate</option>
                                <option value="Post-graduate">Post-graduate</option>
                                <option value="PHD">PHD</option>
                            </select>
                            <span className="material-symbols-outlined absolute right-4 top-1/2 -translate-y-1/2 text-outline pointer-events-none">arrow_drop_down</span>
                        </div>
                    </div>
                    <div className="space-y-stack-xs">
                        <label className="block font-label-md text-label-md text-on-surface-variant" htmlFor="skills">Required Skills</label>
                        <div className="bg-surface border border-outline-variant rounded-lg p-2 focus-within:ring-1 focus-within:ring-primary focus-within:border-primary transition-all">
                            <div className="flex flex-wrap gap-2 mb-2 empty:hidden">
                                {allskills.map((skill, index) => (
                                    <div className="tag" key={index}>
                                        <span>{skill}</span>
                                        <i onClick={() => removeSkill(index)}>&times;</i>
                                    </div>
                                ))}
                            </div>
                            <input className="w-full bg-transparent border-none outline-none px-2 py-1 font-body-md text-body-md text-on-surface placeholder:text-outline/50 focus:ring-0" type="text" name="skills" onChange={(e) => setskillinp(e.target.value)} onKeyDown={setskills} value={skillinp} />
                        </div>
                    </div>
                    <div className="space-y-stack-xs">
                        <label className="block font-label-md text-label-md text-on-surface-variant" htmlFor="description">Description</label>
                        <textarea className="w-full bg-surface border border-outline-variant rounded-lg px-4 py-3 font-body-md text-body-md focus:ring-1 focus:ring-primary focus:border-primary outline-none transition-all custom-scrollbar placeholder:text-outline/50 resize-none text-on-surface" rows="5" name="description" onChange={handleChange} value={job.description} />
                    </div>
                    <div className="pt-stack-sm flex justify-end">
                        <button className="w-full bg-primary text-on-primary py-4 rounded-lg font-label-md text-label-md hover:opacity-95 active:scale-[0.99] transition-all shadow-md flex items-center justify-center space-x-2 cursor-pointer" type="submit">Post</button>
                    </div>
                </form>
            </div>
        </main>
    </div>
)
}
export default EditJob