import React, { useState } from "react";
import Editor from "@monaco-editor/react";

export default () => {
    const problem = {
        title: 'Two Sum',
        description: `Given an array of integers nums and an integer target, return indices of the two numbers such that they add up to target.

        You may assume that each input would have exactly one solution, and you may not use the same element twice.
        
        You can return the answer in any order.`,
        testCase: 'nums = [2,7,11,15], target = 9',
        solution: '[0,1]'
    };

    const testArray = testCase => {
        let left = 0, right = 0, arr = [], 
        match = testCase.match(/([^\[\]]+)|([\[\]])/g), L = match.length, next, str= '';

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

    const [code, setCode] = useState(preloadedCode);
    const [result, setResult] = useState(null);

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
        setCode(value);
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
                <button className="save button" onClick={runCode}>SAVE</button>
                <div className="ide-result">
                  {result ? result.map((el, i) => <p key={i}>{el}</p>) : null}
                </div>
            </div>
        </div>
    );
};
