import { useContext, useEffect, useRef, useState } from "react";
import {
  Paper,
  Tabs,
  Tab,
  Box,
  Typography,
  CardContent,
  Card,
  TextField,
  Collapse,
  CircularProgress,
} from "@mui/material";
import { submitCode } from "../../../redux/actions";
import { connect } from "react-redux";
import { InfoOutlined } from "@mui/icons-material";
import DoneIcon from "@mui/icons-material/Done";
import ClearIcon from "@mui/icons-material/Clear";
import SubmitHandler from "./SubmitHandler";
import { useNavigate } from "react-router";
import axios from "axios";
import { UserContext } from "../../../context/UserContext";
import { updateUserCode } from "../../../redux/slices/examSlice";
import { useParams } from "react-router-dom";

async function onTestCases(
  testCases,
  { userCode, language, retrievedDetails, userName },
  handler
) {
  try {
    for (const testCase of testCases) {
      const input = testCase.input;
      const output = testCase.output;
      const id = testCase.id;

      const res = await axios.post(
        language === "c"
          ? "http://49.207.10.13:8080/"
          : "http://49.207.10.13:5000/api/codeexecute",
        language !== "c"
          ? {
              Code: userCode,
              Parameters: input.split("\n"),
              Language: language,
              ProgramName: retrievedDetails.ProgramName,
              ProgramId: "64F43AC3-3799-4EE8-98DE-603FED13FA83",
              UserName: userName,
            }
          : {
              code: userCode,
              Parameters: input.split("\n"),
              UserName: userName,
            }
      );

      if (res.data.output?.trim() === output.trim()) {
        handler({
          data: {
            testCaseId: id,
            flag: true,
            output: res.data.output || res.data.errorMessage,
          },
        });
      } else {
        handler({
          data: {
            testCaseId: id,
            flag: false,
            output: res.data.output || res.data.errorMessage,
          },
        });
      }
    }
  } catch (error) {
    console.error(error);
    handler({ err: error, flag: false });
  }
}

