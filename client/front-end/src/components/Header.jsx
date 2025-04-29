import Logo from "./Logo.jsx";

function Header({children}) {

    return (
        <div className="w-full h-fit flex flex-row justify-between px-8 items-center">
            <div className="w-fit h-fit">
                <Logo s={"var(--background)"} home={"var(--primary)"}/>
                
            </div>

            {children}

        </div>
    )
}

export default Header;