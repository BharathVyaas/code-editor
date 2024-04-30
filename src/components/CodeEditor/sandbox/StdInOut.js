import { useEffect, useRef, useState } from "react";
import {
  Paper,
  Tabs,
  Tab,
  Box,
  Typography,
  CardContent,
  Card,
} from "@mui/material";
import { updateUserCode } from "../../../redux/slices/codeEditorSlice";
import { submitCode } from "../../../redux/actions";
import { connect } from "react-redux";
import { InfoOutlined } from "@mui/icons-material";

function StdInOutComponent({
  submitCodeData,
  submitCodeIsLoading,
  submitCodeIsState,
  submitCodeIsError,
  retrievedTestCases,
}) {
  const [selectedTab, setSelectedTab] = useState("Test Cases");
  const [selectedTask, setSelectedTask] = useState(0);
  const outputRef = useRef(null);

  const { output, responseCode, errorMessage } = submitCodeData || {
    output: null,
    responseCode: null,
    errorMessage: null,
  };

  useEffect(() => {
    console.log("change", submitCodeIsState === "reslove", outputRef.current);
    if (submitCodeIsState === "reslove") {
      setSelectedTab("Test Results");

      if (outputRef.current) {
        outputRef.current.scrollIntoView({ behavior: "smooth" });
      }
    }
  }, [submitCodeIsState]);

  const handleChange = (_, newTab) => {
    setSelectedTab(newTab);
  };

  const handleTaskChange = (_, newTask) => {
    setSelectedTask(newTask);
  };

  return (
    <div className="flex flex-col w-full">
      <Tabs
        value={selectedTab}
        onChange={handleChange}
        sx={{ minHeight: "unset", minWidth: "unset" }}
      >
        <Tab label="Test Cases" value="Test Cases" />
        <Tab label="Test Results" value="Test Results" />
      </Tabs>

      <div className="bg-gray-100 w-full mt-2">
        <Paper elevation={3}>
          {selectedTab === "Test Cases" && (
            <Tabs value={selectedTask} onChange={handleTaskChange}>
              {retrievedTestCases.map((testCase, index) => (
                <Tab
                  key={testCase.TestCaseId}
                  label={`test case ${index + 1}`}
                  value={index}
                />
              ))}
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
                    <p className="text-sm text-gray-700">
                      {retrievedTestCases[selectedTask]?.SampleInput}
                    </p>
                  </div>
                </Box>
                <Box className="flex flex-col gap-2">
                  <Typography variant="subtitle1" fontWeight="bold">
                    Output:
                  </Typography>
                  <div className="bg-gray-100 p-3 rounded">
                    <p className="text-sm text-gray-700">
                      {retrievedTestCases[selectedTask]?.SampleOutput}
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
                      Runtime Error:
                    </Typography>
                  ) : responseCode === 201 ? (
                    <Typography
                      variant="h6"
                      component="h2"
                      className="text-green-800"
                    >
                      Executed Successfully:
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
                      {responseCode !== 301 && (
                        <>
                          <span className="text-[#1976d2]">user@nareshit:</span>
                          <span className="text-[#eb4034]">~$</span>
                        </>
                      )}
                      {responseCode === 201 && (
                        <span className="text-gray-600 ms-2">
                          <pre>{output}</pre>
                        </span>
                      )}
                      {responseCode === 301 && (
                        <span className="text-red-600">
                          <pre>{errorMessage}</pre>
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
  submitCodeIsPending: state.submitCode.isPending,
  submitCodeIsLoading: state.submitCode.isLoading,
  submitCodeIsState: state.submitCode.state,
  submitCodeIsError: state.submitCode.isError,
  userCode: state.codeEditor.present.userCode,
  retrievedTestCases: state.retrieveTestCases.data,
});

const mapDispatch = {
  submitCode: (item) => submitCode(item),
  setUserCode: (updatedCode) => updateUserCode(updatedCode),
};

const StdInOut = connect(mapState, mapDispatch)(StdInOutComponent);

export default StdInOut;
