import React from "react";
import logo from "../../assets/images/concat_logo.png"

const SplashNavBar = (props) => {
    
    const handleClick = (formType) => {
        return e => {
            e.preventDefault();
            props.openModal(formType, {path: props.joinPath, roomId: props.roomId});
        };
    };

    const content = () => {
        return(
            <div className="splash-navbar">
                <div className="logo-div">
                    <p>.con</p>
                    <img src={logo}/>
                    <p>at</p>
                </div>
                <div className="splash-navbar-buttons">
                    <button onClick={handleClick("login")}>Login</button>
                    <button onClick={handleClick("signup")}>Signup</button>
                </div>
            </div>
        );
    };

    return content();
};

export default SplashNavBar;