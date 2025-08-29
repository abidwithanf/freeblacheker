export default async function handler(req, res) {
  const { phone } = req.query;

  const API_KEY = "Pkcka4f2BbdHh2FhzJtx"; // 🔑 your key

  try {
    const url = `https://api.blacklistalliance.net/lookup?key=${API_KEY}&ver=v3&resp=json&phone=${phone}`;
    console.log("➡️ Fetching:", url);

    const response = await fetch(url, {
      method: "GET",
      headers: { "Accept": "application/json" },
    });

    const text = await response.text(); // get raw response
    console.log("⬅️ Raw response:", text);

    if (!response.ok) {
      return res
        .status(response.status)
        .json({ error: `Upstream error: ${response.status}`, details: text });
    }

    const data = JSON.parse(text);
    res.status(200).json(data);
  } catch (err) {
    res.status(500).json({ error: "Proxy server error", details: err.message });
  }
}
