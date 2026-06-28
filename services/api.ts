import axios from "axios";

export const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL,
  // withCredentials: true,
});

api.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  if (token) {
    config.headers.Authorization = `Bearer ${token.trim()}`;
  }

  return config;
});

api.interceptors.response.use(
  (res) => res,
  (err) => {
    if (err.response?.status === 401) {
      localStorage.removeItem("token");
      localStorage.removeItem("user");
      window.location.href = "/login";
    }
    return Promise.reject(err);
  },
);

// api.interceptors.response.use(
//   (response) => response,
//   (error) => {
//     if (error.response?.status === 401) {
//       console.log("Unauthorized - logging out");

//       // local cleanup
//       localStorage.removeItem("user");

//       // call logout API (to clear cookie server-side)
//       // await axios.post('/logout', {}, { withCredentials: true })

//       window.location.href = "/login";
//     }

//     return Promise.reject(error);
//   },
// );
