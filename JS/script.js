//Direccion del EndPoint generado en Retool
const API_URL = "https://api-generator.retool.com/Op9ikQ/integrantes";

//Funcion que llama a la API y realia una solicitud GET. Obtiene un JSON
async function ObtenerRegistros(){
    //Hacemos GET al servidor y obtenemos su respuesta (response)
    const respuesta = await fetch(API_URL);

    //Obtenemos los datos en formato JSON a partir de la respuesta
    const data = await respuesta.json(); //Esto ya es un JSON

    //Llamamos a MostrarRegistros y le enviamos el JSON
    MostrarRegistros(data)
}

//Funcion para generar las filas de la tabla
function MostrarRegistros(datos){
    const tabla = document.querySelector("#tabla tbody");

    tabla.innerHTML = "";

    datos.forEach(persona => {
        tabla.innerHTML += `
        <tr>
            <td>${persona.id}</td>
            <td>${persona.nombre}</td>
            <td>${persona.apellido}</td>
            <td>${persona.correo}</td>
            <td>
                <button>Editar</button>
                <button>Eliminar</button>
            </td>
        </tr>
        `;
    });
}

ObtenerRegistros();