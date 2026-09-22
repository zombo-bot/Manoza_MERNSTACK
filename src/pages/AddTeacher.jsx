import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import initialTeachers from "../data/teachers.json";

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

  const handleSubmit = (e) => {
    e.preventDefault();

    // Get existing teachers from localStorage
    const savedTeachers = localStorage.getItem("teachers");

    const teachers = savedTeachers
      ? JSON.parse(savedTeachers)
      : initialTeachers;

    // Generate a new ID
    const newId =
      teachers.length > 0
        ? Math.max(...teachers.map((teacher) => teacher.id)) + 1
        : 1;

    // Create the new teacher
    const newTeacher = {
      id: newId,
      ...formData,
    };

    // Add new teacher to the existing data
    const updatedTeachers = [newTeacher, ...teachers];

    // Save updated data
    localStorage.setItem(
      "teachers",
      JSON.stringify(updatedTeachers)
    );

    // Go back to Teacher List
    navigate("/teachers");
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
            <label htmlFor="specialization">
              Specialization
            </label>

            <input
              type="text"
              id="specialization"
              name="specialization"
              placeholder="e.g. Mathematics"
              value={formData.specialization}
              onChange={handleChange}
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="department">
              Department
            </label>

            <input
              type="text"
              id="department"
              name="department"
              placeholder="e.g. Science"
              value={formData.department}
              onChange={handleChange}
              required
            />
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
            <Link
              className="button button-secondary"
              to="/teachers"
            >
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