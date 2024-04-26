import { connect } from "react-redux";
import { submitCode } from "../../../redux/actions";
import { Button } from "@mui/material";
//import { PlayCircleFilled as PlayCircleFilledIcon } from "@mui/icons-material";

function SubmitHandlerComponent({ userCode, language, submitCodeDispatch }) {
  //console.log(state);
  const submitHandler = async () => {
    try {
      submitCodeDispatch({
        Code: userCode,
        Language: language,
        ProgramName: "HelloWorld123",
      });
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <>
      <Button
        color="success"
        variant="contained"
        sx={{ fontSize: ".7rem", marginRight: "1rem" }}
        className="text-green-500 cursor-pointer"
        size="small"
        onClick={submitHandler}
      >
        build & execute
      </Button>

      <Button
        color="success"
        variant="contained"
        sx={{ fontSize: ".7rem" }}
        className="text-green-500 cursor-pointer"
        size="small"
        onClick={submitHandler}
      >
        run testcases
      </Button>

      {/* <PlayCircleFilledIcon
        style={{ fontSize: 40 }}
        className="text-green-500 cursor-pointer"
        onClick={submitHandler}
      /> */}
    </>
  );
}

const mapState = (state) => ({
  state: state,
});

const mapDispatch = {
  submitCodeDispatch: (item) => submitCode(item),
};

const SubmitHandler = connect(mapState, mapDispatch)(SubmitHandlerComponent);

export default SubmitHandler;
