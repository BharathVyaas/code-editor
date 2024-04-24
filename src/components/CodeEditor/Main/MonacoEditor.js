import { useRef, useEffect } from "react";
import { Editor } from "@monaco-editor/react";

function MonacoEditor({ language, userCode, setUserCode }) {
  const editorRef = useRef(null);

  useEffect(() => {
    if (editorRef.current) {
      editorRef.current.focus();
    }
  }, [editorRef, language]);

  const handleEditorChange = (userCode) => setUserCode(userCode);

  return (
    <Editor
      width="100%"
      height="100%"
      value={userCode}
      language={language}
      options={{
        minimap: { enabled: true },
      }}
      onChange={handleEditorChange}
      theme="vs-dark"
      editorRef={editorRef}
    />
  );
}

export default MonacoEditor;
