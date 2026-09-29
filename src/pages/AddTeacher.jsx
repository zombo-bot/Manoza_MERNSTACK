import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

function AddTeacher() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: "",
    specialization: "",
    department: "",
    sex: "Male",
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

    try {
      // Get existing teachers so we can create the next ID
      const response = await fetch("http://localhost:5000/api/teachers");

      if (!response.ok) {
        throw new Error("Failed to fetch teachers");
      }

      const teachers = await response.json();

      const newId =
        teachers.length > 0
          ? Math.max(...teachers.map((teacher) => teacher.id)) + 1
          : 1;

      const newTeacher = {
        id: newId,
        ...formData,
      };

      // Save teacher to MongoDB
      const saveResponse = await fetch(
        "http://localhost:5000/api/teachers",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(newTeacher),
        }
      );

      if (!saveResponse.ok) {
        throw new Error("Failed to save teacher");
      }

      // Go back to Teachers page
      navigate("/teachers");
    } catch (error) {
      console.error("Error saving teacher:", error);
    }
  };

  return (
    <div className="container">
      <div className="form-card">
        <div className="form-header">
          <div>
            <h1>Add Teacher</h1>
            <p>Enter the teacher's information below.</p>
          </div>

          <Link className="back-link" to="/teachers">
            Back to Teachers
          </Link>
        </div>

        <form onSubmit={handleSubmit} className="teacher-form">
          <div className="form-group">
            <label htmlFor="name">Full Name</label>

            <input
              type="text"
              id="name"
              name="name"
              placeholder="Enter full name"
              value={formData.name}
              onChange={handleChange}
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="department">Department</label>

            <input
              type="text"
              id="department"
              name="department"
              placeholder="Enter department (e.g. DIT, CEIT)"
              value={formData.department}
              onChange={handleChange}
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="specialization">Specialization</label>

            <select
              id="specialization"
              name="specialization"
              value={formData.specialization}
              onChange={handleChange}
              required
            >
              <option value="">Select specialization</option>
              <option value="Mathematics">Mathematics</option>
              <option value="Science">Science</option>
              <option value="English">English</option>
              <option value="Filipino">Filipino</option>
              <option value="Social Studies">Social Studies</option>
              <option value="Computer Science">Computer Science</option>
              <option value="Physical Education">
                Physical Education
              </option>
              <option value="Music">Music</option>
              <option value="Art">Art</option>
              <option value="IT">Information Technology</option>
            </select>
          </div>

          <div className="form-group">
            <label htmlFor="sex">Sex</label>

            <select
              id="sex"
              name="sex"
              value={formData.sex}
              onChange={handleChange}
              required
            >
              <option value="Male">Male</option>
              <option value="Female">Female</option>
            </select>
          </div>

          <div className="form-actions">
            <Link className="button button-secondary" to="/teachers">
              Cancel
            </Link>

            <button type="submit" className="button">
              Add Teacher
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default AddTeacher;