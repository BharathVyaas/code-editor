import { connect } from "react-redux";
import { submitCode, submitCsharpCode } from "../../../redux/actions";
import { Button } from "@mui/material";
//import { PlayCircleFilled as PlayCircleFilledIcon } from "@mui/icons-material";
import PlayArrowIcon from "@mui/icons-material/PlayArrow";

function SubmitHandlerComponent({
  userCode,
  submitCodeData,
  retrievedDetails,
  language,
  submitCodeDispatch,
  submitCsharpCodeDispatch,
}) {
  const { responseCode } = submitCodeData || {
    responseCode: null,
  };

  const submitHandler = async () => {
    try {
      if (language === "csharp") {
        submitCsharpCodeDispatch({
          Code: userCode,
          Language: language,
          ProgramName: retrievedDetails.ProgramName,
          ProgramId: "NA",
        });
      } else {
        submitCodeDispatch({
          Code: userCode,
          Language: language,
          ProgramName: retrievedDetails.ProgramName,
          ProgramId: "NA",
        });
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <>
      {/* <Button
        variant="contained"
        sx={{ fontSize: "0.7rem" }}
        onClick={submitHandler}
      >
        build & execute
      </Button> */}
      {/* <PlayCircleFilledIcon
        style={{ fontSize: 40 }}
        className="text-[#32a852] cursor-pointer"
      /> */}

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
        disabled={responseCode !== 201}
        color="success"
        variant="contained"
        sx={{ paddingBlock: 0.6, marginInlineStart: 1.4 }}
        onClick={submitHandler}
      >
        Execute Test Cases
      </Button>

      {/* <Button
        variant="contained"
        sx={{ fontSize: "0.7rem" }}
        onClick={submitHandler}
      >
        run testcases
      </Button> */}
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
