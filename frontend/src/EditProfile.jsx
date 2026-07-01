import { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom'
function EditProfile(){
    const location = useLocation()
    const [updatedUser, setUpdatedUser] = useState(location.state?.editUser)
    const navigate = useNavigate()
    function handleChange(e){
        const {name, value} = e.target;
        setUpdatedUser((prev) => ({...prev, [name]: value}))
    }
    function handleProceed(e){
        e.preventDefault()
        if(updatedUser.contactno.toString().length != 10){
            alert("Please enter a valid mobile no!")
            return
        }
        navigate("/editdetails", { state: { draftUser: updatedUser }})
    }
    return(
        <div className='bg-background font-body-md text-on-background min-h-screen flex flex-col'>
        <main className='flex-grow flex items-center justify-center px-margin-mobile md:px-margin-desktop py-stack-xl'>
        <div className='w-full max-w-5xl flex flex-col md:flex-row bg-surface-container-lowest rounded-xl overflow-hidden shadow-2xl border border-surface-container'>
        <div className="w-full md:w-full p-8 md:p-16 flex flex-col justify-center">
            <div className="p-stack-lg md:p-stack-xl flex flex-col">
                <div className="mb-stack-md" >
                    <h2 className="font-headline-md text-headline-md text-primary mb-stack-xs text-center md:text-left">Edit Basic Details</h2>
                    <form action="" method="POST" className="space-y-stack-sm flex-grow" onSubmit={handleProceed} autoComplete='off'>
                        <div className="space-y-1">
                            <label className='form-label' for="urname">Your Name</label>
                            <input className='form-input' type="text" id="urname" name="urname" onChange={handleChange} value={updatedUser.urname} required /><br />
                        </div>
                        <div className="space-y-1">
                            <label className='form-label' for="contactno">Contact No</label>
                            <input className='form-input' type="number" id="contactno" name="contactno" onChange={handleChange} placeholder="10-Digit Indian Phone No +91" value={updatedUser.contactno} required /><br />
                        </div>
                        <div className="space-y-1">
                            <label className='form-label' for="email">E-mail ID</label>
                            <input className='form-input' type="email" id="contactno" name="email" onChange={handleChange} value={updatedUser.email} required /><br />
                        </div>
                        <div className="space-y-1">
                            <label className='form-label' for="username">Username</label>
                            <input className='form-input' type="text" id="username" name="username" onChange={handleChange} value={updatedUser.username} required/><br />
                        </div>
                        <button type="submit" className="w-full py-4 bg-primary text-white font-bold rounded-xl hover:opacity-90 transition-all uppercase tracking-widest mt-4">Proceed</button>
                    </form>
                </div>
            </div>
        </div>
        </div>
        </main>
        </div>
    )
}
export default EditProfile