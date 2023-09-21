let pin = "1234";
let ingresar = false;
const btnSearch = document.querySelector("#btnSearch");
const inputIngreso = document.querySelector("#ingreso");
const contenedor = document.querySelector("#contenedor");
const infoLoteDiv = document.querySelector("#infoLote"); // Agrega un div para mostrar la información del lote
let importeTotal = 0;
// agregado
const objetosSeleccionados = [];


ingresar = true;

const tipoDeLotesDisponibles = [
  { tipologia: "a", tamano: 250, frente: 10, fondo: 25, ubicacion: "Esquina de manzana", img: "250metros.png" },
  { tipologia: "b", tamano: 360, frente: 12, fondo: 30, ubicacion: "Dentro de manzana", img: "350metros.png" },
  { tipologia: "c", tamano: 450, frente: 15, fondo: 30, ubicacion: "Dentro de manzana", img: "450metros.png" },
  { tipologia: "d", tamano: 560, frente: 16, fondo: 35, ubicacion: "Dentro de manzana", img: "550metros.png" }];



function agregarAlCarrito(lote) {
  objetosSeleccionados.push(lote);

  // Actualiza la lista en el carrito
  const listaCarrito = document.getElementById('lista-carrito');
  const li = document.createElement('li');
  li.textContent = `${lote.tipologia} - Precio: $${lote.tamano * 1000}`;

  // Agrega el botón de eliminar
  const botonEliminar = document.createElement('button');
  botonEliminar.textContent = 'Eliminar';
  botonEliminar.className = 'btn-eliminar';
  botonEliminar.onclick = () => eliminarDelCarrito(lote);

  li.appendChild(botonEliminar);
  listaCarrito.appendChild(li);
  //modifico importe total 

  // Actualiza el importe total
  importeTotal += lote.tamano * 1000;
  const importeTotalSpan = document.getElementById('importe-total');
  importeTotalSpan.textContent = importeTotal;

  mostrarCarrito(); // Llama a la función después de agregar un objeto
}


function eliminarDelCarrito(lote) {
  // Elimina el elemento del carrito
  const listaCarrito = document.getElementById('lista-carrito');
  const elementosCarrito = listaCarrito.getElementsByTagName('li');

  for (let i = 0; i < elementosCarrito.length; i++) {
    const elemento = elementosCarrito[i];
    if (elemento.textContent.includes(lote.tipologia)) {
      listaCarrito.removeChild(elemento);
      break; // Sale del bucle una vez que se elimina el elemento
    }
  }
  //agrego esto a la funcion
  // Resta el precio del lote eliminado del importe total
  importeTotal -= lote.tamano * 1000;

  // Actualiza el importe total en el HTML
  const importeTotalSpan = document.getElementById('importe-total');
  importeTotalSpan.textContent = importeTotal;


  // Elimina el objeto de la lista de objetos seleccionados
  const index = objetosSeleccionados.indexOf(lote);
  if (index !== -1) {
    objetosSeleccionados.splice(index, 1);
  }

  // Si no quedan elementos en el carrito, oculta el carrito
  if (objetosSeleccionados.length === 0) {
    const carrito = document.getElementById('carrito');
    carrito.style.display = 'none';
  }
  mostrarCarrito(); // Llama a la función después de eliminar un objeto
}


// funcion para mostrar carrito cuando tiene elementos sino nó

function mostrarCarrito() {
  const carrito = document.getElementById('carrito');
  carrito.style.display = objetosSeleccionados.length > 0 ? 'block' : 'none';

  // Si hay al menos un objeto en el carrito, muestra el total
  if (objetosSeleccionados.length > 0) {
    carrito.style.display = 'block';
    importeTotalDiv.style.display = 'block';
  } else {
    carrito.style.display = 'none';
    importeTotalDiv.style.display = 'none';
  }
}


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
/*
//nueva funcion agregada para seleccionar objeto
function elegirObjeto(id) {
  // Encuentra el objeto correspondiente en el array de tipoDeLotesDisponibles
  const objetoSeleccionado = tipoDeLotesDisponibles.find(objeto => objeto.frente === id);

  // Agrega el objeto seleccionado al array objetosSeleccionados
  objetosSeleccionados.push(objetoSeleccionado);

  // Puedes mostrar los objetos seleccionados en la consola si lo deseas
  console.log("Objetos Seleccionados:", objetosSeleccionados);
}
//---------------------
*/
// modificacion de la funcion para que ademas de seleccionar y lo agregue a 
//elementos seleccionado lo ponga tambien en el carrito
function elegirObjeto(id) {
  const objetoSeleccionado = tipoDeLotesDisponibles.find(objeto => objeto.frente === id);

  objetosSeleccionados.push(objetoSeleccionado);

  // Agrega el objeto seleccionado al carrito
  agregarAlCarrito(objetoSeleccionado);

  // Muestra el carrito
  mostrarCarrito();

  // Puedes mostrar los objetos seleccionados en la consola si lo deseas
  console.log("Objetos Seleccionados:", objetosSeleccionados);
}


// fin del agregado
















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
}


const user = { nickname: "pablo", pass: 1234 };

const inputUser = document.querySelector("#user"),
  inputPass = document.querySelector("#pass"),
  check = document.querySelector("#check"),
  formulario = document.querySelector("#form-login"),
  message = document.querySelector("#message");

function guardar(valor) {
  const user = { usuario: inputUser.value, pass: inputPass.value };
  //validar que los campos no esten vacios
  if (valor === "localStorage") {
    localStorage.setItem("user", JSON.stringify(user));
  }
  if (valor === "sessionStorage") {
    sessionStorage.setItem("user", JSON.stringify(user));
  }
  valor === "localStorage" &&
    localStorage.setItem("user", JSON.stringify(user));
  valor === "sessionStorage" &&
    sessionStorage.setItem("user", JSON.stringify(user));
}

//agrego esto mas
formulario.addEventListener("submit", (e) => {
  e.preventDefault();
  if (check.checked) {
    guardar("localStorage");
  } else {
    guardar("sessionStorage");
  }
  check.checked ? guardar("localStorage") : guardar("sessionStorage");
});



