import React, {useState, useEffect} from "react";
import { connect, useDispatch } from "react-redux";
import { closeModal } from "../../actions/modal_actions";
import { login, clearErrors } from "../../actions/session_actions";
import { joinRoom } from '../../actions/room_actions';
import { useHistory } from "react-router-dom";
import closeButton from "../../assets/images/close.png";
import logo from "../../assets/images/concat_logo.png";
import { demoUsername } from "../../util/constants_util";

const LoginForm = props => {
    const {session, errors, joinPath, closeModal, login, joinRoom, roomId} = props;

    const dispatch = useDispatch();

    const [state, setState] = useState({
        username: '',
        password: '',
    });

    useEffect(() => {
        dispatch(clearErrors)
    }, [dispatch]);

    const history = useHistory();

    const update = field => {
        return e => setState({
            ...state, [field]: e.currentTarget.value
        });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        const user = Object.assign({}, state);
        if (joinPath) {
            closeModal();
            joinRoom(roomId).then(() => {
                history.push(joinPath);
            });

        };
        login(user).then(() => {
            if (history.location.pathname === "/rooms"){
                closeModal();
            };
        });
    };


    let usernameError;
    if (errors.username) usernameError = "input-error";

    let passwordError;
    if (errors.password) passwordError = "input-error";

    const demoUser = {
        username: demoUsername,
        password: "password"
    };

    const handleDemoSignin = () => {
        login(demoUser).then(() => {
            if (Object.values(session).length > 0) {
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
                {(errors.username) ? <p className="error">{errors.username}</p> :null }


                <label htmlFor="password"></label>
                <input type="password" name="password" placeholder="Password" value={state.password} onChange={update("password")} className={passwordError} />
                {(errors.password) ? <p className="error">{errors.password}</p> :null }

                <button type="submit">Log In</button>

                <p onClick={handleDemoSignin}>Log in as demo user</p>
            </form>
        </div>
    );
};

const mapStateToProps = (state) => ({
    session: state.session.user,
    errors: state.errors.session,
    joinPath: state.ui.modal.props.path
});

const mapDispatchToProps = dispatch => ({
    closeModal: () => dispatch(closeModal()),
    login: user => dispatch(login(user)),
    joinRoom: (roomId) => dispatch(joinRoom(roomId))
});

export default connect(mapStateToProps, mapDispatchToProps)(LoginForm);