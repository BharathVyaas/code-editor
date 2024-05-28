import { Paper, Grid, TextField, Typography, Box } from "@mui/material";
import { useState } from "react";
import Image from "./Details/Image";

function Details() {
  const [problemName, setProblemName] = useState("");
  const [problemDescription, setProblemDescription] = useState("");
  const [sampleInput, setSampleInput] = useState("");
  const [sampleOutput, setSampleOutput] = useState("");
  const [explanation, setExplanation] = useState("");

  const onProblemName = (e) => {
    setProblemName(e.target.value);
  };
  const onProblemDescription = (e) => {
    setProblemDescription(e.target.value);
  };
  const onSampleInput = (e) => {
    setSampleInput(e.target.value);
  };
  const onSampleOutput = (e) => {
    setSampleOutput(e.target.value);
  };
  const onExplanation = (e) => {
    setExplanation(e.target.value);
  };

  return (
    <Box className="p-4 pt-0 overflow-auto">
      <Typography variant="h3" className="mb-4 text-gray-900">
        Program Question
      </Typography>
      <hr className="border-gray-300 my-4" />
      <Box className="mt-4 mb-6">
        <TextField
          value={problemName}
          onChange={onProblemName}
          className="bg-gray-100"
          placeholder="Problem name"
          variant="outlined"
          fullWidth
        />
        <TextField
          margin="normal"
          value={problemDescription}
          className="bg-gray-100"
          onChange={onProblemDescription}
          placeholder="Problem Description"
          variant="outlined"
          fullWidth
          multiline
          rows={4}
        />
      </Box>
      <hr className="border-gray-300 my-4" />
      <Image />
      <hr className="border-gray-300 my-4" />
      <Grid container spacing={4}>
        <Grid item xs={12} md={6}>
          <Paper elevation={3} className="p-4">
            <Typography variant="h5" className="mb-2 text-gray-900">
              Sample Input
            </Typography>
            <TextField
              value={sampleInput}
              onChange={onSampleInput}
              className="bg-gray-100"
              placeholder="Sample Input"
              variant="outlined"
              fullWidth
              multiline
              rows={4}
            />
          </Paper>
        </Grid>
        <Grid item xs={12} md={6}>
          <Paper elevation={3} className="p-4">
            <Typography variant="h5" className="mb-2 text-gray-900">
              Sample Output
            </Typography>
            <TextField
              value={sampleOutput}
              onChange={onSampleOutput}
              className="bg-gray-100"
              placeholder="Sample Output"
              variant="outlined"
              fullWidth
              multiline
              rows={4}
            />
          </Paper>
        </Grid>
      </Grid>
      <hr className="border-gray-300 my-4" />
      <Box className="mb-6">
        <Typography variant="h5" className="mb-4 text-gray-900">
          Explanation
        </Typography>
        <Paper elevation={3} className="p-4 bg-gray-100 rounded mt-4">
          <TextField
            value={explanation}
            onChange={onExplanation}
            className="bg-gray-100"
            placeholder="Explanation..."
            variant="outlined"
            fullWidth
            multiline
            rows={4}
          />
        </Paper>
      </Box>
      <hr className="border-gray-300 my-4" />
      <Box>
        <Typography variant="h5" className="mb-4 text-gray-900">
          Note:
        </Typography>
        <Typography variant="body1" className="text-gray-700 mb-4">
          Your code must be able to print the sample output from the provided
          sample input. However, your code is run against multiple hidden test
          cases. Therefore, your code must pass these hidden test cases to solve
          the problem statement.
        </Typography>
        <Box className="mb-4">
          <Typography variant="h6" className="text-gray-900">
            Limits
          </Typography>
          <ul className="list-disc pl-5 text-gray-700">
            <li>
              <Typography variant="body2">
                Time Limit: 1.0 sec(s) for each input file
              </Typography>
            </li>
            <li>
              <Typography variant="body2">Memory Limit: 256 MB</Typography>
            </li>
            <li>
              <Typography variant="body2">Source Limit: 1024 KB</Typography>
            </li>
          </ul>
        </Box>
        <Box className="mb-4">
          <Typography variant="h6" className="text-gray-900">
            Scoring
          </Typography>
          <Typography variant="body2" className="text-gray-700">
            Score is assigned if any testcase passes
          </Typography>
        </Box>
        <Box>
          <Typography variant="h6" className="text-gray-900">
            Allowed Languages
          </Typography>
          <Typography variant="body2" className="text-gray-700">
            Bash, C, C++14, C++17, Clojure, C#, D
          </Typography>
        </Box>
      </Box>
    </Box>
  );
}

export default Details;
