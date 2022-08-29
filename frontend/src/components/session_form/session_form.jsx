import React from "react";
import closeButton from "../../assets/images/close.png";
import logo from "../../assets/images/concat_logo.png";
import { useState } from "react";
import { useHistory } from "react-router-dom";

const SessionForm = props => {
    const [state, setState] = useState({
        username: '',
        password: '',
        password2: ''
    });

    const history = useHistory();

    const update = field => {
        return e => setState({
            ...state, [field]: e.currentTarget.value
        });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        const user = Object.assign({}, state);
        props.processForm(user).then(() => {
            if (props.session) history.push("/rooms")
        });
    };

    return(
        <div className="session-form-div">
            <form className="session-form" onSubmit={handleSubmit}>

                <div className="close-button-div">
                    <img src={closeButton} alt="close" className="close-button" onClick={props.closeModal}/>
                </div>

                <img src={logo} alt="logo" className="form-logo"/>

                <span>Welcome to .concat</span>

                <label htmlFor="username"></label>
                <input type="text" name="username" placeholder="Username" value={state.username} onChange={update("username")} />

                <label htmlFor="password"></label>
                <input type="password" name="password" placeholder="Password" value={state.password} onChange={update("password")} />

                {(props.formType === "Signup") ? 
                <div>
                    <label htmlFor="confirm-password"></label>
                    <input type="password" name="confirm-password" placeholder="Retype password" value={state.password2} onChange={update("password2")} />
                </div> : null}

                <button type="submit">{(props.formType === "Login") ? "Log in" : "Create an account"}</button>

                <p>Log in as demo user</p>
            </form>
        </div>
    )
};

export default SessionForm;