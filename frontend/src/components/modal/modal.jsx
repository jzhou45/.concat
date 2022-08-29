import React from "react";
import LoginFormContainer from "../session_form/login_form_container";
import SignupFormContainer from "../session_form/signup_form_container";

const Modal = (props) => {
    if (!props.modal) return null;

    let component;

    switch (props.modal) {
    case 'login':
        component = <LoginFormContainer />;
        break;
    case 'signup':
        component = <SignupFormContainer />;
        break;
    default:
        return null;
    };

    return (
        <div className="modal-background" onClick={props.closeModal}>
          <div className="modal-child" onClick={e => e.stopPropagation()}>
            { component }
          </div>
        </div>
    );
};

export default Modal;