import React, { useState, useEffect } from "react";
import Editor from "@monaco-editor/react";
import { connect } from "react-redux";
import { fetchDocument, createDocument, updateDocument } from "../../actions/document_actions";
import io from 'socket.io-client';

const socket = io(process.env.PORT || 'http://localhost:3000');

export const IDE = props => {
    const {roomId, problemId, problem, fetchDocument, createDocument, updateDocument, user, document} = props;

    const testArray = testCase => {
        let left = 0, right = 0, arr = [], 
        match = testCase.match(/([^[\]]+)|([[\]])/g), L = match.length, next, str= '';

        for (let i = 0; i < L; i++) {
            next = match[i];
            if (next === '[') left++;
            else if (next === ']') right++;

            if (left !== 0){
                str += next;
                if (left === right){
                    arr[arr.length - 1] += str;
                    left = right = 0;
                    str = '';
                }
            }
            else arr = arr.concat(next.match(/([^,]+)/g));
        }

        const testArray = arr.map(el => el.trim().split(/\s*=\s*/));
        return testArray.map(test => {
            try {
                const parsedArg = JSON.parse(test[1]);
                return [test[0], parsedArg];
            } catch (error) {
                return test;
            }
        });
    };

    const errorArray = error => {
        const regex = /<anonymous>:(\d+):/;
        let errorArray = [error.toString()];

        if (error.stack.match(regex)) {
            errorArray.unshift(`Line ${parseInt(error.stack.match(regex)[1]) - 2}:`);
        }
        
        return errorArray;
    };

    const camelize = str => {
        return str.toLowerCase().replace(/[^a-zA-Z0-9]+(.)/g, (m, chr) => chr.toUpperCase());
    };

    const preloadedCode = `const ${camelize(problem.title)} = (${testArray(problem.testCase).map(arg => arg[0]).join(', ')}) => {\n\t\n};`;

    const [code, setCode] = useState(document ? document.body : preloadedCode);
    const [result, setResult] = useState(null);
    const [saved, setSaved] = useState(true);

    const runCode = () => {
        let parsedSolution;
        try {
            parsedSolution = JSON.parse(problem.solution);
        } catch (error) {
            parsedSolution = problem.solution;
        }

        try {
            const func = Function(`${code}\nreturn ${camelize(problem.title)};`)();
            const funcReturn = func(...(testArray(problem.testCase).map(arg => arg[1])));
            const resultArray = [`Input: ${problem.testCase}`, `Output: ${JSON.stringify(funcReturn)}`, `Expected: ${JSON.stringify(parsedSolution)}`]

            if ((Array.isArray(funcReturn) && Array.isArray(parsedSolution) &&
            funcReturn.sort().join(',') === parsedSolution.sort().join(',')) ||
            ((typeof funcReturn === 'string' || typeof funcReturn === 'number' || typeof funcReturn === 'boolean') &&
            funcReturn === parsedSolution)) {
                setResult(['Correct Answer'].concat(resultArray));
            }
            else setResult(['Wrong Answer'].concat(resultArray));
        } catch (error) {
            setResult(errorArray(error));
        }
    };

    const handleEditorChange = value => {
        socket.emit('codeChange', {value, userId: user.id});
    };

    useEffect(() => {
        let timeoutId = null;

        socket.on('codeChange', payload => {
            if (user.id === payload.userId) {
                if (timeoutId) clearTimeout(timeoutId);
                timeoutId = autosave(payload.value, user.username);
            } else {
                setCode(payload.value);
            }
            setSaved(false);
        });

        socket.on('documentSaved', userId => {
            if (user.id !== userId) fetchDocument(roomId, problemId);
            setSaved(true);
        });

        return () => {
            socket.off('codeChange');
            socket.off('documentSaved');
        };
    }, []);

    const autosave = (body, lastEditor) => setTimeout(() => {
        if (document) {
            updateDocument(roomId, problemId, { body, lastEditor });
        } else {
            createDocument(roomId, problemId, { body, lastEditor });
        }

        socket.emit('documentSaved', user.id);
    }, 2000);

    return (
        <div className="ide">
            <div className="ide-content">
                <div className={`save-status ${document ? "" : "hide"}`}>
                    {saved ? `Last edit was ${document?.updatedAt} by ${document?.lastEditor}` : 'Saving...'}
                </div>
                <Editor
                    border-radius="24px"
                    height="55vh"
                    width="45vw"
                    theme="vs-dark"
                    defaultLanguage="javascript"
                    value={code}
                    onChange={handleEditorChange}
                    position="relative"
                />
            </div>
            <div className="ide-extras">
                <button className="run button" onClick={runCode}>RUN</button>
                <div className="ide-result">
                    <div>
                        {result ? result.map((el, i) => <div key={i}>{el}</div>) : null}
                    </div>
                </div>
            </div>
        </div>
    );
};

const mSTP = state => ({
    user: state.session.user,
    document: state.document
});

const mDTP = dispatch => ({
    fetchDocument: (roomId, problemId) => dispatch(fetchDocument(roomId, problemId)),
    createDocument: (roomId, problemId, documentData) => dispatch(createDocument(roomId, problemId, documentData)),
    updateDocument: (roomId, problemId, documentData) => dispatch(updateDocument(roomId, problemId, documentData))
});

export default connect(mSTP, mDTP)(IDE);