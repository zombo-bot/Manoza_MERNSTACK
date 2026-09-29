import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";

function StudentDetails() {
  const { id } = useParams();

  const [student, setStudent] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("http://localhost:5000/api/students")
      .then((response) => response.json())
      .then((data) => {
        const foundStudent = data.find(
          (s) => s.id === parseInt(id)
        );

        setStudent(foundStudent);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching student:", error);
        setLoading(false);
      });
  }, [id]);

  if (loading) {
    return (
      <div className="container">
        <h1>Loading Student...</h1>
      </div>
    );
  }

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
        <p>
          <strong>Name:</strong> {student.name}
        </p>

        <p>
          <strong>Student Number:</strong> {student.studentNumber}
        </p>

        <p>
          <strong>Course:</strong> {student.course}
        </p>

        <p>
          <strong>Year Level:</strong> {student.year}
        </p>

        <p>
          <strong>Gender:</strong> {student.gender}
        </p>

        <Link className="button" to="/students">
          Back to Students
        </Link>
      </div>
    </div>
  );
}

export default StudentDetails;