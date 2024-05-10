import axios from "axios";

const baseURL = "https://www.nareshit.net/";
const compilerURL = "http://49.207.10.13:3008/";
const compilerC = "http://49.207.10.13:8080/";

const api = axios.create({ baseURL });
const compilerApi = axios.create({ baseURL: compilerURL });
const apiCS = axios.create({ baseURL: compilerC });

export const submitUserCodeApi = async (payload) => {
  try {
    const response = await compilerApi.post("api/codeexecute", payload);
    return response;
  } catch (error) {
    throw error;
  }
};

export const submitUserCCodeApi1 = async (payload) => {
  try {
    const response1 = await apiCS.post("/", payload);
    return response1;
  } catch (error) {
    throw error;
  }
};

export const submitTestApi = async (payload) => {
  try {
    const response = await api.post("Insertion_StudentProgramDeatils", payload);
    return response;
  } catch (error) {
    throw error; // Throw the error to be caught by Redux Saga
  }
};

export const retrieveDetailsApi = async (payload) => {
  try {
    const response = await api.get(`retrieveProgramQuestions/${payload}`);
    return response;
  } catch (error) {
    throw error;
  }
};

export const retrieveTestCasesApi = async (payload) => {
  try {
    const response = await api.get(`retrieveProgramTestCase/${payload}`);
    return response;
  } catch (error) {
    throw error;
  }
};

export default api;
