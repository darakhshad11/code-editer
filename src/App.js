import React from 'react';
import CodeEditor from './component/CodeEditor';

function App() {
  return (
    <div className="flex flex-col items-center justify-center h-screen">
      <h1 className="text-2xl font-bold text-center mb-4">Code Editor</h1>
      <div className="w-full max-w-md">
        <CodeEditor />
      </div>
    </div>
  );
}

export default App;
