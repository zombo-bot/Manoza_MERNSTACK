import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

const departmentSpecializations = {

  CEIT: [
    "Information Technology",
    "Computer Engineering",
    "Electronics",
    "Embedded Systems",
    "Computer Hardware",
    "Digital Systems",
    "Robotics",
  ],

  CGS: [
    "Mathematics",
    "Science",
    "English",
    "Filipino",
    "Social Studies",
  ],

  CSPEAR: [
    "Physical Education",
    "Sports Science",
    "Health Education",
  ],

  CAS: [
    "Music",
    "Art",
    "Performing Arts",
  ],
};

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

      ...(name === "department" && {
        specialization: "",
      }),
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch("http://localhost:5000/api/teachers");

      if (!response.ok) {
        throw new Error("Failed to fetch teachers");
      }

      const teachers = await response.json();

      const newId =
        teachers.length > 0
          ? Math.max(...teachers.map((teacher) => Number(teacher.id))) + 1
          : 1;

      const newTeacher = {
        id: newId,
        ...formData,
      };

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

      navigate("/teachers");
    } catch (error) {
      console.error("Error saving teacher:", error);
    }
  };

  const specializations =
    departmentSpecializations[formData.department] || [];

  return (
    <div className="container">
      <div className="form-card">

        <div className="form-header">
          <div>
            <h1>Add Teacher</h1>
            <p>Enter the teacher's information below.</p>
          </div>

          <Link className="back-link" to="/teachers">
            ← Back to Teachers
          </Link>
        </div>

        <form onSubmit={handleSubmit} className="teacher-form">

          <div className="form-group">
            <label htmlFor="name">
              Full Name
            </label>

            <input
              type="text"
              id="name"
              name="name"
              placeholder="e.g. Rene Butterbonia"
              value={formData.name}
              onChange={handleChange}
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="department">
              Department
            </label>

            <select
              id="department"
              name="department"
              value={formData.department}
              onChange={handleChange}
              required
            >
              <option value="">
                Select department
              </option>

              <option value="CEIT">
                CEIT - Computer Engineering / IT
              </option>

              <option value="DTE">
                DTE - Department of Teacher Education
              </option>

              <option value="DPE">
                DPE - Department of Physical Education
              </option>

              <option value="DAS">
                DAS - Department of Arts and Sciences
              </option>
            </select>
          </div>

          <div className="form-group">
            <label htmlFor="specialization">
              Specialization
            </label>

            <select
              id="specialization"
              name="specialization"
              value={formData.specialization}
              onChange={handleChange}
              disabled={!formData.department}
              required
            >
              <option value="">
                {!formData.department
                  ? "Select a department first"
                  : "Select specialization"}
              </option>

              {specializations.map((specialization) => (
                <option
                  key={specialization}
                  value={specialization}
                >
                  {specialization}
                </option>
              ))}
            </select>

            {formData.department && (
              <small className="form-hint">
                Showing specializations available for{" "}
                <strong>{formData.department}</strong>.
              </small>
            )}
          </div>

          {/* SEX */}
          <div className="form-group">
            <label htmlFor="sex">
              Sex
            </label>

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

          {/* ACTIONS */}
          <div className="form-actions">
            <Link
              className="button button-secondary"
              to="/teachers"
            >
              Cancel
            </Link>

            <button
              type="submit"
              className="button"
            >
              Add Teacher
            </button>
          </div>

        </form>
      </div>
    </div>
  );
}

export default AddTeacher;

