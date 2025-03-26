import { io } from "socket.io-client";
import { BASE_URL } from "../constants/baseUrl";

export const createSocketConnection = () => {
  const isProduction = import.meta.env.MODE === "production";
  if (isProduction) {
    return io("/", { path: "/api/socket.io" });
  } else {
    return io(BASE_URL);
  }
};
