let camisetasEnCarrito = JSON.parse(localStorage.getItem("camisetas-en-carrito")) || [];

const contenedorCarritoVacio = document.querySelector("#carrito-vacio");
const contenedorCarritoCamisetas = document.querySelector("#carrito-camisetas");
const contenedorCarritoAcciones = document.querySelector("#carrito-acciones");
const contenedorCarritoComprado = document.querySelector("#carrito-comprado");
let botonesEliminar = document.querySelectorAll(".carrito-camiseta-eliminar");
const botonVaciar = document.querySelector("#carrito-acciones-vaciar");
const contenedorTotal = document.querySelector("#total");
const botonComprar = document.querySelector("#carrito-acciones-comprar");

function cargarCamisetasCarrito(){
    if(camisetasEnCarrito && camisetasEnCarrito.length > 0) {
        contenedorCarritoVacio.classList.add("disabled");
        contenedorCarritoCamisetas.classList.remove("disabled");
        contenedorCarritoAcciones.classList.remove("disabled");
        contenedorCarritoComprado.classList.add("disabled");   
    
        contenedorCarritoCamisetas.innerHTML = "";
    
        camisetasEnCarrito.forEach(camiseta => {
            const div = document.createElement("div");
            div.classList.add("carrito-camiseta");
            div.innerHTML = `
                <img class="carrito-camiseta-imagen" src="${camiseta.imagen}" alt="${camiseta.titulo}">
                <div class="carrito-camiseta-titulo">
                    <small>Titulo</small>
                    <h3>${camiseta.titulo}</h3>
                </div>
                <div class="carrito-camiseta-cantidad">
                    <small>Cantidad</small>
                    <p>${camiseta.cantidad}</p>
                </div>
                <div class="carrito-camiseta-precio">
                    <small>Precio</small>
                    <p>$${camiseta.precio}</p>
                </div>
                <div class="carrito-camiseta-subtotal">
                    <small>Subtotal</small>
                    <p>$${camiseta.precio * camiseta.cantidad}</p>
                </div>
                <button class="carrito-camiseta-eliminar" id="${camiseta.id}"><i class="bi bi-trash"></i></button>
            `;
    
            contenedorCarritoCamisetas.append(div);
        });
        
    } else {
        contenedorCarritoVacio.classList.remove("disabled");
        contenedorCarritoCamisetas.classList.add("disabled");
        contenedorCarritoAcciones.classList.add("disabled");
        contenedorCarritoComprado.classList.add("disabled"); 
    }

    actualizarBotonesEliminar();
    actualizarTotal();
}

cargarCamisetasCarrito();

function actualizarBotonesEliminar(){
    botonesEliminar = document.querySelectorAll(".carrito-camiseta-eliminar");

    botonesEliminar.forEach(boton => {
        boton.addEventListener("click", eliminarDelCarrito);
    });
}

function eliminarDelCarrito(e){

    Toastify({
        text: "Camiseta eliminada",
        duration: 3000,
        close: true,
        gravity: "top",
        position: "right", 
        stopOnFocus: true,
        style: {
            background: "linear-gradient(to right, rgb(184, 70, 41), rgb(170, 166, 172))",
            borderRadius: "2rem",
            fontSize: "0.75rem",
        },
        offset: {
            x: "1.5rem",
            y: "1.5rem"
        },
        onClick: function(){}
      }).showToast();


    const idBoton = e.currentTarget.id;
    const index = camisetasEnCarrito.findIndex(camiseta => camiseta.id === idBoton);
    camisetasEnCarrito.splice(index, 1);
    localStorage.setItem("camisetas-en-carrito", JSON.stringify(camisetasEnCarrito));
    cargarCamisetasCarrito();
}

botonVaciar.addEventListener("click", vaciarCarrito);
function vaciarCarrito(){

    Swal.fire({
        title: "¿Estas seguro?",
        text: "Se borrarán todas tus camisetas!",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Si",
        cancelButtonText: "No"
      }).then((result) => {
        if (result.isConfirmed) {
            camisetasEnCarrito.length = 0,
            localStorage.setItem("camisetas-en-carrito", JSON.stringify(camisetasEnCarrito));
            cargarCamisetasCarrito();
          Swal.fire({
            title: "Realizado",
            text: "Tus camisetas han sido eliminadas.",
            icon: "success"
          });
        }
      });    
}

function actualizarTotal(){
    const totalCalculado = camisetasEnCarrito.reduce((acum, camiseta) => acum + (camiseta.precio * camiseta.cantidad), 0);
    contenedorTotal.innerText = `$${totalCalculado}`;
}

botonComprar.addEventListener("click", comprarCarrito);
function comprarCarrito(){
    camisetasEnCarrito.length = 0;
    localStorage.setItem("camisetas-en-carrito", JSON.stringify(camisetasEnCarrito));

    contenedorCarritoVacio.classList.add("disabled");
    contenedorCarritoCamisetas.classList.add("disabled");
    contenedorCarritoAcciones.classList.add("disabled");
    contenedorCarritoComprado.classList.remove("disabled");
}