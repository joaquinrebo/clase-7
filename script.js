const students = [];

document.getElementById("studentForm").addEventListener("submit", function (e) {
    e.preventDefault();

    
    document.getElementById("errorName").textContent = "";
    document.getElementById("errorLastName").textContent = "";
    document.getElementById("errorGrade").textContent = "";

    const name = document.getElementById("name").value.trim();
    const lastName = document.getElementById("lastName").value.trim();
    const grade = parseFloat(document.getElementById("grade").value);

    let valid = true;

    if (!name) {
        document.getElementById("errorName").textContent = "El nombre es obligatorio.";
        valid = false;
    }

    if (!lastName) {
        document.getElementById("errorLastName").textContent = "El apellido es obligatorio.";
        valid = false;
    }

    if (isNaN(grade) || grade < 1 || grade > 7) {
        document.getElementById("errorGrade").textContent = "La nota debe estar entre 1 y 7.";
        valid = false;
    }

    if (!valid) return;

    const student = { name, lastName, grade };
    students.push(student);
    addStudentToTable(student);
    calcularPromedio();
    this.reset();
});

const tableBody = document.querySelector("#studentTable tbody");

function addStudentToTable(student) {
    const row = document.createElement("tr");
    row.innerHTML = `
        <td>${student.name}</td>
        <td>${student.lastName}</td>
        <td>${student.grade}</td>
        <td> <button class="btn">Eliminar</button</td>
         <td> <button class="btn">Editar</button</td>
    `;
    row.querySelector(".btn").addEventListener("click",function(){
        borrarEstudiante(student,row);
        editarEstudiante(student,row);
    })
    tableBody.appendChild(row);
}
function borrarEstudiante(student,row){
    const index=students.indexOf(student);
    if(index >-1){
        students.splice(index,1);
        row.remove();
        calcularPromedio();
    }
}

const promDiv = document.getElementById("average");

function calcularPromedio() {
    if (students.length === 0) {
        promDiv.innerHTML = "Promedio General del curso: N/A";
        return;
    }
    const total = students.reduce((acc, student) => acc + student.grade, 0);
    const average = total / students.length;
    promDiv.innerHTML = `Promedio General del curso: ${average.toFixed(2)}`;
}