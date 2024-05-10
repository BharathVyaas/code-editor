import { connect } from "react-redux";
import { submitCode, submitCsharpCode } from "../../../redux/actions";
import { Button } from "@mui/material";
import PlayArrowIcon from "@mui/icons-material/PlayArrow";
import { UserContext } from "../../../context/UserContext";
import { useContext } from "react";

function SubmitHandlerComponent({
  userCode,
  toggleInput,
  userInput,
  retrievedDetails,
  language,
  submitCodeDispatch,
  submitCsharpCodeDispatch,
}) {
  const { user } = useContext(UserContext);
  const userName = user?.username;

  const submitHandler = async () => {
    try {
      if (language === "c") {
        submitCsharpCodeDispatch({
          Code: userCode,
          Parameters: userInput.split("\n"),
          Language: language,
          ProgramName: retrievedDetails.ProgramName,
          ProgramId: "NA",
          UserName: userName,
        });
      } else {
        submitCodeDispatch({
          Code: userCode,
          Parameters: userInput.split("\n"),
          Language: language,
          ProgramName: retrievedDetails.ProgramName,
          ProgramId: "NA",
          UserName: userName,
        });
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <>
      <Button
        color="success"
        variant="contained"
        sx={{ paddingBlock: 0.6 }}
        onClick={submitHandler}
        startIcon={
          <PlayArrowIcon fontSize="20" sx={{ padding: 0, margin: 0 }} />
        }
      >
        Run
      </Button>
      <Button
        color="success"
        variant="contained"
        sx={{ paddingBlock: 0.6, marginInlineStart: 1.4 }}
        onClick={() => toggleInput((prev) => !prev)}
      >
        Add Input
      </Button>
    </>
  );
}

const mapState = (state) => ({
  retrievedDetails: state.retrieveDetails.data,
  userCode: state.codeEditor.present.userCode,
  submitCodeData: state.submitCode.data,
});

const mapDispatch = {
  submitCodeDispatch: (item) => submitCode(item),
  submitCsharpCodeDispatch: (item) => submitCsharpCode(item),
};

const SubmitHandler = connect(mapState, mapDispatch)(SubmitHandlerComponent);

export default SubmitHandler;
