import "dotenv/config";
import "./db";
import "./models/Video";
import "./models/User";
import "./models/Comment";
import app from "./server";
const PORT = "8000";

const listenHanlder = () => console.log("LISTEN");

app.listen(PORT, listenHanlder);
