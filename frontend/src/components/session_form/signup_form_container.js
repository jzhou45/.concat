import { connect } from "react-redux";
import SessionForm from "./session_form";
import { closeModal } from "../../actions/modal_actions";

const mapStateToProps = state => ({
    formType: "signup"
});

const mapDispatchToProps = dispatch => ({
    closeModal: () => dispatch(closeModal())
});

export default connect(mapStateToProps, mapDispatchToProps)(SessionForm);