//Direccion del EndPoint generado en Retool
const API_URL = "https://api-generator.retool.com/Op9ikQ/integrantes";

//Funcion que llama a la API y realiza una solicitud GET. Obtiene un JSON
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
            <td>${persona.Nombre}</td>
            <td>${persona.Apellido}</td>
            <td>${persona.Correo}</td>
            <td>
                <button onclick="AbrirModalEditar('${persona.id}', '${persona.Nombre}', '${persona.Apellido}', '${persona.Correo}')">Editar</button>
                <button onclick="EliminarRegistro(${persona.id})">Eliminar</button>
            </td>
        </tr>
        `;
    });
}

ObtenerRegistros();


//Proceso para agregar registros
const modal = document.getElementById("mdAgregar"); //Cuadro de dialogo
const btnAgregar = document.getElementById("btnAgregar"); //Boton para abrir dialogo
const btnCerrar = document.getElementById("btnCerrarModal"); //Boton para cerrar dialogo

btnAgregar.addEventListener("click", () => {
    modal.showModal();//Abre el modal cando se le hace click a btnAgregar
})

btnCerrar.addEventListener("click", () => {
    modal.close(); //Cerrar el modal
})


//Agregar un nuevo integrante desde el formulario
document.getElementById("frmAgregar").addEventListener("submit", async e => {
    e.preventDefault(); //evita que los datos se envien por defecto

    //Capturar los valores del formulario
    const Nombre = document.getElementById("txtNombre").value.trim();
    const Apellido = document.getElementById("txtApellido").value.trim();
    const Correo = document.getElementById("txtEmail").value.trim();

    if(!Nombre || !Apellido || !Correo){
        alert("Complete todos los campos");
        return; //Evita que el codigo sesiga ejecutando
    }

    //Llamar a la API para enviar datos
    const respuesta = await fetch(API_URL, {
        method: "POST",
        headers: {'Content-Type':'application/json'},
        body: JSON.stringify({Nombre,Apellido,Correo})
    });

    if(respuesta.ok){
        alert("El registro fue agregado correctamente");

        //Limpiar el formulario
        document.getElementById("frmAgregar").reset();

        //Cerrar el modal (dialog)
        modal.close

        ObtenerRegistros();
    }
    else{
        alert("Hubo un error al guardar el registro");
    }
});


//Funcion para borrar registros
async function EliminarRegistro(id){
    const confirmacion = confirm("¿Estas seguro de eliminar este registro?");

    //Validamos si el usuario eligio "Aceptar"
    if (confirmacion){
        await fetch(`${API_URL}/${id}`, {
            method: "DELETE"
        }); //Llamada al endpoint

        //Recargar la tabla para actualizar la vista
        ObtenerRegistros();
    }
}


//Funcion para editar registros
const modalEditar = document.getElementById("mdEditar");
const btnCerrarEditar = document.getElementById("btnCerrarEditar");

btnCerrarEditar.addEventListener("click", () => {
    modalEditar.close();
})

function AbrirModalEditar(id, nombre, apellido, correo){
    //Agregamos los valores a los inputs
    document.getElementById("txtIdEditar").value = id;
    document.getElementById("txtNombreEditar").value = nombre;
    document.getElementById("txtApellidoEditar").value = apellido;
    document.getElementById("txtEmailEditar").value = correo;

    //Modal se abre despues de agregar los valors de los input
    modalEditar.showModal();
}

document.getElementById("frmEditar").addEventListener("submit", () => {
    const nombre = document.getElementById("txtNombreEditar").value.trim();
    const apellido = document.getElementById("txtApellidoEditar").value.trim();
    const correo = document.getElementById("txtEmailEditar").value.trim();

    if (!nombre || !apellido || !correo){
        alert("Complete todos los campos");
        return;
    }

    const respuesta = await fetch(API_URL/{id})
})