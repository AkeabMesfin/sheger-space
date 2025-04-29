import { useEffect } from "react";
import Button from '../components/Button.jsx'

function VerifyAccount() {

    return (
        <div className="w-full h-full items-center justify-center flex">
            <div className="flex flex-col items-center justify-center gap-4">
                <div className="w-[100px] h-[100px] border-1">

                </div>

                <h3 className="font-medium text-(-text)">Check you inbox to verify your account</h3>
                
                <Button text={"Gmail"} className={"btn primary"} />
            </div>
        </div>
    )
}

export default VerifyAccount;