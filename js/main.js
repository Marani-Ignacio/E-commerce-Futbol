let camisetas = [];
fetch("./js/camisetas.json")
    .then(response => response.json())
    .then(data => {
        camisetas = data;
        cargarCamisetas(camisetas);
    })

const contenedorCamisetas = document.querySelector("#contenedor-camisetas");
const botonesCategorias = document.querySelectorAll(".boton-categoria");
const tituloPrincipal = document.querySelector("#titulo-principal");
let botonesAgregar = document.querySelectorAll(".camiseta-agregar");
const numeroCarrito = document.querySelector("#numero-carrito");


function cargarCamisetas(camisetasElegidas){

    contenedorCamisetas.innerHTML = "";

    camisetasElegidas.forEach(camiseta => {
        const div = document.createElement("div");
        div.classList.add("camiseta");
        div.innerHTML = `
            <img class="camiseta-imagen" src="${camiseta.imagen}" alt="${camiseta.titulo}">
            <div class="camiseta-detalles">
                <h3 class="camiseta-titulo">${camiseta.titulo}</h3>
                <p class="camiseta-precio">$${camiseta.precio}</p>
                <button class="camiseta-agregar" Id="${camiseta.id}">AGREGAR</button>
            </div>
        `
        contenedorCamisetas.append(div);
    });

    actualizarBotonesAgregar();
}

botonesCategorias.forEach(boton => {
    boton.addEventListener("click", (e) => {
        botonesCategorias.forEach(boton => boton.classList.remove("active"))
        e.currentTarget.classList.add("active");
        
        if (e.currentTarget.id != "todos"){
            const camisetaCategoria = camisetas.find(camiseta => camiseta.categoria.id === e.currentTarget.id)
            tituloPrincipal.innerText = camisetaCategoria.categoria.nombre;

            const camisetasBoton = camisetas.filter(camiseta => camiseta.categoria.id === e.currentTarget.id)
            cargarCamisetas(camisetasBoton);
        }     
        else{
            tituloPrincipal.innerText = "Todas las camisetas";
            cargarCamisetas(camisetas);
        }   
    })
})

function actualizarBotonesAgregar(){
    botonesAgregar = document.querySelectorAll(".camiseta-agregar");

    botonesAgregar.forEach(boton => {
        boton.addEventListener("click", agregarAlCarrito);
    });
}


let camisetasEnCarrito;
let camisetasEnCarritoLS  = localStorage.getItem("camisetas-en-carrito");

if(camisetasEnCarritoLS){
    camisetasEnCarrito = JSON.parse(camisetasEnCarritoLS);
    actualizarNumeroCarrito();
}
else{
    camisetasEnCarrito = [];
}

function agregarAlCarrito(e){

    Toastify({
        text: "Camiseta agregada",
        duration: 3000,
        close: true,
        gravity: "top",
        position: "right", 
        stopOnFocus: true,
        style: {
            background: "linear-gradient(to right, rgb(78, 141, 78), rgb(170, 166, 172))",
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
    const camisetaAgregada = camisetas.find(camiseta => camiseta.id === idBoton)

    if (camisetasEnCarrito.some(camiseta => camiseta.id === idBoton)){
        const index = camisetasEnCarrito.findIndex(camiseta => camiseta.id === idBoton);
        camisetasEnCarrito[index].cantidad++;
    }
    else{
        camisetaAgregada.cantidad = 1;
        camisetasEnCarrito.push(camisetaAgregada);
    }

    actualizarNumeroCarrito();

    localStorage.setItem("camisetas-en-carrito", JSON.stringify(camisetasEnCarrito))
}

function actualizarNumeroCarrito(){
    let cantCarrito = camisetasEnCarrito.reduce((acum, camiseta) => acum + camiseta.cantidad, 0)
    numeroCarrito.innerText = cantCarrito;
}
