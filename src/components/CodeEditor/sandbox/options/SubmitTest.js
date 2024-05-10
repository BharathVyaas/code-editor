import {
  Box,
  Button,
  CircularProgress,
  Modal,
  Typography,
} from "@mui/material"; // Import CircularProgress
import BackupIcon from "@mui/icons-material/Backup";
import { connect, useDispatch, useSelector } from "react-redux";
import { submitTest } from "../../../../redux/actions";
import { UserContext } from "../../../../context/UserContext";
import { useContext, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router";
import { submitTestReset } from "../../../../redux/slices/codeEditorSlice";

function SubmitTestComponent({
  testCasesOutput,
  submitTestDispatch,
  isLoading,
  submitTestState,
}) {
  const problemId = useParams().problemId;
  const { user } = useContext(UserContext);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [open, setOpen] = useState();
  const { isError } = useSelector((store) => store.submitTest);

  useEffect(() => {
    if (submitTestState === "reslove" || isError) {
      setOpen(true);
    }
  }, [submitTestState, isError]);

  useEffect(() => {
    dispatch(submitTestReset());
  }, [dispatch]);

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
    <>
      <Button
        className="text-green-400 cursor-pointer"
        color="success"
        disabled={isLoading}
        startIcon={
          isLoading ? (
            <CircularProgress size="small" color="secondary" />
          ) : (
            <BackupIcon />
          )
        }
        onClick={submitHanlder}
      >
        Submit
      </Button>
      <Modal
        open={open}
        onClose={() => {
          setOpen(false);
          navigate("/problemset");
        }}
        aria-labelledby="modal-title"
        aria-describedby="modal-description"
      >
        <Box
          sx={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            width: 500, // Adjust width for better readability
            bgcolor: "background.paper",
            boxShadow: 24,
            p: 4,
            borderRadius: 5, // Add border radius for a softer look
          }}
        >
          <Typography variant="h5" id="modal-title" align="center" gutterBottom>
            <Typography
              variant="h5"
              id="modal-title"
              align="center"
              gutterBottom
            >
              {submitTestState === "reslove"
                ? "Submission Successful!"
                : "Submission Failed"}
            </Typography>
          </Typography>
          <Typography
            variant="body1"
            id="modal-description"
            align="center"
            paragraph
          >
            {submitTestState === "reslove"
              ? "Your test has been successfully submitted."
              : "Failed to submit your test. Please try again."}
          </Typography>
          <Box sx={{ display: "flex", justifyContent: "center", mt: 2 }}>
            <Button
              variant="contained"
              color={submitTestState === "reslove" ? "success" : "error"}
              onClick={() => {
                setOpen(false);
                if (isError) {
                  submitHanlder();
                } else {
                  navigate("/problemset");
                }
              }}
            >
              {submitTestState === "reslove" ? "View Problems" : "Retry"}
            </Button>
          </Box>
        </Box>
      </Modal>
    </>
  );
}

const mapState = (state) => ({
  isLoading: state.submitTest.isLoading,
  submitTestData: state.submitTest.data,
  submitTestState: state.submitTest.state,
});

const mapDispatch = {
  submitTestDispatch: (data) => submitTest(data),
};

const SubmitTest = connect(mapState, mapDispatch)(SubmitTestComponent);

export default SubmitTest;
