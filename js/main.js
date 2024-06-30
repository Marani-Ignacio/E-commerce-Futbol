const camisetas = [
    //Remeras de Clubes
    {
        id: "club-01",
        titulo: "Bayern Munich",
        imagen: "images/remeras clubes/Bayern Munich.webp",
        categoria: {
            id: "clubes",
            nombre: "Camisetas de Clubes",
        },
        precio: 80000
    },
    {
        id: "club-02",
        titulo: "Inter",
        imagen: "images/remeras clubes/Inter.webp",
        categoria: {
            id: "clubes",
            nombre: "Camisetas de Clubes",
        },
        precio: 82500
    },
    {
        id: "club-03",
        titulo: "Liverpool",
        imagen: "images/remeras clubes/Liverpool.jpg",
        categoria: {
            id: "clubes",
            nombre: "Camisetas de Clubes",
        },
        precio: 75000
    },
    {
        id: "club-04",
        titulo: "Manchester United",
        imagen: "images/remeras clubes/Manchester United.jpg",
        categoria: {
            id: "clubes",
            nombre: "Camisetas de Clubes",
        },
        precio: 90000
    },
    {
        id: "club-05",
        titulo: "Real Madrid",
        imagen: "images/remeras clubes/Real Madrid.jpg",
        categoria: {
            id: "clubes",
            nombre: "Camisetas de Clubes",
        },
        precio: 90000
    },
    {
        id: "club-06",
        titulo: "River Plate",
        imagen: "images/remeras clubes/River Plate.jpg",
        categoria: {
            id: "clubes",
            nombre: "Camisetas de Clubes",
        },
        precio: 85000
    },

    //Remeras de Paises
    {
        id: "pais-01",
        titulo: "Alemania",
        imagen: "images/remeras selecciones/Alemania.jpg",
        categoria: {
            id: "paises",
            nombre: "Camisetas de Selecciones",
        },
        precio: 80000
    },
    {
        id: "pais-02",
        titulo: "Argentina",
        imagen: "images/remeras selecciones/Argentina.jpg",
        categoria: {
            id: "paises",
            nombre: "Camisetas de Selecciones",
        },
        precio: 80000
    },
    {
        id: "pais-03",
        titulo: "Brasil",
        imagen: "images/remeras selecciones/Brasil.jpg",
        categoria: {
            id: "paises",
            nombre: "Camisetas de Selecciones",
        },
        precio: 80000
    },
    {
        id: "pais-04",
        titulo: "Francia",
        imagen: "images/remeras selecciones/Francia.jpg",
        categoria: {
            id: "paises",
            nombre: "Camisetas de Selecciones",
        },
        precio: 80000
    },
    {
        id: "pais-05",
        titulo: "Inglaterra",
        imagen: "images/remeras selecciones/Inglaterra.webp",
        categoria: {
            id: "paises",
            nombre: "Camisetas de Selecciones",
        },
        precio: 80000
    },
    {
        id: "pais-06",
        titulo: "Italia",
        imagen: "images/remeras selecciones/Italia.jpg",
        categoria: {
            id: "paises",
            nombre: "Camisetas de Selecciones",
        },
        precio: 80000
    },
]

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

cargarCamisetas(camisetas);

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