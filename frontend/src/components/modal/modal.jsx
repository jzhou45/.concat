import React from "react";
import LoginFormContainer from "../session_form/login_form_container";
import SignupFormContainer from "../session_form/signup_form_container";
import CreateRoomForm from '../rooms/create_room_form';
import EditRoomForm from '../rooms/edit_room_form'
import DeleteRoom from '../rooms/delete_room_modal'
import JoinRoom from '../rooms/join_room_form'
import LeaveRoom from '../rooms/leave_room_modal'
import CreateProblems from "../problems/create_problems";
import EditProblem from '../problems/edit_problem'
import DeleteProblem from '../problems/delete_problem'
import ProgressTracker from '../progress_tracker/progress_tracker_modal'

const Modal = (props) => {
    if (!props.modal) return null;

    let component;

    switch (props.modal.type) {
    case 'login':
        component = <LoginFormContainer />;
        break;
    case 'signup':
        component = <SignupFormContainer />;
        break;
    case 'createroom':
        component = <CreateRoomForm />;
        break;
    case 'editroom':
        component = <EditRoomForm />;
        break;
    case 'deleteroom':
        component = <DeleteRoom/>;
        break;
    case 'joinroom':
        component = <JoinRoom/>;
        break;
    case 'leaveroom':
        component = <LeaveRoom/>;
        break;
    case 'createproblem':
        component = <CreateProblems/>;
        break;
    case 'editproblem':
        component = <EditProblem/>;
        break;
    case 'deleteproblem':
        component = <DeleteProblem/>;
        break;
    case 'progresstracker':
        component = <ProgressTracker/>;
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