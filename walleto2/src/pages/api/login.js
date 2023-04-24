// pages/api/login.js

import axios from "axios";

export default async function handler(req, res) {
  if (req.method === "POST") {
    const { email, password } = req.body;

    try {
      const response = await axios.post("http://localhost:8080/users/login", {
        email,
        password,
      });
      console.log(res);
      console.log(req);

      res.status(200).json(response.data);
    } catch (error) {
      res.status(error.response.status).json(error.response.data);
      console.log(error);
      console.log(res);
    }
  } else {
    res.status(400).json({ message: "Invalid request" });
  }
}
