import { useState } from "react"
import { useNavigate, useParams } from "react-router-dom"
function JobProfile({ jobs, currentUser, applytojob }){
    const { jobID } = useParams()
    const navigate = useNavigate()
    const job = jobs?.find(j => j.id == jobID)
    const [view, setview] = useState(false)
    const isOwner = currentUser?.username == job?.postedby
    const status = currentUser?.selected?.[jobID]
    const statusText = status == true ? "Approved":status == false? "Rejected": "Pending"
    const [hasApplied, sethasApplied] = useState(status?status:false)
    function handleApply(){
        if(!currentUser){
            alert("Please login to apply!")
            navigate("/login")
        }
        applytojob(job.id, currentUser)
        sethasApplied(true)
        alert("Applied succesfully!")
    }
    return(
        <div className="full center-items">
            <h1 className="heading">Job Details</h1>
            <div className="details">
                <div className="detail">
                    <span>Title: </span>
                    <p>{job?.jobrole}</p>
                </div>
                <div className="detail">
                    <span>Company: </span>
                    <p>{job?.company}</p>
                </div>
                <div className="detail">
                    <span>Salary: </span>
                    <p>{job?.salary}</p>
                </div>
                <div className="detail">
                    <span>Location: </span>
                    <p>{job?.location}</p>
                </div>
                <div className="detail">
                    <span>Type: </span>
                    <p>{job?.jobtype}</p>
                </div>
                <div className="detail">
                    <span>Highest required qualification: </span>
                    <p>{job?.education}</p>
                </div>
                <div className="detail">
                    <span>Skills: </span>
                    <span style={{fontWeight:"lighter", textTransform:"capitalize"}}>
                    {Array.isArray(job?.skills)
                        ? job.skills.join(", ")
                        : "No skills listed"}
                    </span>
                </div>
                <div className="detail">
                    <span>Prior work expereince required: </span>
                    <p>{job?.workexp}</p>
                </div>
                <div className="detail">
                    <span>Description: </span>
                    <p>{job?.description}</p>
                </div>
                {isOwner && !view && (
                    <div className="flex" style={{justifyContent:"center"}}>
                        <button className="btn" onClick={() => setview(true)}>View Applications ({job.applicants.length})</button>
                        <button className="btn" onClick={() => navigate("/editjob", { state: {job: job} })}>Edit Job</button>
                    </div>
                )}
                {view && (<>
                <div className="flex" style={{justifyContent:"center"}}>
                    <button className="btn" onClick={() => setview(false)}>Hide Applications ({job.applicants.length})</button>
                    <button className="btn" onClick={() => navigate("/editjob", { state: {job: job} })}>Edit Job</button>
                </div>
                    <div className="list">
                    {job.applicants.length > 0?(job.applicants.map((appli, index) => (
                        <div className="listbox" key={index} onClick={() => navigate(`/myprofile/${appli.id}`, {state:{viewingjobid: jobID}})}>
                            <h2>{appli.urname}</h2>
                        </div>
                    ))):
                    (<p>There are no applicants yet</p>)}
                </div>
                </>)}
                {currentUser?.role == "Candidate" &&(<>
                    <button className="btn" onClick={handleApply} disabled={hasApplied} style={{backgroundColor:hasApplied?"gray":"", alignSelf:"center"}}>{hasApplied ? "Applied":"Apply Now!"}</button>
                {hasApplied &&(
                    <span style={{textAlign:"center"}}>Status: <span style={{color: status==true?"green":status==false?"red":"orange", marginTop:"15px"}}>{statusText}</span></span>
                )}</>)}
            </div>
        </div>
    )
}
export default JobProfile