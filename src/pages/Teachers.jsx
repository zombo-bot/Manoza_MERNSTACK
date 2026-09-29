import { useEffect, useState } from "react";
import Teacher from "../components/Teacher";

function Teachers() {
  const [teachers, setTeachers] = useState([]);

  useEffect(() => {
    fetch("http://localhost:5000/api/teachers")
      .then((response) => response.json())
      .then((data) => {
        console.log("Teachers from API:", data);
        setTeachers(data);
      })
      .catch((error) => {
        console.error("Error fetching teachers:", error);
      });
  }, []);

  return (
    <div className="container">
      <h1>Teachers</h1>

      <div className="student-grid">
        {teachers.map((teacher) => (
          <Teacher key={teacher.id} teacher={teacher} />
        ))}
      </div>
    </div>
  );
}

export default Teachers;
