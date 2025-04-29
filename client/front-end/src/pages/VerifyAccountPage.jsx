import { useEffect } from "react";
import { useNavigate, useParams, Link } from "react-router-dom";
import Button from "../components/Button";


const VerifyAccountPage = () => {
    const navigate = useNavigate();
    const { token } = useParams();
    const { uid } = useParams();

    useEffect(() => {
        const verifyAccount = async () => {
            try {
                const response = await fetch(`http://127.0.0.1:8000/api/auth/verify-account/${uid}/${token}`, {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                });
                if (response.ok) {
                    const data = await response.json();
                    console.log(data)
                    localStorage.setItem("authToken", JSON.stringify(data));
                    navigate('/listings');
                }
            } catch (error) {
                console.error(error);
            }
        }
        verifyAccount();
    }, [])

    return (
        <div className="w-full h-full items-center justify-center flex">
            <div className="flex flex-col items-center justify-center gap-4">
                <div className="w-[100px] h-[100px] border-1">

                </div>

                <h3 className="font-medium text-(-text)">Account verified successfully redirecting to <Link to={"/listings"}><Button text={"Listings"} className={"link primary"} /></Link> </h3>
                
                <Button text={"Gmail"} className={"btn primary"} />
            </div>
        </div>
    )
}

export default VerifyAccountPage;