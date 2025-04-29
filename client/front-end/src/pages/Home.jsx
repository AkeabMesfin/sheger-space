import Header from "../components/Header.jsx";
import Button from "../components/Button.jsx";
import HomePhoto1 from "../assets/images/home1.jpg";
import HomePhoto2 from "../assets/images/home2.jpg";
import HomePhoto3 from "../assets/images/home3.jpg";
import SlideInOnLoad from "../components/animations/SlideInOnLoad.jsx";
import SlideInOnScroll from "../components/animations/SlideInOnScroll.jsx"
import GrowIn from "../components/animations/GrowIn.jsx";
import FadeInOnScroll from "../components/animations/FadeInScroll.jsx";
import AnimatedCounter from "../components/animations/AnimatedCounter.jsx";
import Footer from "../components/Footer.jsx";
import { Link } from 'react-router-dom'

function Home() {
    return (
        <div className="flex flex-col w-full h-full pt-8 gap-8 overflow-y-auto overflow-x-clip">
            <Header children={<Link to={'/login'}><Button type={"button"} className={"btn territory"} text={"Login"}/></Link>} />

            <div className="w-full h-full flex flex-row gap-8 px-8 items-center justify-center max-[1024px]:flex-col max-[1024px]:h-fit ">
                <div className="max-w-[500px] w-full h-fit gap-7 flex flex-col max-[1024px]:items-center max-[1024px]:text-center">
                    <SlideInOnLoad direction="left" duration={0.8} delay={0}  className="w-full h-fit text-(--text)">
                        <h1 className="font-extrabold">
                            Buy, Rent, or Sell - All In One Place
                        </h1>
                
                        <p className="font-medium">
                            <b>Sheger Space</b> makes it <i>easy</i> to <i>buy</i>, <i>rent</i>, or <i>sell</i> properties across Ethiopia. Find your next dream home, investment, or list your property with ease all in one platform.
                        </p>
                    </SlideInOnLoad>

                    <SlideInOnLoad direction="up" duration={0.8} delay={0.4}  className="flex flex-row gap-6 h-fit w-fit">
                        <Link to={"/sign-up"}>
                            <Button type={"button"} className={"btn primary"} text={"Get Started"}/>
                        </Link>

                        <Button type={"button"} className={"btn secondary"} text={"Learn More"}/>

                    </SlideInOnLoad>

                </div>

                <div  className="grid grid-cols-2 gap-6 w-full max-w-[680px] ">

                    <SlideInOnLoad direction="down" duration={0.8} delay={0.8}  className="rounded-3xl overflow-hidden relative h-[300px] max-w-[340px]">
                        <img
                        src={HomePhoto1}
                        alt="Property 1"
                        className="w-full h-full object-cover"
                        />

                    </SlideInOnLoad>
                    <SlideInOnLoad direction="down" duration={0.8} delay={1.2}  className="rounded-3xl overflow-hidden h-[300px]">
                        <img
                        src={HomePhoto2}
                        alt="Property 2"
                        className="w-full h-full object-cover"
                        />
                    </SlideInOnLoad>
                    <SlideInOnLoad direction="right" duration={0.8} delay={1.6}  className="col-span-2 rounded-3xl overflow-hidden h-[300px]">
                        <img
                        src={HomePhoto3}
                        alt="Property 3"
                        className="w-full h-full object-cover"
                        />
                    </SlideInOnLoad>
                </div>
            </div>

            <div className="w-full relative h-fit bg-(--accent)">
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    id="visual"
                    version="1.1"
                    viewBox="0 0 900 200"
                    className="w-fit"
                >
                    <path
                    fill="var(--background)"
                    strokeLinecap="round"
                    d="m0 183 25-.8c25-.9 75-2.5 125-24.2s100-63.3 150-79.3 100-6.4 150 13C500 111 550 140 600 137s100-38 150-53.7c50-15.6 100-12 125-10.1l25 1.8V0H0Z"
                    ></path>
                </svg>
                <div className="flex flex-col items-center justify-center gap-8 w-full text-center">
                    <h2 className="font-bold text-(--background)">Discover Your Next Home</h2>

                    <div className="w-full h-fit flex flex-wrap justify-evenly items-center gap-6 px-8">

                        <SlideInOnScroll duration={0.8} delay={0} direction="up"  className="cursor-pointer relative w-[300px] h-[300px] rounded-[32px] overflow-hidden shadow-[0px_4px_4px_rgba(0,0,0,0.25)] group">
                            <img 
                                src={HomePhoto1} 
                                alt="home-1" 
                                className="w-full h-full object-cover transition-transform duration-300"
                            />

                            <div className="absolute inset-0 bg-black opacity-0 group-hover:opacity-30 transition-opacity duration-300"></div>

                            <div className="absolute bg-(--background) bottom-0 right-0 text-(--text) p-3 rounded-tl-[16px] z-10">
                                <p className="font-medium">3 bed room apartment</p>

                                <p className="flex flex-row gap-2 items-center">
                                    <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        width="12"
                                        height="12"
                                        stroke="var(--text)"
                                        strokeWidth="0"
                                        viewBox="0 0 32 32"
                                    >
                                        <path
                                            d="M16.114-.011C9.555-.011 4 5.576 4 12.193c0 6.93 6.439 14.017 10.77 18.998.017.02.717.797 1.579.797h.076c.863 0 1.558-.777 1.575-.797 4.064-4.672 10-12.377 10-18.998C28 5.575 23.667-.011 16.114-.011zm.401 29.86a1 1 0 0 1-.131.107 1 1 0 0 1-.133-.107l-.523-.602c-4.106-4.71-9.729-11.161-9.729-17.055 0-5.532 4.632-10.205 10.114-10.205 6.829 0 9.886 5.125 9.886 10.205 0 4.474-3.192 10.416-9.485 17.657zm-.48-23.805a6 6 0 1 0 0 12 6 6 0 0 0 0-12zm0 10c-2.206 0-4.046-1.838-4.046-4.044s1.794-4 4-4 4 1.794 4 4c.001 2.206-1.747 4.044-3.954 4.044z"
                                        ></path>
                                    </svg>
                                    <span className="font-light">Mexico, Addis Ababa</span>
                                </p>
                            </div>
                        </SlideInOnScroll>

                        <SlideInOnScroll duration={0.8} delay={0.2} direction="up" className="cursor-pointer relative w-[300px] h-[300px] rounded-[32px] overflow-hidden shadow-[0px_4px_4px_rgba(0,0,0,0.25)] group">
                            <img 
                                src={HomePhoto1} 
                                alt="home-1" 
                                className="w-full h-full object-cover transition-transform duration-300"
                            />

                            <div className="absolute inset-0 bg-black opacity-0 group-hover:opacity-30 transition-opacity duration-300"></div>

                            <div className="absolute bg-(--background) bottom-0 right-0 text-(--text) p-3 rounded-tl-[16px] z-10">
                                <p className="font-medium">3 bed room apartment</p>

                                <p className="flex flex-row gap-2 items-center">
                                    <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        width="12"
                                        height="12"
                                        stroke="var(--text)"
                                        strokeWidth="0"
                                        viewBox="0 0 32 32"
                                    >
                                        <path
                                            d="M16.114-.011C9.555-.011 4 5.576 4 12.193c0 6.93 6.439 14.017 10.77 18.998.017.02.717.797 1.579.797h.076c.863 0 1.558-.777 1.575-.797 4.064-4.672 10-12.377 10-18.998C28 5.575 23.667-.011 16.114-.011zm.401 29.86a1 1 0 0 1-.131.107 1 1 0 0 1-.133-.107l-.523-.602c-4.106-4.71-9.729-11.161-9.729-17.055 0-5.532 4.632-10.205 10.114-10.205 6.829 0 9.886 5.125 9.886 10.205 0 4.474-3.192 10.416-9.485 17.657zm-.48-23.805a6 6 0 1 0 0 12 6 6 0 0 0 0-12zm0 10c-2.206 0-4.046-1.838-4.046-4.044s1.794-4 4-4 4 1.794 4 4c.001 2.206-1.747 4.044-3.954 4.044z"
                                        ></path>
                                    </svg>
                                    <span className="font-light">Mexico, Addis Ababa</span>
                                </p>
                            </div>
                        </SlideInOnScroll>

                        <SlideInOnScroll duration={0.8} delay={0.4} direction="up"  className="cursor-pointer relative w-[300px] h-[300px] rounded-[32px] overflow-hidden shadow-[0px_4px_4px_rgba(0,0,0,0.25)] group">
                            <img 
                                src={HomePhoto1} 
                                alt="home-1" 
                                className="w-full h-full object-cover transition-transform duration-300"
                            />

                            <div className="absolute inset-0 bg-black opacity-0 group-hover:opacity-30 transition-opacity duration-300"></div>

                            <div className="absolute bg-(--background) bottom-0 right-0 text-(--text) p-3 rounded-tl-[16px] z-10">
                                <p className="font-medium">3 bed room apartment</p>

                                <p className="flex flex-row gap-2 items-center">
                                    <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        width="12"
                                        height="12"
                                        stroke="var(--text)"
                                        strokeWidth="0"
                                        viewBox="0 0 32 32"
                                    >
                                        <path
                                            d="M16.114-.011C9.555-.011 4 5.576 4 12.193c0 6.93 6.439 14.017 10.77 18.998.017.02.717.797 1.579.797h.076c.863 0 1.558-.777 1.575-.797 4.064-4.672 10-12.377 10-18.998C28 5.575 23.667-.011 16.114-.011zm.401 29.86a1 1 0 0 1-.131.107 1 1 0 0 1-.133-.107l-.523-.602c-4.106-4.71-9.729-11.161-9.729-17.055 0-5.532 4.632-10.205 10.114-10.205 6.829 0 9.886 5.125 9.886 10.205 0 4.474-3.192 10.416-9.485 17.657zm-.48-23.805a6 6 0 1 0 0 12 6 6 0 0 0 0-12zm0 10c-2.206 0-4.046-1.838-4.046-4.044s1.794-4 4-4 4 1.794 4 4c.001 2.206-1.747 4.044-3.954 4.044z"
                                        ></path>
                                    </svg>
                                    <span className="font-light">Mexico, Addis Ababa</span>
                                </p>
                            </div>
                        </SlideInOnScroll>
                    </div>

                </div>
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 200 900 250"
                    width="100%"
                    >
                    <path
                        fill="var(--background)"
                        strokeLinecap="round"
                        d="m0 225 25 23.3c25 23.4 75 70 125 76.7s100-26.7 150-26.8c50-.2 100 32.8 150 43 50 10.1 100-2.5 150 11.3s100 54.2 150 39.5 100-84.3 125-119.2l25-34.8v213H0Z"
                    />
                </svg>
     
            </div>

            <div className="w-full h-fit text-center text-(--text) flex flex-col gap-8 px-8">
                <h2 className="font-bold">Getting Home Has Never <br /> Been Easier</h2>
                <div className="w-full flex flex-wrap justify-evenly items-center gap-6">
                    <div className="flex flex-col gap-8 relative">
                        <GrowIn stageHeights={['160px', '300px']} delays={[1.8, 1.8]} duration={0.8}  className="w-6 bg-(--secondary) absolute -z-10 left-[18px] rounded-2xl"></GrowIn>

                        <div className="flex flex-row items-start gap-4">
                            <SlideInOnScroll direction="down" className="w-15 h-15 rounded-full bg-(--primary) text-(--background) font-bold flex justify-center items-center p-5"><h2>1</h2></SlideInOnScroll>
                            <FadeInOnScroll delay={1}  className="flex flex-col max-w-[320px] text-left">
                                <h3>Pick your choice</h3>
                                <p>Browse through a variety of homes and find the one that fits your needs and lifestyle.</p>
                            </FadeInOnScroll>
                        </div>

                        <div className="flex flex-row items-start gap-4">
                            <SlideInOnScroll direction="left" delay={2.4}  className="w-15 h-15 rounded-full bg-(--primary) text-(--background) font-bold flex justify-center items-center p-5"><h2>2</h2></SlideInOnScroll>
                            <FadeInOnScroll delay={2.8}  className="flex flex-col max-w-[320px] text-left">
                                <h3>Talk to agent</h3>
                                <p>Connect with a trusted agent who will guide you every step of the way.</p>
                            </FadeInOnScroll>
                        </div>

                        <div className="flex flex-row items-start gap-4">
                            <SlideInOnScroll direction="left" delay={4}  className="w-15 h-15 rounded-full bg-(--primary) text-(--background) font-bold flex justify-center items-center p-5"><h2>3</h2></SlideInOnScroll>
                            <FadeInOnScroll delay={4.4} className="flex flex-col max-w-[320px] text-left">
                                <h3>Take Your Key</h3>
                                <p>Sign the papers and step into your new home.</p>
                            </FadeInOnScroll>
                        </div>
                    </div>

                    <div className="w-[300px] h-[300px] flex flex-col gap-4 justify-center items-center overflow-hidden">
                        <SlideInOnScroll direction="up" duration={0.8} delay={5.2} className="w-[100px] h-[100px] rounded-[20px] bg-(--primary) transform rotate-4 shadow-xl/32 flex justify-center items-center">
                            <svg
                                viewBox="0 0 24 24"
                                fill="none"
                                xmlns="http://www.w3.org/2000/svg"
                                className="w-[62px] h-auto"
                            >
                                <g id="SVGRepo_bgCarrier" strokeWidth="0"></g>
                                <g
                                id="SVGRepo_tracerCarrier"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                ></g>
                                <g id="SVGRepo_iconCarrier">
                                <path
                                    d="M19 7.90637V18C19 19.1046 18.1046 20 17 20H7C5.89543 20 5 19.1046 5 18V7.90637M2 10.0001L10.8531 3.80297C11.5417 3.32092 12.4583 3.32092 13.1469 3.80297L22 10.0001"
                                    stroke="var(--background)"
                                    strokeWidth="2"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                ></path>
                                </g>
                            </svg>
                        </SlideInOnScroll>

                        <SlideInOnScroll direction="up" duration={0.8} delay={5.6} className="flex flex-col w-fit h-fit text-(--text)">
                            <h1 className=" font-bold text-(--primary)">
                            <AnimatedCounter from={0} to={20} delay={6} animationOptions={{ duration: 2 }} />K+
                            </h1>                   
                            <p className="font-medium">Homes Sold</p>
                        </SlideInOnScroll>
                    </div>
                </div>
            </div>

            <Footer />
        </div>
    )
}

export default Home;