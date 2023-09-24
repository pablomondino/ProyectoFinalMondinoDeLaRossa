

const btnSearch = document.querySelector("#btnSearch");
const inputIngreso = document.querySelector("#ingreso");
const contenedor = document.querySelector("#contenedor");
const infoLoteDiv = document.querySelector("#infoLote"); // Agrega un div para mostrar la información del lote
const objetosSeleccionados = [];

//*****************
fetch('./data/data.json') // Ajusta la ruta del archivo JSON según la estructura de tu proyecto
  .then(response => response.json())
  .then(datos => {
    // Aquí puedes utilizar los datos cargados desde el archivo JSON
    console.log(datos);
    // Por ejemplo, podrías asignar los datos a la variable tipoDeLotesDisponibles
    tipoDeLotesDisponibles = datos;
    // Luego, puedes mostrar todos los lotes o realizar otras operaciones con los datos cargados
    mostrarTodosLosLotes();
  })
  .catch(error => {
    console.error('Error al cargar los datos desde el archivo JSON:', error);
  });


//******************/




//----nuevo
function recordarSeleccion(lote) {
  // Guarda el lote seleccionado en el localStorage como un objeto JSON
  localStorage.setItem("loteSeleccionado", JSON.stringify(lote));

  // Muestra un mensaje de confirmación
  alert("Selección de lote recordada.");
}

//-------


///-----
window.addEventListener("load", () => {
  const loteGuardado = localStorage.getItem("loteSeleccionado");

  if (loteGuardado) {
    const lote = JSON.parse(loteGuardado);
    alert("Lote seleccionado anteriormente: " + lote.tipologia);

    // Puedes utilizar la función mostrarInformacionLote para mostrar la selección guardada
    mostrarInformacionLote(lote);
  }
});

//------






// agregado



ingresar = true;
/*
const tipoDeLotesDisponibles = [
  { tipologia: "a", tamano: 250, frente: 10, fondo: 25, ubicacion: "Esquina de manzana", img: "250metros.png" },
  { tipologia: "b", tamano: 360, frente: 12, fondo: 30, ubicacion: "Dentro de manzana", img: "350metros.png" },
  { tipologia: "c", tamano: 450, frente: 15, fondo: 30, ubicacion: "Dentro de manzana", img: "450metros.png" },
  { tipologia: "d", tamano: 560, frente: 16, fondo: 35, ubicacion: "Dentro de manzana", img: "550metros.png" }];

*/

function buscarServicio(arr, filtro) {
  const encontrado = arr.find((el) => {
    return el.tipologia.includes(filtro);//cambie nombre por tipologia
  });
  return encontrado;
}


function mostrarLotes(arr) {

  arr.forEach((element) => { console.log(element) });

  return arr;// ojo el return array debe ir al +último

}


function filtrarServicio(arr, filtro) {
  const filtrado = arr.filter((el) => {
    return el.tipologia.includes(filtro);// cambie nombre por tipologia
  });
  return filtrado;
}

function crearHtml(arr) {
  contenedor.innerHTML = "";
  let html;
  for (const el of arr) {




    html = `<div class="card">
    <img src="./img/${el.img}" alt="${el.tipologia}"> 
    <hr>
    <h3>${el.ubicacion}</h3>
    <p>Precio: $${el.tamano * 1000} </p>
    <div class="card-action">
      <button class="btn btn-delete" id="${el.frente}" onclick="elegirObjeto(${el.frente})">Elegir</button>
    </div>
  </div>`;


    //se la agrego al contenedor
    contenedor.innerHTML = contenedor.innerHTML + html;
  }
}
function elegirObjeto(id) {
  const objetoSeleccionado = tipoDeLotesDisponibles.find(objeto => objeto.frente === id);
  objetosSeleccionados.push(objetoSeleccionado);
  console.log("Objetos Seleccionados:", objetosSeleccionados);

  // Llama a la función para mostrar la información del lote seleccionado
  mostrarInformacionLote(objetoSeleccionado);
}

function mostrarTodosLosLotes() {
  // Llama a la función para crear el HTML con todos los lotes disponibles
  crearHtml(tipoDeLotesDisponibles);
}
document.querySelector("#ingreso1").addEventListener("click", mostrarTodosLosLotes);




btnSearch.addEventListener("click", (e) => {
  const filtrados = filtrarServicio(tipoDeLotesDisponibles, inputIngreso.value);
  crearHtml(filtrados);
});


ingreso1.addEventListener("click", (e) => {
  const mostrados = mostrarLotes(tipoDeLotesDisponibles);

  crearHtml(mostrados);
});




btnSearch.addEventListener("click", (e) => {
  const tipologiaBuscada = inputIngreso.value.toLowerCase(); // Convierte la entrada a minúsculas
  const loteSeleccionado = buscarServicio(tipoDeLotesDisponibles, tipologiaBuscada);

  if (loteSeleccionado) {
    mostrarInformacionLote(loteSeleccionado);
  } else {
    infoLoteDiv.innerHTML = "Lote no encontrado";
  }
});

//-------
// Definir otras funciones y lógica de tu aplicación

// Agregar el evento al botón "Recordar Selección"
const btnRecordarSeleccion = document.querySelector("#btnRecordarSeleccion");
btnRecordarSeleccion.addEventListener("click", () => {
  const loteSeleccionado = objetosSeleccionados[objetosSeleccionados.length - 1];
  if (loteSeleccionado) {
    recordarSeleccion(loteSeleccionado);
  } else {
    alert("No has seleccionado un lote para recordar.");
  }
});






//------







// Función para mostrar la información de un lote en el div infoLote
function mostrarInformacionLote(lote) {
  const html = `
    <div class="info-lote">
      <img src="./img/${lote.img}" alt="${lote.tipologia}">
      <h2>Tipología: ${lote.tipologia}</h2>
      <p>Tamaño de lote: ${lote.tamano} metros cuadrados</p>
      <p>Ubicación: ${lote.ubicacion}</p>
      <p>Medidas:</p>
      <ul>
        <li>Frente: ${lote.frente} metros</li>
        <li>Fondo: ${lote.fondo} metros</li>
      </ul>
      <p>Precio Contado: ${(lote.tamano) * 1000}</p>

    </div>
  `;

    infoLoteDiv.innerHTML = html;
    //--nuevo
    // Agrega un event listener al botón de recordar selección
    const btnRecordarSeleccion = document.querySelector("#btnRecordarSeleccion");
    btnRecordarSeleccion.addEventListener("click", () => {
      recordarSeleccion(lote);
    });



    //---------



}
/*
fetch('./data/data.json')
.then(response=>response.json())
.then(datos=>{
  console.log(datos);
  //renderServicios(datos)
})
*/