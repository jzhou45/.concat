import React from "react";
import logo from "../../assets/images/concat_logo.png"
import { Link } from "react-router-dom";

const SplashNavBar = (props) => {
        const {openModal, joinPath, roomId} = props

    const handleClick = (formType) => {
        return e => {
            e.preventDefault();
            openModal(formType, {path: joinPath, roomId: roomId});
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
                    <Link to="/about">
                        <div className="button about">
                            About Team
                        </div>  
                    </Link>
                    <button className="login" onClick={handleClick("login")}>Login</button>
                    <button onClick={handleClick("signup")}>Signup</button>
                </div>
            </div>
        );
    };

    return content();
};

export default SplashNavBar;