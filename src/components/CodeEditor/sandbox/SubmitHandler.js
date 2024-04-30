import { connect } from "react-redux";
import { submitCode, submitCsharpCode } from "../../../redux/actions";
import { Button } from "@mui/material";
//import { PlayCircleFilled as PlayCircleFilledIcon } from "@mui/icons-material";
import PlayArrowIcon from "@mui/icons-material/PlayArrow";

function SubmitHandlerComponent({
  userCode,
  retrievedDetails,
  language,
  submitCodeDispatch,
  submitCsharpCodeDispatch,
}) {
  const submitHandler = async () => {
    try {
      submitCodeDispatch({
        Code: userCode,
        Language: language,
        ProgramName: retrievedDetails.ProgramName,
        ProgramId: "NA",
      });
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
        size="small"
        sx={{ paddingInline: 1.6, paddingBlock: 0.1, paddingTop: 0.4 }}
        onClick={submitHandler}
        startIcon={
          <PlayArrowIcon fontSize="20" sx={{ padding: 0, margin: 0 }} />
        }
      >
        Run
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
  state: state,
});

const mapDispatch = {
  submitCodeDispatch: (item) => submitCode(item),
  submitCsharpCodeDispatch: (item) => submitCsharpCode(item),
};

const SubmitHandler = connect(mapState, mapDispatch)(SubmitHandlerComponent);

export default SubmitHandler;
