import { useNavigate } from "react-router-dom"
function Navbar({isLoggedIn, currentUser}){
    const navigate = useNavigate()
    return(
        <div className="navbar">
                <p onClick={() => navigate("/")}>Home</p>
            {currentUser?.role=="Candidate" && (
                <p onClick={() => navigate("/foryoupage")}>For You</p>
            )}
            <p onClick={() => navigate("/jobs")}>Browse Jobs</p>
            {isLoggedIn?(
                <p onClick={() => navigate(`/myprofile/${currentUser.id}`)}>My Dashboard</p>
            ):(
                <p onClick={() => navigate("/login")}>Sign-In</p>
            )
            }
        </div>
    )
}
export default Navbar