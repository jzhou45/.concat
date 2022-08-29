import { connect } from "react-redux";
import SessionForm from "./session_form";
import { closeModal } from "../../actions/modal_actions";
import { signup, login, clearSessionErrors } from "../../actions/session_actions";

const mapStateToProps = state => ({
    formType: "Signup",
    session: state.session.user,
    errors: state.errors.session
});

const mapDispatchToProps = dispatch => ({
    closeModal: () => dispatch(closeModal()),
    processForm: user => dispatch(signup(user)),
    login: user => dispatch(login(user)),
    clearSessionErrors: () => dispatch(clearSessionErrors())
});

export default connect(mapStateToProps, mapDispatchToProps)(SessionForm);