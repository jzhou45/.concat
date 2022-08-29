import React from "react";
import closeButton from "../../assets/images/close.png";
import logo from "../../assets/images/concat_logo.png";

const SessionForm = props => {
    return(
        <div className="session-form-div">
            <form className="session-form">

                <div className="close-button-div">
                    <img src={closeButton} alt="close" className="close-button" onClick={props.closeModal}/>
                </div>

                <img src={logo} alt="logo" className="form-logo"/>

                <span>Welcome to .concat</span>

                <label htmlFor="username"></label>
                <input type="text" name="username" placeholder="Username"/>

                <label htmlFor="password"></label>
                <input type="password" name="password" placeholder="Password"/>

                <button type="submit">{(props.formType === "Login") ? "Log in" : "Create an account"}</button>

                <p>Log in as demo user</p>
            </form>
        </div>
    )
};

export default SessionForm;