// import axios from "axios";

// export default async function handler(req, res) {
//   if (req.method === "POST") {
//     const { senderId, receiverId, sendAmount } = req.body;
//     const jwtToken = req.headers.authorization;

//     try {
//       const response = await axios.post(
//         "http://localhost:8080/accounts/send",
//         {
//           senderId,
//           receiverId,
//           sendAmount,
//         },
//         {
//           headers: {
//             Authorization: `Bearer ${jwtToken}`,
//             "Content-Type": "application/json",
//           },
//         }
//       );

//       if (response && response.status === 200) {
//         return res.status(200).json(response.data);
//       } else {
//         return res.status(response.status).json(response.data);
//       }
//     } catch (error) {
//       return res.status(error.response.status).json(error.response.data);
//     }
//   } else {
//     return res.status(400).json({ error: "Invalid request method" });
//   }
// }
import axios from "axios";

export default async function handler(req, res) {
  if (req.method === "POST") {
    const { accountNo, amount } = req.body;
    const jwtToken = req.headers.authorization;

    try {
      const response = await axios.post(
        "http://localhost:8080/accounts/deposit",
        {
          accountNo,
          amount,
        },
        {
          headers: {
            Authorization: jwtToken,
            "Content-Type": "application/json",
          },
        }
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
