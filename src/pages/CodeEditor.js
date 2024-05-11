import Sandbox from "../components/CodeEditor/Sandbox";
import Details from "../components/CodeEditor/Details";
import Naresh_IT_Logo from "../assets/Naresh_IT_Logo.png";
import { useContext, useEffect, useState } from "react";
import { connect, useSelector } from "react-redux";
import { types } from "../redux/actions/types";
import Loading from "../shared/Loading";
import Error from "../shared/Error";
import { useParams } from "react-router-dom";
import { UserContext } from "../context/UserContext";
import {
  Box,
  Button,
  Checkbox,
  FormControlLabel,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Modal,
  Typography,
} from "@mui/material";

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
  const [showTerms, setShowTerms] = useState(false);
  const [agreeToTerms, setAgreeToTerms] = useState(true);
  const programId = useParams().problemId;

  useEffect(() => {
    setShowTerms(true);
  }, []);

  useEffect(() => {
    if (programId) retrieveDataDispatch(programId);
  }, [retrieveDataDispatch, programId]);

  useEffect(() => {
    const handleRightClick = (event) => {
      if (event.button === 2) {
        event.preventDefault();
      }
    };

    window.addEventListener("mousedown", handleRightClick);

    return () => window.removeEventListener("mousedown", handleRightClick);
  }, []);

  useEffect(() => {
    const handleUserKeyPress = (event) => {
      if (event.keyCode === 123) {
        event.preventDefault();
      }
      if (
        event.getModifierState("Meta") ||
        event.getModifierState("Fn") ||
        event.getModifierState("Win")
      ) {
        event.preventDefault();
      }
    };

    window.addEventListener("devtoolschange", function (e) {
      console.log("is DevTools open?", e);
    });

    return () => {
      window.removeEventListener("keydown", handleUserKeyPress);
    };
  }, []);

  if (isTestCasesRetrievingFailed || isDataRetrievingFailed) return <Error />;

  if (isTestCasesRetrieving || isDataRetrieving) return <Loading />;

  return (
    retrieveDataState === "reslove" && (
      <>
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
        {/**  Trems and Conditions */}
        <Modal
          open={showTerms}
          onClose={(e) => setAgreeToTerms(e.target.checked)}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
        >
          <Box
            sx={{
              position: "absolute",
              top: "50%",
              left: "50%",
              transform: "translate(-50%, -50%)",
              width: 600,
              bgcolor: "background.paper",
              boxShadow: 24,
              p: 4,
            }}
          >
            <Typography variant="h5" id="modal-modal-title" gutterBottom>
              Terms and Conditions for Online Testing
            </Typography>
            <List dense={false}>
              <ListItem>
                <ListItemIcon>
                  <span style={{ fontSize: 18, color: "blue" }}>1.</span>
                </ListItemIcon>
                <ListItemText
                  primary="Academic Integrity"
                  secondary="Uphold academic integrity by completing the test with your own understanding of the concepts."
                />
              </ListItem>
              <ListItem>
                <ListItemIcon>
                  <span style={{ fontSize: 18, color: "blue" }}>2.</span>
                </ListItemIcon>
                <ListItemText
                  primary="No Collaboration"
                  secondary="Do not share or collaborate with other test-takers during the exam. You are expected to work independently."
                />
              </ListItem>
              <ListItem>
                <ListItemIcon>
                  <span style={{ fontSize: 18, color: "blue" }}>3.</span>
                </ListItemIcon>
                <ListItemText
                  primary="No External Resources"
                  secondary="Refrain from using unauthorized materials such as outside code snippets, websites, or other students' code. Rely on your own knowledge and the provided resources."
                />
              </ListItem>
              <ListItem>
                <ListItemIcon>
                  <span style={{ fontSize: 18, color: "blue" }}>4.</span>
                </ListItemIcon>
                <ListItemText
                  primary="No Malicious Code"
                  secondary="Avoid introducing intentional errors or malicious code that could disrupt the testing environment or compromise system security."
                />
              </ListItem>
              <ListItem>
                <ListItemIcon>
                  <span style={{ fontSize: 18, color: "blue" }}>5.</span>
                </ListItemIcon>
                <ListItemText
                  primary="Respectful Conduct"
                  secondary="Maintain a professional and respectful tone throughout the testing process. Any disruptive or disrespectful behavior may lead to consequences."
                />
              </ListItem>
            </List>
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                marginTop: "1rem",
              }}
            >
              <FormControlLabel
                control={
                  <Checkbox
                    color="primary"
                    checked={agreeToTerms}
                    onChange={(e) => setAgreeToTerms(e.target.checked)}
                  />
                }
                label="I have read and agree to the terms and conditions"
              />
              <Button
                disabled={!agreeToTerms}
                variant="contained"
                color="primary"
                style={{ width: "6rem" }}
                onClick={(e) => setShowTerms(false)} // Call handleCloseTerms to close the modal when clicked
              >
                Next
              </Button>
            </div>
          </Box>
        </Modal>
      </>
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
