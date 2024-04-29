import { Editor } from "@monaco-editor/react";
import { Button } from "@mui/material";
import { useCallback, useEffect, useRef } from "react";
import CloseFullscreenIcon from "@mui/icons-material/CloseFullscreen";
import { updateUserCode } from "../redux/slices/codeEditorSlice";
import { connect } from "react-redux";

function CodeEditorModalComponent({
  userCode,
  language,
  setUserCode,
  selectedTheme,
  setCodeEditorExtend,
}) {
  const editorRef = useRef(null);
  const onModalClose = useCallback(() => {
    setUserCode(editorRef.current?.getValue());
    setCodeEditorExtend(false);
  }, [setUserCode, setCodeEditorExtend]);

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === "Escape") {
        onModalClose();
      }
    };
    window.addEventListener("keydown", handleKeyDown);

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [onModalClose]);

  useEffect(() => {
    if (editorRef.current) {
      editorRef.current.focus();
    }
  }, [editorRef, language]);

  const onMount = (editor, _) => {
    editorRef.current = editor;
    editor.focus();

    editorRef.current.onDidPaste((e) => editorRef.current.setValue(userCode));
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
            find: {
              useRegx: true,
            },
            minimap: { enabled: true },
          }}
          onMount={onMount}
          theme={selectedTheme}
          editorRef={editorRef}
        />
      </div>
      <div className="absolute top-1 right-1">
        <Button onClick={onModalClose}>
          <CloseFullscreenIcon
            style={{ fontSize: 30 }}
            className="text-gray-500 cursor-pointer"
          />
        </Button>
      </div>
    </div>
  );
}

const mapStateToProps = (state) => ({
  userCode: state.codeEditor.present.userCode,
});

const mapDispatchToProps = {
  setUserCode: (updatedCode) => updateUserCode(updatedCode),
};

const CodeEditorModal = connect(
  mapStateToProps,
  mapDispatchToProps
)(CodeEditorModalComponent);

export default CodeEditorModal;
