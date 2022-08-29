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

    const handleEditorChange = value => {
        setCode(value);
    };

    const runCode = () => {
        const func = Function(`${code}\nreturn doubler;`)(); // replace 'doubler' with the name of the preloaded function
        const result1 = func(3); // pass in test arguments to func
        console.log(result1);
    };

    return (
        <div>
            <Editor
                height="90vh"
                defaultLanguage="javascript"
                defaultValue={preloadedCode}
                onChange={handleEditorChange}
            />
            <button onClick={runCode}>Run Code</button>
        </div>
    );
};
