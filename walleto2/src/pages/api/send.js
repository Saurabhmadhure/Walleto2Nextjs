import axios from "axios";

export default async function handler(req, res) {
  if (req.method === "POST") {
    const { senderId, receiverId, sendAmount, jwtToken } = req.body;

    const headers = {
      Authorization: `Bearer ${jwtToken}`,
      "Content-Type": "application/json",
    };

    try {
      const response = await axios.post(
        "http://localhost:8080/accounts/send",
        {
          senderId,
          receiverId,
          sendAmount,
        },
        { headers }
      );

      if (response && response.status === 200) {
        res.status(200).json(response.data);
      }
    } catch (error) {
      if (error.response && error.response.data === "") {
        res.status(500).json("No Account Available");
      } else {
        res.status(500).json(error.response.data);
      }
    }
  } else {
    res.status(404).json("Not Found");
  }
}
