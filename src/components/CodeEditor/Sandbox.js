import MonacoEditor from "./sandbox/MonacoEditor";
import { useState, useEffect } from "react";
import SubmitHandler from "./sandbox/SubmitHandler";
import Options from "./sandbox/Options";
import Modal from "../../ui/Modal";
import CodeEditorModal from "../../ui/CodeEditorModal";
import StdInOutComponent from "./sandbox/StdInOut";

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

function Sandbox() {
  const [selectedLanguage, setSelectedLanguage] = useState(1);
  const [selectedTheme, setSelectedTheme] = useState("vs-dark");
  const [codeEditorExtend, setCodeEditorExtend] = useState(false);
  const [userCode, setUserCode] = useState(
    initialCodes[
      programmingLanguages.find((language) => language.id === selectedLanguage)
        ?.name
    ]
  );

  useEffect(() => {
    setUserCode(
      initialCodes[
        programmingLanguages.find(
          (language) => language.id === selectedLanguage
        )?.name
      ]
    );
  }, [selectedLanguage]);

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
            userCode={userCode}
            language={
              programmingLanguages.find(
                (language) => language.id === selectedLanguage
              )?.name
            }
            setUserCode={setUserCode}
            selectedTheme={selectedTheme}
            setCodeEditorExtend={setCodeEditorExtend}
          />
        )}
      />
    );
  }

  return (
    <div className="flex flex-col overflow-auto bg-gray-100">
      <Options
        programmingLanguages={programmingLanguages}
        selectedLanguage={selectedLanguage}
        setSelectedLanguage={setSelectedLanguage}
        selectedTheme={selectedTheme}
        setSelectedTheme={setSelectedTheme}
        onReset={onReset}
        setCodeEditorExtend={setCodeEditorExtend}
      />

      <div className="relative mb-2">
        <div className="h-[500px]">
          <MonacoEditor
            language={
              programmingLanguages.find(
                (language) => language.id === selectedLanguage
              )?.name
            }
            selectedTheme={selectedTheme}
            userCode={userCode}
            setUserCode={setUserCode}
          />
        </div>

        <div className="absolute bottom-6 right-5">
          <SubmitHandler
            userCode={userCode}
            language={
              programmingLanguages.find(
                (language) => language.id === selectedLanguage
              )?.name
            }
          />
        </div>
      </div>

      <hr />

      <div>
        <StdInOutComponent />
      </div>
    </div>
  );
}

export default Sandbox;
