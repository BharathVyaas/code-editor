import { motion } from "framer-motion";
import { NavLink } from "react-router-dom";
import {
  Card,
  CardContent,
  CardHeader,
  Typography,
  Box,
  Button,
  Grid,
  Container,
} from "@mui/material";
import Naresh_IT_Logo from "../assets/Naresh_IT_Logo.png";
import { UserContext } from "../context/UserContext";
import { useContext } from "react";

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
    description: `Write a  program to determine whether a given integer number is a palindrome or not. A palindrome number is a number that remains the same when its digits are reversed.    Program Description:    Write a program that checks whether a given integer number is a palindrome or not. The program should perform the following tasks:    1.Define a class named Palindrome.  2.Inside the class, define a Main method to serve as the entry point of the program.  Within the Main method:  3.Declare and initialize an integer variable number with a sample input value (e.g., 12321).  Call a function named CheckPalindrome with the number as an argument to determine whether it is a palindrome.  4.Display a message indicating whether the number is a palindrome or not based on the returned boolean value.  5.Define a static method named CheckPalindrome that takes an integer parameter num and returns a boolean value indicating whether the number is a palindrome.  Inside the CheckPalindrome method:    a)Initialize two integer variables reversedNum and originalNum to 0 and num respectively.    b)Use a while loop to reverse the digits of num and store the reversed number in reversedNum.    c)Check if the originalNum is equal to the reversedNum. If they are equal, return true; otherwise, return false.
    `,
  },
  {
    name: "Reverse a String",
    id: "7C316575-F117-4F01-81C2-23775098A5FB",
    description: `Write a program to reverse a given string.`,
  },
  {
    name: "Simple Addition Program",
    id: "64F43AC3-3799-4EE8-98DE-603FED13FA83",
    description: `This program performs simple addition of two numbers.`,
  },
  {
    name: "Factorial of a Number",
    id: "C6979C8A-A7C6-4305-8358-70215DC9D24A",
    description: `The program calculates the factorial of a given integer number. The factorial of a number is the product of all positive integers less than or equal to that number.`,
  },
  {
    name: "Monk and Rotation",
    id: "08E4CF9D-3F96-4CE8-A110-E4B28CBA0FED",
    description: `Monk loves to preform different operations on arrays, and so being the principal of Hackerearth School, he assigned a task to his new student Mishki.   Mishki will be provided with an integer array A of size N and an integer K , where she needs to rotate the array in the right direction by K steps and then print the resultant array.   As she is new to the school, please help her to complete the task.`,
  },
];

function Problemset() {
  const { user } = useContext(UserContext);
  const cardVariants = {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0 },
    exit: { opacity: 0, y: -20 },
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
                    className="block w-full h-full"
                  >
                    <Card className="hover:shadow-lg rounded-md">
                      <CardHeader
                        title={problem.name}
                        subheader={problem.id}
                        action={
                          <Button
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

export default Problemset;
