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

function StdInOutComponent({
  submitCodeData,
  submitCodeIsLoading,
  submitCodeIsStatus,
  submitCodeIsError,
}) {
  const [selectedTab, setSelectedTab] = useState("Test Cases");
  const [selectedTask, setSelectedTask] = useState(0); // Initial task

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
              <Tab label="Task 1" value={0} />
              <Tab label="Task 2" value={1} />
              <Tab label="Task 3" value={2} />
              <Tab label="Task 4" value={3} />
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
                  <textarea style={{ width: "100%" }} className="bg-gray-100" />
                </Box>
                <Box className="flex flex-col gap-2">
                  <Typography variant="subtitle1" fontWeight="bold">
                    Output:
                  </Typography>
                  <textarea className="bg-gray-100 p-3 rounded" />
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
  userCode: state.codeEditor.present.userCode,
});

const mapDispatch = {
  submitCode: (item) => submitCode(item),
  setUserCode: (updatedCode) => updateUserCode(updatedCode),
};

const StdInOut = connect(mapState, mapDispatch)(StdInOutComponent);

export default StdInOut;
