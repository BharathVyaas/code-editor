import { useRef, useEffect } from "react";
import { Editor } from "@monaco-editor/react";

function MonacoEditor({ language, userCode, selectedTheme, setUserCode }) {
  const editorRef = useRef(null);

  const onMount = (editor) => {
    editorRef.current = editor;
    editor.focus();
  };

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
      onMount={onMount}
      onChange={handleEditorChange}
      theme={selectedTheme}
      editorRef={editorRef}
    />
  );
}

export default MonacoEditor;
