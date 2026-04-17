import axios from "axios";

const authEmailBaseUrl = (
  import.meta.env.VITE_AUTH_EMAIL_BASE_URL as string | undefined
)?.replace(/\/+$/, "");

if (!authEmailBaseUrl) {
  throw new Error("Missing VITE_AUTH_EMAIL_BASE_URL in environment.");
}

const authEmailApi = axios.create({
  baseURL: authEmailBaseUrl,
  headers: {
    "Content-Type": "application/json",
  },
});

export default authEmailApi;
