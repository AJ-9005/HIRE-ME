import { useState } from "react"
import { useNavigate } from "react-router-dom"
function LoginPage({ addUser, login }){
    const [newUser, setnewUser] = useState(false)
    const navigate = useNavigate()
    const [formdata, setformdata] = useState({
        urname: "",
        contactno: "",
        email:"",
        role: "Candidate",
        username: "",
        password: "",
    })
    const [passconfirm, setpassconfirm] = useState("");
    const handleChange = (e) => {
        const { name, value } = e.target;
        if(name == "confpassword"){
            setpassconfirm(value)
            return
        }
        setformdata((prev) => ({
            ...prev, [name]: value,}))
    }
    const handleRegister = (e) => {
        e.preventDefault()
        if(formdata.contactno.length != 10){
            alert("Please enter a valid phone no!")
            return
        }
        if(passconfirm != formdata.password){
            alert("Confirmed password should be the same as initial password!")
            return
        }
        if(newUser){
            // addUser(formdata)
            // setnewUser(false)
            if(formdata.role == "Employer"){
                navigate("/detailsEntry", {state: {basicInfo: formdata}})
            }
            else{
                navigate("/detailsEntry", {state: {basicInfo: formdata}})
            }
        }
        else{
            console.log("Logging in....")
        }
    }
    function handleLogin(e){
        e.preventDefault()
        const eusername = formdata.username;
        const epassword = formdata.password;
        login(eusername, epassword)
    }
    function roleAssigner(value){
        setformdata((prev) => ({...prev, role: value}))
    }
    return(
        <div className="bg-background font-body-md text-on-background min-h-screen flex flex-col">
            <main className="flex-grow flex items-center justify-center px-margin-mobile md:px-margin-desktop py-stack-xl">
                <div className="w-full max-w-5xl flex flex-col md:flex-row bg-surface-container-lowest rounded-xl overflow-hidden shadow-2xl border border-surface-container">
                    <div className="hidden md:flex md:w-1/2 relative bg-primary p-stack-xl flex-col justify-between overflow-hidden">
                        <div className="z-0">
                        <span className="text-2xl font-black text-primary-fixed italic tracking-tight">Hire me</span>
                        </div>
                        <div className="z-10 mb-stack-lg">
                        <h1 className="text-4xl font-bold text-white mb-stack-sm">The Executive Suite for Global Talent.</h1>
                        <p className="text-lg text-primary-fixed-dim opacity-90 max-w-xs">Access a curated network of premier roles and elite professionals.</p>
                        </div>
                        <div className="absolute inset-0 z-0 bg-[url('https://images.unsplash.com/photo-1497366216548-37526070297c')] bg-cover opacity-20"></div>
                    </div>
                {!newUser &&(
                    <>
                    <div className="w-full md:w-1/2 p-8 md:p-16 flex flex-col justify-center">
                        <div className="mb-stack-md text-center md:text-left">
                            <h2 className="text-3xl font-bold text-primary mb-2">Welcome Back</h2>
                            <p className="text-on-surface-variant">Sign in to your professional account</p>
                        </div>
                    <form action="" method="POST" className="space-y-stack-md" autoComplete="off" onSubmit={handleLogin}>
                        <div>
                            <label for="username" className="block text-sm font-bold text-on-surface-variant mb-2 uppercase">Username:</label>
                            <input type="text" id="username" name="username" onChange={handleChange} className="w-full px-4 py-3 rounded-xl border border-outline-variant bg-surface-container-low focus:ring-2 focus:ring-primary outline-none" required /><br />
                        </div>
                        <div>
                            <div className="flex justify-between items-center mb-2">
                                <label for="password" className="block text-sm font-bold text-on-surface-variant uppercase">Password:</label>
                            </div>
                            <input type="password" id="password" name="password" onChange={handleChange} className="w-full px-4 py-3 rounded-xl border border-outline-variant bg-surface-container-low focus:ring-2 focus:ring-primary outline-none" required /><br />
                        </div>
                        <button type="submit" className="w-full py-4 bg-primary text-white font-bold rounded-xl hover:opacity-90 transition-all uppercase tracking-widest mt-4" onClick={handleLogin}>Login</button>
                    </form>
                    <p style={{textAlign:"center"}}>Don't have an account? <span id="registerbutton" onClick={() => setnewUser(true)}>Sign-Up</span></p>
                    </div>
                </>)}
                {newUser && (
                    <>
                    <div className="w-full md:w-1/2 p-8 md:p-16 flex flex-col justify-center">
                    <div classname="p-stack-lg md:p-stack-xl flex flex-col">
                        <div className="mb-stack-md" >
                            <h2 className="font-headline-md text-headline-md text-primary mb-stack-xs text-center md:text-left">Create Account</h2>
                            <p className="font-body-md text-body-md text-on-surface-variant text-center md:text-left">Start your journey today</p>
                            <div className="flex p-1 bg-surface-container rounded-lg mb-stack-md w-full">
                                <div className={`flex-1 py-3 text-label-md rounded-md shadow-sm transition-all text-center cursor-pointer ${formdata.role === "Candidate"? "bg-primary text-white shadow-inner": "bg-surface-container-low text-primary hover:bg-surface-container"}`} onClick={() => roleAssigner("Candidate")}>Candidate</div>
                                <div className={`flex-1 py-3 text-label-md rounded-md shadow-sm transition-all text-center cursor-pointer ${formdata.role === "Employer"? "bg-primary text-white shadow-inner": "bg-surface-container-low text-primary hover:bg-surface-container"}`} onClick={() => roleAssigner("Employer")}>Employer</div>
                            </div>
                            <form action="" method="POST" className="space-y-stack-sm flex-grow" onSubmit={handleRegister} autoComplete="off">
                                <div className="space-y-1">
                                    <label for="urname" className="form-label">Your Name</label>
                                    <input type="text" id="urname" name="urname" onChange={handleChange} className="form-input" required /><br />
                                </div>
                                <div className="space-y-1">
                                    <label for="contactno" className="form-label">Contact No</label>
                                    <input type="number" id="contactno" name="contactno" onChange={handleChange} placeholder="10-Digit Indian Phone No +91" className="form-input" required /><br />
                                </div>
                                <div className="space-y-1">
                                    <label className="form-label" for="contactno">E-mail ID</label>
                                    <input type="email" id="contactno" name="email" onChange={handleChange} className="form-input" required /><br />
                                </div>
                                <div className="space-y-1">
                                    <label for="username" className="form-label">Username</label>
                                    <input className="form-input" type="text" id="username" name="username" onChange={handleChange} required /><br />
                                </div>
                                <div className="space-y-1">
                                    <label for="password" className="form-label">Password</label>
                                    <input type="password" id="password" name="password" onChange={handleChange} className="form-input" required /><br />
                                </div>
                                <div className="space-y-1">
                                    <label className="form-label" for="password">Confirm Password</label>
                                    <input className="form-input" type="password" name="confpassword" onChange={handleChange} required /><br />
                                </div>
                                <button type="submit" className="w-full py-4 bg-primary text-white font-bold rounded-xl hover:opacity-90 transition-all uppercase tracking-widest mt-4">Register</button>
                                <p style={{textAlign:"center"}}>Already have an account? <span id="registerbutton" onClick={() => setnewUser(false)}>Sign-In</span></p>
                            </form>
                        </div>
                    </div>
                    </div>
                    </>
                )}
                </div>
            </main>
        </div>
    )
}
export default LoginPage