import express, {type Request, type Response} from "express";
import morgan from 'morgan';

import studentRouter from "./routes/studentRoutes.js";
import coursesRouter from "./routes/courseRoutes.js"

const app: any = express();

//Middleware
app.use(express.json());
app.use(morgan('dev'));

app.get("/", (req: Request, res: Response) => {
  res.send("API services for Student Data");
});

app.get("/me", (req: Request, res: Response) => {
  res.status(200).json({
    success: true,
    message: "Student Information",
    data: {
      studentId: "670610688",
      firstName: "Natchaya",
      lastName: "Duangphang",
      program: "CPE",
      section: "001",
    },
  });
});

app.listen(3000, () =>
  console.log("🚀 Server running on http://localhost:3000")
);

app.use("/api/v2" , studentRouter);
app.use("/api/v2" , coursesRouter);

export default app;
