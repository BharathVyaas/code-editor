import { useRef, useEffect } from "react";
import { Editor } from "@monaco-editor/react";
import { updateUserCode } from "../../../redux/slices/codeEditorSlice";
import { connect } from "react-redux";

function MonacoEditorComponent({
  language,
  userCode,
  selectedTheme,
  setUserCode,
}) {
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

  const handleEditorChange = (newCode) => {
    setUserCode(newCode);
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