function StdInOutComponent({
  language,
  userCode,
  submitCodeData,
  retrievedDetails,
  submitCodeIsLoading,
  submitCodeIsState,
  submitCodeIsError,
  retrievedTestCases,
  testCasesOutput,
  setTestCasesOutput,
}) {
  const navigate = useNavigate();
  const [selectedTab, setSelectedTab] = useState("Test Results");
  const [selectedTask, setSelectedTask] = useState(0);
  const [takeInput, setTakeInput] = useState(false);
  const [testCasesEvel, setTestCasesEvel] = useState(false);
  const [userInput, setUserInput] = useState(``);
  const outputRef = useRef(null);
  const collapseRef = useRef(false);
  const { user } = useContext(UserContext);
  const { problemId } = useParams();
  const userName = user?.username;

  useEffect(() => {
    if (!retrievedDetails || !retrievedTestCases) {
      navigate("/error");
    }
  }, [retrievedDetails, retrievedTestCases, navigate]);

  const { output, responseCode, errorMessage } = submitCodeData || {
    output: null,
    responseCode: null,
    errorMessage: null,
  };

  useEffect(() => {
    if (selectedTab === "Test Cases") {
      setTakeInput(false);
    }
  }, [selectedTab]);

  // useEffect(() => {
  //   if (submitCodeIsState === "reslove") {
  //     setSelectedTab("Test Results");
  //     collapseRef.current = true;

  //     if (outputRef.current) {
  //       outputRef.current.scrollIntoView({ behavior: "smooth" });
  //     }
  //   }
  // }, [submitCodeIsState]);

  useEffect(() => {
    if (
      Object.values(testCasesOutput).length === retrievedTestCases?.length &&
      testCasesEvel
    ) {
      setTestCasesEvel(false);
    }
  }, [testCasesOutput, retrievedTestCases, testCasesEvel]);

  useEffect(() => {
    if (collapseRef.current && selectedTab === "Test Results") {
      setTakeInput(true);
    }
  }, [collapseRef, selectedTab]);

  useEffect(() => {
    if (responseCode === 201) {
      setTestCasesEvel(true);
      onTestCases(
        retrievedTestCases.map((testCase) => ({
          input: testCase.SampleInputValue,
          output: testCase.SampleOutputValue,
          id: testCase?.TestCaseId || -1,
        })),
        { userCode, language, retrievedDetails, userName },
        ({ err: _, data }) => {
          setTestCasesOutput((prev) => ({
            ...prev,
            [data?.testCaseId || -1]: data,
          }));
        }
      );
    }
  }, [responseCode]);

  useEffect(() => {
    if (
      Object.values(testCasesOutput).filter((testCase) => testCase?.flag)
        .length > 0
    ) {
      outputRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [testCasesOutput]);

  if (!retrievedTestCases) return navigate("/error");

  const handleChange = (_, newTab) => {
    setSelectedTab(newTab);
  };

  const handleTaskChange = (_, newTask) => {
    setSelectedTask(newTask);
  };

  return (
    <div className="flex flex-col w-full">
      <div className="">
        <div className="flex flex-wrap-reverse justify-between">
          <Tabs
            value={selectedTab}
            onChange={handleChange}
            sx={{
              minHeight: "unset",
              minWidth: "unset",
              height: Object.values(testCasesOutput).length ? "4rem" : "3.2rem",
            }}
          >
            <Tab label="Test Results" value="Test Results" />
            <Tab
              label={
                <>
                  <p>Test Cases</p>
                  <p className="ms-2">
                    ({" "}
                    {
                      Object.values(testCasesOutput).filter(
                        (testCase) => testCase?.flag
                      ).length
                    }{" "}
                    / {retrievedTestCases.length} )
                  </p>
                </>
              }
              value="Test Cases"
              iconPosition="end"
              icon={
                testCasesEvel ? (
                  <CircularProgress
                    size={20}
                    sx={{
                      color: "default",
                      mb: 0,
                      padding: 0,
                    }}
                  />
                ) : Object.values(testCasesOutput).length ? (
                  Object.values(testCasesOutput).filter(
                    (testCase) => testCase?.flag
                  ).length === retrievedTestCases.length ? (
                    <DoneIcon
                      sx={{
                        color: "green",
                        mb: 0,
                        padding: 0,
                      }}
                    />
                  ) : (
                    <ClearIcon
                      sx={{
                        color: "red",
                        mb: 0,
                        padding: 0,
                      }}
                    />
                  )
                ) : null
              }
            />
          </Tabs>
          <div className="my-auto flex flex-wrap">
            <SubmitHandler
              setTestCasesOutput={setTestCasesOutput}
              userInput={userInput}
              toggleInput={setTakeInput}
              language={language}
            />
          </div>
        </div>
      </div>

      <Collapse in={takeInput}>
        <TextField
          sx={{ marginBlock: ".4rem" }}
          id="standard-multiline-static"
          value={userInput}
          onChange={(eventData) => {
            setUserInput(eventData.target.value);
          }}
          label="Enter your input"
          multiline
          fullWidth
          rows={4}
          variant="filled"
        />
      </Collapse>

      <div className="bg-gray-100 w-full mt-2">
        <Paper elevation={3}>
          {selectedTab === "Test Cases" && (
            <Tabs
              value={selectedTask}
              onChange={handleTaskChange}
              sx={{ maxHeight: "1rem", display: "flex", alignItems: "center" }}
            >
              {retrievedTestCases.map((testCase, index) => {
                if (index < retrievedTestCases.length - 1) {
                  return (
                    <Tab
                      key={testCase.TestCaseId}
                      label={`test case ${index + 1}`}
                      value={index}
                      iconPosition="end"
                      icon={
                        testCasesOutput?.[testCase.TestCaseId]?.flag ===
                        true ? (
                          <DoneIcon sx={{ color: "green", mb: 0.3 }} />
                        ) : (
                          testCasesOutput?.[testCase.TestCaseId]?.flag ===
                            false && (
                            <ClearIcon sx={{ color: "red", mb: 0.3 }} />
                          )
                        )
                      }
                    />
                  );
                } else {
                  return null;
                }
              })}
            </Tabs>
          )}
        </Paper>

        <Card className="w-full mt-2">
          <CardContent>
            {selectedTab === "Test Cases" && (
              <Box className="flex flex-col gap-4">
                <Box className="flex flex-col gap-2">
                  <Typography variant="subtitle1" fontWeight="bold">
                    Input:
                  </Typography>
                  <div className="bg-gray-100 p-3 rounded">
                    <p className="text-sm text-gray-700 min-h-3">
                      {retrievedTestCases[selectedTask]?.SampleInputValue}
                    </p>
                  </div>
                </Box>
                <Box className="flex flex-col gap-2">
                  <Typography variant="subtitle1" fontWeight="bold">
                    Expected Output:
                  </Typography>
                  <div className="bg-gray-100 p-3 rounded">
                    <p className="text-sm text-gray-700 min-h-3">
                      {retrievedTestCases[selectedTask]?.SampleOutputValue}
                    </p>
                  </div>
                </Box>
                <Box className="flex flex-col gap-2">
                  <Typography variant="subtitle1" fontWeight="bold">
                    Output:
                  </Typography>
                  <div className="bg-gray-100 p-3 rounded">
                    <p className="text-sm text-gray-700 min-h-3">
                      {testCasesOutput?.[
                        retrievedTestCases[selectedTask]?.TestCaseId
                      ]?.output ||
                        testCasesOutput?.[
                          retrievedTestCases[selectedTask]?.TestCaseId
                        ]?.errorMessage ||
                        ""}
                    </p>
                  </div>
                </Box>
              </Box>
            )}
            <div ref={outputRef}>
              {selectedTab === "Test Results" && (
                <div className="flex flex-col gap-4">
                  {responseCode === 301 ? (
                    <Typography
                      variant="h6"
                      component="h2"
                      className="text-red-700"
                    >
                      Build Failed:
                    </Typography>
                  ) : responseCode === 201 ? (
                    <Typography
                      variant="h6"
                      component="h2"
                      className="text-green-800"
                    >
                      Build Success:
                    </Typography>
                  ) : (
                    <Typography
                      variant="h6"
                      component="h2"
                      className="text-gray-800"
                    >
                      Test Results:
                    </Typography>
                  )}
                  <div className="bg-gray-200 rounded-lg p-6 h-[180px] overflow-y-auto">
                    <code className="text-sm text-gray-800 flex">
                      {responseCode === 201 && (
                        <span className="text-gray-600 ms-2">
                          <pre>{output}</pre>
                        </span>
                      )}
                      {responseCode === 301 && (
                        <span className="text-red-600">
                          <pre>
                            {typeof errorMessage === "string"
                              ? errorMessage
                              : JSON.stringify(errorMessage)}
                          </pre>
                        </span>
                      )}
                      {submitCodeIsError ? (
                        <span className="text-red-400 ms-2">
                          Error occurred.
                        </span>
                      ) : submitCodeIsLoading ? (
                        <span className="text-yellow-400 ms-2">Loading...</span>
                      ) : null}
                    </code>
                  </div>
                  {submitCodeIsError && (
                    <Typography variant="body2" color="error">
                      Error occurred. <InfoOutlined fontSize="small" />
                    </Typography>
                  )}
                </div>
              )}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

const mapState = (state) => ({
  submitCodeData: state.submitCode.data,
  retrievedDetails: state.retrieveDetails.data,
  submitCodeIsPending: state.submitCode.isPending,
  submitCodeIsLoading: state.submitCode.isLoading,
  submitCodeIsState: state.submitCode.state,
  submitCodeIsError: state.submitCode.isError,
  userCode: state.codeEditor.userCode,
  retrievedTestCases: state.retrieveTestCases.data,
});

const mapDispatch = {
  submitCode: (item) => submitCode(item),
  setUserCode: (updatedCode) => updateUserCode(updatedCode),
};

const StdInOut = connect(mapState, mapDispatch)(StdInOutComponent);

export default StdInOut;
