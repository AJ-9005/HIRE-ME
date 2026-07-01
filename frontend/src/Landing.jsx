import { useNavigate } from "react-router-dom"

function Landing({ isLoggedIn, currentUser }) {
    const navigate = useNavigate()
    function handleClick(path) {
        if (!currentUser) {
            alert("Please login first.")
            navigate("/login")
        }
        else {
            navigate(path)
        }
    }
    return (
        <div className="wrapper bg-background text-on-background font-body-md overflow-x-hidden">
            <main className="relative pt-24 pb-section-gap overflow-hidden">
                <section className="max-w-7xl mx-auto px-6 md:px-container-padding relative z-10">
                    <div className="grid lg:grid-cols-12 gap-gutter items-center">

                        {/* Hero Content */}
                        <div className="lg:col-span-7 flex flex-col items-start">
                            <div className="inline-flex items-center px-4 py-1.5 mb-8 rounded-full bg-primary-container/10 border border-primary-container/20">
                                <span className="w-2 h-2 rounded-full bg-primary-container mr-2"></span>
                                <span className="text-label-bold font-label-bold text-primary-container tracking-wider uppercase">
                                    Now hiring across every industry
                                </span>
                            </div>

                            <h1 className="font-display-lg text-display-lg text-primary mb-6 leading-tight max-w-2xl">
                                The Best Job-Seeking Platform. <br />
                                <span className="text-on-primary-container italic font-extrabold">For the minds who create.</span>
                            </h1>

                            <div className="flex flex-wrap gap-4 mb-16">
                                <button
                                    className="btn px-8 py-4 bg-primary-container text-white font-label-bold text-label-bold rounded-lg shadow-lg flex items-center group"
                                    onClick={() => handleClick("/jobs")}
                                >
                                    Get hired
                                    <span className="material-symbols-outlined ml-2 group-hover:translate-x-1 transition-transform">arrow_forward</span>
                                </button>
                                <button className="btn px-8 py-4 bg-surface-container border border-outline-variant text-primary font-label-bold text-label-bold rounded-lg"
                                    onClick={() => handleClick(`/myprofile/${currentUser?.id}`)}>
                                    Hire a candidate
                                </button>
                            </div>
                        </div>

                        {/* Visual Proof Section: Cards */}
                        <div className="lg:col-span-5 relative mt-16 lg:mt-0">
                            <div className="relative grid grid-cols-2 gap-4 h-[600px]">
                                {/* Card 1 */}
                                <div className="glass-card p-6 rounded-2xl flex flex-col justify-end overflow-hidden relative">
                                    <img
                                        alt="Executive Lead"
                                        className="absolute inset-0 w-full h-full object-cover opacity-80"
                                        src="https://lh3.googleusercontent.com/aida-public/AB6AXuAO5xRZq-TfyhtksZj2aPl9U_bJEqshjpfzjy3agxHathSk_AUDuGuA_Cxxu0X_gDqw5kd56pofbZh_VhTmrUn6kreYM1Nq9RY-zePEaPOBM_u1U7556mSUCthVfpOGF55FdeFwT7W9I9vCVXhrVEMZnHYG0GI0-oJZJcfkjjnUapH4C_GrfXgqO6WjDcIr-RA2D5i4CUEf_sjDByUzWe4j92x50v4bSY7T0w6Y88AjJfy9QrKD_w1pKdk912C4DfrbkMu7IiRRXpZX"
                                    />
                                    <div className="relative z-10 bg-white/20 backdrop-blur-md p-3 rounded-lg border border-white/30">
                                        <p className="text-white font-label-bold text-label-bold">David Chen</p>
                                        <p className="text-white/80 text-xs uppercase tracking-tighter">CTO • STRATUM LABS</p>
                                    </div>
                                </div>
                                {/* Card 2 */}
                                <div className="glass-card p-6 rounded-2xl flex flex-col justify-end overflow-hidden relative">
                                    <img
                                        alt="Executive Talent"
                                        className="absolute inset-0 w-full h-full object-cover opacity-80"
                                        src="https://lh3.googleusercontent.com/aida-public/AB6AXuBvYce804p3oaz7y0hyIFZwWA6HCzwQsp4c69rWXNvZTXAk96xIeOo7_nlyqRDvRIbmRB4aUR4mOKh1IYUj-SGQ5PdqfO_h1S7zGohxfCAFHJE317-eqQvneE1E2SfiVX7ZF-bh4sz3EeHGEJaOfpdciywDcnL9up5RTvYoHUjeLrFE5OOQp26X7rlCNlwNf5IdZLCxQRFQ1pZiPW_x4035oCbfrq7x3ozZreMI8RyqY_jKUh9GQWSe4kAKb6FGMJ6Sl_QwPxkX2hke"
                                    />
                                    <div className="relative z-10 bg-white/20 backdrop-blur-md p-3 rounded-lg border border-white/30">
                                        <p className="text-white font-label-bold text-label-bold">Elena Rodriguez</p>
                                        <p className="text-white/80 text-xs uppercase tracking-tighter">VP GROWTH • AETHER</p>
                                    </div>
                                </div>
                                {/* Card 3 - Stats Overlay */}
                                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-20 glass-card p-8 rounded-full w-40 h-40 flex flex-col items-center justify-center text-center border-2 border-primary-container/20">
                                    <span className="text-headline-md font-extrabold text-primary-container">500+</span>
                                    <span className="text-[10px] uppercase font-bold tracking-widest text-primary">Placements</span>
                                </div>
                            </div>
                        </div>

                    </div>
                </section>

                {/* Trust / Stats strip */}
                <section className="max-w-7xl mx-auto px-6 md:px-container-padding mt-section-gap">
                    <p className="text-headline-md font-headline-md font-extrabold text-primary mb-10 uppercase tracking-widest border-b border-outline-variant/30 pb-4">
                        Partnered with industry leaders
                    </p>
                    <div className="flex flex-wrap items-center gap-x-16 gap-y-10 mb-16">
                        <span className="font-display-lg text-5xl md:text-6xl font-extrabold text-primary tracking-tighter opacity-90">ZENITH</span>
                        <span className="font-display-lg text-5xl md:text-6xl font-extrabold text-primary tracking-tighter opacity-90">AETHER</span>
                        <span className="font-display-lg text-5xl md:text-6xl font-extrabold text-primary tracking-tighter opacity-90">STRATUM</span>
                        <span className="font-display-lg text-5xl md:text-6xl font-extrabold text-primary tracking-tighter opacity-90">KINETIC</span>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8 py-10 bg-primary-container/5 rounded-2xl px-8 border border-primary-container/10">
                        <div className="flex flex-col">
                            <span className="text-4xl md:text-5xl font-extrabold text-primary">50,000+</span>
                            <span className="text-label-bold text-secondary uppercase tracking-widest mt-2">Active Users</span>
                        </div>
                        <div className="flex flex-col">
                            <span className="text-4xl md:text-5xl font-extrabold text-primary">12,000+</span>
                            <span className="text-label-bold text-secondary uppercase tracking-widest mt-2">Professionals Hired</span>
                        </div>
                        <div className="flex flex-col">
                            <span className="text-4xl md:text-5xl font-extrabold text-primary">98%</span>
                            <span className="text-label-bold text-secondary uppercase tracking-widest mt-2">Placement Success</span>
                        </div>
                    </div>
                </section>

                {/* Dynamic Bento Section */}
                <section className="max-w-7xl mx-auto px-6 md:px-container-padding mt-section-gap">
                    <div className="grid md:grid-cols-3 gap-8">
                        <div className="glass-card p-10 rounded-3xl md:col-span-2 border border-outline-variant/10">
                            <div className="material-symbols-outlined text-primary-container text-4xl mb-6">psychology</div>
                            <h3 className="font-headline-md text-headline-md text-primary mb-4">Intelligent Matchmaking</h3>
                            <p className="font-body-md text-body-md text-on-surface-variant max-w-lg mb-8">
                                Our proprietary algorithm analyzes over 200 data points to ensure cultural and technical alignment before the first interview.
                            </p>
                            <div className="h-1 w-24 bg-primary-container/20 rounded-full"></div>
                        </div>
                        <div className="glass-card p-10 rounded-3xl bg-primary-container text-on-primary overflow-hidden relative">
                            <div className="relative z-10">
                                <div className="material-symbols-outlined text-white/50 text-4xl mb-6" style={{ fontVariationSettings: "'FILL' 1" }}>public</div>
                                <h3 className="font-headline-md text-headline-md text-white mb-4">Global Reach</h3>
                                <p className="font-body-md text-body-md text-white/80">
                                    Access untapped talent pools across 45 countries with local compliance expertise.
                                </p>
                            </div>
                            <div className="absolute -right-12 -bottom-12 w-48 h-48 bg-white/10 rounded-full blur-3xl"></div>
                        </div>
                    </div>
                </section>
            </main>
        </div>
    )
}
export default Landing
