import { useState, useEffect } from "react"
import { useNavigate, useParams } from "react-router-dom"
import { API_URL } from "./config/api"
function JobProfile({ jobs, currentUser, applytojob }){
    const { jobID } = useParams()
    const navigate = useNavigate()
    const [job, setJob] = useState(null)
    const [isOwner, setOwner] = useState(false)
    const [status, setStatus] = useState(0)
    useEffect(() => {
        async function fetchDetails(jobID){
            try{
                const response = await fetch(`${API_URL}/getJobProfile?id=${jobID}`, {
                    method: 'GET',
                    credentials: "include"
                })
                const data = await response.json()
                if(response.ok){
                    setJob(data.job)
                    setOwner(data.owner)
                    setStatus(data.status)
                }
                else if(response.status == 401){
                    alert("Please log in to continue!")
                    navigate("/login")
                }
                else{
                    alert("Server down!")
                    console.log(data.message)
                }
                }
            catch(err){
                alert("Error fetching job profile!")
                console.log(err)
            }
        }
        fetchDetails(jobID)
    }, [jobID, status])
    const [view, setview] = useState(false)
    const statusText = status == 2 ? "Approved":status == 3? "Rejected": "Pending"
    async function handleApply(){
        try{
            const response = await fetch(`${API_URL}/applytojob`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({jobid: jobID}),
                credentials: "include"
            })
            const data = await response.json()
            if(response.ok){
                alert(data.message)
                setStatus(data.status)
            }
            else if(response.status == 401){
                alert(data.message)
                navigate("/login")
            }
            else{
                alert("Some error occured!")
                console.log(data.message)
            }
        }
        catch(err){
            alert("Some error occured!")
            console.log(err)
        }
    }
    return(
        <div className="text-on-surface selection:bg-secondary-fixed selection:text-on-secondary-fixed">
            <main className="min-h-screen px-margin-mobile md:px-margin-desktop py-stack-lg max-w-container-max mx-auto">
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-gutter">
                    <div className="lg:col-span-8 space-y-stack-md">
                        <section className="bg-surface-container-lowest rounded-lg p-stack-md md:p-stack-lg executive-shadow border border-outline-variant/30">
                            <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-stack-md mb-stack-md">
                                <div className="flex items-center gap-stack-md">
                                    <div className="w-16 h-16 md:w-20 md:h-20 rounded-lg bg-surface-container-high flex items-center justify-center border border-outline-variant/20">
                                        <span className="material-symbols-outlined text-[40px] text-primary" data-icon="corporate_fare">corporate_fare</span>
                                    </div>
                                    <div>
                                        <h1 className="font-display-lg text-display-lg text-primary mb-1">{job?.jobrole}</h1>
                                        <p className="font-body-lg text-body-lg text-on-surface-variant">{job?.company}</p>
                                    </div>
                                </div>
                            </div>
                            <div className="grid grid-cols-2 md:grid-cols-4 gap-gutter py-stack-md border-y border-outline-variant/20">
                                <div className="flex flex-col gap-1">
                                    <span className="font-label-sm text-label-sm text-on-surface-variant uppercase tracking-wider">Salary/Month</span>
                                    <div className="flex items-center gap-2 text-primary">
                                        <span className="material-symbols-outlined text-[18px]">payments</span>
                                        <span className="font-headline-sm text-headline-sm">₹{job?.salary}</span>
                                    </div>
                                </div>
                                <div className="flex flex-col gap-1">
                                    <span className="font-label-sm text-label-sm text-on-surface-variant uppercase tracking-wider">Location</span>
                                    <div className="flex items-center gap-2 text-on-surface">
                                        <span className="material-symbols-outlined text-[18px]">location_on</span>
                                        <span className="font-headline-sm text-headline-sm">{job?.location}</span>
                                    </div>
                                </div>
                                <div className="flex flex-col gap-1">
                                    <span className="font-label-sm text-label-sm text-on-surface-variant uppercase tracking-wider">Job Type</span>
                                    <div className="flex items-center gap-2 text-on-surface">
                                        <span className="material-symbols-outlined text-[18px]">work</span>
                                        <span className="font-headline-sm text-headline-sm">{job?.jobtype}</span>
                                    </div>
                                </div>
                            </div>
                            <div className="mt-stack-md space-y-stack-sm">
                                <div className="flex flex-col gap-2">
                                    <span className="font-label-sm text-label-sm text-on-surface-variant uppercase tracking-wider">Prior Work Expereince Required</span>
                                    <p className="font-body-md text-body-md text-on-surface flex items-center gap-2">
                                        <span className="material-symbols-outlined text-[18px] text-primary">equalizer</span>
                                        {job?.workexp}
                                    </p>
                                </div>
                                <div className="flex flex-col gap-2">
                                    <span className="font-label-sm text-label-sm text-on-surface-variant uppercase tracking-wider">Required Qualifications</span>
                                    <p className="font-body-md text-body-md text-on-surface flex items-center gap-2">
                                        <span className="material-symbols-outlined text-[18px] text-primary">school</span>
                                        {job?.education}
                                    </p>
                                </div>
                                <div className="flex flex-col gap-3 pt-stack-xs">
                                    <span className="font-label-sm text-label-sm text-on-surface-variant uppercase tracking-wider">Required Skills</span>
                                    <div className="flex flex-wrap gap-2">
                                        {job?.skills.map((skill) => (
                                            <span className="tag">{skill}</span>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        </section>
                        <article className="bg-surface-container-lowest rounded-lg p-stack-md md:p-stack-lg executive-shadow border border-outline-variant/30">
                            <div className="prose max-w-none space-y-stack-md">
                                <section>
                                    <h2 className="font-headline-md text-headline-md text-primary mb-stack-sm">Job Description</h2>
                                    <p className="font-body-md text-body-md text-on-surface-variant leading-relaxed">{job?.description}</p>
                                </section>
                            </div>
                        </article>
                    </div>
                    {currentUser?.role == "Candidate" && (
                        <aside className="lg:col-span-4 space-y-stack-md">
                            <div className="bg-surface-container-high rounded-lg p-stack-md executive-shadow border border-outline-variant/30">
                                <div className="flex flex-col gap-3">
                                    {currentUser?.role == "Candidate" &&(<>
                                        <button className={`btn-apply ${status != 0 ? "btn-apply-disabled" : ""}`} onClick={handleApply} disabled={status != 0}>{status != 0 ? "Applied":"Apply Now!"}</button>
                                    {status != 0 &&(
                                        <span className="text-center font-body-sm text-on-surface mt-2 block">Status: <span className={`font-semibold ${status === 2 ? "text-green-600" : status === 3 ? "text-red-600" : "text-amber-500"}`}>{statusText}</span></span>
                                    )}</>)}
                                    {currentUser?.role == "Employer "}
                                </div>
                            </div>
                        </aside>
                    )}
                </div>
                {isOwner && !view && (
                    <div className="flex" style={{justifyContent:"center"}}>
                        <button className="w-13 py-4 px-6 border-2 border-primary-container text-primary-container font-label-md text-label-md uppercase tracking-widest rounded-lg hover:bg-primary-container/5 transition-all" onClick={() => setview(true)}>View Applications ({job?.applicants?.length})</button>
                        <button className="w-13 py-4 px-6 border-2 border-primary-container text-primary-container font-label-md text-label-md uppercase tracking-widest rounded-lg hover:bg-primary-container/5 transition-all" onClick={() => navigate("/editjob", { state: {job: job} })}>Edit Job</button>
                    </div>
                )}
                {view && (<>
                <div className="flex justify-center items-center gap-gutter mb-stack-md">
                    <button className="w-13 py-4 px-6 border-2 border-primary-container text-primary-container font-label-md text-label-md uppercase tracking-widest rounded-lg hover:bg-primary-container/5 transition-all" onClick={() => setview(false)}>Hide Applications ({job.applicants.length})</button>
                    <button className="w-13 py-4 px-6 border-2 border-primary-container text-primary-container font-label-md text-label-md uppercase tracking-widest rounded-lg hover:bg-primary-container/5 transition-all" onClick={() => navigate("/editjob", { state: {job: job} })}>Edit Job</button>
                </div>
                    <div className="list">
                    {job.applicants.length > 0?(job.applicants.map((id, index) => (
                        <div className="w-full flex items-center justify-between bg-surface-container-low border border-outline-variant/40 rounded-xl p-stack-md hover:bg-surface-container-high transition-all duration-200 cursor-pointer group shadow-sm" key={index} onClick={() => navigate(`/myprofile/${id}`, {state:{viewingjobid: jobID}})}>
                            <div className="flex items-center gap-stack-sm">
                                <div className="w-10 h-10 rounded-full bg-primary-fixed flex items-center justify-center text-on-primary-fixed-variant">
                                    <span className="material-symbols-outlined text-[20px]">person</span>
                                </div>
                                <h2 className="font-headline-sm text-on-surface group-hover:text-primary transition-colors">{id}</h2>
                            </div>
                            <span className="material-symbols-outlined text-outline group-hover:translate-x-1 transition-transform">
                                chevron_right
                            </span>
                        </div>
                    ))):
                    (<p>There are no applicants yet</p>)}
                </div>
                </>)}
            </main>
        </div>
    )
}
export default JobProfile