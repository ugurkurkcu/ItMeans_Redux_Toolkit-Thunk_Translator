import axios from "axios";

export default axios.create({
  baseURL: "https://text-translator2.p.rapidapi.com",
  headers: {
    "content-type": "application/x-www-form-urlencoded",
    "X-RapidAPI-Key": "a01f8c9863msh4496ae4728b9bfbp1e00f2jsn1c873837ceb9",
    "X-RapidAPI-Host": "text-translator2.p.rapidapi.com",
  },
});
