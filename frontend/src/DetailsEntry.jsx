import { useState } from "react"
import { useLocation, useNavigate } from "react-router-dom"

function DetailsEntry({ addUser }){
    const location = useLocation()
    const navigate = useNavigate()
    const basicInfo = location.state?.basicInfo
    console.log(basicInfo)
    const [skillinp, setskillinp] = useState("")
    const [allskills, setallskills] = useState([])
    const [companyDetails, setCompanyDetails] = useState({
        companyname: "",
        origin: "",
        established: null,
        website: "",
    })
    const [applicantdetails, setapplicantdetails] = useState({
        qualification:"",
        dob: "",
        skillset:[],
        expereince:"None",
        maritalstatus:"",
        resume: null,
    })
    function handleChange(e){
        const { name, value, type, files } = e.target
        const finalValue = type == "file" ? files[0]: value
        if(basicInfo.role == "Employer"){
            setCompanyDetails((prev) => ({
            ...prev, [name]: finalValue,
        }))
        }
        else{
            setapplicantdetails((prev) => ({
            ...prev, [name]: finalValue,
        }))
        }
    }
    function handleSubmit(e){
        e.preventDefault()
        let finalData = {}
        let resumefile = null
        if (basicInfo.role == "Employer"){
            finalData = {
                ...basicInfo,
                details: companyDetails
            }
        }
        else{
            resumefile = applicantdetails.resume
            finalData = {
                ...basicInfo,
                details: applicantdetails
            }
        }
        addUser(finalData, resumefile)
        navigate("/login")
        alert("Registered Succesfully! Please Login.")
    }
    function setskills(e){
        if(e.key == ","){
            e.preventDefault()
            const value = skillinp.trim().toLowerCase().replace(',', '')
            if(value && !allskills.includes(value)){
                const newSkills = [...allskills, value]
                setallskills(newSkills)
                setapplicantdetails({...applicantdetails, skillset: newSkills})
                setskillinp("")
            }
        }
    }
    function removeSkill(removalIndex){
        const updatedSkills = allskills.filter((_, index) => index != removalIndex)
        setallskills(updatedSkills)
        setapplicantdetails({...applicantdetails, skillset: updatedSkills})
    }
    return(<div className="bg-background text-on-background min-h-screen flex flex-col">
        {basicInfo?.role == "Employer" && (
        <main className="flex-grow flex items-center justify-center py-stack-xl px-margin-mobile">
            <div className="max-w-container-max w-full grid grid-cols-1 lg:grid-cols-12 gap-gutter items-start">
                <div className="lg:col-span-5 hidden lg:flex flex-col gap-stack-lg p-stack-lg rounded-xl bg-surface-container-low border border-outline-variant shadow-sm self-stretch">
                    <div className="flex flex-col gap-stack-sm">
                        <h1 className="font-display-lg text-display-lg text-primary">Establish your Presence</h1>
                        <p className="font-body-lg text-body-lg text-on-surface-variant">Complete your employer profile to start connecting with top-tier talent. A professional profile increases application quality by 40%.</p>
                    </div>
                    <div className="relative w-full aspect-video rounded-lg overflow-hidden shadow-md">
                        <div className="absolute inset-0 bg-primary/10 flex items-center justify-center">
                            <img className="w-full h-full object-cover" src="https://lh3.googleusercontent.com/aida-public/AB6AXuBjqVC8Y-XmMzpndgXWXMYSDOKn9lyZDnXnTw8QCYnm8cKBoHYlHR5KlbNQOE0YiN_4kgws2FpPt8SAi8HYRBFcLwql96QfbuMInFmA1rAwI-bL6gKjm6-8hwOakQkyh0EHYHyxa62KrYheYZklWbP2S1yUa4bem7c4_b62EctH70FVHk4UezyVGIl0GDh9TY9rRAED6dFVy2mjLF0r_nmPgYEXCAWESnhNZ34ChbCOG8rVwdGVX6BkKNZedcwGBMJkpCL2qeaPk3al" alt="" />
                        </div>
                    </div>
                    <div className="grid grid-cols-2 gap-stack-md">
                        <div className="p-stack-md bg-white rounded-lg border border-outline-variant/30">
                            <span className="material-symbols-outlined text-secondary mb-2" data-icon="verified">Verified</span>
                            <p className="font-label-md text-label-md text-primary">VERIFIED STATUS</p>
                            <p className="font-body-sm text-body-sm text-on-surface-variant">Gain trust badges upon completion.</p>
                        </div>
                        <div className="p-stack-md bg-white rounded-lg border border-outline-variant/30">
                            <span className="material-symbols-outlined text-secondary mb-2" data-icon="insights">insights</span>
                            <p className="font-label-md text-label-md text-primary">VISIBILITY BOOST</p>
                            <p className="font-body-sm text-body-sm text-on-surface-variant">Rank higher in candidate searches.</p>
                        </div>
                    </div>
                </div>
                    <div className="lg:col-span-7 w-full">
                        <div className="bg-white p-stack-lg rounded-xl shadow-lg border border-outline-variant/20">
                            <div className="mb-stack-lg">
                                <h2 className="font-headline-md text-headline-md text-primary mb-2">Company Details</h2>
                                <p class="font-body-md text-body-md text-on-surface-variant">Tell us more about your establishment to help candidates understand your mission.</p>
                            </div>
                            <form action="" method="POST" className="flex flex-col gap-stack-md" onSubmit={handleSubmit} autoComplete="off">
                                <div class="grid grid-cols-1 md:grid-cols-2 gap-stack-md">
                                    <div className="flex flex-col gap-2">
                                        <label for="compname" className="font-label-md text-label-md text-on-surface uppercase tracking-wider">Name of your organisation</label>
                                        <div className="relative">
                                            <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-on-surface-variant text-sm" data-icon="business">business</span>
                                            <input className="detail-input" type="text" id="compname" name="companyname" onChange={handleChange} required />
                                        </div>
                                    </div>
                                    <div className="flex flex-col gap-2">
                                        <label className="font-label-md text-label-md text-on-surface uppercase tracking-wider" for="established">Date Founded</label>
                                        <div className="relative">
                                            <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-on-surface-variant text-sm" data_icon="calendar_today">calendar_today</span>
                                            <input className="detail-input" type="date" min="1950" max={new Date().getFullYear()} id="established" name="established" onChange={handleChange} required /><br />
                                        </div>
                                    </div>
                                </div>
                                <div className="flex flex-col gap-2">
                                    <label className="font-label-md text-label-md text-on-surface uppercase tracking-wider" for="origin">Place of Origin Of the Organisation (City, Country)</label>
                                    <div className="relative">
                                        <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-on-surface-variant text-sm" data-icon="location_on">location_on</span>
                                        <input className="detail-input" id="origin" name="origin" onChange={handleChange} required />
                                    </div>
                                </div>
                                <div className="flex flex-col gap-2">
                                    <label className="font-label-md text-label-md text-on-surface uppercase tracking-wider" for="weblink">Website Link (If any)</label>
                                    <div className="relative">
                                        <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-on-surface-variant text-sm" data-icon="link">link</span>
                                        <input className="detail-input" type="text" id="weblink" name="weblink" onChange={handleChange} /><br />
                                    </div>
                                </div>
                                <div className="mt-stack-md flex items-center justify-end gap-stack-md">
                                    <button className="bg-primary text-on-primary px-10 py-4 rounded-xl font-bold flex items-center gap-2 shadow-md hover:shadow-lg scale-100 active:scale-95 transition-all" type="submit">Submit
                                        <span class="material-symbols-outlined" data-icon="chevron_right">chevron_right</span>
                                    </button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
        </main>)}
        {basicInfo?.role == "Candidate" && (
            <main className="flex-grow flex items-center justify-center py-stack-xl px-margin-mobile">
                <div className="max-w-container-max mx-auto px-margin-desktop py-stack-xl flex flex-col items-center">
                    <div className="text-center mb-stack-lg max-w-2xl">
                        <h1 className="font-display-lg text-display-lg text-primary mb-stack-sm">The Executive Suite awaits</h1>
                        <p className="font-body-lg text-body-lg text-on-surface-variant">Complete your professional profile to unlock premium career opportunities curated specifically for your expertise.</p>
                    </div>
                    <div className="grid grid-cols-1 lg:grid-cols-12 gap-gutter w-full">
                        <section className="lg:col-span-8 bg-surface-container-lowest rounded-xl shadow-[0_4px_20px_rgba(105,53,3,0.08)] p-stack-lg border border-surface-variant">
                        <form className="space-y-stack-md" action="" method="POST" onSubmit={handleSubmit} autoComplete="off">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-gutter">
                                <div className="flex flex-col gap-2">
                                    <label className="font-label-md text-label-md text-on-surface-variant uppercase tracking-wider" for="qualification">Highest qualification</label>
                                    <div className="relative">
                                        <select className="w-full bg-surface-container-low border border-outline-variant rounded-lg p-3 text-on-surface focus:border-primary focus:ring-1 focus:ring-primary appearance-none transition-all" name="qualification" onChange={handleChange}>
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
                                    <div className="relative">
                                        <label className="font-label-md text-label-md text-on-surface-variant uppercase tracking-wider" for="dob">Date Of Birth(dd/mm/yyyy)</label>
                                        <input className="detail-input pl-2" type="date" name="dob" onChange={handleChange}/><br />
                                    </div>
                                </div>
                            </div>
                            <div className="flex flex-col gap-2">
                                <label className="font-label-md text-label-md text-on-surface-variant uppercase tracking-wider" for="skillset">Skills</label>
                                <div className="bg-surface-container-low border border-outline-variant rounded-lg p-3 min-h-[100px] flex flex-wrap gap-2 transition-all">
                                    {allskills.map((skill, index) => (
                                        <div className="tag" key={index}>
                                            <span>{skill}</span>
                                            <i onClick={() => removeSkill(index)}>&times;</i>
                                        </div>
                                    ))}
                                    <input placeholder="press , to add skills" className="detail-input pl-2 bg-white" type="text" id="origin" name="skillset" onChange={(e) => setskillinp(e.target.value)} onKeyDown={setskills} value={skillinp} /><br />
                                </div>
                            </div>
                            <div className="flex flex-col gap-2">
                                <label className="font-label-md text-label-md text-on-surface-variant uppercase tracking-wider" for="expereince">Prior work expereince (if any)</label>
                                <textarea className="detail-input pl-2 bg-white" name="expereince" id="" onChange={handleChange}></textarea><br />
                            </div>
                            <div className="flex flex-col gap-2">
                                <label className="font-label-md text-label-md text-on-surface-variant uppercase tracking-wider" for="maritalstatus">Marital Status</label>
                                <div className="flex flex-wrap gap-stack-md py-2">
                                    <label className="flex items-center gap-2 cursor-pointer group" for="married">
                                        <input className="w-5 h-5 text-primary border-outline-variant focus:ring-primary cursor-pointer" type="radio" name="maritalstatus" value="Married" onChange={handleChange}/>
                                        <span className="text-on-surface-variant group-hover:text-primary transition-colors">Married</span>
                                        <input className="w-5 h-5 text-primary border-outline-variant focus:ring-primary cursor-pointer" type="radio" name="maritalstatus" value="Unmarried" onChange={handleChange}/>
                                        <span className="text-on-surface-variant group-hover:text-primary transition-colors">Unmarried</span>
                                    </label>
                                </div>
                            </div>
                            <div className="flex flex-col gap-2">
                                <label className="font-label-md text-label-md text-on-surface-variant uppercase tracking-wider" htmlFor="resume">Resume (PDF only)</label>
                            <label className="border-2 border-dashed border-outline-variant bg-surface-container-low rounded-xl p-stack-lg flex flex-col items-center justify-center text-center hover:bg-surface-container-high hover:border-primary transition-all cursor-pointer group">
                                <span className="material-symbols-outlined text-surface-tint text-[48px] mb-stack-sm group-hover:scale-110 transition-transform">
                                    upload_file
                                </span>
                                <h4 className="text-headline-sm text-on-surface-variant font-semibold">
                                    Drop your resume here
                                </h4>
                                <p className="text-body-sm text-outline mb-2">or click to browse files</p>
                                <input type="file" id="resume" name="resume" accept=".pdf" onChange={handleChange} className="sr-only" required />
                                {applicantdetails?.resume ? (
                                <p className="text-primary font-bold text-body-sm mt-2">
                                    📄 {applicantdetails?.resume.name || "Resume uploaded!"}
                                </p>
                                ) : (
                                <h4 className="text-headline-sm text-on-surface-variant font-semibold">No file uploaded</h4>
                                )}
                            </label>
                            </div>
                            <div className="pt-stack-md flex justify-end">
                                <button className="bg-primary text-on-primary font-bold px-12 py-4 rounded-lg shadow-lg hover:shadow-xl hover:translate-y-[-2px] active:translate-y-[0px] active:scale-95 transition-all" type="submit">Submit</button>
                            </div>
                        </form>
                    </section>
                    <aside className="lg:col-span-4 flex flex-col gap-gutter">
                        <div className="relative rounded-xl overflow-hidden aspect-square lg:aspect-auto lg:h-[400px]">
                            <img src="https://lh3.googleusercontent.com/aida-public/AB6AXuAGmeldM4OVdgrOyxM3-Cz9ajsH_CJDCBECMf4F7QcB_C0Zxl0otPiig7gxJVP8Zk57jctNrY-heBvhhVyxg_xaR4AvGcaZNf4Fs2bxUPTq1sWYvDKeibErXg-w_vO-9J48kqoMbCFLwPNj-Gzxvnh8oLFdk_fOUoDobR6Qla3zpd3XdxW_uhsT4nw_vIgZBinzuSRbo9-9-k2FGaQMN6pfKQg7CSsZ0LJ-AVVSEKtWJH6fnGuaGuM-6-__KQN4J054n_L41bc2-zoH" src="w-full h-full object-cover" />
                            <div className="absolute inset-0 bg-gradient-to-t from-primary/80 to-transparent flex flex-col justify-end p-stack-md">
                                <p className="text-on-primary font-body-lg italic">"A career is not just a job; it is a legacy in the making."</p>
                            </div>
                        </div>
                    </aside>
                </div>
            </div>
            </main>                                
        )}
    </div>)
}
export default DetailsEntry