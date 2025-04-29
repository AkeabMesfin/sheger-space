import SideNav from "../components/SideNav";
import BlankProfile from "../assets/images/blank-pp.png";
import { useState, useContext, useEffect } from "react";
import Button from "../components/Button";
import { Link, useNavigate } from "react-router-dom";
import AuthContext from "../context/AuthContext";

function YourListings() {
    const [openToggle, setOpenToggle] = useState("hidden");
    const { user } = useContext(AuthContext);
    const navigate = useNavigate();
    useEffect(() => {
        if (!user.is_agent) {
            navigate("/dashboard");
        }
    })

    let authToken = localStorage.getItem("authToken");
    let presAuthToken = JSON.parse(authToken);
    const [myListings, setMyListings] = useState([]);
    
    function openSideNav() {
        if (openToggle === "hidden") {
            setOpenToggle("flex");
        } else {
            setOpenToggle("hidden");
        }
    }

    const [picture, setPicture] = useState(user.profile_pic ? `http://127.0.0.1:8000${user.profile_pic}` : BlankProfile);
    

    useEffect(() => {
        getMyListings();
    }, []);

    const getMyListings = async () => {
        try {
            const response = await fetch('http://127.0.0.1:8000/api/listings/my-listings/', {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${presAuthToken.access}`,
                }
            });
            if (response.ok) {
                const data = await response.json();
                console.log(data);
                
                setMyListings(data);
                
            }
        } catch (error) {
            console.error(error);
        }
    }


    const [listingId, setListingId] = useState('');
    const [status, setStatus] = useState('');


    useEffect(() => {
        editStatus();
    }, [status]);

    const editStatus = async () => {
        if (!listingId || !status) {
            return;
        }
        try {
            const response = await fetch(`http://127.0.0.1:8000/api/listing/edit-listing/${listingId}`, {
                method: 'PATCH',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${presAuthToken.access}`,
                },
                body: JSON.stringify({
                    status: status
                }),
            });
            if (response.ok) {
                const data = await response.json();
                console.log(data);
                getMyListings();
            }
        } catch (error) {
            console.error(error);
        }
    }

    const deleteListing  = async (listingId) => {
        try {
            const response = await fetch(`http://127.0.0.1:8000/api/listings/delete-listing/${listingId}`, {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${presAuthToken.access}`,
                },
            })

            if (response.ok) {
                const data = await response.json();
                console.log(data);
                getMyListings();
            }

        } catch(err) {
            console.log(err);
        }
    }

    return (
        <div className="w-full h-full flex flex-row gap-8">
            <SideNav yourListings={"primary"} breakPoint={`max-[768px]:${openToggle}`}/>

            <div className="py-8 flex flex-col grow-1 h-full pr-8 gap-4 max-[768px]:pl-8 overflow-auto">
                <div className="w-full flex justify-end items-end max-[768px]:justify-between">
                    <button type="button" onClick={openSideNav}  className="w-fit h-fit cursor-pointer hidden max-[768px]:block">
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
                    <div className="w-full flex flex-wrap justify-between gap-5 items-center">
                        <h3 className="font-medium">
                            Your Listings
                        </h3>
                        <Link to="/add-listing">
                            <Button  text="Add Listing" type="button" className="btn primary" />
                        </Link>
                    </div>

                    <div className=" w-full flex flex-wrap justify-evenly gap-8">


                    {
                    myListings.map((listing) => {
                        return (
                            <div className="w-[300px] rounded-[28px] overflow-hidden flex flex-col gap-4 pb-[16px] bg-white shadow-xl/20 cursor-pointer transition-transform duration-300 ease-in-out hover:scale-101" key={listing.listing_id}>
                            <img src={`http://127.0.0.1:8000${listing.image_1}`} alt="home photo"  className="w-full h-[200px]"/>

                            <div className="flex flex-col px-[16px]">
                                <h3 className="font-bold capitalize">{listing.title}</h3>
                                <p className="capitalize">List by {listing.author.first_name} {" "} {listing.author.last_name}</p>
                            </div>

                            <div className=" w-full px-[16px] flex flex-row justify-between items-center">
                                <select
                                    className="input primary w-fit text-center"
                                    value={listing.status}
                                    onChange={(e) => {setStatus(e.target.value); setListingId(listing.listing_id)}}
                                >
                                    <option value="active">Active</option>
                                    <option value="pending">In progress</option>
                                    <option value="sold">Sold</option>
                                </select>
                            </div>

                            <div className="w-full px-[16px] flex flex-row justify-between">
                                <Link to={`/edit-listing/${listing.listing_id}`} >
                                    <Button text="Edit" type="button" className="btn secondary" />
                                </Link>
                                <Button text="Delete" type="button" className="btn territory red" onClick={(e)=>deleteListing(listing.listing_id)}/>
                            </div>
                        </div>
                        )
                    })
                    }

                    </div>
                </div>


            </div>
        </div>
    )
}

export default YourListings;