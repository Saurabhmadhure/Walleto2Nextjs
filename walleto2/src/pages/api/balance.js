import axios from "axios";

export default async function handler(req, res) {
  if (req.method === "GET") {
    const { acNo, jwtToken } = req.query;

    const headers = {
      Authorization: `Bearer ${jwtToken}`,
      "Content-Type": "application/json",
    };

    try {
      const response = await axios.get(
        `http://localhost:8080/accounts/${acNo}`,
        { headers }
      );

      if (response && response.status === 200) {
        return res.status(200).json(response.data);
      } else {
        return res.status(response.status).json(response.data);
      }
    } catch (error) {
      return res.status(error.response.status).json(error.response.data);
    }
  } else {
    return res.status(400).json({ error: "Invalid request method" });
  }
}
