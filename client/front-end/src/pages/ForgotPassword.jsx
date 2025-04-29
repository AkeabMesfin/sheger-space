import { useState, useEffect, useContext } from "react";
import Input from "../components/Input";
import Button from "../components/Button";
import AuthContext from "../context/AuthContext";

function ForgotPassword() {
    const [email, setEmail] = useState("");
    const [coolDown, setCoolDown] = useState(0);
    const { handleForgotPassword } = useContext(AuthContext);

    useEffect(() => {
        if (coolDown > 0) {
            const timer = setInterval(() => {
                setCoolDown(prev => prev - 1);
            }, 1000);
            return () => clearInterval(timer);
        }
    }, [coolDown]);

    const onSubmit = async (e) => {
        if (coolDown > 0) return;
        await handleForgotPassword(e, email); // Call context handler
        setCoolDown(60); // Start cooldown
    };

    return (
        <div className="w-full h-full flex items-center justify-center">
            <div className='bg-white flex flex-col p-7 gap-5 rounded-[28px] max-w-[400px] w-full min-w-fit '>
                <div className='w-fit h-fit text-(--text)'>
                    <h3 className='font-bold'>Forgot Password</h3>
                    <p>Fill you email to reset your password</p>
                </div>
                <form onSubmit={onSubmit} className='flex flex-col gap-4 text-(--text)'>
                    <Input
                        type="email"
                        name="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="Email"
                        className="input primary"
                        required
                    />
                    {coolDown > 0 && (
                        <p className="text-(--text)">Not received reset link? <span className="text-red-500">Try again after {coolDown}s</span></p>
                    )}
                    <Button
                        type="submit"
                        className="btn disabled:opacity-50 bg-(--primary) disabled:cursor-not-allowed text-(--background) border-1 border-(--primary) hover:bg-transparent hover:text-(--primary)"
                        disabled={coolDown > 0}
                        text={"Reset"}
                    />

                </form>
            </div>

        </div>
    );
}

export default ForgotPassword;
