import { connect } from "react-redux";
import SplashNavBar from "./splash_navbar";
import { openModal } from "../../actions/modal_actions";

const mapStateToProps = state => ({

});

const mapDispatchToProps = dispatch => ({
    openModal: modal => dispatch(openModal(modal))
});

export default connect(null, mapDispatchToProps)(SplashNavBar);