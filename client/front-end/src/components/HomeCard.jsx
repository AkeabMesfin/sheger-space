import Button from "./Button";
import { Link } from "react-router-dom";
import AuthContext from "../context/AuthContext";
import { useContext } from "react";
import SavedListings from "../pages/SavedListings";

function HomeCard(props) {
    const { user, handleSaveListing, savedListings } = useContext(AuthContext);

    return (
        <div className="w-[300px] rounded-[28px] overflow-hidden flex flex-col gap-4 pb-[16px] bg-white shadow-xl/20 cursor-pointer transition-transform duration-300 ease-in-out hover:scale-101">
            <img src={props.src} alt="home photo"  className="w-full h-[200px]"/>

            <div className="flex flex-col px-[16px]">
                <h3 className="font-bold capitalize">{props.title}</h3>
                <p>List by <span className="capitalize">{props.byFirstName} {" "} {props.byLastName}</span></p>
            </div>

            <div className=" w-full px-[16px] flex flex-row justify-between items-center">
                <Link to={`/listing-details/${props.link}`}> 
                    <Button type={"button"} text={"View Details"} className={"btn primary"} />
                </Link>



                    <Button
                        type="button"
                        onClick={(e) => handleSaveListing(e, props.id)}
                        text={savedListings[props.id] ?
                            
                            <svg
                            width="44px"
                            height="44px"
                            viewBox="0 0 24 24"
                            fill="var(--text)"
                            xmlns="http://www.w3.org/2000/svg"
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
                             : 

                            <svg
                            width="44px"
                            height="44px"
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
                                strokeWidth={1}
                                strokeLinejoin="round"
                            />
                        </svg>

                        }
                        className="hover:cursor-pointer"
                    />


            </div>
        </div>
    )
}

export default HomeCard;