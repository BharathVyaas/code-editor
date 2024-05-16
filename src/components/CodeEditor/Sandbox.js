import MonacoEditor from "./sandbox/MonacoEditor";
import { useState, useEffect, useMemo } from "react";
import OptionsComponent from "./sandbox/Options";
import Modal from "../../ui/Modal";
import CodeEditorModal from "../../ui/CodeEditorModal";
import StdInOutComponent from "./sandbox/StdInOut";
import { updateUserCode } from "../../redux/slices/codeEditorSlice";
import { connect } from "react-redux";

const programmingLanguages = [
  { id: 1, name: "python" },
  { id: 2, name: "javascript" },
  { id: 3, name: "java" },
  { id: 4, name: "c" },
  { id: 5, name: "csharp" },
];

function SandboxComponent({ retrievedDetails, setUserCode }) {
  const [selectedLanguage, setSelectedLanguage] = useState(1);
  const [selectedTheme, setSelectedTheme] = useState("vs-dark");
  const [codeEditorExtend, setCodeEditorExtend] = useState(false);
  const [testCasesOutput, setTestCasesOutput] = useState({});

  const DefaultPrograms = useMemo(
    () =>
      retrievedDetails?.DefaultProgram
        ? JSON.parse(retrievedDetails.DefaultProgram)
        : "",
    [retrievedDetails]
  );

  useEffect(() => {
    setTestCasesOutput({});
  }, []);

  useEffect(() => {
    setUserCode(
      DefaultPrograms[
        programmingLanguages.find(
          (language) => language.id === selectedLanguage
        )?.name || ""
      ] || ""
    );
  }, [selectedLanguage, setUserCode, DefaultPrograms]);

  const onReset = () => {
    setUserCode(
      DefaultPrograms[
        programmingLanguages.find(
          (language) => language.id === selectedLanguage
        )?.name || ""
      ] || ""
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
    <div className="flex flex-col overflow-auto bg-gray-100">
      <div className="bg-white border-b border-gray-200 w-full px-2 md:px-4 py-2 flex items-center justify-between gap-y-3 flex-wrap lg:flex-nowrap overflow-auto hide-scroll align-middle shadow-md">
        <OptionsComponent
          programmingLanguages={programmingLanguages}
          selectedLanguage={selectedLanguage}
          setSelectedLanguage={setSelectedLanguage}
          selectedTheme={selectedTheme}
          setSelectedTheme={setSelectedTheme}
          onReset={onReset}
          setCodeEditorExtend={setCodeEditorExtend}
          testCasesOutput={testCasesOutput}
        />
      </div>

      <div className="relative mb-2">
        <div className="h-[360px]">
          <MonacoEditor
            language={
              programmingLanguages.find(
                (language) => language.id === selectedLanguage
              )?.name || ""
            }
            defaultCode={
              DefaultPrograms[
                programmingLanguages.find(
                  (language) => language.id === selectedLanguage
                )?.name || ""
              ]
            }
            selectedTheme={selectedTheme}
          />
        </div>
      </div>

      <hr />

      <div>
        <StdInOutComponent
          testCasesOutput={testCasesOutput}
          setTestCasesOutput={setTestCasesOutput}
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
  userCode: state.codeEditor.userCode,
  retrievedDetails: state.retrieveDetails.data,
});

const mapDispatchToProps = {
  setUserCode: (updatedCode) => updateUserCode(updatedCode),
};

const Sandbox = connect(mapStateToProps, mapDispatchToProps)(SandboxComponent);

export default Sandbox;
