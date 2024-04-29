import { useRef, useEffect, useState } from "react";
import { Editor } from "@monaco-editor/react";
import { updateUserCode } from "../../../redux/slices/codeEditorSlice";
import { connect } from "react-redux";
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Typography,
} from "@mui/material";

function MonacoEditorComponent({
  language,
  userCode,
  defaultCode,
  selectedTheme,
  pastUserCode,
  setUserCode,
}) {
  const editorRef = useRef(null);
  const pasteRef = useRef(0);
  const [didPaste, setDidPaste] = useState(0);
  const [showWarning, setShowWarning] = useState(false);

  const handlePaste = () => {
    setDidPaste((prev) => prev + 1);
    setShowWarning(true); // Show the warning message
  };

  useEffect(() => {
    if (didPaste > 0 && pasteRef.current !== didPaste) {
      pasteRef.current = didPaste;
      setUserCode(pastUserCode || defaultCode); // Reset code on paste
    }
  }, [didPaste, pastUserCode, defaultCode, pasteRef, setUserCode]);

  const onMount = (editor) => {
    editorRef.current = editor;
    editor.focus();
    editor.onDidPaste(() => handlePaste());
  };

  useEffect(() => {
    if (editorRef.current) {
      editorRef.current.focus();
    }
  }, [editorRef, language]);

  const handleEditorChange = (newCode) => {
    setUserCode(newCode);
  };

  const warningDialogStyles = {
    "& .MuiDialogTitle-root": {
      backgroundColor: "#ffe0e0", // Light red background
      padding: "16px 24px", // Adjust padding for content
    },
    "& .MuiDialogContent-root": {
      padding: "16px 24px", // Adjust padding for content
    },
  };

  return (
    <>
      <Editor
        width="100%"
        height="100%"
        value={userCode}
        language={language}
        options={{
          acceptSuggestionOnCommitCharacter: true,
          acceptSuggestionOnEnter: "on",
          accessibilitySupport: "auto",
          autoIndent: true,
          automaticLayout: true,
          codeLens: true,
          colorDecorators: true,
          contextmenu: true,
          cursorBlinking: "blink",
          cursorSmoothCaretAnimation: false,
          cursorStyle: "line",
          disableLayerHinting: false,
          disableMonospaceOptimizations: false,
          dragAndDrop: false,
          fixedOverflowWidgets: false,
          folding: true,
          foldingStrategy: "auto",
          fontLigatures: false,
          formatOnPaste: false,
          formatOnType: false,
          hideCursorInOverviewRuler: false,
          highlightActiveIndentGuide: true,
          links: true,
          mouseWheelZoom: false,
          multiCursorMergeOverlapping: true,
          multiCursorModifier: "alt",
          overviewRulerBorder: true,
          overviewRulerLanes: 2,
          quickSuggestions: true,
          quickSuggestionsDelay: 100,
          readOnly: false,
          renderControlCharacters: false,
          renderFinalNewline: true,
          renderIndentGuides: true,
          renderLineHighlight: "all",
          renderWhitespace: "none",
          revealHorizontalRightPadding: 30,
          roundedSelection: true,
          rulers: [],
          scrollBeyondLastColumn: 5,
          scrollBeyondLastLine: true,
          selectOnLineNumbers: true,
          selectionClipboard: false,
          selectionHighlight: true,
          showFoldingControls: "mouseover",
          smoothScrolling: true,
          suggestOnTriggerCharacters: true,
          wordBasedSuggestions: true,
          wordSeparators: "~!@#$%^&*()-=+[{]}|;:'\",.<>/?",
          wordWrap: "off",
          wordWrapBreakAfterCharacters: "\t})]?|&,;",
          wordWrapBreakBeforeCharacters: "{([+",
          wordWrapBreakObtrusiveCharacters: ".",
          wordWrapColumn: 80,
          wordWrapMinified: true,
          wrappingIndent: "none",
          fontSize: 16,
          minimap: { enabled: true },
        }}
        onMount={onMount}
        onChange={handleEditorChange}
        theme={selectedTheme}
        editorRef={editorRef}
      />

      {showWarning && (
        <Dialog open={showWarning}>
          <DialogTitle sx={warningDialogStyles}>
            <Typography variant="body3" color="error">
              Warning!
            </Typography>
          </DialogTitle>
          <DialogContent>
            <Typography variant="body1">
              Copying and pasting code during the test is not allowed.
            </Typography>
          </DialogContent>
          <DialogActions>
            <Button onClick={() => setShowWarning(false)}>OK</Button>
          </DialogActions>
        </Dialog>
      )}
    </>
  );
}

const mapStateToProps = (state) => ({
  userCode: state.codeEditor.present.userCode,
  pastUserCode:
    state.codeEditor.past?.[1]?.userCode ||
    state.codeEditor.past?.[0]?.userCode,
});

const mapDispatchToProps = {
  setUserCode: (updatedCode) => updateUserCode(updatedCode),
};

const MonacoEditor = connect(
  mapStateToProps,
  mapDispatchToProps
)(MonacoEditorComponent);

export default MonacoEditor;
