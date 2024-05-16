import { motion } from "framer-motion";
import { NavLink } from "react-router-dom";
import {
  Card,
  CardContent,
  CardHeader,
  Typography,
  Button,
  Grid,
  Container,
} from "@mui/material";
import Naresh_IT_Logo from "../assets/Naresh_IT_Logo.png";
import { UserContext } from "../context/UserContext";
import { useContext } from "react";
import { resetTimer, setShouldCount } from "../redux/slices/examSlice";
import { connect } from "react-redux";

const PROBLEMS = [
  {
    name: "Fibonacci Series",
    id: "E281CF31-13C3-481E-8602-3EF0AD23C3ED",
    description: `Write a  program to generate and display the Fibonacci series up to a specified number of terms. Program Description:Write a  program that generates and displays the Fibonacci series up to a specified number of terms.
    `,
  },
  {
    name: "Palindrome",
    id: "DF89B0B7-2B62-4996-B79F-4D95EE745FD8",
    description: `Write a java program which print the given three-digit number is palindrome or not   Program is determined by the following rules:   if the given number is a three digit number,   and that number is a palindrome then print a message that "the number is palindrome".   else print a message that "the number is not a palindrome"  if the given number is negative or zero, print a message that "the given number is -ve kindly provide the +ve number"   if the given number is not a three digit number then print the message that "this program can work for the 3 digit number only
    `,
  },
  {
    name: "SwitchCase",
    id: "D9808F82-A58C-4416-94E0-4ECB607A7447",
    description: `Display the name of a month based on its number (1-12) using switch case.
    `,
  },
  {
    name: "Sum Of Digits",
    id: "01E5C6F7-EA00-44B3-BD28-603EF7900072",
    description: `Write a Java program to read a number from the user between 0 and 1000 and sum all the digits in the number.
    `,
  },
  {
    name: "Sum Of Two PrimeNumbers",
    id: "0FD917E1-690A-44F1-920F-7764D9969459",
    description: `Write a program in Java to check whether a number can be expressed as the sum of two prime.
    `,
  },
];

function ProblemsetComponent({ shouldCountDispatch, resetTimerDispatch }) {
  const { user } = useContext(UserContext);
  const cardVariants = {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0 },
    exit: { opacity: 0, y: -20 },
  };

  const resetExamTimer = () => {
    resetTimerDispatch();
    shouldCountDispatch(false);
  };

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
                    to={`/problem/${problem.id}`}
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
                          {/* Add problem description or additional details here */}
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
