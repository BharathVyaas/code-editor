import MonacoEditor from "./sandbox/MonacoEditor";
import { useState, useEffect } from "react";
import SubmitHandler from "./sandbox/SubmitHandler";
import Options from "./sandbox/Options";
import Modal from "../../ui/Modal";
import CodeEditorModal from "../../ui/CodeEditorModal";

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
  const [codeEditorExtand, setCodeEditorExtand] = useState(false);

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

  if (codeEditorExtand)
    return (
      <Modal
        ModalView={() => (
          <CodeEditorModal
            userCode={userCode}
            language={selectedLanguage}
            setUserCode={setUserCode}
            selectedTheme={selectedTheme}
            setCodeEditorExtand={setCodeEditorExtand}
          />
        )}
      />
    );

  return (
    <div className="min-h-screen flex flex-col overflow-auto">
      <div className="bg-gray-100 border-b border-gray-200">
        <Options
          programmingLanguages={programmingLanguages}
          selectedLanguage={selectedLanguage}
          setSelectedLanguage={setSelectedLanguage}
          selectedTheme={selectedTheme}
          setSelectedTheme={setSelectedTheme}
          onReset={onReset}
          setCodeEditorExtand={setCodeEditorExtand}
        />
      </div>

      <div className="flex-1 relative">
        <div className="h-[600px]">
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

        <div className="absolute bottom-4 right-4">
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

      <div className=" p-4">
        <div className="mb-4">
          <p className="text-sm font-medium text-gray-600">stdIn:</p>
          <div className="text-sm text-gray-800 bg-gray-200 p-2 rounded-lg h-16 overflow-y-auto">
            print(1,2)
          </div>
        </div>
        <div>
          <p className="text-sm font-medium text-gray-600">stdOut:</p>
          <div className="text-sm text-gray-800 bg-gray-200 p-2 rounded-lg h-[20vh] overflow-y-auto">
            the output is 100
          </div>
        </div>
      </div>
    </div>
  );
}

export default Sandbox;
