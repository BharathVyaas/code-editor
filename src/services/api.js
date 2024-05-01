import axios from "axios";

const baseURL = "https://www.nareshit.net/";
const baseURLCS = "http://49.207.10.13:3008/";

const api = axios.create({ baseURL });
const apiCS = axios.create({ baseURL: baseURLCS });

export const submitUserCodeApi = async (payload) => {
  try {
    const response = await apiCS.post("api/codeexecute", payload);
    return response;
  } catch (error) {
    throw error; // Throw the error to be caught by Redux Saga
  }
};

export const submitUserCsharpCodeApi1 = async (payload) => {
  try {
    const response1 = await apiCS.post("api/codeexecute", payload);
    return response1;
  } catch (error) {
    throw error;
  }
};

export const submitUserCsharpCodeApi2 = async (payload, response1) => {
  try {
    const response2 = await apiCS.post("api/codeexecute", {
      ...payload,
      ProgramId: response1.output || "NA",
    });
    return response2;
  } catch (error) {
    throw error;
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
