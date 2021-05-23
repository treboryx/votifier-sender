import express, { Application, Request, Response } from "express";
import figlet from "figlet";
import votifier from "votifier-send";

const app: Application = express();
const print = (text: string) =>
  figlet(text, (err, data) => (err ? console.error(err) : console.log(data)));

app.use(express.json());

app.post("/", (req: Request, res: Response) => {
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
        .status(500)
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

app.get("/", (req: Request, res: Response) => {
  return res.redirect("https://crafty.gg");
});

app.listen(2000, () => {
  print("VOTIFIER-SENDER");
});
