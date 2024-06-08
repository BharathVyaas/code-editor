import { AnimatePresence, motion } from "framer-motion";
import { NavLink } from "react-router-dom";
import {
  Card,
  CardContent,
  CardHeader,
  Typography,
  Button,
  Grid,
  Container,
  Fab,
} from "@mui/material";
import Naresh_IT_Logo from "../assets/Naresh_IT_Logo.png";
import { UserContext } from "../context/UserContext";
import { useContext, useEffect, useState } from "react";
import { resetTimer, setShouldCount } from "../redux/slices/examSlice";
import { connect } from "react-redux";
import UpIcon from "@mui/icons-material/KeyboardArrowUp";

const PROBLEMS = [
  {
    name: "Fibonacci Series",
    id: "E281CF31-13C3-481E-8602-3EF0AD23C3ED",
    description: `Write a  program to generate and display the Fibonacci series up to a specified number of terms. Program Description:Write a  program that generates and displays the Fibonacci series up to a specified number of terms.`,
    testCases: false,
  },
  {
    name: "Palindrome",
    id: "DF89B0B7-2B62-4996-B79F-4D95EE745FD8",
    description: `Write a  program to generate and display the Fibonacci series up to a specified number of terms. Program Description:Write a  program that generates and displays the Fibonacci series up to a specified number of terms.`,
    testCases: true,
  },
];

function ProblemsetComponent({ shouldCountDispatch, resetTimerDispatch }) {
  const { user } = useContext(UserContext);
  const [isAtTop, setIsAtTop] = useState(true);

  const cardVariants = {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0 },
    exit: { opacity: 0, y: -20 },
  };

  const resetExamTimer = () => {
    resetTimerDispatch();
    shouldCountDispatch(false);
  };

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleScroll = () => {
    setIsAtTop(window.scrollY === 0);
  };

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <div>
      <header className="bg-white shadow-md px-4 py-2 border-b flex justify-between items-center">
        <img src={Naresh_IT_Logo} alt="Naresh IT Logo" className="h-[5.8vh]" />
        <p className="text-lg font-medium">{`Welcome, ${
          user?.username || "Guest"
        }`}</p>
      </header>

      <div className="min-h-screen bg-gray-100 py-8">
        <h1 className="text-3xl font-bold text-center mb-8">
          Practice Problems
        </h1>
        <Container maxWidth="lg">
          <Grid
            container
            spacing={2}
            className="grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
          >
            {PROBLEMS.map((problem) => (
              <Grid item key={problem.id} width={"100%"}>
                <motion.div
                  variants={cardVariants}
                  initial="initial"
                  animate="animate"
                  exit="exit"
                  transition={{ duration: 0.3 }}
                >
                  <NavLink
                    to={`/problem/${problem.id}?testCases=${problem.testCases}`}
                    onClick={resetExamTimer}
                    className="block w-full h-full"
                  >
                    <Card className="hover:shadow-lg rounded-md">
                      <CardHeader
                        title={problem.name}
                        subheader={problem.id}
                        action={
                          <Button
                            onClick={resetExamTimer}
                            variant="contained"
                            color="primary"
                            size="small"
                          >
                            Solve
                          </Button>
                        }
                      />
                      <CardContent>
                        <Typography
                          variant="body2"
                          color="textSecondary"
                          component="p"
                        >
                          {problem.description}
                        </Typography>
                      </CardContent>
                    </Card>
                  </NavLink>
                </motion.div>
              </Grid>
            ))}
          </Grid>
        </Container>

        <AnimatePresence>
          <Grid
            position="fixed"
            bottom={16}
            right={16}
            sx={{ display: isAtTop ? "none" : "block" }}
          >
            <motion.div
              animate={{ opacity: !isAtTop ? 1 : 0, scale: !isAtTop ? 1 : 0.8 }}
              initial={{ opacity: 0, scale: 0.8 }}
              exit={{ opacity: 0, scale: 0.8 }}
              transition={{ duration: 0.2 }}
            >
              <Fab size="small" onClick={scrollToTop}>
                <UpIcon />
              </Fab>
            </motion.div>
          </Grid>
        </AnimatePresence>
      </div>
    </div>
  );
}

const mapDispatch = {
  resetTimerDispatch: resetTimer,
  shouldCountDispatch: setShouldCount,
};

const Problemset = connect(null, mapDispatch)(ProblemsetComponent);

export default Problemset;
