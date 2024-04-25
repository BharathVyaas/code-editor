import { connect } from "react-redux";
import { submitCode } from "../../../redux/actions";
import { PlayCircleFilled as PlayCircleFilledIcon } from "@mui/icons-material";

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
    <>
      <PlayCircleFilledIcon
        style={{ fontSize: 40 }}
        className="text-green-500 cursor-pointer"
        onClick={submitHandler}
      />
    </>
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
