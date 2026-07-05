import { useState } from 'react'
import { useNavigate, useLocation } from 'react-router-dom'
import SuggestLocation from './SuggestLocation'

function EditDetails({ handleUserEdit, cityAutoComplete }){
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
    return (
    <div className="bg-background text-on-background min-h-screen flex flex-col">
        {tempUser?.role == "Employer" && (
            <main className="flex-grow flex items-center justify-center py-stack-xl px-margin-mobile">
                <div className="max-w-2xl w-full">
                    <div className="bg-white p-stack-lg rounded-xl shadow-lg border border-outline-variant/20">
                        <div className="mb-stack-lg">
                            <h2 className="font-headline-md text-headline-md text-primary mb-2">Edit Company Details</h2>
                            <p className="font-body-md text-body-md text-on-surface-variant">Update your organization's establishment details below.</p>
                        </div>
                        <form action="" method="POST" className="flex flex-col gap-stack-md" onSubmit={handleSubmit} autoComplete='off'>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-stack-md">
                                <div className="flex flex-col gap-2">
                                    <label htmlFor="compname" className="font-label-md text-label-md text-on-surface uppercase tracking-wider">Name of your organisation</label>
                                    <div className="relative">
                                        <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-on-surface-variant text-sm" data-icon="business">business</span>
                                        <input className="detail-input w-full pl-10 pr-4 py-3 rounded-lg border border-outline-variant bg-surface-bright focus:border-primary focus:ring-1 focus:ring-primary outline-none transition-all font-body-md text-on-surface" type="text" id="compname" name="companyname" onChange={handleChange} value={tempUser.details.companyname} required />
                                    </div>
                                </div>
                                <div className="flex flex-col gap-2">
                                    <label className="font-label-md text-label-md text-on-surface uppercase tracking-wider" htmlFor="established">Year Founded</label>
                                    <div className="relative">
                                        <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-on-surface-variant text-sm" data-icon="calendar_today">calendar_today</span>
                                        <input className="detail-input w-full pl-10 pr-4 py-3 rounded-lg border border-outline-variant bg-surface-bright focus:border-primary focus:ring-1 focus:ring-primary outline-none transition-all font-body-md text-on-surface" type="number" min="1950" max={new Date().getFullYear()} id="established" name="established" onChange={handleChange} value={tempUser.details.established} required />
                                    </div>
                                </div>
                            </div>
                            <div className="flex flex-col gap-2">
                                <label className="font-label-md text-label-md text-on-surface uppercase tracking-wider" htmlFor="origin">Place of Origin Of the Organisation (City, Country)</label>
                                <div className="relative">
                                    <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-on-surface-variant text-sm" data-icon="location_on">location_on</span>
                                    <SuggestLocation 
                                        name="location"
                                        value={tempUser.details.origin}
                                        onChange={handleChange}
                                        cityAutoComplete={cityAutoComplete}
                                        placeholder="City, State"
                                        className="detail-input w-full pl-10 pr-4 py-3 rounded-lg border border-outline-variant bg-surface-bright focus:border-primary focus:ring-1 focus:ring-primary outline-none transition-all font-body-md text-on-surface"
                                    />
                                </div>
                            </div>
                            <div className="flex flex-col gap-2">
                                <label className="font-label-md text-label-md text-on-surface uppercase tracking-wider" htmlFor="weblink">Website Link (If any)</label>
                                <div className="relative">
                                    <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-on-surface-variant text-sm" data-icon="link">link</span>
                                    <input className="detail-input w-full pl-10 pr-4 py-3 rounded-lg border border-outline-variant bg-surface-bright focus:border-primary focus:ring-1 focus:ring-primary outline-none transition-all font-body-md text-on-surface" type="text" id="weblink" name="weblink" onChange={handleChange} value={tempUser.details.website} />
                                </div>
                            </div>
                            <div className="mt-stack-md flex items-center justify-end">
                                <button className="bg-primary text-on-primary px-10 py-4 rounded-xl font-bold flex items-center gap-2 shadow-md hover:shadow-lg scale-100 active:scale-95 transition-all cursor-pointer" type="submit">Submit
                                    <span className="material-symbols-outlined" data-icon="chevron_right">chevron_right</span>
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            </main>
        )}
        {tempUser?.role == "Candidate" && (
            <main className="flex-grow flex items-center justify-center py-stack-xl px-margin-mobile">
                <div className="max-w-2xl w-full">
                    <div className="bg-white p-stack-lg rounded-xl shadow-lg border border-outline-variant/20">
                        <div className="mb-stack-lg">
                            <h2 className="font-headline-md text-headline-md text-primary mb-2">Edit Professional Details</h2>
                            <p className="font-body-md text-body-md text-on-surface-variant">Update your qualifications, expertise tools, and professional records below.</p>
                        </div>
                        <form className="space-y-stack-md" action="" method="POST" onSubmit={handleSubmit} autoComplete='off'>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-stack-md">
                                <div className="flex flex-col gap-2">
                                    <label className="font-label-md text-label-md text-on-surface-variant uppercase tracking-wider" htmlFor="qualification">Highest qualification</label>
                                    <div className="relative">
                                        <select className="w-full bg-surface-container-low border border-outline-variant rounded-lg p-3 text-on-surface focus:border-primary focus:ring-1 focus:ring-primary appearance-none transition-all font-body-md cursor-pointer" name="qualification" onChange={handleChange} value={tempUser.details.qualification}>
                                            <option value="">--Select here--</option>
                                            <option value="Matriculate (10th Pass)">Matriculate (10th Pass)</option>
                                            <option value="Intermediate (12th Pass)">Intermediate (12th Pass)</option>
                                            <option value="Undergraduate">Undergraduate</option>
                                            <option value="Post-graduate">Post-graduate</option>
                                            <option value="PHD">PHD</option>
                                        </select>
                                        <span className="material-symbols-outlined absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none text-outline">expand_more</span>
                                    </div>
                                </div>
                                <div className="flex flex-col gap-2">
                                    <label className="font-label-md text-label-md text-on-surface-variant uppercase tracking-wider" htmlFor="dob">Date Of Birth(dd/mm/yyyy)</label>
                                    <div className="relative">
                                        <input className="detail-input w-full px-4 py-3 rounded-lg border border-outline-variant bg-surface-bright focus:border-primary focus:ring-1 focus:ring-primary outline-none transition-all font-body-md text-on-surface" type="date" name="dob" onChange={handleChange} value={tempUser.details.dob} />
                                    </div>
                                </div>
                            </div>
                            <div className="flex flex-col gap-2">
                                <label className="font-label-md text-label-md text-on-surface-variant uppercase tracking-wider" htmlFor="skillset">Skills</label>
                                <div className="bg-surface-container-low border border-outline-variant rounded-lg p-3 min-h-[100px] flex flex-wrap gap-2 transition-all">
                                    {allskills.map((skill, index) => (
                                        <div className="tag" key={index}>
                                            <span>{skill}</span>
                                            <i onClick={() => removeSkill(index)}>×</i>
                                        </div>
                                    ))}
                                    <input placeholder="press , to add skills" className="detail-input w-full px-4 py-3 rounded-lg border border-outline-variant bg-white focus:border-primary focus:ring-1 focus:ring-primary outline-none transition-all font-body-md text-on-surface" type="text" id="origin" name="skillset" onChange={(e) => setskillinp(e.target.value)} onKeyDown={setskills} value={skillinp} />
                                </div>
                            </div>
                            <div className="flex flex-col gap-2">
                                <label className="font-label-md text-label-md text-on-surface-variant uppercase tracking-wider" htmlFor="expereince">Prior work expereince (if any)</label>
                                <textarea className="detail-input w-full px-4 py-3 rounded-lg border border-outline-variant bg-white focus:border-primary focus:ring-1 focus:ring-primary outline-none transition-all font-body-md text-on-surface custom-scrollbar min-h-[100px]" name="expereince" id="" onChange={handleChange} value={tempUser.details.expereince}></textarea>
                            </div>
                            <div className="flex flex-col gap-2">
                                <label className="font-label-md text-label-md text-on-surface-variant uppercase tracking-wider" htmlFor="maritalstatus">Marital Status</label>
                                <div className="flex flex-wrap gap-stack-md py-2">
                                    <label className="flex items-center gap-4 cursor-pointer group" htmlFor="maritalstatus">
                                        <div className="flex items-center gap-2">
                                            <input className="w-5 h-5 text-primary border-outline-variant focus:ring-primary cursor-pointer accent-primary" type="radio" name="maritalstatus" value="Married" onChange={handleChange} checked={tempUser.details.maritalstatus == "Married"} />
                                            <span className="text-on-surface-variant group-hover:text-primary transition-colors">Married</span>
                                        </div>
                                        <div className="flex items-center gap-2">
                                            <input className="w-5 h-5 text-primary border-outline-variant focus:ring-primary cursor-pointer accent-primary" type="radio" name="maritalstatus" value="Unmarried" onChange={handleChange} checked={tempUser.details.maritalstatus == "Unmarried"} />
                                            <span className="text-on-surface-variant group-hover:text-primary transition-colors">Unmarried</span>
                                        </div>
                                    </label>
                                </div>
                            </div>
                            <div className="flex flex-col gap-2">
                                <label className="font-label-md text-label-md text-on-surface-variant uppercase tracking-wider" htmlFor="resume">Resume (PDF only) (Only Upload if u want to change your resume)</label>
                                <label className="border-2 border-dashed border-outline-variant bg-surface-container-low rounded-xl p-stack-lg flex flex-col items-center justify-center text-center hover:bg-surface-container-high hover:border-primary transition-all cursor-pointer group">
                                    <span className="material-symbols-outlined text-surface-tint text-[48px] mb-stack-sm group-hover:scale-110 transition-transform">
                                        upload_file
                                    </span>
                                    <h4 className="text-headline-sm text-on-surface-variant font-semibold">
                                        Drop your resume here
                                    </h4>
                                    <p className="text-body-sm text-outline mb-2">or click to browse files</p>
                                    <input type="file" id="resume" name="resume" accept=".pdf" onChange={handleFileChange} className="sr-only" />
                                </label>
                            </div>
                            <div className="pt-stack-md flex justify-end">
                                <button className="bg-primary text-on-primary font-bold px-12 py-4 rounded-lg shadow-lg hover:shadow-xl hover:translate-y-[-2px] active:translate-y-[0px] active:scale-95 transition-all cursor-pointer" type="submit">Submit</button>
                            </div>
                        </form>
                    </div>
                </div>
            </main>
        )}
    </div>
)
}
export default EditDetails