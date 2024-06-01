import { useState } from "react";
import {
  Paper,
  Tabs,
  Tab,
  Box,
  Typography,
  CardContent,
  Card,
} from "@mui/material";
import { submitCode } from "../../../redux/actions";
import { connect } from "react-redux";
import { InfoOutlined } from "@mui/icons-material";
import { updateUserCode } from "../../../redux/slices/examSlice";
import TestCasesTabs from "./StdInOut/TestCasesTabs";
import {
  setTestCaseItem,
  setTestCaseItemData,
  setTestCases,
} from "../../../redux/slices/ProgramSubmmitionSlice";

function StdInOutComponent({
  submitCodeData,
  submitCodeIsLoading,
  submitCodeIsStatus,
  submitCodeIsError,
  testCases,
  setTestCaseItemDataDispatch,
}) {
  const [selectedTab, setSelectedTab] = useState("Test Cases");
  const [selectedTask, setSelectedTask] = useState(0);

  const handleChange = (_, newTab) => {
    setSelectedTab(newTab);
  };

  const onInputChange = (e) => {
    setTestCaseItemDataDispatch({
      key: selectedTask,
      property: "input",
      value: e.target.value,
    });
  };

  const onOutputChange = (e) => {
    setTestCaseItemDataDispatch({
      key: selectedTask,
      property: "output",
      value: e.target.value,
    });
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
            <div className="flex">
              <TestCasesTabs
                selectedTask={selectedTask}
                setSelectedTask={setSelectedTask}
                tabs={testCases}
              />
            </div>
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
                  <textarea
                    style={{ width: "100%" }}
                    className="bg-gray-100"
                    value={testCases[selectedTask]?.input}
                    onChange={onInputChange}
                  />
                </Box>
                <Box className="flex flex-col gap-2">
                  <Typography variant="subtitle1" fontWeight="bold">
                    Output:
                  </Typography>
                  <textarea
                    className="bg-gray-100 p-3 rounded"
                    value={testCases[selectedTask]?.output || ""}
                    onChange={onOutputChange}
                  />
                </Box>
              </Box>
            )}
            {selectedTab === "Test Results" && (
              <div className="flex flex-col gap-4">
                <Typography
                  variant="h6"
                  component="h2"
                  className="text-gray-800"
                >
                  Test Results:
                </Typography>
                <div className="bg-gray-200 rounded-lg p-6 h-[180px] overflow-y-auto">
                  <code className="text-sm text-gray-800 flex">
                    {submitCodeIsStatus !== 300 && (
                      <>
                        <span className="text-[#1976d2]">user@nareshit:</span>
                        <span className="text-[#eb4034]">~$</span>
                      </>
                    )}
                    {submitCodeIsStatus === 200 && (
                      <span className="text-gray-600 ms-2">
                        <pre>{submitCodeData}</pre>
                      </span>
                    )}
                    {submitCodeIsStatus === 300 && (
                      <span className="text-red-600">
                        <pre>{submitCodeData}</pre>
                      </span>
                    )}
                    {submitCodeIsError ? (
                      <span className="text-red-400 ms-2">Error occurred.</span>
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
  submitCodeIsStatus: state.submitCode.status,
  submitCodeIsError: state.submitCode.isError,
  userCode: state.codeEditor.userCode,
  testCases: state.programSubmmition.testCases,
});

const mapDispatch = {
  submitCode: (item) => submitCode(item),
  setUserCode: (updatedCode) => updateUserCode(updatedCode),
  setTestCaseItemDataDispatch: setTestCaseItemData,
};

const StdInOut = connect(mapState, mapDispatch)(StdInOutComponent);

export default StdInOut;
