import { useState } from "react";
import { Link } from "react-router-dom";
import Teacher from "../components/Teacher";
import initialTeachers from "../data/teachers.json";

function Teachers() {
  const savedTeachers = localStorage.getItem("teachers");

  const [teachers, setTeachers] = useState(
    savedTeachers ? JSON.parse(savedTeachers) : initialTeachers
  );

  return (
    <div className="container">
      <div className="page-header">
        <h1>Teachers</h1>

        <Link className="button" to="/teachers/add">
          Add Teacher
        </Link>
      </div>

      {teachers.length === 0 ? (
        <div className="empty-state">
          <h2>No Teachers Found</h2>
          <p>There are currently no teachers in the directory.</p>

          <Link className="button" to="/teachers/add">
            Add First Teacher
          </Link>
        </div>
      ) : (
        <div className="teacher-grid">
          {teachers.map((teacher) => (
            <Teacher key={teacher.id} teacher={teacher} />
          ))}
        </div>
      )}
    </div>
  );
}

export default Teachers;