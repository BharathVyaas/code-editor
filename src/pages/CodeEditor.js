import Sandbox from "../components/CodeEditor/Sandbox";
import Details from "../components/CodeEditor/Details";
import Naresh_IT_Logo from "../assets/Naresh_IT_Logo.png";
import { useContext, useEffect } from "react";
import { connect, useSelector } from "react-redux";
import { types } from "../redux/actions/types";
import Loading from "../shared/Loading";
import Error from "../shared/Error";
import { useLocation, useParams } from "react-router-dom";
import { UserContext } from "../context/UserContext";

function CodeEditorComponent({
  isDataRetrieving,
  isDataRetrievingFailed,
  retrieveDataDispatch,
  retrieveDataState,
}) {
  const {
    isError: isTestCasesRetrievingFailed,
    isLoading: isTestCasesRetrieving,
  } = useSelector((store) => store.retrieveTestCases);
  const { user } = useContext(UserContext);

  const programId = useParams().problemId;

  useEffect(() => {
    if (programId) retrieveDataDispatch(programId);
  }, [retrieveDataDispatch, programId]);

  if (isTestCasesRetrievingFailed || isDataRetrievingFailed) return <Error />;

  if (isTestCasesRetrieving || isDataRetrieving) return <Loading />;

  return (
    retrieveDataState === "reslove" && (
      <div className="flex flex-col bg-gray-100 hide-scroll">
        <header className="bg-white shadow-md px-4 py-2 border-b flex justify-between items-center">
          <img
            src={Naresh_IT_Logo}
            alt="Naresh IT Logo"
            className="h-[5.8vh]"
          />

          <p className="text-lg font-medium">{`Welcome, ${
            user?.username || "Guest"
          }`}</p>
        </header>

        <main className="flex-1 pt-2 lg:pt-0 lg:flex flex-col lg:flex-row max-h-[92vh] overflow-hidden">
          <aside className="w-full lg:w-1/2 border-r-2 border-gray-200 p-6  border-b-2 borderb-black overflow-y-auto hide-scroll mb-4 max-h-[30vh] lg:max-h-[100%] lg:mb-0">
            <Details />
          </aside>
          <section className="w-full lg:w-1/2 p-6 border-b-2 relative overflow-y-auto hide-scroll max-h-[60vh] md:max-h-[100%]">
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
  isTestCasesRetrieving: state.retrieveDetails?.isLoading,
  isTestCasesRetrievingFailed: state.retrieveDetails?.isError,
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

function CodeEditorComponentv2({
  isDataRetrieving,
  isDataRetrievingFailed,
  retrieveDataDispatch,
  retrieveDataState,
  isTestCasesRetrieving,
  isTestCasesRetrievingFailed,
}) {
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const programId = queryParams.get("program_id");

  useEffect(() => {
    if (programId) retrieveDataDispatch(programId);
  }, [retrieveDataDispatch, programId]);

  if (isTestCasesRetrievingFailed || !programId) return <Error />;

  if (isTestCasesRetrieving) return <Loading />;

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
        <main className="flex-1 pt-2 lg:pt-0 lg:flex flex-col lg:flex-row max-h-[92vh] overflow-hidden">
          <aside className="w-full lg:w-1/2 border-r-2 border-gray-200 p-6  border-b-2 borderb-black overflow-y-auto hide-scroll mb-4 max-h-[30vh] lg:max-h-[100%] lg:mb-0">
            <Details />
          </aside>
          <section className="w-full lg:w-1/2 p-6 border-b-2 relative overflow-y-auto hide-scroll max-h-[60vh] md:max-h-[100%]">
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

const mapStatev2 = (state) => ({
  retrievedData: state.retrieveDetails?.data,
  isDataRetrieving: state.retrieveDetails?.isLoading,
  isDataRetrievingFailed: state.retrieveDetails?.isError,
  isTestCasesRetrieving: state.retrieveDetails?.isLoading,
  isTestCasesRetrievingFailed: state.retrieveDetails?.isError,
  retrieveDataState: state.retrieveDetails?.state,
});

const mapDispatchv2 = {
  retrieveDataDispatch: (data) => ({
    type: types.RETRIEVE_DETAILS_TESTCASES,
    payload: data,
  }),
};

const CodeEditorv2 = connect(mapState, mapDispatch)(CodeEditorComponentv2);
