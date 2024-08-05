// apiClient.ts
import axios from "axios";

const API_URL = "https://sw-api.starnavi.io";

export const apiClient = axios.create({
  baseURL: API_URL,
});

export default apiClient;
