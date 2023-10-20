import React, { useEffect, useState } from "react";
import FileSaver from "file-saver";
import CodeMirror from "@uiw/react-codemirror";
import { vscodeDark } from "@uiw/codemirror-theme-vscode";
import { StreamLanguage } from '@codemirror/language';
// import { cpp } from '@codemirror/legacy-modes/mode/cpp';
import { python } from '@codemirror/legacy-modes/mode/python';
import { javascript } from '@codemirror/legacy-modes/mode/javascript';
import {cpp} from '@codemirror/lang-cpp';
import {java} from '@codemirror/lang-java';
import { loadLanguage, langs } from '@uiw/codemirror-extensions-langs';
import { FaCopy, FaLock, FaUnlock, FaSave } from "react-icons/fa";

const CodeEditor = () => {
  const [code, setCode] = useState("// Write your code here");
  const [isLocked, setLocked] = useState(false);
  const [selectedLanguage, setSelectedLanguage] = useState("javascript");
  useEffect(() => {
    
    if (selectedLanguage in langs) {
      loadLanguage(selectedLanguage);
    }
  }, [selectedLanguage]);

  const handleCopy = () => {
    if (!isLocked) {
      navigator.clipboard.writeText(code).then(() => {
        console.log("Code copied to clipboard");
      });
    }
  };

  const handleLockToggle = () => {
    setLocked(!isLocked);
  };

  const handleSave = () => {
    const blob = new Blob([code], { type: "text/plain;charset=utf-8" });
    FileSaver.saveAs(blob, "myCodeFile.txt");
  };

  const handleLanguageChange = (language) => {
    setSelectedLanguage(language);
  };

  return (
    <div className="flex flex-col space-y-4">
      <div className="flex space-x-2">
        <button
          onClick={handleCopy}
          disabled={isLocked}
          className={`px-4 py-2 rounded-md ${
            isLocked ? "bg-gray-300" : "bg-blue-500 hover:bg-blue-600"
          } text-white flex items-center`}
        >
          <FaCopy className="mr-2" />
          Copy
        </button>
        <button
          onClick={handleLockToggle}
          className={`px-4 py-2 rounded-md ${
            isLocked
              ? "bg-red-500 hover:bg-red-600"
              : "bg-green-500 hover:bg-green-600"
          } text-white flex items-center`}
        >
          {isLocked ? (
            <FaUnlock className="mr-2" />
          ) : (
            <FaLock className="mr-2" />
          )}
          {isLocked ? "Unlock" : "Lock"}
        </button>
        <button
          onClick={handleSave}
          className="px-4 py-2 rounded-md bg-indigo-500 hover:bg-indigo-600 text-white flex items-center"
        >
          <FaSave className="mr-2" />
          Save
        </button>
        <select
          value={selectedLanguage}
          onChange={(e) => handleLanguageChange(e.target.value)}
          className="px-4 py-2 rounded-md bg-gray-200"
        >
          <option value="cpp">C++</option>
          <option value="java">Java</option>
          <option value="python">Python</option>
          <option value="javascript">JavaScript</option>
        </select>
      </div>
      <div className="codeeditor" id="coding">
        <CodeMirror
          value={code}
          height="500px"
          width="100%"
          theme={vscodeDark}
          readOnly={isLocked} // Make it read-only when locked
          extensions={[StreamLanguage.define(java)]}
          onChange={(value, viewUpdate) => {
            setCode(value);
          }}
        />
      </div>
    </div>
  );
};

export default CodeEditor;
