import { API_URL } from "@/env";
import { io } from "socket.io-client";

export const SOCKET = io("http://localhost:9000/");
