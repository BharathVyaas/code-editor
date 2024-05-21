import MonacoEditor from "./sandbox/MonacoEditor";
import { useState, useEffect, useMemo } from "react";
import Options from "./sandbox/Options";
import Modal from "../../ui/Modal";
import CodeEditorModal from "../../ui/CodeEditorModal";
import StdInOutComponent from "./sandbox/StdInOut";
import { connect } from "react-redux";
import { setSelectedLanguage } from "../../redux/actions/types";
import {
  setSelectedLanguage as setDefaultLanguage,
  updateUserCode,
} from "../../redux/slices/examSlice";
import { useParams } from "react-router";

function SandboxComponent({
  retrievedDetails,
  setUserCode,
  savedCode,
  selectedLanguage,
  setSelectedLanguage,
  setDefaultLanguageDispatch,
}) {
  const [selectedTheme, setSelectedTheme] = useState("vs-dark");
  const [codeEditorExtend, setCodeEditorExtend] = useState(false);
  const [testCasesOutput, setTestCasesOutput] = useState({});
  const { problemId } = useParams();

  const programmingLanguages = useMemo(() => {
    return (
      retrievedDetails?.Languages?.split(",")?.map((language) => ({
        id: language,
        name: language,
      })) || []
    );
  }, [retrievedDetails]);

  useEffect(() => {
    if (programmingLanguages)
      setDefaultLanguageDispatch(programmingLanguages?.[0]?.id);
  }, [programmingLanguages, setSelectedLanguage, setDefaultLanguageDispatch]);

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
      savedCode[problemId]?.[selectedLanguage]
        ? savedCode[problemId][selectedLanguage]
        : DefaultPrograms[
            programmingLanguages.find(
              (language) => language.id === selectedLanguage
            )?.name || ""
          ] || ""
    );
  }, [
    selectedLanguage,
    setUserCode,
    DefaultPrograms,
    programmingLanguages,
    problemId,
    savedCode,
  ]);

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
      <div className="bg-white border-b border-gray-200 w-full md:px-4 py-2 flex items-center justify-between gap-y-3 flex-wrap lg:flex-nowrap overflow-auto hide-scroll align-middle shadow-md">
        <Options
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
  selectedLanguage: state.codeEditor.selectedLanguage,
  retrievedDetails: state.retrieveDetails.data,
  savedCode: state.monacoReducer.code,
});

const mapDispatchToProps = {
  setUserCode: updateUserCode,
  setSelectedLanguage,
  setDefaultLanguageDispatch: setDefaultLanguage,
};

const Sandbox = connect(mapStateToProps, mapDispatchToProps)(SandboxComponent);

export default Sandbox;
