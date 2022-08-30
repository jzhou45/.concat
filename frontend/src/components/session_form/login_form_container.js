import { connect } from "react-redux";
import SessionForm from "./session_form";
import { closeModal } from "../../actions/modal_actions";
import { login, clearSessionErrors } from "../../actions/session_actions";
import { joinRoom } from '../../actions/room_actions'

const mapStateToProps = state => ({
    formType: "Login",
    session: state.session.user,
    errors: state.errors.session,
    joinPath: state.ui.modal.props.path
});

const mapDispatchToProps = dispatch => ({
    closeModal: () => dispatch(closeModal()),
    processForm: user => dispatch(login(user)),
    clearSessionErrors: () => dispatch(clearSessionErrors()),
    joinRoom: (roomId) => dispatch(joinRoom(roomId))
});

export default connect(mapStateToProps, mapDispatchToProps)(SessionForm);