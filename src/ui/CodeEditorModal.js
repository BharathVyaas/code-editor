import { Editor } from "@monaco-editor/react";
import { Button } from "@mui/material";
import { useEffect, useRef } from "react";
import CloseFullscreenIcon from "@mui/icons-material/CloseFullscreen";

function CodeEditorModal({
  userCode,
  language,
  setUserCode,
  selectedTheme,
  setCodeEditorExtend,
}) {
  const editorRef = useRef(null);

  useEffect(() => {
    if (editorRef.current) {
      editorRef.current.focus();
    }
  }, [editorRef, language]);

  const onMount = (editor, monaco) => {
    editorRef.current = editor;
    editor.focus();
  };

  const onModalClose = () => {
    setUserCode(editorRef.current?.getValue());
    setCodeEditorExtend(false);
  };

  return (
    <div className="h-screen w-full grid place-content-center relative">
      <div style={{ width: "100vw", height: "100vh" }}>
        <Editor
          width="100%"
          height="100%"
          defaultValue={userCode}
          language={language}
          options={{
            minimap: { enabled: true },
          }}
          onMount={onMount}
          theme={selectedTheme}
          editorRef={editorRef}
        />
      </div>
      <div className="absolute top-0 right-5">
        <Button onClick={onModalClose}>
          <CloseFullscreenIcon
            style={{ fontSize: 40 }}
            className="text-gray-500 cursor-pointer"
          />
        </Button>
      </div>
    </div>
  );
}

export default CodeEditorModal;
