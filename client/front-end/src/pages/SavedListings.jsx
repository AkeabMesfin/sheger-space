import SideNav from "../components/SideNav";
import BlankProfile from "../assets/images/blank-pp.png";
import { useState, useContext, useEffect } from "react";
import Button from "../components/Button";
import { Link } from "react-router-dom";
import AuthContext from "../context/AuthContext";
import HomeCard from "../components/HomeCard";

function SavedListings() {
    const [openToggle, setOpenToggle] = useState("hidden");
    const {user, getSavedListings, savedListingsList} = useContext(AuthContext);


    function openSideNav() {
        if (openToggle === "hidden") {
            setOpenToggle("flex");
        } else {
            setOpenToggle("hidden");
        }
    }
    
    const [picture, setPicture] = useState(user.profile_pic ? `http://127.0.0.1:8000${user.profile_pic}` : BlankProfile);

    useEffect(() => {
        getSavedListings();
    }, [])


    return (
        <div className="w-full h-full flex flex-row gap-8">
            <SideNav savedListings={"primary"} breakPoint={`max-[768px]:${openToggle}`}/>

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
                            Saved Listing
                        </h3>
                        <Link to="/listings">
                            <Button  text="Browse Listings" type="button" className="btn primary" />
                        </Link>
                    </div>

                    <div className=" w-full flex flex-wrap justify-evenly gap-8">
                        {savedListingsList.length > 0 ? (
                            savedListingsList.map((savedListing) => (
                                <HomeCard key={savedListing.listing.listing_id} id={savedListing.listing.listing_id} title={savedListing.listing.title} description={savedListing.listing.description} src={`http://127.0.0.1:8000${savedListing.listing.image_1}`} byFirstName={savedListing.listing.author.first_name} byLastName={savedListing.listing.author.last_name} link={savedListing.listing.listing_id}/>
                            ))
                        ) : (
                            <p>No saved listings.</p>
                        )}

                    </div>
                </div>


            </div>
        </div>
    )
}

export default SavedListings;