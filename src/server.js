import express from "express";
import morgan from "morgan";
import globalRouter from "./routers/globalRouter";
import userRouter from "./routers/userRouter";
import videoRouter from "./routers/videoRouter";
const PORT = "8000";
const app = express();
const logger = morgan("dev");
const rootHander = (req, res) => {
  console.log("sibal");
  res.send("sex");
};

app.set("view engine", "pug");
app.set("views", process.cwd() + "/src/views");
app.use(logger);
app.use(express.urlencoded({ extended: true }));
app.use("/", globalRouter);
app.use("/users", userRouter);
app.use("/videos", videoRouter);
app.get("/", rootHander);

const listenHanlder = () => console.log("LISTEN");

app.listen(PORT, listenHanlder);
