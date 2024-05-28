import { useState, useEffect, useMemo, useContext } from "react";
import { useParams } from "react-router";
import Options from "./sandbox/Options";
import Modal from "../../ui/Modal";
import CodeEditorModal from "../../ui/CodeEditorModal";
import { connect } from "react-redux";
import {
  updateUserCode,
  setSelectedLanguage as setDefaultLanguage,
} from "../../redux/slices/examSlice";
import MonacoEditor from "./sandbox/MonacoEditor";
import { setSelectedLanguage } from "../../redux/actions/types";
import { UserContext } from "../../context/UserContext";

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
  const { user } = useContext(UserContext);
  const { problemId } = useParams();

  console.log(testCasesOutput);

  const programmingLanguages = useMemo(() => {
    return (
      retrievedDetails?.Languages?.split(",")?.map((language) => ({
        id: language,
        name: language,
      })) || []
    );
  }, [retrievedDetails]);

  const DefaultPrograms = useMemo(
    () =>
      retrievedDetails?.DefaultProgram
        ? JSON.parse(retrievedDetails.DefaultProgram)
        : "",
    [retrievedDetails]
  );

  useEffect(() => {
    setUserCode(
      DefaultPrograms[
        programmingLanguages.find(
          (language) => language.id === selectedLanguage
        )?.name
      ]
    );
  }, [selectedLanguage, setUserCode, DefaultPrograms, programmingLanguages]);

  useEffect(() => {
    if (programmingLanguages)
      setDefaultLanguageDispatch(programmingLanguages?.[0]?.id);
  }, [programmingLanguages, setSelectedLanguage, setDefaultLanguageDispatch]);

  const onReset = () => {
    setUserCode(
      DefaultPrograms[
        programmingLanguages.find(
          (language) => language.id === selectedLanguage
        )?.name
      ]
    );
  };

  useEffect(() => {
    setTestCasesOutput({});
  }, []);

  useEffect(() => {
    setUserCode(
      savedCode[problemId + "::" + String(user?.username || "guest")]?.[
        selectedLanguage
      ]
        ? savedCode[problemId + "::" + String(user?.username || "guest")][
            selectedLanguage
          ]
        : DefaultPrograms[
            programmingLanguages.find(
              (language) => language.id === selectedLanguage
            )?.name || ""
          ] || ""
    );
  }, [
    selectedLanguage,
    setUserCode,
    savedCode,
    DefaultPrograms,
    problemId,
    user,
    programmingLanguages,
  ]);

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
  );
}

const mapStateToProps = (state) => ({
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
