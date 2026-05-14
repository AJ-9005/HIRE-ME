import { useNavigate } from "react-router-dom"
function Creations({ jobs, currentUser}){
    let yourjobs = []
    if(currentUser?.role == "Employer"){
        yourjobs = jobs.filter(job => job.postedby == currentUser?.username)
    }
    else{
        yourjobs = jobs.filter(job => job.applicants.some(applicant => applicant?.id == currentUser?.id))
    }
    const navigate = useNavigate()
    return(
        <div className="full">
            <div className="info-div">
                <div className="info-block">
                    <span className="info-label">Applied</span>
                    <span className="info-number pending">21</span>
                </div>
                <div className="info-block">
                    <span className="info-label">Accepted</span>
                    <span className="info-number accepted">3</span>
                </div>
                <div className="info-block">
                    <span className="info-label">Rejected</span>
                    <span className="info-number rejected">2</span>
                </div>
            </div>
            <div className="creationsinterface">
                <div className="list">
                    {yourjobs && (
                        yourjobs.map((job, index) => (
                            <div key={job.id || index} className="listbox" onClick={() => navigate(`/jobdetails/${job.id}`)}>
                            <h2>{job.jobrole}</h2>
                            <h3>{job.company}</h3>
                            <div className="badges">
                                <p>{job.workexp}</p>
                                <p>{job.salary}</p>
                                <p>{job.jobtype}</p>
                            </div>
                        </div>
                    ))
                    )}
                    {(yourjobs.length == 0) && (<p>You havent applied anywhere.</p>)}
                </div>
                {currentUser?.role=="Employer" && (<button className="btn" onClick={() => navigate("/jobcreator")}>Create a Job</button>)}
            </div>
        </div>
    )
}
export default Creations