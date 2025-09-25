import express, {type Request, type Response} from "express";
import morgan from 'morgan';

import studentRouter from "./routes/studentRoutes.js";
import coursesRoutes from "./routes/courseRoutes.js"

const app: any = express();

//Middleware
app.use(express.json());
app.use(morgan('dev'));

app.get("/", (req: Request, res: Response) => {
  res.send("API services for Student Data");
});

app.listen(3000, () =>
  console.log("🚀 Server running on http://localhost:3000")
);

app.use(studentRouter);
app.use("/api/v2/students", coursesRoutes);

export default app;
