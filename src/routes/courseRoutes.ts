import { Router, type Request, type Response } from "express";
import { students, courses } from "../db/db.js";
import { zStudentId } from "../schemas/studentValidator.js";
import type { Course } from "../libs/types.js";
import { zCoursePutBody, zCourseDeleteBody, zCoursePostBody, } from "../schemas/courseValidator.js";

const router: Router = Router();

// READ all
router.get("/:studentId/courses", (req:Request,  res:Response ) => {
    try {
    const studentId = req.params.studentId;

    // Validate studentId
    const result = zStudentId.safeParse(studentId);
    if (!result.success) {
      return res.status(400).json({
        message : `Validation failed`,
        error: result.error.issues[0]?.message
      });
    }

    // Find student
    const student = students.find((s) => s.studentId === studentId);
    if (!student) {
      return res.status(404).json({
        success: false,
        message: "Student does not exists",
      });
    }

    // Map courseId to course details (courseId + courseTitle)
    const registeredCourses = (student.courses ?? [])
      .map((cid) => {
        const c: Course | undefined = courses.find(course => course.courseId === cid);
        return c ? { courseId: c.courseId, courseTitle: c.courseTitle } : null;
      })
      .filter(Boolean);

    return res.json({
      success: true,
      message: `Get courses detail of student ${studentId}`,
      data: {
        studentId: student.studentId,
        courses: registeredCourses,
      },
    });
  } catch (err) {
    return res.status(500).json({
      success: false,
      message: "Something is wrong, please try again",
      error: err,
    });
  }
});

// Params URL 
router.get("/courseId/:courseId", (req:Request, res:Response) => {
    
});

router.post("/", () => {
});

router.put("/", () => {
});

router.delete("/",() => {
});

export default router;
