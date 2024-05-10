import { Button } from "@mui/material";
import BackupIcon from "@mui/icons-material/Backup";
import { connect } from "react-redux";
import { submitTest } from "../../../../redux/actions";
import { UserContext } from "../../../../context/UserContext";
import { useContext } from "react";
import { useParams } from "react-router";

function SubmitTestComponent({ testCasesOutput, submitTestDispatch }) {
  const problemId = useParams().problemId;
  const { user } = useContext(UserContext);

  const userName = user?.username || "";
  const userEmail = user?.email || "";
  const testCasesPassCount = Object.values(testCasesOutput).filter(
    (testCase) => testCase?.flag
  ).length;
  const testCasesFailCount = Object.values(testCasesOutput).filter(
    (testCase) => testCase && !testCase.flag
  ).length;

  const submitHanlder = () => {
    submitTestDispatch({
      Email: userEmail,
      StudentName: userName,
      ProgramId: problemId,
      No_TestCasesPassed: testCasesPassCount,
      No_TestCasesFailed: testCasesFailCount,
    });
  };

  return (
    <Button
      className="text-green-400 cursor-pointer"
      color="success"
      startIcon={<BackupIcon />}
      onClick={submitHanlder}
    >
      Submit
    </Button>
  );
}

const mapDispatch = {
  submitTestDispatch: (data) => submitTest(data),
};

const SubmitTest = connect(null, mapDispatch)(SubmitTestComponent);

export default SubmitTest;
