const tableBody = document.querySelector("#odontologosTable tbody");
const apiURL = "http://localhost:8080";

function fetchOdontologos(){
    fetch(`${apiURL}/odontologo`)
    .then((response) => response.json())
    .then((data) => {
        console.log(data);
        // Limpiar el contenido actual de la tabla
      tableBody.innerHTML = "";

      // Insertar los datos en la tabla
      data.forEach((odontologo, index) => {
        const row = document.createElement("tr");

        row.innerHTML = `
                <td>${odontologo.id}</td>
                <td>${odontologo.nombre}</td>
                <td>${odontologo.apellido}</td>
                <td>${odontologo.nroMatricula}</td>
                <td>
                  <button class="btn btn-primary btn-sm" onclick="editOdontologo(${odontologo.id}, '${odontologo.nombre}', '${odontologo.apellido}', '${odontologo.nroMatricula}')">Modificar</button>
                  <button class="btn btn-danger btn-sm" onclick="deleteOdontologo(${odontologo.id})">Eliminar</button>
                </td>
              `;

        tableBody.appendChild(row);
      });
    })
    .catch((error) => {
      console.error("Error fetching data:", error);
    });

  // modificar un odontologo

  function editOdontologo(id, nombre, apellido, matricula) {
    document.getElementById('editId').value = id;
    document.getElementById('editNombre').value = nombre;
    document.getElementById('editApellido').value = apellido;
    document.getElementById('editMatricula').value = matricula;
  
    $('#editModal').modal('show');
  }
  
  document.getElementById('editForm').addEventListener('submit', function(event) {
    event.preventDefault();
   let id = document.getElementById('editId').value;
    let nombre = document.getElementById('editNombre').value;
    let apellido = document.getElementById('editApellido').value;
    let matricula = document.getElementById('editMatricula').value;
  
    fetch(`${apiURL}/odontologo/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ nombre, apellido, nroMatricula: matricula }),
    })
      .then((response) => {
        if (response.ok) {
          $('#editModal').modal('hide'); 
          fetchOdontologos(); 
          alert("Odontólogo modificado con éxito");
        } else {
          throw new Error("Error al modificar odontólogo");
        }
      })
      .catch((error) => {
        console.error("Error modificando odontólogo:", error);
      });
  });


  // eliminar un odontologo
  function deleteOdontologo(id) {
    if (confirm(`¿Estás seguro de eliminar al odontólogo con ID ${id}?`)) {
      fetch(`${apiURL}/odontologo/${id}`, {
        method: "DELETE",
      })
        .then((response) => {
          if (response.ok) {
            fetchOdontologos();
          } else {
            throw new Error("Error al intentar eliminar al odontólogo");
          }
        })
        .catch((error) => {
          console.error("Error al eliminar odontólogo:", error);
        });
    }
  }
  
}

fetchOdontologos();



