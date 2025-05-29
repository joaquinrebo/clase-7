const students = [];
let editingIndex = -1; 

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
    
    if (editingIndex === -1) {
        
        students.push(student);
    } else {
        
        students[editingIndex] = student;
        editingIndex = -1; 
        document.querySelector("button[type='submit']").textContent = "Guardar";
    }

    updateTable();
    calcularPromedio();
    this.reset();
});

const tableBody = document.querySelector("#studentTable tbody");

function updateTable() {
    tableBody.innerHTML = '';
    students.forEach((student, index) => {
        const row = document.createElement("tr");
        row.innerHTML = `
            <td>${student.name}</td>
            <td>${student.lastName}</td>
            <td>${student.grade}</td>
            <td>
                <button class="btn-delete">Eliminar</button>
                <button class="btn-edit">Editar</button>
            </td>
        `;
        
        row.querySelector(".btn-delete").addEventListener("click", function() {
            borrarEstudiante(index);
        });
        
        row.querySelector(".btn-edit").addEventListener("click", function() {
            editarEstudiante(index);
        });
        
        tableBody.appendChild(row);
    });
}

function borrarEstudiante(index) {
    students.splice(index, 1);
    updateTable();
    calcularPromedio();
}

function editarEstudiante(index) {
    const student = students[index];
    document.getElementById("name").value = student.name;
    document.getElementById("lastName").value = student.lastName;
    document.getElementById("grade").value = student.grade;
    editingIndex = index;
    document.querySelector("button[type='submit']").textContent = "Actualizar";
}

const promDiv = document.getElementById("average");

function calcularPromedio() {
    const totalStudentsDiv = document.getElementById("totalStudents");
    const studentsLessThan5Div = document.getElementById("studentsLessThan5");
    const studentsGreaterOrEqual5Div = document.getElementById("studentsGreaterOrEqual5");

    if (students.length === 0) {
        promDiv.textContent = "Promedio General del curso: N/A";
        totalStudentsDiv.textContent = "Total de estudiantes: 0";
        studentsLessThan5Div.textContent = "Estudiantes con nota < 5: 0";
        studentsGreaterOrEqual5Div.textContent = "Estudiantes con nota ≥ 5: 0";
        return;
    }

    const total = students.reduce((acc, student) => acc + student.grade, 0);
    const average = total / students.length;

    const estudiantesMenor5 = students.filter(student => student.grade < 5).length;
    const estudiantesMayorIgual5 = students.filter(student => student.grade >= 5).length;

    promDiv.textContent = `Promedio General del curso: ${average.toFixed(2)}`;
    totalStudentsDiv.textContent = `Total de estudiantes: ${students.length}`;
    studentsLessThan5Div.textContent = `Estudiantes con nota < 5: ${estudiantesMenor5}`;
    studentsGreaterOrEqual5Div.textContent = `Estudiantes con nota ≥ 5: ${estudiantesMayorIgual5}`;
}
    updateTable();