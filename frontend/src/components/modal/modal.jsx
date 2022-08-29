import React from "react";
import LoginFormContainer from "../session_form/login_form_container";
import SignupFormContainer from "../session_form/signup_form_container";
import CreateRoomForm from '../rooms/create_room_form';

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
    case 'createroom':
        component = <CreateRoomForm />;
        break;
    default:
        return null;
    };

    const closeModal = () => {
        props.closeModal();
        props.clearSessionErrors();
    };

    return (
        <div className="modal-background" onClick={closeModal}>
          <div className="modal-child" onClick={e => e.stopPropagation()}>
            { component }
          </div>
        </div>
    );
};

export default Modal;