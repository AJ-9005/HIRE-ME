import { useNavigate } from "react-router-dom"
function Navbar({isLoggedIn, currentUser}){
    const navigate = useNavigate()
    return(
        <div className="navbar">
            <p className="font-['Rockwell'] text-xl font-medium tracking-wide transition-all">Hire-me</p>
            <div className="flex items-center gap-6 sm:gap-8 mt-2 sm:mt-0">
                <p className="font-['Rockwell'] text-base md:text-xl cursor-pointer hover:underline transition-all" onClick={() => navigate("/")}>Home</p>
                {currentUser?.role=="Candidate" && (
                    <p className="font-['Rockwell'] text-base md:text-xl cursor-pointer hover:underline transition-all" onClick={() => navigate("/foryoupage")}>For You</p>
                )}
                <p className="font-['Rockwell'] text-base md:text-xl cursor-pointer hover:underline transition-all" onClick={() => navigate("/jobs")}>Browse Jobs</p>
                {isLoggedIn?(
                    <p className="font-['Rockwell'] text-base md:text-xl cursor-pointer hover:underline transition-all" onClick={() => navigate(`/myprofile/${currentUser.id}`)}>My Dashboard</p>
                ):(
                    <p className="font-['Rockwell'] text-base md:text-xl cursor-pointer hover:underline transition-all" onClick={() => navigate("/login")}>Sign-In</p>
                )
                }
            </div>
        </div>
    )
}
export default Navbar