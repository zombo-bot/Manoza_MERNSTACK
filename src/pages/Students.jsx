import { useEffect, useState } from "react";
import Student from "../components/Student";

function Students() {
  const [students, setStudents] = useState([]);

  useEffect(() => {
    fetch("http://localhost:5000/api/students")
      .then((response) => response.json())
      .then((data) => {
        console.log("Students from API:", data);
        setStudents(data);
      })
      .catch((error) => {
        console.error("Error fetching students:", error);
      });
  }, []);

  const [showForm, setShowForm] = useState(false);

  const [formData, setFormData] = useState({
    name: "",
    studentNumber: "",
    course: "BS Information Technology",
    year: "1st Year",
    gender: "Male",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const newId =
      students.length > 0
        ? Math.max(...students.map((s) => s.id)) + 1
        : 1;

    const newStudent = {
      id: newId,
      ...formData,
    };

    try {
      const response = await fetch("http://localhost:5000/api/students", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newStudent),
      });

      if (!response.ok) {
        throw new Error("Failed to save student");
      }

      const savedStudent = await response.json();

      setStudents((prev) => [savedStudent, ...prev]);

      setFormData({
        name: "",
        studentNumber: "",
        course: "BS Information Technology",
        year: "1st Year",
        gender: "Male",
      });

      setShowForm(false);
    } catch (error) {
      console.error("Error saving student:", error);
    }
  };

  return (
    <div className="container">
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          marginBottom: "30px",
        }}
      >
        <h1 style={{ margin: 0 }}>Students</h1>

        <button
          className="button"
          onClick={() => setShowForm(!showForm)}
          style={{ border: "none", cursor: "pointer" }}
        >
          {showForm ? "Cancel" : "Add New Student"}
        </button>
      </div>

      {showForm && (
        <div
          className="student-card"
          style={{
            marginBottom: "30px",
            maxWidth: "500px",
          }}
        >
          <h3 style={{ marginTop: 0 }}>Add New Student</h3>

          <form
            onSubmit={handleSubmit}
            style={{
              display: "flex",
              flexDirection: "column",
              gap: "14px",
            }}
          >
            <input
              type="text"
              name="name"
              placeholder="Full Name"
              value={formData.name}
              onChange={handleChange}
              required
              style={{
                padding: "10px",
                borderRadius: "6px",
                border: "1px solid #ccc",
              }}
            />

            <input
              type="text"
              name="studentNumber"
              placeholder="Student Number"
              value={formData.studentNumber}
              onChange={handleChange}
              required
              style={{
                padding: "10px",
                borderRadius: "6px",
                border: "1px solid #ccc",
              }}
            />

            <select
              name="course"
              value={formData.course}
              onChange={handleChange}
              style={{
                padding: "10px",
                borderRadius: "6px",
                border: "1px solid #ccc",
                background: "white",
              }}
            >
              <option value="BS Information Technology">
                BS Information Technology
              </option>
              <option value="BS Computer Science">
                BS Computer Science
              </option>
              <option value="BS Information Systems">
                BS Information Systems
              </option>
            </select>

            <select
              name="year"
              value={formData.year}
              onChange={handleChange}
              style={{
                padding: "10px",
                borderRadius: "6px",
                border: "1px solid #ccc",
                background: "white",
              }}
            >
              <option value="1st Year">1st Year</option>
              <option value="2nd Year">2nd Year</option>
              <option value="3rd Year">3rd Year</option>
              <option value="4th Year">4th Year</option>
            </select>

            <select
              name="gender"
              value={formData.gender}
              onChange={handleChange}
              style={{
                padding: "10px",
                borderRadius: "6px",
                border: "1px solid #ccc",
                background: "white",
              }}
            >
              <option value="Male">Male</option>
              <option value="Female">Female</option>
              <option value="Other">Other</option>
            </select>

            <button
              type="submit"
              className="button"
              style={{
                border: "none",
                cursor: "pointer",
                width: "100%",
              }}
            >
              Save Student
            </button>
          </form>
        </div>
      )}

      <div className="student-grid">
        {students.map((student) => (
          <Student key={student.id} student={student} />
        ))}
      </div>
    </div>
  );
}

export default Students;