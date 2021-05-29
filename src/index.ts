import express from "express";
import votifier from "votifier-send";
import cors from "cors";
const app = express();

app.use(express.json());
app.use(cors());

app.post("/", (req, res) => {
  res.set({
    "Access-Control-Allow-Credentials": true,
    "Access-Control-Allow-Origin": "*",
    "Access-Control-Allow-Methods": "GET,OPTIONS,PATCH,DELETE,POST,PUT",
    "Access-Control-Allow-Headers":
      "X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version",
  });
  res.header("Access-Control-Allow-Origin", "*");
  const { settings } = req.body as any;
  settings.data.timestamp = new Date().getTime();
  try {
    votifier.send(settings, (err: any) => {
      if (err) {
        return res.status(500).json({
          success: false,
          message: "Something went wrong - Server could be offline",
        });
      }
      return res
        .status(200)
        .json({ success: true, message: "Votifier signal forwarded" });
    });
  } catch (e) {
    return res.status(400).json({
      success: false,
      message: e,
      friendly: "Data provided (public key or IP) could be invalid",
    });
  }
});

app.get("/", (req, res) => {
  return res.redirect("https://crafty.gg");
});

app.listen(2000, () => {
  console.log("Votifier-sender service started");
});

module.exports = app;
