import axios from "axios";

export const api = axios.create({
  baseURL: "http://localhost:5188/api", // Port is set in backend launchSettings.json
});

