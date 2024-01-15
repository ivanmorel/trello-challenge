import axios from "axios";

import { accessToken } from "../config";

const axiosClient = axios.create({
  headers: { 'Access-Token': accessToken }
});

axiosClient.interceptors.response.use(
  (response) => response,
  (error) => console.log(error),
);

export default axiosClient;