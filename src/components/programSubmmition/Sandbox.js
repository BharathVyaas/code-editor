import { useState, useEffect } from "react";
import Options from "./sandbox/Options";
import Modal from "../../ui/Modal";
import CodeEditorModal from "../../ui/CodeEditorModal";
import { updateUserCode } from "../../redux/slices/codeEditorSlice";
import { connect } from "react-redux";
import { Editor } from "@monaco-editor/react";

const programmingLanguages = [
  { id: 1, name: "python" },
  { id: 2, name: "javascript" },
  { id: 3, name: "java" },
  { id: 4, name: "c" },
  { id: 5, name: "csharp" },
];

const initialCodes = {
  python: `print("Hello, world!")`,
  javascript: `console.log("Hello, world!");`,
  java: `public class Main {
    public static void main(String[] args) {
        System.out.println("Hello, world!");
    }
}`,
  c: `#include <stdio.h>

  int main() {
      printf("Hello, world!\n");
      return 0;
  }`,
  csharp: `using System;

  class Program
  {
      static void Main(string[] args)
      {
          Console.WriteLine("Hello, world!");
      }
  }`,
};

function SandboxComponent({ userCode: _, setUserCode, containerHeight }) {
  const [selectedLanguage, setSelectedLanguage] = useState(1);
  const [selectedTheme, setSelectedTheme] = useState("vs-dark");
  const [codeEditorExtend, setCodeEditorExtend] = useState(false);

  useEffect(() => {
    setUserCode(
      initialCodes[
        programmingLanguages.find(
          (language) => language.id === selectedLanguage
        )?.name
      ]
    );
  }, [selectedLanguage, setUserCode]);

  const onReset = () => {
    setUserCode(
      initialCodes[
        programmingLanguages.find(
          (language) => language.id === selectedLanguage
        )?.name
      ]
    );
  };

  if (codeEditorExtend) {
    return (
      <Modal
        ModalView={() => (
          <CodeEditorModal
            language={
              programmingLanguages.find(
                (language) => language.id === selectedLanguage
              )?.name
            }
            selectedTheme={selectedTheme}
            setCodeEditorExtend={setCodeEditorExtend}
          />
        )}
      />
    );
  }

  return (
    <div style={{ width: "100%", height: "100%" }}>
      <div
        style={{ width: "100%", height: "11%" }}
        className="bg-nareshit-primary border-b border-gray-200 px-4 py-2 flex items-center justify-between align-middle shadow-md"
      >
        <Options
          programmingLanguages={programmingLanguages}
          selectedLanguage={selectedLanguage}
          setSelectedLanguage={setSelectedLanguage}
          selectedTheme={selectedTheme}
          setSelectedTheme={setSelectedTheme}
          onReset={onReset}
          setCodeEditorExtend={setCodeEditorExtend}
        />
      </div>
      <div style={{ width: "100%", height: "88%", backgroundColor: "#FFFFFF" }}>
        {/* Adjust the backgroundColor value to the desired color */}
        <Editor
          width={"100%"}
          height={"100%"}
          options={{ fontSize: 16 }}
          theme={selectedTheme}
          language={
            programmingLanguages.find(
              (language) => language.id === selectedLanguage
            )?.name
          }
        />
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

const Sandbox = connect(mapStateToProps, mapDispatchToProps)(SandboxComponent);

export default Sandbox;
