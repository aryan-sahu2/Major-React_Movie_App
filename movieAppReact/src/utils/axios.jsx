import axios from "axios";

const instance = axios.create({
  baseURL: "https://api.themoviedb.org/3/",
  headers: {
    accept: "application/json",
    Authorization:
      "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJhODNhMTg2NTA2MTZlYTU5MTJkZmU5N2ZlNjgyMzVkNCIsInN1YiI6IjY2MTM3ZTU2NTkwMDg2MDE2MjdjYmU5MiIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.By9JTY7F86xfBNDEe5NyVBXexvhGTxbO8vDI9fvgb90",
  },
});

export default instance;
