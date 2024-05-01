import { Paper, Grid } from "@mui/material";
import { connect } from "react-redux";

function DetailsComponent({ retrievedDetails }) {
  const {
    ProgramDescription,
    Explanation,
    ProgramName,
    SampleInput,
    SampleOutput,
    Image,
  } = retrievedDetails;
  return (
    <article className="p-4 pt-0 overflow-auto">
      <h1 className="text-3xl font-bold mb-2 text-gray-900">
        Program Questions
      </h1>
      <hr className="border-gray-300 my-4" />
      <section className="mt-4 mb-6">
        <h2 className="text-2xl font-semibold mb-4 text-gray-900">
          {ProgramName && ProgramName}
        </h2>
        <p className="text-base text-gray-700 max-h-[10rem] overflow-y-auto">
          {ProgramDescription && ProgramDescription}
        </p>
      </section>
      <hr className="border-gray-300 my-4" />
      <Grid container spacing={4}>
        <Grid item xs={12} md={6}>
          <Paper elevation={3} className="p-4">
            <h3 className="text-xl font-semibold mb-2 text-gray-900">
              Sample Input
            </h3>
            <div className="bg-gray-100 p-3 rounded mt-3 overflow-auto min-h-[3rem] lg:min-h-[5rem]">
              <p className="text-sm text-gray-700">{SampleInput}</p>
            </div>
          </Paper>
        </Grid>
        <Grid item xs={12} md={6}>
          <Paper elevation={3} className="p-4">
            <h3 className="text-xl font-semibold mb-2 text-gray-900">
              Sample Output
            </h3>
            <div className="bg-gray-100 p-3 rounded mt-3 overflow-auto min-h-[3rem] lg:min-h-[5rem]">
              <p className="text-sm text-gray-700">{SampleOutput}</p>
            </div>
          </Paper>
        </Grid>
      </Grid>

      <hr className="border-gray-300 my-4" />

      <div className="mx-auto max-w-xs">
        <img
          src={Image}
          alt="Program"
          height="300"
          width="300"
          className="mx-auto"
        />
      </div>
      <hr className="border-gray-300 my-4" />

      <section className="mb-6">
        <h2 className="text-2xl font-semibold text-gray-900">Explanation</h2>
        <Paper
          elevation={3}
          className="p-4 bg-gray-100 rounded mt-4 max-h-[8rem] overflow-auto"
        >
          <code className="text-sm text-gray-700">
            {Explanation && Explanation}
          </code>
        </Paper>
      </section>
      <hr className="border-gray-300 my-4" />
      <article>
        <h2 className="text-2xl font-semibold text-gray-900">Note:</h2>
        <p className="text-base text-gray-700">
          Your code must be able to print the sample output from the provided
          sample input. However, your code is run against multiple hidden test
          cases. Therefore, your code must pass these hidden test cases to solve
          the problem statement.
        </p>
        <ul className="p-0">
          <h3 className="text-xl font-semibold text-gray-900">Limits</h3>
          <li>
            <p className="text-sm text-gray-700">
              <i>Time Limit: 1.0 sec(s) for each input file</i>
            </p>
          </li>
          <li>
            <p className="text-sm text-gray-700">
              <i>Memory Limit: 256 MB</i>
            </p>
          </li>
          <li>
            <p className="text-sm text-gray-700">
              <i>Source Limit: 1024 KB</i>
            </p>
          </li>
        </ul>
        <article>
          <h3 className="text-xl font-semibold text-gray-900">Scoring</h3>
          <p className="text-sm text-gray-700">
            Score is assigned if any testcase passes
          </p>
        </article>
        <article>
          <h3 className="text-xl font-semibold text-gray-900">
            Allowed Languages
          </h3>
          <p className="text-sm text-gray-700">
            Bash, C, C++14, C++17, Clojure, C#, D
          </p>
        </article>
      </article>
    </article>
  );
}

const mapState = (state) => ({
  retrievedDetails: state.retrieveDetails.data,
});

const Details = connect(mapState, null)(DetailsComponent);

export default Details;
