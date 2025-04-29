import Header from "../components/Header.jsx";
import { useState, useRef, useEffect, useContext } from "react";
import Button from "../components/Button.jsx";
import BlankProfile from "../assets/images/blank-pp.png"
import { Link, useParams } from 'react-router-dom'
import Footer from "../components/Footer.jsx";
import AuthContext from "../context/AuthContext.jsx";

function ListingDetails() {
    const [dropdownOpen, setDropdownOpen] = useState(false);
    const profileRef = useRef(null);
    const { uid } = useParams();
    const [listing, setListing] = useState([])
    const { user, handleLogout } = useContext(AuthContext)
    const [picture, setPicture] = useState(user.profile_pic ? `http://127.0.0.1:8000${user.profile_pic}` : BlankProfile);
    

    useEffect(() => {
        function handleClickOutside(event) {
            if (profileRef.current && !profileRef.current.contains(event.target)) {
                setDropdownOpen(false);
            }
        }
        document.addEventListener("mousedown", handleClickOutside);
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, []);

    useEffect(() => {
        ListingDetails();
    }, [])

    const ListingDetails = async () => {
        try {
            const response = await fetch(`http://127.0.0.1:8000/api/listing/listing-details/${uid}`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'Application/json'
                }
            })

            if(response.ok) {
                const data = await response.json()
                console.log(data);
                setListing(data)
            }
        } catch(err) {
            console.log(err);
        }
    }

    
    return (
        <div className="w-full pt-8 h-full overflow-auto gap-8 flex flex-col">
            <Header children={
                <div className="relative" ref={profileRef}>
                    <div 
                        className="w-10 h-10 rounded-full cursor-pointer overflow-hidden border-1 border-(--secondary)"
                        onClick={() => setDropdownOpen(!dropdownOpen)}
                    >
                        <img src={picture} alt="Blank Profile" />

                    </div>

                    {dropdownOpen && (
                        <div className="absolute right-0 bg-white z-50 p-5 rounded-[20px] mt-3 w-[200px] gap-7 flex flex-col">
                            <div className="w-fill flex flex-row items-center justify-center gap-3 font-bold" >
                                <div className="w-10 h-10 rounded-full overflow-hidden border-1 border-(--secondary)">
                                    <img src={picture} alt="Blank Profile" />
                                </div>
                                
                                {user && <p className="capitalize">{user.first_name} {" "} {user.last_name} </p> }
                            </div>

                            <hr className="border-1 border-(--secondary)"/>

                            <div className="flex flex-col gap-3 text-left font-medium">
                                <Link to={"/dashboard"}>
                                    <Button text={"Dashboard"} className={"btn link text-(--text)"}/>
                                </Link>

                                <Link to={"/dashboard/your-listings"}>
                                    <Button text={"Your Listings"} className={"btn link text-(--text)"}/>
                                </Link>

                                <Link to={"/dashboard/saved-listings"}>
                                    <Button text={"Saved Listings"} className={"btn link text-(--text)"}/>
                                </Link>

                                <Link to={"/dashboard/account"}>
                                    <Button text={"Account"} className={"btn link text-(--text)"}/>
                                </Link>

                            </div>

                            <div className="flex flex-col gap-3 text-left font-medium items-start">
                                <Link to={"/add-listing"}>
                                    <Button text={"Add Listing"} className={"btn link text-(--primary)"}/>
                                </Link>

                                
                                <Button text={"Logout"} className={"btn link logout text-red-600 "} onClick={()=> handleLogout()}/>

                            </div>

                        </div>
                    )}
                </div>
            } />

            <div className="w-full h-fit flex flex-wrap gap-8 justify-evenly items-start px-8">

                <div  className="flex flex-wrap gap-6 w-full max-w-[680px] justify-evenly ">

                    <div   className="w-full rounded-3xl overflow-hidden h-[300px] min-w-[240px]">
                        <img
                        src={`http://127.0.0.1:8000${listing.image_1}`}
                        alt="Property 3"
                        className="w-full h-full object-cover"
                        />
                    </div>

                    <div   className="rounded-3xl overflow-hidden relative h-[300px] max-w-[320px] min-w-[240px] w-full">
                        <img
                        src={`http://127.0.0.1:8000${listing.image_2}`}
                        alt="Property 1"
                        className="w-full h-full object-cover"
                        />

                    </div>

                    <div   className="rounded-3xl overflow-hidden relative h-[300px] max-w-[320px] min-w-[240px] w-full">
                        <img
                        src={`http://127.0.0.1:8000${listing.image_3}`}
                        alt="Property 2"
                        className="w-full h-full object-cover"
                        />
                    </div>

                </div>

                <div className="flex flex-col gap-4 max-w-[500px] w-fit ">
                    <div className=" flex flex-col ">
                        <p className="font-bold">Title:</p>
                        <p>{listing.title}</p>
                    </div>

                    <div className=" flex flex-col">
                        <p className="font-bold">Phone:</p>
                        <p>+{listing.phone}</p>
                    </div>

                    <div className=" flex flex-col">
                        <p className="font-bold">Location:</p>
                        <p>Mexico, {listing.location}</p>
                    </div>

                    <div className=" flex flex-col">
                        <p className="font-bold">Price:</p>
                        <p>{listing.price} ETB</p>
                    </div>


                    <div className=" flex flex-col">
                        <p className="font-bold">Description:</p>
                        <p>{listing.description}</p>
                    </div>



                    {listing.author && user.user_id === listing.author.id?
                    <div className="w-full h-fit flex justify-between items-center">
                        <Link to={`/edit-listing/${listing.listing_id}`}>
                            <Button text={"Edit"} className={"btn secondary"} />
                        </Link>

                        <Button text={"Remove"} className={"btn link logout text-red-500"} />
                    </div>
                    : 
                    <div className=" w-full h-fit flex justify-end">
                        <Button text={
                                <svg
                                width="44px"
                                height="44px"
                                viewBox="0 0 24 24"
                                fill="none"
                                xmlns="http://www.w3.org/2000/svg"
                                className="cursor-pointer"
                                >
                                <path
                                    d="M17 3a2 2 0 012 2v14.054c0 1.535-1.659 2.498-2.992 1.736l-3.016-1.723a2 2 0 00-1.984 0L7.992 20.79C6.66 21.552 5 20.59 5 19.054V5a2 2 0 012-2h10z"
                                    fill="none"
                                />
                                <path
                                    d="M17 3a2 2 0 012 2v14.054c0 1.535-1.659 2.498-2.992 1.736l-3.016-1.723a2 2 0 00-1.984 0L7.992 20.79C6.66 21.552 5 20.59 5 19.054V5a2 2 0 012-2h10z"
                                    stroke="var(--text)"
                                    strokeWidth={1}
                                    strokeLinejoin="round"
                                />
                            </svg>

                            }/>
                    </div>
                    } 

                </div>


            </div>

            <Footer />

        </div>
    )
}

export default ListingDetails;