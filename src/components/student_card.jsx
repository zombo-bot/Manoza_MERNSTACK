function StudentCard({ name, age, stud_num, gender, section, course }) {
    return (
        <div>
            <p className="text-xl">Name: {name}</p>
            <p className="text-xl">Age: {age}</p>
            <p className="text-xl">Student Number: {stud_num}</p>
            <p className="text-xl">Gender: {gender}</p>
            <p className="text-xl">Section: {section}</p>
            <p className="text-xl">Course: {course}</p>
        </div>
    );    
}

export default StudentCard;