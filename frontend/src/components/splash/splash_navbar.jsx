import React from "react";

const SplashNavBar = () => {
    const content = () => {
        return(
            <div className="splash-navbar">
                <span className="logo">.concat</span>
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