import Logo from "./Logo.jsx";
import Button from "./Button";
import { Link, useNavigate } from "react-router-dom";
import AuthContext from "../context/AuthContext";
import { useContext, useEffect } from "react";

function SideNav(props) {

    const { user } = useContext(AuthContext);



    function closeSideNav() {
        const sideNav = document.getElementById("sideNav");
    
        if (sideNav.classList.contains("flex")) {
            sideNav.classList.remove("max-[768px]:flex");
            sideNav.classList.add("max-[768px]:hidden");
        } else if (sideNav.classList.contains("hidden")) {
            sideNav.classList.remove("max-[768px]:hidden");
            sideNav.classList.add("max-[768px]:flex");
        }
    }
    
    
    return (
        <div className={`md:flex h-full min-w-fit py-8 px-5 flex flex-col gap-7 bg-white transition ease-in-out duration-300 max-[768px]:absolute max-[768px]:top-0 max-[768px]:left-[0] ${props.breakPoint}`} id="sideNav">
            <div className="w-full h-fit flex flex-row justify-between items-center">
                <Logo s={"var(--background)"} home={"var(--primary)"} />

                <button className="w-fit h-fit hidden max-[768px]:block"  type="button" onClick={closeSideNav}>
                    <svg
                        width="32px"
                        height="32px"
                        viewBox="0 0 24 24"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                    >
                        <g id="SVGRepo_bgCarrier" strokeWidth="0"></g>
                        <g
                            id="SVGRepo_tracerCarrier"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                        ></g>
                        <g id="SVGRepo_iconCarrier">
                            <circle cx="12" cy="12" r="10" stroke="var(--text)" strokeWidth="1"></circle>
                            <path
                            d="M14.5 9.50002L9.5 14.5M9.49998 9.5L14.5 14.5"
                            stroke="var(--text)"
                            strokeWidth="1"
                            strokeLinecap="round"
                            ></path>
                        </g>
                    </svg>
                </button>
            </div>
            <div className="flex flex-col gap-4">
                <Link to={"/dashboard"} >
                    <Button type={"button"} className={`group btn ${props.dashboard || ""} border-1 border-transparent hover:border-1 hover:border-(--primary) w-full flex flex-row justify-start hover:cursor-pointer `} text={
                        <p className="flex justify-center items-center gap-3">
                        <span>

                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                width="32px"
                                height="32px"
                                fill="none"
                                viewBox="0 -0.5 25 25"
                            >
                                <g
                                id="SVGRepo_iconCarrier"
                                fillRule="evenodd"
                                stroke="var(--text)"
                                className={`group-hover:stroke-(--primary) ${props.dashboard === "primary" && "stroke-(--background)"}`}
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth="1"
                                clipRule="evenodd"
                                >
                                <path d="M9.918 10H7.082A1.57 1.57 0 0 0 5.5 11.557v5.89A1.57 1.57 0 0 0 7.082 19h2.836a1.57 1.57 0 0 0 1.582-1.555v-5.889a1.57 1.57 0 0 0-1.582-1.555M9.918 4H7.082A1.54 1.54 0 0 0 5.5 5.495v1.014A1.54 1.54 0 0 0 7.082 8h2.836A1.54 1.54 0 0 0 11.5 6.508V5.494A1.54 1.54 0 0 0 9.918 4M15.082 13h2.835a1.57 1.57 0 0 0 1.583-1.555V5.557A1.57 1.57 0 0 0 17.918 4h-2.836A1.57 1.57 0 0 0 13.5 5.557v5.888A1.57 1.57 0 0 0 15.082 13M15.082 19h2.835a1.54 1.54 0 0 0 1.583-1.492v-1.014A1.54 1.54 0 0 0 17.918 15h-2.836a1.54 1.54 0 0 0-1.582 1.493v1.013A1.54 1.54 0 0 0 15.082 19"></path>
                                </g>
                            </svg>
                        </span>

                        <span>
                            Dashboard
                        </span>
                        </p>
                    } />
                </Link>

                {user.is_agent && (
                    <Link to={"/dashboard/your-listings"}> 
                        <Button type={"button"} className={`group btn ${props.yourListings || ""} border-1 border-transparent hover:border-1 hover:border-(--primary) flex flex-row w-full justify-start hover:cursor-pointer`} text={
                            <p className="flex justify-center items-center gap-3">
                            <span>

                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    width="32px"
                                    height="32px"
                                    fill="none"
                                    viewBox="0 0 24 24"
                                >
                                    <g
                                    id="SVGRepo_iconCarrier"
                                    strokeLinecap="round"
                                    strokeWidth="1"
                                    stroke="var(--text)"
                                    className={`group-hover:stroke-(--primary) ${props.yourListings === "primary" && "stroke-(--background)"}`}
                                    >
                                    <path d="M20 7H4M15 12H4M9 17H4"></path>
                                    </g>
                                </svg>
                            </span>

                            <span className="group-hover:text-(--primary)">
                                Your Listings
                            </span>
                            </p>
                        } />
                    </Link>
                )}

                <Link to={"/dashboard/saved-listings"}>
                    <Button type={"button"} className={`group btn ${props.savedListings || ""} border-1 border-transparent hover:border-1 hover:border-(--primary) flex flex-row w-full justify-start hover:cursor-pointer`} text={
                        <p className="flex justify-center items-center gap-3">
                        <span>

                        <svg
                            width="32px"
                            height="32px"
                            viewBox="0 0 24 24"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                        >
                            <path
                                d="M17 3a2 2 0 012 2v14.054c0 1.535-1.659 2.498-2.992 1.736l-3.016-1.723a2 2 0 00-1.984 0L7.992 20.79C6.66 21.552 5 20.59 5 19.054V5a2 2 0 012-2h10z"
                                fill="none"
                            />
                            <path
                                d="M17 3a2 2 0 012 2v14.054c0 1.535-1.659 2.498-2.992 1.736l-3.016-1.723a2 2 0 00-1.984 0L7.992 20.79C6.66 21.552 5 20.59 5 19.054V5a2 2 0 012-2h10z"
                                stroke="var(--text)"
                                className={`group-hover:stroke-(--primary) ${props.savedListings === "primary" && "stroke-(--background)"}`}
                                strokeWidth="1"
                                strokeLinejoin="round"
                            />
                        </svg>

                        </span>

                        <span className="group-hover:text-(--primary)">
                            Saved Listings
                        </span>
                        </p>
                    } />
                </Link>

                <Link to={"/dashboard/account"}>
                    <Button type={"button"} className={`group btn ${props.account || ""} border-1 border-transparent hover:border-1 hover:border-(--primary) w-full flex flex-row justify-start hover:cursor-pointer`} text={
                        <p className="flex justify-center items-center gap-3">
                        <span>
                            <svg
                                width="32px"
                                height="32px"
                                viewBox="0 0 24 24"
                                fill="none"
                                xmlns="http://www.w3.org/2000/svg"
                            >
                                <g id="SVGRepo_bgCarrier" strokeWidth="0"></g>
                                <g
                                    id="SVGRepo_tracerCarrier"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                ></g>
                                <g id="SVGRepo_iconCarrier">
                                    <circle cx="12" cy="6" r="4" stroke="var(--text)" className={`group-hover:stroke-(--primary) ${props.account === "primary" && "stroke-(--background)"}`} strokeWidth="1"></circle>
                                    <path
                                    d="M20 17.5C20 19.9853 20 22 12 22C4 22 4 19.9853 4 17.5C4 15.0147 7.58172 13 12 13C16.4183 13 20 15.0147 20 17.5Z"
                                    stroke="var(--text)"
                                    strokeWidth="1"
                                    className={`group-hover:stroke-(--primary) ${props.account === "primary" && "stroke-(--background)"}`}

                                    ></path>
                                </g>
                            </svg>

                        </span>

                        <span className="group-hover:text-(--primary)">
                            Account
                        </span>
                        </p>
                    } />
                </Link>
            </div>
        </div>
    )
}

export default SideNav;