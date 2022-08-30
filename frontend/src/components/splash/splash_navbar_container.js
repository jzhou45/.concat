import { connect } from "react-redux";
import SplashNavBar from "./splash_navbar";
import { openModal } from "../../actions/modal_actions";

const mapStateToProps = state => ({

});

const mapDispatchToProps = dispatch => ({
    openModal: (modal, props) => dispatch(openModal(modal, props))
});

export default connect(null, mapDispatchToProps)(SplashNavBar);