import React, { useState } from "react";
import Editor from "@monaco-editor/react";

export default () => {
    const preloadedCode = (
`const doubler = num => {
    
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
            const funcReturn = func(3); // pass in test arguments to func
            const resultString = ` answer Input: 3 Output: ${funcReturn} Expected: 6`; // replace input and expected output
            
            if (funcReturn === 6) setResult('Correct' + resultString);
            else setResult('Wrong' + resultString);
        } catch (error) {
            setResult(errorString(error));
        }
    };

    return (
        <div className="ide">
                <Editor
                    border-radius="24px"
                    height="55vh"
                    width="100vh"
                    theme="vs-dark"
                    defaultLanguage="javascript"
                    defaultValue={preloadedCode}
                    onChange={handleEditorChange}
                    position="relative"
                />
            <div className="ide-extras">
                <button className="run button" onClick={runCode}>RUN</button>
                <div className="ide-result">
                    <div>
                        {result ? result : ""}
                    </div>
                </div> 
                {/* {result ? <p style={{ color: 'white' }}>{result}</p> : null} */}
            </div>
        </div>
    );
};
