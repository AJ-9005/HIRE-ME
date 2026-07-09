import { useEffect, useState } from "react"
import { useLocation, useParams } from "react-router-dom"
import { useNavigate } from "react-router-dom"
import { API_URL } from "./config/api"
import profilePhoto from './assets/photo.jpeg'

function MyProfile({ users, logout, loggeduser, updateSelection, jobs }){
    const { id } = useParams()
    const navigate = useNavigate()
    const location = useLocation()
    const jobid = location.state?.viewingjobid
    const [owner, setOwner] = useState(false)
    const [currentUser, setCurrentUser] = useState(null)
    const[yourjobs, setyourjobs] = useState([])
    const[status, setStatus] = useState(0)
    useEffect(() => {
        async function fetchUser(){
            try{
                const response = await fetch(`${API_URL}/myprofile?profileID=${id}`, {
                    method: 'GET',
                    credentials: "include"
                })
                const data = await response.json()
                if(response.ok){
                    const user = data.user
                    setCurrentUser(user)
                    setyourjobs(data.jobs)
                    setOwner(data.owner)
                    if (jobid){
                        setStatus(user.selected[jobid])
                    }
                }
                else{
                    console.log(data.message)
                }
            }
            catch(err){
                console.error(err)
            }
        }
        fetchUser();
    }, [id])
    async function handleDecision(status){
        if(!jobid){
            alert("No job found")
            return
        }
        try {
            const response = await fetch(`${API_URL}/update-selection`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                credentials: "include",
                body: JSON.stringify({ 
                    applicantID: currentUser._id, 
                    status: status,
                    jobid: jobid
                })
            });
            const data = await response.json()
            if (response.ok || response.status == 404) {
                alert(data.message)
                setCurrentUser((prev) => ({...prev, selected: {...prev.selected, [jobid]: status}}))
            }
            else{
                alert("Some problem occured!")
                setStatus(0)
            }
        } catch (err) {
            alert("Server is down! Decision not saved.");
            console.log(err)
            setStatus(0)
        }
        }
    return(
        <div className="bg-background text-on-background min-h-screen">
            <div id="flex h-screen overflow-hidden">
                {currentUser?.role == "Employer" && (<>
                <main className="flex-1 overflow-y-auto bg-background p-margin-desktop">
                    <div className="max-w-5xl mx-auto space-y-stack-xl">
                        <section className="userprofile">
                            <div className="absolute top-0 left-0 w-2 h-full bg-secondary"></div>
                            <div className="flex flex-col md:flex-row gap-stack-lg">
                                <div className="flex-1 space-y-stack-md">
                                    <div className="flex justify-between items-start">
                                        <div className="flex flex-col">
                                            <h1 className="font-display-lg text-display-lg text-primary">{currentUser?.urname}</h1>
                                        </div>
                                        <div className="flex items-center gap-stack-sm">
                                            {owner && (<>
                                                <button className="bg-primary text-on-primary px-stack-md py-stack-xs rounded-lg font-label-md hover:opacity-90 transition-all flex items-center justify-center gap-stack-xs" onClick={() => navigate("/editprofile", {state: {editUser: currentUser}})}>
                                                    <span className="material-symbols-outlined text-[18px]">edit</span>
                                                    Edit Profile
                                                </button>
                                                <button className="flex items-center gap-stack-xs font-label-md text-error hover:bg-error-container/10 px-stack-sm py-stack-xs rounded-lg transition-colors ml-unit" onClick={logout}>
                                                    <span className="material-symbols-outlined text-[20px]">logout</span>
                                                    <span>Logout</span>
                                                </button>
                                            </>)}
                                        </div>
                                    </div>
                                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-gutter gap-y-stack-sm border-t border-outline-variant pt-stack-md">
                                        <div className="space-y-stack-xs">
                                            <p className="text-label-sm text-on-surface-variant uppercase tracking-wider">Contact number</p>
                                            <p className="font-body-md text-on-surface font-medium">{currentUser.contactno}</p>
                                        </div>
                                        <div className="space-y-stack-xs">
                                            <p className="text-label-sm text-on-surface-variant uppercase tracking-wider">Email Address</p>
                                            <p className="font-body-md text-on-surface font-medium"><a href={`mailto:${currentUser.email}`} target="_blank">{currentUser?currentUser.email:""}</a></p>
                                        </div>
                                        <div className="space-y-stack-xs">
                                            <p className="text-label-sm text-on-surface-variant uppercase tracking-wider">Name Of Organisation</p>
                                            <p className="font-body-md text-on-surface font-medium">{currentUser?.details.companyname}</p>
                                        </div>
                                        <div className="space-y-stack-xs">
                                            <p className="text-label-sm text-on-surface-variant uppercase tracking-wider">Place Of Origin</p>
                                            <p className="font-body-md text-on-surface font-medium">{currentUser?.details.origin}</p>
                                        </div>
                                        <div className="space-y-stack-xs">
                                            <p className="text-label-sm text-on-surface-variant uppercase tracking-wider">Established In</p>
                                            <p className="font-body-md text-on-surface font-medium">{currentUser.details.established}</p>
                                        </div>
                                        <div className="space-y-stack-xs">
                                            <p className="text-label-sm text-on-surface-variant uppercase tracking-wider">Website Link</p>
                                            <p className="font-body-md text-on-surface font-medium">{currentUser.details.website?(<a href={`https://${currentUser.details.website}`} target="_blank" />):"Not Available"}</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </section>
                        {owner && (
                            <section className="space-y-stack-md">
                                <div className="flex items-center justify-between">
                                    <h2 className="font-headline-md text-headline-md text-primary">My Jobs</h2>
                                </div>
                                <div className="table-div">
                                    <div className="overflow-x-auto">
                                        <table className="w-full text-left border-collapse">
                                            <thead className="bg-surface-container-low border-b border-outline-variant">
                                                <tr>
                                                    <th className="px-stack-md py-stack-md font-label-md text-label-md text-on-surface-variant">Job Details</th>
                                                    <th className="px-stack-md py-stack-md font-label-md text-label-md text-on-surface-variant">Date Posted</th>
                                                    <th className="px-stack-md py-stack-md font-label-md text-label-md text-on-surface-variant text-right">Actions</th>
                                                </tr>
                                            </thead>
                                            <tbody className="divide-y divide-outline-variant">
                                                {yourjobs.map((job) => (
                                                    <tr className="hover:bg-surface-container-lowest transition-colors group">
                                                        <td className="px-stack-md py-stack-md">
                                                            <div className="flex items-center gap-stack-sm">
                                                                <div>
                                                                    <p className="font-label-md text-label-md text-primary group-hover:text-primary-container transition-colors">{job?.jobrole}</p> 
                                                                    <p className="font-body-sm text-body-sm text-on-surface-variant">{job?.company}</p>
                                                                </div>
                                                            </div>
                                                        </td>
                                                        <td class="px-stack-md py-stack-md font-body-sm text-body-sm text-on-surface-variant">{job?.postedOn ? new Date(job.postedOn).toLocaleDateString() : "N/A"}</td>
                                                        <td className="px-stack-md py-stack-md text-right">
                                                            <button className="px-stack-md py-stack-xs rounded-lg border border-secondary text-secondary font-label-md hover:bg-secondary hover:text-white transition-all active:scale-95" onClick={() => navigate(`/jobdetails/${job._id}`)}>
                                                                View Details
                                                            </button>
                                                        </td>
                                                    </tr>
                                                ))}
                                            </tbody>
                                        </table>
                                    </div>
                                </div>
                                <div className="flex justify-center w-100" onClick={() => navigate("/jobcreator")}>
                                    <button className="hidden md:block bg-primary text-on-primary px-6 py-2 rounded-lg font-label-md hover:opacity-90 active:scale-95 transition-all">Post a job</button>
                                </div>
                            </section>
                        )}
                    </div>
                </main>
                </>)}
                {currentUser?.role == "Candidate" && (<main className="flex-1 overflow-y-auto bg-background p-margin-desktop">
                    <div className="max-w-5xl mx-auto space-y-stack-xl">
                        <section className="userprofile">
                            <div className="absolute top-0 left-0 w-2 h-full bg-secondary">
                            </div>
                            <div className="flex flex-col md:flex-row gap-stack-lg">
                                <div className="flex-1 space-y-stack-md">
                                    <div className="flex justify-between items-start">
                                        <div className="flex flex-col">
                                            <h1 className="font-display-lg text-display-lg text-primary">{currentUser?.urname}</h1>
                                        </div>
                                        <div className="flex items-center gap-stack-sm">
                                            <button className="border border-outline text-on-surface-variant px-stack-md py-stack-xs rounded-lg font-label-md hover:bg-surface-container transition-all flex items-center justify-center gap-stack-xs" onClick={() => {
                                                if(currentUser?.details?.resume?.url){
                                                    window.open(currentUser.details.resume.url, "_blank")
                                                }
                                                else{
                                                    alert("No resume uploaded!")
                                                }
                                            }}>
                                                <span className="material-symbols-outlined text-[18px]">Description</span>
                                                View Resume
                                            </button>
                                            {owner && (<>
                                                <button className="bg-primary text-on-primary px-stack-md py-stack-xs rounded-lg font-label-md hover:opacity-90 transition-all flex items-center justify-center gap-stack-xs" onClick={() => navigate("/editprofile", {state: {editUser: currentUser}})}>
                                                    <span className="material-symbols-outlined text-[18px]">edit</span>
                                                    Edit Profile
                                                </button>
                                                <button className="flex items-center gap-stack-xs font-label-md text-error hover:bg-error-container/10 px-stack-sm py-stack-xs rounded-lg transition-colors ml-unit" onClick={logout}>
                                                    <span className="material-symbols-outlined text-[20px]">logout</span>
                                                    <span>Logout</span>
                                                </button>
                                            </>)}
                                        </div>
                                    </div>
                                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-gutter gap-y-stack-sm border-t border-outline-variant pt-stack-md">
                                        <div className="space-y-stack-xs">
                                            <p className="text-label-sm text-on-surface-variant uppercase tracking-wider">Contact number</p>
                                            <p className="font-body-md text-on-surface font-medium">{currentUser.contactno}</p>
                                        </div>
                                        <div className="space-y-stack-xs">
                                            <p className="text-label-sm text-on-surface-variant uppercase tracking-wider">Email Address</p>
                                            <p className="font-body-md text-on-surface font-medium"><a href={`mailto:${currentUser.email}`} target="_blank">{currentUser?currentUser.email:""}</a></p>
                                        </div>
                                        <div className="space-y-stack-xs">
                                            <p className="text-label-sm text-on-surface-variant uppercase tracking-wider">Date Of Birth</p>
                                            <p className="font-body-md text-on-surface font-medium">{currentUser?.details?.dob? new Date(currentUser.details.dob).toLocaleDateString('en-GB') : ""}</p>
                                        </div>
                                        <div className="space-y-stack-xs">
                                            <p className="text-label-sm text-on-surface-variant uppercase tracking-wider">Marital Status</p>
                                            <p className="font-body-md text-on-surface font-medium">{currentUser?.details?.maritalstatus}</p>
                                        </div>
                                        <div className="space-y-stack-xs">
                                            <p className="text-label-sm text-on-surface-variant uppercase tracking-wider">Highest Education</p>
                                            <p className="font-body-md text-on-surface font-medium">{currentUser?.details?.qualification}</p>
                                        </div>
                                        <div className="space-y-stack-xs">
                                            <p className="text-label-sm text-on-surface-variant uppercase tracking-wider">Work Expereince</p>
                                            <p className="font-body-md text-on-surface font-medium">{currentUser?.details?.expereince}</p>
                                        </div>
                                    </div>
                                    <div className="space-y-stack-sm pt-unit">
                                        <p className="text-label-sm text-on-surface-variant uppercase tracking-wider">Top Skills</p>
                                        <div className="flex flex-wrap gap-unit">
                                            {currentUser?.details?.skillset?.map((skill) => (
                                                <span className="bg-surface-container-high px-stack-sm py-1 rounded text-label-sm text-on-surface">{skill}</span>
                                            ))}
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </section>
                        {loggeduser?.role == "Employer" && !owner &&(
                            <div className="decision">
                                <button className={`btn-apply ${currentUser?.selected?.[jobid] === 2 ? "btn-apply-disabled" : ""}`} onClick={() => {setStatus(2); handleDecision(2)}} disabled={currentUser?.selected?.[jobid] === 2}>Approve</button>
                                <button className={`btn-apply ${currentUser?.selected?.[jobid] === 3 ? "btn-apply-disabled" : ""}`} onClick={() => {setStatus(3); handleDecision(3)}} disabled={currentUser?.selected?.[jobid] === 3}>Reject</button>
                            </div>
                        )}
                        {owner && (
                            <section className="space-y-stack-md">
                                <div className="flex items-center justify-between">
                                    <h2 className="font-headline-md text-headline-md text-primary">My Applications</h2>
                                </div>
                                <div className="grid grid-cols-2 md:grid-cols-4 gap-gutter">
                                    <div className="bg-surface-container-low p-stack-md rounded-xl text-center space-y-unit border-l-4 border-secondary">
                                        <p className="font-label-sm text-label-sm uppercase tracking-widest text-on-surface-variant">Total</p>
                                        <p className="font-headline-sm text-headline-sm text-primary">{yourjobs.length}</p>
                                    </div>
                                    <div className="bg-surface-container-low p-stack-md rounded-xl text-center space-y-unit border-l-4 border-[#00ff00]">
                                        <p className="font-label-sm text-label-sm uppercase tracking-widest text-on-surface-variant">Accepted</p>
                                        <p className="font-headline-sm text-headline-sm text-primary">{Object?.entries(currentUser?.selected || {}).filter(([jobid, status]) => status == 2).length}</p>
                                    </div>
                                    <div className="bg-surface-container-low p-stack-md rounded-xl text-center space-y-unit border-l-4 border-[#ffff00]">
                                        <p className="font-label-sm text-label-sm uppercase tracking-widest text-on-surface-variant">Pending</p>
                                        <p className="font-headline-sm text-headline-sm text-primary">{Object?.entries(currentUser?.selected || {}).filter(([jobid, status]) => status == 1).length}</p>
                                    </div>
                                    <div className="bg-surface-container-low p-stack-md rounded-xl text-center space-y-unit border-l-4 border-[red]">
                                        <p className="font-label-sm text-label-sm uppercase tracking-widest text-on-surface-variant">Rejected</p>
                                        <p className="font-headline-sm text-headline-sm text-primary">{Object?.entries(currentUser?.selected || {}).filter(([jobid, status]) => status == 3).length}</p>
                                    </div>
                                </div>
                                <div className="table-div">
                                    <div className="overflow-x-auto">
                                        <table className="w-full text-left border-collapse">
                                            <thead className="bg-surface-container-low border-b border-outline-variant">
                                                <tr>
                                                    <th className="px-stack-md py-stack-md font-label-md text-label-md text-on-surface-variant">Job Details</th>
                                                    {/* <th className="px-stack-md py-stack-md font-label-md text-label-md text-on-surface-variant">Date Applied</th> */}
                                                    <th className="px-stack-md py-stack-md font-label-md text-label-md text-on-surface-variant">Status</th>
                                                    <th className="px-stack-md py-stack-md font-label-md text-label-md text-on-surface-variant text-right">Actions</th>
                                                </tr>
                                            </thead>
                                            <tbody className="divide-y divide-outline-variant">
                                                {yourjobs.map((job) => (
                                                <tr className="hover:bg-surface-container-lowest transition-colors group">
                                                    <td className="px-stack-md py-stack-md">
                                                        <div className="flex items-center gap-stack-sm">
                                                            <div>
                                                                <p className="font-label-md text-label-md text-primary group-hover:text-primary-container transition-colors">{job?.jobrole}</p> 
                                                                <p className="font-body-sm text-body-sm text-on-surface-variant">{job?.company}</p>
                                                            </div>
                                                        </div>
                                                    </td>
                                                    <td className="px-stack-md py-stack-md">
                                                        {currentUser?.selected?.[job._id] == 2 ? (<span className="inline-flex items-center px-stack-sm py-1 rounded-full text-label-sm font-label-sm bg-[lime]/60 text-[green]">Accepted</span>)
                                                        : currentUser?.selected?.[job._id] == 3? (<span className="inline-flex items-center px-stack-sm py-1 rounded-full text-label-sm font-label-sm bg-error-container text-on-error-container">Rejected</span>)
                                                        : (<span className="inline-flex items-center px-stack-sm py-1 rounded-full text-label-sm font-label-sm bg-secondary-container text-on-secondary-container">Pending</span>)}
                                                    </td>
                                                    <td className="px-stack-md py-stack-md text-right">
                                                        <button className="px-stack-md py-stack-xs rounded-lg border border-secondary text-secondary font-label-md hover:bg-secondary hover:text-white transition-all active:scale-95" onClick={() => navigate(`/jobdetails/${job._id}`)}>
                                                            View Details
                                                        </button>
                                                    </td>
                                                </tr>
                                                ))}
                                            </tbody>
                                        </table>
                                    </div>
                                </div>
                            </section>
                        )}
                    </div>
                </main>)}
            </div>
        </div>
    )
}
export default MyProfile