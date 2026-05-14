import { useState } from 'react';
import { useNavigate } from 'react-router-dom'
function EditProfile({ currentUser }){
    const [updatedUser, setUpdatedUser] = useState({...currentUser})
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
        <div className="full center-items">
            <div className="login-div">
                <form action="" method="POST" className="loginform" onSubmit={handleProceed} autoComplete='off'>
                    <label for="urname">Your Name</label>
                    <input type="text" id="urname" name="urname" onChange={handleChange} value={updatedUser.urname} required /><br />
                    <label for="contactno">Contact No</label>
                    <input type="number" id="contactno" name="contactno" onChange={handleChange} placeholder="10-Digit Indian Phone No +91" value={updatedUser.contactno} required /><br />
                    <label for="email">E-mail ID</label>
                    <input type="email" id="contactno" name="email" onChange={handleChange} value={updatedUser.email} required /><br />
                    <label for="username">Username</label>
                    <input type="text" id="username" name="username" onChange={handleChange} value={updatedUser.username} required/><br />
                    <button type="submit" className="btn">Proceed</button>
                </form>
            </div>
        </div>
    )
}
export default EditProfile