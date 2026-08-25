import StudentCard from "./components/student_card";

function App() {
  return (
    <div className="min-h-screen bg-gray-50 p-8 flex items-center justify-center">
      <StudentCard 
        name="Ian Manoza"
        age={19}
        stud_num="202403620"
        gender="Male"
        section="3-3"
        course="Information Technology"
      />
    </div>
  );
}

export default App;