import { Link, useParams } from "react-router-dom";
import initialStudents from "../data/students.json";

function StudentDetails() {
  const { id } = useParams();

  const savedStudents = localStorage.getItem("students");
  const students = savedStudents ? JSON.parse(savedStudents) : initialStudents;

  const student = students.find((s) => s.id === parseInt(id));

  if (!student) {
    return (
      <div className="container">
        <h1>Student Not Found</h1>
        <Link className="button" to="/students">
          Back to Students
        </Link>
      </div>
    );
  }

  return (
    <div className="container">
      <h1>Student Details</h1>

      <div className="details-card">
        <p><strong>Name:</strong> {student.name}</p>
        <p><strong>Student Number:</strong> {student.studentNumber}</p>
        <p><strong>Course:</strong> {student.course}</p>
        <p><strong>Year Level:</strong> {student.year}</p>
        <p><strong>Gender:</strong> {student.gender}</p>

        <Link className="button" to="/students">
          Back to Students
        </Link>
      </div>
    </div>
  );
}

export default StudentDetails;