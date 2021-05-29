"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const votifier_send_1 = __importDefault(require("votifier-send"));
const cors_1 = __importDefault(require("cors"));
const app = express_1.default();
app.use(express_1.default.json());
app.use(cors_1.default());
app.post("/", (req, res) => {
    res.set({
        "Access-Control-Allow-Credentials": true,
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Methods": "GET,OPTIONS,PATCH,DELETE,POST,PUT",
        "Access-Control-Allow-Headers": "X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version",
    });
    res.header("Access-Control-Allow-Origin", "*");
    const { settings } = req.body;
    settings.data.timestamp = new Date().getTime();
    try {
        votifier_send_1.default.send(settings, (err) => {
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
    }
    catch (e) {
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
//# sourceMappingURL=index.js.map