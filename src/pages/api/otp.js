import axios from "axios";

export default async function register(req, res) {
  if (req.method === "POST") {
    try {
      const { email, userEnteredOTP } = req.body;

      const response = await axios.post("http://localhost:8080/users/verify", {
        email,
        userEnteredOTP,
      });

      res.status(200).json(response.data);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: "Internal server error" });
    }
  } else {
    res.status(404).json({ error: "Invalid request method" });
  }
}
