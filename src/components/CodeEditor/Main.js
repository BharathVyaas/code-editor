import TechnologySelector from "./Main/TechnologySelector";
import MonacoEditor from "./Main/MonacoEditor";
import { useState, useEffect } from "react";
import SubmitHandler from "./Main/SubmitHandler";

const programmingLanguages = [
  { id: 1, name: "PYTHON" },
  { id: 2, name: "JAVASCRIPT" },
  { id: 3, name: "JAVA" },
  { id: 4, name: "C" },
  { id: 5, name: "C#" },
];

const initialCodes = {
  PYTHON: `class HelloWorld123:\n    @staticmethod\n    def main():\n`,
  JAVASCRIPT: `class HelloWorld123 {\n    static main() {\n`,
  JAVA: `public class HelloWorld123 {\n    public static void main(String[] args) {\n`,
  C: `#include <stdio.h>\n\nint main() {\n`,
  "C#": `using System;\n\npublic class HelloWorld123\n{\n    public static void Main(string[] args)\n    {\n`,
};

function Main() {
  const [selectedLanguage, setSelectedLanguage] = useState(1);

  const [userCode, setUserCode] = useState(
    initialCodes[
      programmingLanguages.find((language) => language.id === selectedLanguage)
        .name
    ]
  );

  useEffect(() => {
    setUserCode(
      initialCodes[
        programmingLanguages.find(
          (language) => language.id === selectedLanguage
        ).name
      ]
    );
  }, [selectedLanguage]);

  return (
    <>
      <div className="mb-4 flex justify-end px-4">
        <TechnologySelector
          programmingLanguages={programmingLanguages}
          selectedLanguage={selectedLanguage}
          setSelectedLanguage={setSelectedLanguage}
        />
      </div>

      <div style={{ height: "600px" }}>
        <MonacoEditor
          language={
            programmingLanguages.find(
              (language) => language.id === selectedLanguage
            )?.name
          }
          userCode={userCode}
          setUserCode={setUserCode}
        />
      </div>

      <div className=" mt-5 w-full flex justify-end">
        <SubmitHandler
          userCode={userCode}
          language={
            programmingLanguages.find(
              (language) => language.id === selectedLanguage
            ).name
          }
        />
      </div>
    </>
  );
}

export default Main;
