import Sandbox from "../components/CodeEditor/Sandbox";
import Details from "../components/CodeEditor/Details";
import Naresh_IT_Logo from "../assets/Naresh_IT_Logo.png";
import { useEffect } from "react";
import { connect } from "react-redux";
import { types } from "../redux/actions/types";
import Loading from "../shared/Loading";
import Error from "../shared/Error";

function CodeEditorComponent({
  isDataRetrieving,
  isDataRetrievingFailed,
  retrieveDataDispatch,
  retrieveDataState,
}) {
  useEffect(() => {
    retrieveDataDispatch("E281CF31-13C3-481E-8602-3EF0AD23C3ED");
  }, [retrieveDataDispatch]);

  if (isDataRetrievingFailed) return <Error />;

  if (isDataRetrieving) return <Loading />;

  return (
    retrieveDataState === "reslove" && (
      <div className="flex flex-col bg-gray-100">
        <header className="bg-white shadow-md px-4 py-2 border-b">
          <img
            src={Naresh_IT_Logo}
            alt="Naresh IT Logo"
            className="h-[5.8vh]"
          />
        </header>
        <main className="flex-1 p-4 pt-2 lg:pt-0 lg:p-8 lg:flex flex-col lg:flex-row max-h-[92vh]">
          <aside className="w-full lg:w-1/2 border-r-2 border-gray-200 p-6  border-b-2 borderb-black overflow-y-auto max-h-[30vh] lg:max-h-[100%] lg:mb-0">
            <Details />
          </aside>
          <section className="w-full lg:w-1/2 p-6 border-b-2 relative overflow-y-auto max-h-[60vh] md:max-h-[100%]">
            <Sandbox />
          </section>
        </main>
        <footer className="bg-white shadow-lg">
          {/* Add footer content if needed */}
        </footer>
      </div>
    )
  );
}

const mapState = (state) => ({
  retrievedData: state.retrieveDetails?.data,
  isDataRetrieving: state.retrieveDetails?.isLoading,
  isDataRetrievingFailed: state.retrieveDetails?.isError,
  retrieveDataState: state.retrieveDetails?.state,
});

const mapDispatch = {
  retrieveDataDispatch: (data) => ({
    type: types.RETRIEVE_DETAILS_TESTCASES,
    payload: data,
  }),
};

const CodeEditor = connect(mapState, mapDispatch)(CodeEditorComponent);

export default CodeEditor;
