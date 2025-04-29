import SideNav from "../components/SideNav";
import BlankProfile from "../assets/images/blank-pp.png";
import { useState, useContext, useEffect } from "react";
import AuthContext from '../context/AuthContext.jsx'
function Dashboard() {
    const [toggle, setToggle] = useState("hidden");
    const { user } = useContext(AuthContext)
    let authToken = localStorage.getItem("authToken");
    const presAuthToken = JSON.parse(authToken);
    const [totalListings, setTotalListings] = useState();
    const [picture, setPicture] = useState(user.profile_pic ? `http://127.0.0.1:8000${user.profile_pic}` : BlankProfile);

    function openSideNave() {
        if (toggle === "hidden") {
            setToggle("flex");
        } else {
            setToggle("hidden");
        }
    }


    useEffect(() => {
        if (user.is_agent) {
            getTotalListings();
        } else {
            getTotalSavedListings();
        }
    }, [])
    const getTotalListings = async() => {
        try {

            const response = await fetch(`http://127.0.0.1:8000/api/listings/total-listings`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${presAuthToken.access}`,
                }
            })

            if (response.ok) {
                const data = await response.json();
                console.log(data);
                setTotalListings(data);
                
            }

        } catch(err) {
            console.log(err);
        }
    }


    const getTotalSavedListings = async() => {
        try {

            const response = await fetch(`http://127.0.0.1:8000/api/listings/total-saved-listings`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${presAuthToken.access}`,
                }
            })

            if (response.ok) {
                const data = await response.json();
                console.log(data);
                setTotalListings(data);
                
            }
        } catch(err) {
            console.log(err);
        }
}

    return (
        <div className="w-full h-full flex flex-row gap-8">
            <SideNav dashboard={"primary"}  breakPoint={`max-[768px]:${toggle}`}/>

            <div className="py-8 flex flex-col grow-1 h-full pr-8 gap-4 max-[768px]:pl-8">
                <div className="w-full flex justify-end items-end max-[768px]:justify-between">
                    <button type="button" onClick={openSideNave}  className="w-fit h-fit cursor-pointer hidden max-[768px]:block">
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
                                <path
                                d="M4 6H20M4 12H20M4 18H20"
                                stroke="var(--text)"
                                strokeWidth="1"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                ></path>
                            </g>
                        </svg>
                    </button>
                    <div className="flex flex-row items-end gap-3">
                        <p className="max-[300px]:hidden capitalize">Hey, {user && <span>{user.first_name} {" "} {user.last_name}</span>}</p>
                        <div className="w-10 h-10 rounded-full cursor-pointer overflow-hidden border-1 border-(--secondary)">
                            <img src={picture} alt="Blank Profile" />
                        </div>
                    </div>
                </div>

                <hr className="line w-full"/>

                <div className="w-full flex flex-col gap-6">
                    <div className="flex flex-col gap-3">
                        <h3 className="font-medium">Dashboard</h3>
                        <div className="flex flex-wrap w-full justify-between items-center gap-8">
                        {user.is_agent? <>

                            <div className="p-5 rounded-[12px] bg-white h-fit w-fit flex flex-row gap-5 items-center justify-center shadow-xl">
                                <div className="flex flex-col">
                                    <h3 className="font-medium">
                                        {totalListings ?totalListings.total_listings: 0}
                                    </h3>
                                    <p className="text-(--secondary)">
                                        Total Listings
                                    </p>
                                </div>

                                <div className="bg-(--background) p-4 rounded-full">

                                     <svg
                                        width="28px"
                                        height="28px"
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

                                        <path
                                            d="M22 12.2039V13.725C22 17.6258 22 19.5763 20.8284 20.7881C19.6569 22 17.7712 22 14 22H10C6.22876 22 4.34315 22 3.17157 20.7881C2 19.5763 2 17.6258 2 13.725V12.2039C2 9.91549 2 8.77128 2.5192 7.82274C3.0384 6.87421 3.98695 6.28551 5.88403 5.10813L7.88403 3.86687C9.88939 2.62229 10.8921 2 12 2C13.1079 2 14.1106 2.62229 16.116 3.86687L18.116 5.10812C20.0131 6.28551 20.9616 6.87421 21.4808 7.82274"
                                            stroke="var(--primary)"
                                            strokeWidth="1"
                                            strokeLinecap="round"
                                            ></path>
                                        </g>
                                    </svg>


                                </div>

                            </div>

                            <div className="p-5 rounded-[12px] bg-white h-fit w-fit flex flex-row gap-5 items-center justify-center shadow-xl">
                                <div className="flex flex-col">
                                    <h3 className="font-medium">
                                        {totalListings? totalListings.active: 0}
                                    </h3>
                                    <p className="text-(--secondary)">
                                        Total Active
                                    </p>
                                </div>

                                <div className="bg-(--background) p-4 rounded-full">

                                <svg
                                    width="28px"
                                    height="28px"
                                    viewBox="0 0 24 24"
                                    fill="none"
                                    xmlns="http://www.w3.org/2000/svg"
                                    >
                                    <g id="SVGRepo_bgCarrier" strokeWidth={0} />
                                    <g id="SVGRepo_tracerCarrier" strokeLinecap="round" strokeLinejoin="round" />
                                    <g id="SVGRepo_iconCarrier">
                                        <circle cx={12} cy={12} r={10} stroke="var(--primary)" strokeWidth="1" />
                                        <path
                                        d="M8.5 12.5L10.5 14.5L15.5 9.5"
                                        stroke="var(--primary)"
                                        strokeWidth="1"
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        />
                                    </g>
                                </svg>





                                </div>

                            </div>

                            <div className="p-5 rounded-[12px] bg-white h-fit w-fit flex flex-row gap-5 items-center justify-center shadow-xl">
                                <div className="flex flex-col">
                                    <h3 className="font-medium">
                                        {totalListings? totalListings.sold: 0}
                                    </h3>
                                    <p className="text-(--secondary)">
                                        Total Sold
                                    </p>
                                </div>

                                <div className="bg-(--background) p-4 rounded-full">

                                    <svg
                                        width="28px"
                                        height="28px"
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
                                        <path
                                            d="M7.5 18C8.32843 18 9 18.6716 9 19.5C9 20.3284 8.32843 21 7.5 21C6.67157 21 6 20.3284 6 19.5C6 18.6716 6.67157 18 7.5 18Z"
                                            stroke="var(--primary)"
                                            strokeWidth="1"
                                        ></path>
                                            <path
                                            d="M16.5 18.0001C17.3284 18.0001 18 18.6716 18 19.5001C18 20.3285 17.3284 21.0001 16.5 21.0001C15.6716 21.0001 15 20.3285 15 19.5001C15 18.6716 15.6716 18.0001 16.5 18.0001Z"
                                            stroke="#1C274C"
                                            strokeWidth="1"
                                        ></path>
                                        <path
                                            d="M2 3L2.26121 3.09184C3.5628 3.54945 4.2136 3.77826 4.58584 4.32298C4.95808 4.86771 4.95808 5.59126 4.95808 7.03836V9.76C4.95808 12.7016 5.02132 13.6723 5.88772 14.5862C6.75412 15.5 8.14857 15.5 10.9375 15.5H12M16.2404 15.5C17.8014 15.5 18.5819 15.5 19.1336 15.0504C19.6853 14.6008 19.8429 13.8364 20.158 12.3075L20.6578 9.88275C21.0049 8.14369 21.1784 7.27417 20.7345 6.69708C20.2906 6.12 18.7738 6.12 17.0888 6.12H11.0235M4.95808 6.12H7"
                                            stroke="var(--primary)"
                                            strokeWidth="1"
                                            strokeLinecap="round"
                                        ></path>
                                        </g>
                                    </svg>



                                </div>

                            </div>

                            <div className="p-5 rounded-[12px] bg-white h-fit w-fit flex flex-row gap-5 items-center justify-center shadow-xl">
                                <div className="flex flex-col">
                                    <h3 className="font-medium">
                                        {totalListings? totalListings.pending: 0}
                                    </h3>
                                    <p className="text-(--secondary)">
                                        Pending
                                    </p>
                                </div>

                                <div className="bg-(--background) p-4 rounded-full">

                                    <svg
                                        width="28px"
                                        height="28px"
                                        viewBox="0 0 24 24"
                                        fill="none"
                                        xmlns="http://www.w3.org/2000/svg"
                                        >
                                        <g id="SVGRepo_bgCarrier" strokeWidth={0} />
                                        <g id="SVGRepo_tracerCarrier" strokeLinecap="round" strokeLinejoin="round" />
                                        <g id="SVGRepo_iconCarrier">
                                            <path
                                            d="M12 7V12L14.5 10.5M21 12C21 16.9706 16.9706 21 12 21C7.02944 21 3 16.9706 3 12C3 7.02944 7.02944 3 12 3C16.9706 3 21 7.02944 21 12Z"
                                            stroke="var(--primary)"
                                            strokeWidth={1}
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            />
                                        </g>
                                    </svg>




                                </div>

                            </div>
                            </>
                         : 
                            <div className="p-5 rounded-[12px] bg-white h-fit w-fit flex flex-row gap-5 items-center justify-center shadow-xl">
                                <div className="flex flex-col">
                                    <h3 className="font-medium">
                                        {totalListings ?totalListings.total_saved_listings: 0}
                                    </h3>
                                    <p className="text-(--secondary)">
                                        Total Saved Listings
                                    </p>
                                </div>

                                <div className="bg-(--background) p-4 rounded-full">

                                    <svg
                                        width="28px"
                                        height="28px"
                                        viewBox="0 0 24 24"
                                        fill="none"
                                        xmlns="http://www.w3.org/2000/svg"
                                        >
                                        <g id="SVGRepo_bgCarrier" strokeWidth={0} />
                                        <g id="SVGRepo_tracerCarrier" strokeLinecap="round" strokeLinejoin="round" />
                                        <g id="SVGRepo_iconCarrier">
                                            <path
                                            d="M21 16.0909V11.0975C21 6.80891 21 4.6646 19.682 3.3323C18.364 2 16.2426 2 12 2C7.75736 2 5.63604 2 4.31802 3.3323C3 4.6646 3 6.80891 3 11.0975V16.0909C3 19.1875 3 20.7358 3.73411 21.4123C4.08421 21.735 4.52615 21.9377 4.99692 21.9915C5.98402 22.1045 7.13673 21.0849 9.44216 19.0458C10.4612 18.1445 10.9708 17.6938 11.5603 17.5751C11.8506 17.5166 12.1494 17.5166 12.4397 17.5751C13.0292 17.6938 13.5388 18.1445 14.5578 19.0458C16.8633 21.0849 18.016 22.1045 19.0031 21.9915C19.4739 21.9377 19.9158 21.735 20.2659 21.4123C21 20.7358 21 19.1875 21 16.0909Z"
                                            stroke="var(--primary)"
                                            strokeWidth="1"
                                            />
                                            <path
                                            opacity="0.5"
                                            d="M15 6H9"
                                            stroke="var(--primary)"
                                            strokeWidth="1"
                                            strokeLinecap="round"
                                            />
                                        </g>
                                    </svg>

                                </div>

                            </div>
                         }

                        </div>
                    </div>

                    {/* <div className="flex flex-col gap-3">
                        <h3 className="font-medium">Quick Actions</h3>
                        <div className="flex flex-wrap max-w-[600px] w-full justify-between items-center">
                            <div className="p-5 rounded-[12px] bg-white h-fit w-fit flex flex-row gap-5 items-center justify-center shadow-xl">
                                <div className="flex flex-col">
                                    <h3 className="font-medium">
                                        100
                                    </h3>
                                    <p className="text-(--secondary)">
                                        Total Listings
                                    </p>
                                </div>

                                <div className="bg-(--background) p-4 rounded-full">

                                     <svg
                                        width="28px"
                                        height="28px"
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

                                        <path
                                            d="M22 12.2039V13.725C22 17.6258 22 19.5763 20.8284 20.7881C19.6569 22 17.7712 22 14 22H10C6.22876 22 4.34315 22 3.17157 20.7881C2 19.5763 2 17.6258 2 13.725V12.2039C2 9.91549 2 8.77128 2.5192 7.82274C3.0384 6.87421 3.98695 6.28551 5.88403 5.10813L7.88403 3.86687C9.88939 2.62229 10.8921 2 12 2C13.1079 2 14.1106 2.62229 16.116 3.86687L18.116 5.10812C20.0131 6.28551 20.9616 6.87421 21.4808 7.82274"
                                            stroke="var(--primary)"
                                            strokeWidth="1"
                                            strokeLinecap="round"
                                            ></path>
                                        </g>
                                    </svg>


                                </div>

                            </div>

                            <div className="p-5 rounded-[12px] bg-white h-fit w-fit flex flex-row gap-5 items-center justify-center shadow-xl">
                                <div className="flex flex-col">
                                    <h3 className="font-medium">
                                        100
                                    </h3>
                                    <p className="text-(--secondary)">
                                        Total Sold
                                    </p>
                                </div>

                                <div className="bg-(--background) p-4 rounded-full">

                                    <svg
                                        width="28px"
                                        height="28px"
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
                                        <path
                                            d="M7.5 18C8.32843 18 9 18.6716 9 19.5C9 20.3284 8.32843 21 7.5 21C6.67157 21 6 20.3284 6 19.5C6 18.6716 6.67157 18 7.5 18Z"
                                            stroke="var(--primary)"
                                            strokeWidth="1"
                                        ></path>
                                            <path
                                            d="M16.5 18.0001C17.3284 18.0001 18 18.6716 18 19.5001C18 20.3285 17.3284 21.0001 16.5 21.0001C15.6716 21.0001 15 20.3285 15 19.5001C15 18.6716 15.6716 18.0001 16.5 18.0001Z"
                                            stroke="#1C274C"
                                            strokeWidth="1"
                                        ></path>
                                        <path
                                            d="M2 3L2.26121 3.09184C3.5628 3.54945 4.2136 3.77826 4.58584 4.32298C4.95808 4.86771 4.95808 5.59126 4.95808 7.03836V9.76C4.95808 12.7016 5.02132 13.6723 5.88772 14.5862C6.75412 15.5 8.14857 15.5 10.9375 15.5H12M16.2404 15.5C17.8014 15.5 18.5819 15.5 19.1336 15.0504C19.6853 14.6008 19.8429 13.8364 20.158 12.3075L20.6578 9.88275C21.0049 8.14369 21.1784 7.27417 20.7345 6.69708C20.2906 6.12 18.7738 6.12 17.0888 6.12H11.0235M4.95808 6.12H7"
                                            stroke="var(--primary)"
                                            strokeWidth="1"
                                            strokeLinecap="round"
                                        ></path>
                                        </g>
                                    </svg>



                                </div>

                            </div>
                        </div>
                    </div> */}
                </div>


            </div>
        </div>
    )
}

export default Dashboard;