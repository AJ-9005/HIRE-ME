import { useState, useEffect } from 'react'
import { Routes, Route, useNavigate } from 'react-router-dom'
import React from 'react'
import Navbar from './Navbar'
import Landing from './Landing'
import LoginPage from './LoginPage'
import JobListings from './JobListings'
import Creations from './Creations'
import MyProfile from './MyProfile'
import JobProfile from './JobProfile'
import DetailsEntry from './DetailsEntry'
import JobCreator from './JobCreator'
import EditProfile from './EditProfile'
import EditDetails from './EditDetails'
import EditJob from './EditJob'
import { API_URL } from './config/api'
import ForYouPage from './ForYouPage'

function App() {
  const navigate = useNavigate()
  const [isLoggedIn, setLogIn] = useState(false)
  const [hasApplied, sethasApplied] = useState(false)
  const [currentUser, setCurrentUser] = useState(null)
  
  const [users, setUsers] = useState({})
  const [jobs, setjobs] = useState([])


  // useEffect(() => {
  //   const fetchData = async () => {
  //     try {
  //       const response = await fetch(`${API_URL}/api/getJobs?page=1`);
  //       const data = await response.json();
  //       setUsers(data.users || {});
  //       setjobs(data.jobs || []);
  //     } catch (err) {
  //       console.error("Failed to load database. Is the server running?", err);
  //     }
  //   };
  //   fetchData();
  // }, []);

  const addUser = async (userObject, resumefile) => {
    const finalUser = (userObject.role === "Candidate")
      ? { ...userObject, selected: {} }
      : { ...userObject };
    const formdata = new FormData()
    if(resumefile){
      formdata.append('resume', resumefile)
    }
    formdata.append('userData', JSON.stringify(finalUser))
    try {
      const response = await fetch(`${API_URL}/api/signup`, {
        credentials: 'include',
        method: 'POST',
        body: formdata,
      });
      const data = await response.json();
      if (response.ok) {
        const saveduser = data.user
        setUsers((prev) => ({ ...prev, [saveduser.username]: saveduser }));
        setCurrentUser(saveduser);
        setLogIn(true);
        navigate(`/myprofile/${saveduser.id}`);
      } else {
        alert(data.message);
      }
    } catch (err) {
      console.error("Signup error:", err);
    }
  };

  async function login(username, password) {
    const userObject = { 
      username: username,
      password: password
    }
    try{
      const response = await fetch(`${API_URL}/api/login`, {
        method: 'POST',
        credentials: 'include',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(userObject)
      })
      const data = await response.json()
      if(response.ok){
        setCurrentUser(data.user);
        setLogIn(true)
        navigate(`/myprofile/${data.user.id}`);
      }
      else if(response.status == 401){
        alert(data.message)
        navigate("/login")
      }
      else{
        const err = await response.json();
        alert(err.message);
        return;
      }
    }
    catch(err){
      console.error(err)
    }
  }

  async function logout() {
    const response = await fetch(`${API_URL}/logout`, {
      method: 'POST',
      credentials: 'include'
    })
    if(response.ok){
      setLogIn(false);
      setCurrentUser(null);
      navigate("/");
      const data = await response.json()
      alert(data.message);
    }
  }

  const addJob = async (newJob) => {
    const jobwithUser = {
      ...newJob,
      applicants: [],
    };

    try {
      const response = await fetch(`${API_URL}/api/add-job`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(jobwithUser),
        credentials: "include"
      });
      if (response.ok) {
        setjobs((prev) => [...prev, jobwithUser]);
        navigate("/jobs");
      }
    } catch (err) {
      console.error("Error adding job:", err);
    }
  };

  async function handleUserEdit(updatedUser, resumeFile){
    try{
      const formData = new FormData()
      formData.append("userData", JSON.stringify(updatedUser))
      if(resumeFile){
        formData.append("resume", resumeFile)
      }
      const response = await fetch(`${API_URL}/api/edit-user`, {
        method: 'PUT',
        body: formData,
        credentials: "include"
      })
      if(response.ok){
        const data = await response.json()
        alert("Profile Updated Succesfully!")
        navigate(`/myprofile/${currentUser.id}`)
      }
      else{
        const error = await response.json()
        alert(error.message || "Update failed!")
      }
    }
    catch(err){
      console.error("Edit Error: ", err)
    }
  }

  async function handleJobEdit(jobBody){
    try{
      const response = await fetch(`${API_URL}/api/edit-job?jobid=${jobBody._id}`, 
        {
          method: 'PUT',
          headers: {'Content-Type': 'application/json'},
          body: JSON.stringify(jobBody),
          credentials: "include"
    })
      if(response.ok){
        const data = await response.json()
        alert("Job details updated succesfully!")
        navigate(`/jobdetails/${jobBody._id}`) 
      }
      else{
        const err = await response.json()
        alert(err.message || "Update failed!")
      }
    }
    catch(err){
      console.error(err)
      alert("Update could not be done!")
    }
  }

  async function cityAutoComplete(queryString){
    try{
      const response = await fetch(`${API_URL}/api/cityAutoComplete?q=${queryString}`)
      const data = await response.json()
      if(response.ok){
        return data.cities.map(
          city => `${city.city}, ${city.admin_name}`
        );
      }
      else{
        alert(data.message)
      }
    }
    catch(err){
      alert("Some problem occured!")
      console.error(err)
      return []
    }
  }

  return (
    <>
      <Navbar isLoggedIn={isLoggedIn} currentUser={currentUser} />
      <Routes>
        <Route path="/" element={<Landing isLoggedIn={isLoggedIn} currentUser={currentUser} />} />
        <Route path="/login" element={<LoginPage addUser={addUser} login={login} />} />
        <Route path="/jobs" element={<JobListings />} />
        <Route path="/myprofile/:id" element={<MyProfile users={users} logout={logout} loggeduser={currentUser} jobs={jobs}/>} />
        <Route path="/jobdetails/:jobID" element={<JobProfile jobs={jobs} currentUser={currentUser} />} />
        <Route path="/detailsEntry" element={<DetailsEntry addUser={addUser} cityAutoComplete={cityAutoComplete} />} />
        <Route path="/jobcreator" element={<JobCreator cityAutoComplete={cityAutoComplete} addJob={addJob} cityAutoComplete={cityAutoComplete} />} />
        <Route path="/editprofile" element={< EditProfile currentUser={currentUser} />} />
        <Route path="/editdetails" element={< EditDetails cityAutoComplete={cityAutoComplete} handleUserEdit={handleUserEdit} cityAutoComplete={cityAutoComplete}/>} />
        <Route path="/editjob" element={<EditJob handleJobEdit={handleJobEdit} cityAutoComplete={cityAutoComplete} />} />
        <Route path="/foryoupage" element={<ForYouPage/>} />
      </Routes>
    </>
  );
}

export default App;