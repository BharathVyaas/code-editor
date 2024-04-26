import { connect } from "react-redux";
import { submitCode } from "../../../redux/actions";

function StdInOutComponent({
  submitCodeData,
  submitCodeIsPending,
  submitCodeIsError,
}) {
  return (
    <div className="flex flex-col gap-4">
      <div>
        <p className="text-lg font-medium text-gray-600">Input:</p>
        <div className="bg-gray-200 rounded-lg p-2">
          <input
            className="w-full p-2 text-sm text-gray-800 bg-transparent border-0 focus:outline-none"
            placeholder="Ex: add(1,2)"
          />
        </div>
      </div>

      <div className="flex flex-col gap-4">
        <p className="text-lg font-medium text-gray-600">Output:</p>{" "}
        <div className="bg-gray-200 rounded-lg p-4 h-40 overflow-y-auto">
          <code className="text-sm text-gray-800 flex">
            <span className="text-black">user@nareshit:</span>~${" "}
            <span className="text-gray-600 ms-2">
              <pre>{submitCodeData}</pre>
            </span>
            {submitCodeIsPending ? (
              <span className="text-yellow-400">Loading...</span>
            ) : submitCodeIsError ? (
              <span className="text-red-400">Error occurred.</span>
            ) : null}
          </code>
        </div>
      </div>
    </div>
  );
}

const mapState = (state) => ({
  submitCodeData: state.submitCode.data,
  submitCodeIsPending: state.submitCode.isPending,
  submitCodeIsError: state.submitCode.isError,
});

const mapDispatch = {
  submitCode: (item) => submitCode(item),
};

const StdInOut = connect(mapState, mapDispatch)(StdInOutComponent);

export default StdInOut;
