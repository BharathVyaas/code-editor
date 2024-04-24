import { Button } from "@mui/material";
import { connect } from "react-redux";
import { submitCode } from "../../../redux/actions";

function SubmitHandlerComponent({ userCode, language, state, submitCode }) {
  console.log(state);
  const submitHandler = async () => {
    try {
      submitCode({
        Code: userCode,
        Language: language,
        ProgramName: "HelloWorld123",
      });
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="w-60">
      <Button
        variant="contained"
        size="large"
        fullWidth
        style={{ backgroundColor: "#4caf50", color: "#fff" }}
        onClick={submitHandler}
      >
        Build & Run
      </Button>
    </div>
  );
}

const mapState = (state) => ({
  state: state,
});

const mapDispatch = {
  submitCode: (item) => submitCode(item),
};

const SubmitHandler = connect(mapState, mapDispatch)(SubmitHandlerComponent);

export default SubmitHandler;
