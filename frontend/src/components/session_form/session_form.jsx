
import React, {useEffect} from "react";
import closeButton from "../../assets/images/close.png";
import logo from "../../assets/images/concat_logo.png";
import { useState } from "react";
import { useHistory } from "react-router-dom";
import { clearErrors } from "../../actions/session_actions";
import { useDispatch } from "react-redux";

const SessionForm = props => {

    const dispatch = useDispatch() 

    const [state, setState] = useState({
        username: '',
        password: '',
        password2: ''
    });

    useEffect(() => {
        dispatch(clearErrors)
    }, [dispatch])

    const history = useHistory();

    const update = field => {
        return e => setState({
            ...state, [field]: e.currentTarget.value
        });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        const user = Object.assign({}, state);
        if (props.joinPath) {
            props.joinRoom(props.roomId).then(() => {
                history.push(props.joinPath)
            })
        }
        props.processForm(user).then(() => {
            if (Object.values(props.session).length > 0) {
                    history.push("/rooms");
            };
        }).finally(() => closeModal());
    };

    let usernameError;
    if (props.errors.username) usernameError = "input-error";

    let passwordError;
    if (props.errors.password) passwordError = "input-error";

    let password2Error;
    if (props.errors.password2) password2Error = "input-error";

    const closeModal = () => {
        props.closeModal();
        props.clearSessionErrors();
    };

    const demoUser = {
        username: "test1",
        password: "password"
    };

    const handleDemoSignin = () => {
        props.processForm(demoUser).then(() => {
            if (Object.values(props.session).length > 0) {
                history.push("/rooms");
            };
        }).finally(() => closeModal());
    };

    return(
        <div className="session-form-div">
            <form className="session-form" onSubmit={handleSubmit}>

                <div className="close-button-div">
                    <img src={closeButton} alt="close" className="close-button" onClick={closeModal}/>
                </div>

                <img src={logo} alt="logo" className="form-logo"/>

                <span>.concat</span>

                <label htmlFor="username"></label>
                <input type="text" name="username" placeholder="Username" value={state.username} onChange={update("username")} className={usernameError} />
                {(props.errors.username) ? <p className="error">{props.errors.username}</p> :null }


                <label htmlFor="password"></label>
                <input type="password" name="password" placeholder="Password" value={state.password} onChange={update("password")} className={passwordError} />
                {(props.errors.password) ? <p className="error">{props.errors.password}</p> :null }

                {(props.formType === "Signup") ? 
                <div>
                    <label htmlFor="confirm-password"></label>
                    <input type="password" name="confirm-password" placeholder="Retype password" value={state.password2} onChange={update("password2")} className={password2Error} />
                    {(props.errors.password2) ? <p className="error">{props.errors.password2}</p> :null }
                </div> : null}

                <button type="submit">{(props.formType === "Login") ? "Log in" : "Create an account"}</button>

                <p onClick={handleDemoSignin}>Log in as demo user</p>
            </form>
        </div>
    )
};

export default SessionForm;