import { useEffect, useRef, useState } from "react";
import { API_URL } from "./config/api";
import { useNavigate } from "react-router-dom";

function FeaturedJobCard({ job }) {
  const navigate = useNavigate()
  return (
    <div className="glass-card flex-shrink-0 w-[400px] p-8 rounded-2xl snap-start cursor-pointer group">
      <div className="flex justify-between items-start mb-6">
        {/* <div className="w-16 h-16 rounded-xl bg-white p-3 shadow-sm border border-outline-variant/30">
          <img alt={job.logoAlt} className="w-full h-full object-contain" src={job.logo} />
        </div> */}
      </div>
      <h3 className="font-headline-md text-headline-md text-primary mb-1 group-hover:text-primary-container transition-colors">
        {job?.jobrole}
      </h3>
      <p className="font-body-md text-body-md text-on-surface-variant mb-6">
        {job.company} • {job.location}
      </p>
      <div className="flex items-center justify-between pt-6 border-t border-outline-variant/20">
        <span className="font-label-bold text-label-bold text-primary">₹{job.salary}/month</span>
        <button className="bg-primary text-white px-5 py-2 rounded-lg font-label-bold text-label-bold hover:bg-primary-container transition-all active:scale-95 shadow-lg shadow-primary/20" onClick={() => navigate(`/jobdetails/${job._id}`)}>
          View role
        </button>
      </div>
    </div>
  );
}

function HistoryJobCard({ job }) {
  const navigate = useNavigate()
  return (
    <div className="glass-card p-6 rounded-2xl flex flex-col justify-between border-b-4 border-b-primary/10">
      <div>
        <div className="flex items-center gap-4 mb-4">
          {/* <div className="w-12 h-12 rounded-lg bg-white p-2 border border-outline-variant/20">
            <img alt={job.logoAlt} className="w-full h-full object-contain" src={job.logo} />
          </div> */}
          <div>
            <h4 className="font-headline-md text-[20px] text-primary">{job.jobrole}</h4>
            <p className="text-label-bold text-on-surface-variant">
              {job.company} • {job.location}
            </p>
          </div>
        </div>
      </div>
      <div className="flex justify-between items-center">
        <span className="text-body-md font-bold text-primary">Posted on: {new Date(job.postedOn).toLocaleDateString()}</span>
        <a className="text-primary font-label-bold hover:underline" onClick={() => navigate(`/jobdetails/${job._id}`)} href="#">
          View Role
        </a>
      </div>
    </div>
  );
}



export default function ForYouPage() {
  const [featuredJobs, setFeatured] = useState([])
  const [historyJobs, setHistory] = useState([])
  const [user, setUser] = useState(null)
  const navigate = useNavigate()
  async function fetchFeaturedJobs(){
    try{
      const response = await fetch(`${API_URL}/getFeaturedJobs`, {
        method: 'GET',
        credentials: "include"
      })
      const data = await response.json()
      if(response.ok){
        setFeatured(data.featuredJobs)
        setHistory(data.historyJobs)
        setUser(data.user)
      }
      else if(response.status == 401){
        alert("Please login first!")
        navigate("/login")
      }
    }
    catch(err){
      console.log(err)
    }
  }
  useEffect(() => {fetchFeaturedJobs()}, [])
  const [fabHidden, setFabHidden] = useState(false);
  const lastScrollY = useRef(0);

  useEffect(() => {
    lastScrollY.current = window.scrollY;

    const handleScroll = () => {
      setFabHidden(window.scrollY > lastScrollY.current);
      lastScrollY.current = window.scrollY;
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div className="bg-background selection:bg-primary-fixed selection:text-primary">
      <main className="pt-32 pb-24 px-container-padding max-w-screen-2xl mx-auto">
        {/* Header Section */}
        <header className="mb-16 relative overflow-hidden p-12 rounded-3xl bg-surface-container-low/50 border border-white/40">
          <div className="relative z-10 max-w-3xl">
            <span className="inline-flex items-center px-4 py-1.5 rounded-full bg-primary-fixed text-on-primary-fixed font-label-bold text-label-bold mb-6">
              <span
                className="material-symbols-outlined text-[16px] mr-2"
                style={{ fontVariationSettings: "'FILL' 1" }}
              >
                bolt
              </span>
              AI-OPTIMIZED FOR {user?.urname}
            </span>
            <h1 className="font-display-lg text-display-lg text-primary mb-4">
              Recommended for you, {user?.urname}
            </h1>
            <p className="font-body-lg text-body-lg text-on-surface-variant max-w-2xl">
              Our kinetic matching algorithm has analyzed over 500 signal points across your
              executive profile to surface these high-impact opportunities in Product Leadership.
            </p>
          </div>
        </header>

        {/* Section 1: Best Matches */}
        <section className="mb-section-gap">
          <div className="flex justify-between items-end mb-8">
            <div>
              <h2 className="font-headline-lg text-headline-lg text-primary mb-2">
                Best Matches for Your Skills
              </h2>
              <div className="flex gap-2">
                {user?.details?.skillset.map((skill) => (
                  <span
                    key={skill}
                    className="bg-secondary-container px-3 py-1 bg-primary/5 text-primary border border-primary/10 rounded-lg font-label-bold text-label-bold"
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </div>
          </div>

          <div className="flex gap-8 overflow-x-auto pb-8 custom-scrollbar snap-x snap-mandatory">
            {featuredJobs?.map((job) => (
              <FeaturedJobCard key={job._id} job={job} />
            ))}
          </div>
        </section>

        {/* Section 2: Based on History */}
        <section className="mb-section-gap grid grid-cols-1 lg:grid-cols-3 gap-gutter">
          <div className="lg:col-span-1">
            <h2 className="font-headline-lg text-headline-lg text-primary mb-4">
              Based on Your History
            </h2>
            <p className="font-body-md text-body-md text-on-surface-variant mb-6">
              Because you previously viewed roles at these companies!
            </p>
          </div>

          <div className="lg:col-span-2 grid grid-cols-1 md:grid-cols-2 gap-6">
            {historyJobs?.map((job) => (
              <HistoryJobCard key={job.id} job={job} />
            ))}
          </div>
        </section>
      </main>

      {/* Contextual FAB (hidden on scroll down, shown on up) */}
      {/* <button
        className="fixed bottom-8 right-8 kinetic-gradient text-white w-16 h-16 rounded-2xl flex items-center justify-center shadow-2xl hover:scale-110 active:scale-95 transition-all z-50"
        style={{
          transform: fabHidden ? "translateY(100px) scale(0)" : "translateY(0) scale(1)",
        }}
      >
        <span className="material-symbols-outlined text-[32px]">edit_note</span>
      </button> */}
    </div>
  );
}