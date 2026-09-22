function Teacher({ teacher }) {
  return (
    <div className="teacher-card">
      <h2>{teacher.name}</h2>

      <p>
        <strong>ID:</strong> {teacher.id}
      </p>

      <p>
        <strong>Specialization:</strong> {teacher.specialization}
      </p>

      <p>
        <strong>Department:</strong> {teacher.department}
      </p>

      <p>
        <strong>Sex:</strong> {teacher.sex}
      </p>
    </div>
  );
}

export default Teacher;
