import axios from "axios";

const baseURL = "https://www.nareshit.net/";
// for code compile
const baseURLCS = "http://49.207.10.13:3008/";

const api = axios.create({ baseURL });
const apiCS = axios.create({ baseURL: baseURLCS });

export const submitUserCodeApi = (payload) => {
  try {
    const response = apiCS.post("api/codeexecute", payload);

    return response;
  } catch (error) {
    return error;
  }
};

export const submitUserCsharpCodeApi = (payload) => {
  try {
    console.log(payload);
    const response1 = apiCS.post("api/codeexecute", payload);
    const response2 = apiCS.post("api/codeexecute", {
      ...payload,
      ProgramId: response1.data,
    });
    return response2;
  } catch (error) {
    return error;
  }
};

export const retrieveDetailsApi = (payload) => {
  try {
    const response = api.get(`retrieveProgramQuestions/${payload}`);

    return response;
  } catch (error) {
    return error;
  }
};

export const retrieveTestCasesApi = (payload) => {
  try {
    const response = api.get(`retrieveProgramTestCase/${payload}`);

    return response;
  } catch (error) {
    return error;
  }
};

export default api;
