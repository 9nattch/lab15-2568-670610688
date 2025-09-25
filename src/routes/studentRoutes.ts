import { Router, type Request, type Response } from "express";
import { students } from "../db/db.js";


const router = Router(); 

// GET /me
router.get("/me", (req:Request, res:Response) => {
  try {
    const me = students[0];

    return res.status(200).json({
      success: true,
      message: "Student Information",
      data: me,
    });
  } catch (err) {
    return res.status(500).json({
      success: false,
      message: "Something is wrong, please try again",
      error: err,
    });
  }
});

export default router;

