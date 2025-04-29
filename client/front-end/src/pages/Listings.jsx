import { useState, useRef, useEffect, useContext, use } from "react";
import Button from "../components/Button";
import Header from "../components/Header.jsx";
import BlankProfile from '../assets/images/blank-pp.png';
import { Link } from 'react-router-dom'
import Input from '../components/Input.jsx'
import HomeCard from "../components/HomeCard.jsx";
import Footer from "../components/Footer.jsx";
import AuthContext from "../context/AuthContext.jsx";

function Listings() {
    const [dropdownOpen, setDropdownOpen] = useState(false);
    const profileRef = useRef(null);
    const { user, handleLogout } = useContext(AuthContext)
    const [search, setSearch] = useState("");
    const [location, setLocation] = useState("");
    const [price, setPrice] = useState("");
    const [picture, setPicture] = useState(user.profile_pic ? `http://127.0.0.1:8000${user.profile_pic}` : BlankProfile);

    const [listings, setListings] = useState([]);

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
        browseListings();
    }, [search, location, price]);

    const browseListings = async () => {
        try {
            const response = await fetch(`http://localhost:8000/api/listing/browse-listings/?search=${search}&location=${location}&price=${price}`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                },
            });

            if (response.ok) {
                const data = await response.json();
                console.log(data);
                setListings(data);
                
            }

        } catch(err) {
            console.log(err)
        }
    }

    return (
        <div className="pt-8 w-full border-1 h-full flex flex-col gap-8 overflow-auto">
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
                                {user && user.is_agent &&
                                    <Link to={"/dashboard/your-listings"}>
                                        <Button text={"Your Listings"} className={"btn link text-(--text)"}/>
                                    </Link>
                                }
                                <Link to={"/dashboard/saved-listings"}>
                                    <Button text={"Saved Listings"} className={"btn link text-(--text)"}/>
                                </Link>

                                <Link to={"/dashboard/account"}>
                                    <Button text={"Account"} className={"btn link text-(--text)"}/>
                                </Link>

                            </div>

                            <div className="flex flex-col gap-3 text-left font-medium items-start">
                                {user && user.is_agent &&
                                    <Link to={"/add-listing"}>
                                        <Button text={"Add Listing"} className={"btn link text-(--primary)"}/>
                                    </Link>
                                }


                                
                                <Button text={"Logout"} className={"btn link logout text-red-600 "} onClick={()=> handleLogout()}/>

                            </div>

                        </div>
                    )}
                </div>
            } />

            <div className="w-full h-fit flex flex-col gap-7 items-center justify-start px-8 pb-8">
                <div className="flex flex-col gap-6 w-full items-center justify-center text-center" >
                    <h2 className="font-bold">Find Your Perfect Home</h2>
                    <form className=" h-fit flex flex-col gap-4 max-w-[400px] w-full" >
                        <Input placeholder={"Search.."} type={"search"} name={"search"} value={search} onChange={(e) => setSearch(e.target.value)} className={"input primary w-full " }/>
                        <div className="flex flex-wrap justify-evenly gap-3">
                            <select name="Addis-Abeba" value={location} onChange={(e) => setLocation(e.target.value)}  className="border-1 border-(--text) text-(--text) rounded-[8px] px-5 py-1 text-center" >
                                <option value="all">All Location</option>
                                <option value="AddisKetema">Addis Ketema</option>
                                <option value="AkakyKaliti">Akaky Kaliti</option>
                                <option value="Arada">Arada</option>
                                <option value="Bole">Bole</option>
                                <option value="Gullele">Gullele</option>
                                <option value="Kirkos">Kirkos</option>
                                <option value="KolfeKeranio">Kolfe Keranio</option>
                                <option value="Lideta">Lideta</option>
                                <option value="NifasSilkLafto">Nifas Silk-Lafto</option>
                                <option value="Yeka">Yeka</option>
                            </select>

                            <select name="price" id="" value={price} onChange={(e) => setPrice(e.target.value)} className="border-1 border-(--text) text-(--text) rounded-[8px] px-5 py-1 text-center" >
                                <option value="all">All Price</option>
                                <option value="1000000-5000000">1M - 5M</option>
                                <option value="5000000-10000000">5M - 10M</option>
                                <option value="10000000-20000000">10M - 20M</option>
                                <option value="20000000-30000000">20M - 30M</option>
                            </select>

                        </div>
                    </form>

                </div>

                <hr className="line w-full"/>

                <div className="w-full flex flex-wrap justify-evenly gap-8 h-fit" >
                {listings.length > 0 ? (
                    listings.map((listing) => (


                        <HomeCard key={listing.listing_id} id={listing.listing_id} title={listing.title} description={listing.description} src={`http://127.0.0.1:8000${listing.image_1}`} byFirstName={listing.author.first_name} byLastName={listing.author.last_name} link={listing.listing_id}/>
                    ))
                ) : (
                    <p>No listings found.</p>
                )}
                </div>

            </div>

            <Footer />
        </div>


    );
}

export default Listings;
