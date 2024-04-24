import axios from "axios";

const baseURL = "http://49.207.10.13:3008/";

const api = axios.create({ baseURL });

export const submitUserCodeApi = (payload) => {
  const response = api.post("api/codeexecute", payload);

  return response;
};

export default api;
