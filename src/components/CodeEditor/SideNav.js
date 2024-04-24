import { Typography, Paper, Grid } from "@mui/material";

function SideNav() {
  return (
    <article className="p-4">
      <Typography variant="h3" className="mb-4">
        Finding Window
      </Typography>
      <div className="mb-4">
        <Typography variant="body1">
          Hacker has two strings S and T. He has to find the minimum
          (contiguous) substring Window of S. So that T is a subsequence of
          Window.
        </Typography>
      </div>
      <hr className="my-4" />
      <Grid container spacing={4}>
        <Grid item xs={6}>
          <Paper elevation={3} className="p-4">
            <Typography variant="h4">Sample Input</Typography>
            <div className="bg-gray-200 p-3 rounded mt-3">
              <Typography variant="body2" height="100px">
                this is a placeholder
              </Typography>
            </div>
          </Paper>
        </Grid>
        <Grid item xs={6}>
          <Paper elevation={3} className="p-4">
            <Typography variant="h4">Sample Output</Typography>
            <div className="bg-gray-200 p-3 rounded mt-3">
              <Typography variant="body2" height="100px">
                placeholder a is this
              </Typography>
            </div>
          </Paper>
        </Grid>
      </Grid>
      <hr className="my-4" />
      <section>
        <Typography variant="h3">Explanation</Typography>
        <Paper elevation={3} className="p-4 bg-gray-200 rounded mt-4">
          <code>
            "bcde" is the answer because it occurs before "bdde" which has the
            same length. "deb" is not a smaller window because the elements of T
            in the window must occur in order.
          </code>
        </Paper>
      </section>
      <hr className="my-4" />
      <article>
        <Typography variant="h3">Note:</Typography>
        <Typography variant="body1" className="mb-4">
          Your code must be able to print the sample output from the provided
          sample input. However, your code is run against multiple hidden test
          cases. Therefore, your code must pass these hidden test cases to solve
          the problem statement.
        </Typography>
        <ul className="p-0">
          <Typography variant="h4" className="mb-2">
            Limits
          </Typography>
          <li>
            <Typography variant="body2">
              <i>Time Limit: 1.0 sec(s) for each input file</i>
            </Typography>
          </li>
          <li>
            <Typography variant="body2">
              <i>Memory Limit: 256 MB</i>
            </Typography>
          </li>
          <li>
            <Typography variant="body2">
              <i>Source Limit: 1024 KB</i>
            </Typography>
          </li>
        </ul>
        <article>
          <Typography variant="h4">Scoring</Typography>
          <Typography variant="body2" className="mb-2">
            Score is assigned if any testcase passes
          </Typography>
        </article>
        <article>
          <Typography variant="h4">Allowed Languages</Typography>
          <Typography variant="body2" className="mb-4">
            Bash, C, C++14, C++17, Clojure, C#, D, Erlang, F#, Go, Groovy,
            Haskell, Java 8, Java 14, JavaScript(Node.js), Julia, Kotlin, Lisp
            (SBCL), Lua, Objective-C, OCaml, Octave, Pascal, Perl, PHP, Python,
            Python 3, Python 3.8, Racket, Ruby, Rust, Scala, Swift, TypeScript,
            Visual Basic
          </Typography>
        </article>
      </article>
    </article>
  );
}

export default SideNav;
