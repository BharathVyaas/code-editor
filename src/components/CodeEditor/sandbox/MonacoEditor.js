import { useRef, useEffect } from "react";
import { Editor } from "@monaco-editor/react";

function MonacoEditor({ language, userCode, selectedTheme, setUserCode }) {
  const editorRef = useRef(null);

  const onMount = (editor, _) => {
    editorRef.current = editor;
    editor.focus();

    editorRef.current.onDidPaste((e) => editorRef.current.setValue(userCode));
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
        fontSize: 14,
      }}
      onMount={onMount}
      onChange={handleEditorChange}
      theme={selectedTheme}
      editorRef={editorRef}
    />
  );
}

export default MonacoEditor;
