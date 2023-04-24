import axios from "axios";

export default async function transactionHandler(req, res) {
  if (req.method === "GET") {
    const { acNo, jwtToken } = req.query;

    const headers = {
      Authorization: `Bearer ${jwtToken}`,
      "Content-Type": "application/json",
    };

    try {
      console.log(acNo);
      const apiResponse = await axios.get(
        `http://localhost:8080/accounts/transaction/${acNo}`,
        {
          headers,
        }
      );
      res.status(200).json(apiResponse.data);
    } catch (error) {
      console.error("Error fetching transaction data:", error);
      res.status(500).json({ error: "Failed to fetch transaction data" });
    }
  }
}
