import { connect } from "react-redux";
import SessionForm from "./session_form";
import { closeModal } from "../../actions/modal_actions";
import { signup, login, clearSessionErrors } from "../../actions/session_actions";
import { joinRoom } from '../../actions/room_actions'

const mapStateToProps = (state) => {
    return {
        formType: "Signup",
        session: state.session.user,
        errors: state.errors.session,
        joinPath: state.ui.modal.props.path,
        isSignedIn: state.session.isSignedIn
    }
};

const mapDispatchToProps = dispatch => ({
    closeModal: () => dispatch(closeModal()),
    processForm: user => dispatch(signup(user)),
    login: user => dispatch(login(user)),
    clearSessionErrors: () => dispatch(clearSessionErrors()),
    joinRoom: (roomId) => dispatch(joinRoom(roomId))
});

export default connect(mapStateToProps, mapDispatchToProps)(SessionForm);