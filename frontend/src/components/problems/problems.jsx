import { connect } from "react-redux";
import { fetchProblems } from "../../actions/problem_actions";
import { useEffect } from "react";

const Problems = props => {
    useEffect(() => props.fetchProblems(), []);

    return(
        <div>
            Hello World
        </div>
    );
};

const mSTP = state => ({
    problems: state.problems
});

const mDTP = dispatch => ({
    fetchProblems: () => dispatch(fetchProblems())
});

export default connect(mSTP, mDTP)(Problems);