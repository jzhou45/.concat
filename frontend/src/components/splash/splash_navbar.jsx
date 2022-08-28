import React from "react";
import logo from "../../assets/images/concat_logo.png"

const SplashNavBar = () => {
    const content = () => {
        return(
            <div className="splash-navbar">
                <div className="logo-div">
                    <p>.con</p>
                    <img src={logo}/>
                    <p>at</p>
                </div>
                <div className="splash-navbar-buttons">
                    <button>Login</button>
                    <button>Signup</button>
                </div>
            </div>
        );
    };

    return content();
};

export default SplashNavBar;