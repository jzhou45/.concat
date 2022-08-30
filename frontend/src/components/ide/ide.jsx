import React, { useState } from "react";
import Editor from "@monaco-editor/react";

export default () => {
    const preloadedCode = (
`// Write a function that takes in a number as an argument and returns that number multiplied by two
// example: doubler(3) => 6

const doubler = num => {
    
};`
    );

    const [code, setCode] = useState(preloadedCode);
    const [result, setResult] = useState(null);

    const handleEditorChange = value => {
        setCode(value);
    };

    const errorString = error => {
        const regex = /<anonymous>:(\d+):/;
        let errorString = error.toString();

        if (error.stack.match(regex)) {
            errorString = `Line ${parseInt(error.stack.match(regex)[1]) - 2}: ` + errorString;
        }
        
        return errorString;
    };

    const runCode = () => {
        try {
            const func = Function(`${code}\nreturn doubler;`)(); // replace 'doubler' with the name of the preloaded function
            setResult(func(3)); // pass in test arguments to func
        } catch (error) {
            setResult(errorString(error));
        }
    };

    return (
        <div>
            <Editor
                height="90vh"
                theme="vs-dark"
                defaultLanguage="javascript"
                defaultValue={preloadedCode}
                onChange={handleEditorChange}
            />
            <button onClick={runCode}>Run Code</button>
            {result ? <p style={{ color: 'white' }}>{result}</p> : null}
        </div>
    );
};
