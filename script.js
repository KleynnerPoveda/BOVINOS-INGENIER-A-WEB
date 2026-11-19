
const bovinosIniciales = [
    {
        identificacion: "BOV-001",
        nombre: "Lucero",
        raza: "Holstein",
        sexo: "Hembra",
        edad: 36,
        peso: 520,
        color: "Blanco y negro",
        salud: "Saludable",
        observaciones: "Buen estado general"
    },
    {
        identificacion: "BOV-002",
        nombre: "Trueno",
        raza: "Brahman",
        sexo: "Macho",
        edad: 42,
        peso: 680,
        color: "Gris",
        salud: "Saludable",
        observaciones: "Buen desarrollo"
    },
    {
        identificacion: "BOV-003",
        nombre: "Luna",
        raza: "Jersey",
        sexo: "Hembra",
        edad: 28,
        peso: 410,
        color: "Marrón claro",
        salud: "En observación",
        observaciones: "Requiere seguimiento"
    },
    {
        identificacion: "BOV-004",
        nombre: "Relámpago",
        raza: "Angus",
        sexo: "Macho",
        edad: 30,
        peso: 590,
        color: "Negro",
        salud: "Saludable",
        observaciones: "Buen desarrollo"
    },
    {
        identificacion: "BOV-005",
        nombre: "Estrella",
        raza: "Simmental",
        sexo: "Hembra",
        edad: 48,
        peso: 610,
        color: "Blanco y rojo",
        salud: "Saludable",
        observaciones: "En etapa adulta"
    },
    {
        identificacion: "BOV-006",
        nombre: "Centella",
        raza: "Gyr",
        sexo: "Hembra",
        edad: 24,
        peso: 390,
        color: "Rojo",
        salud: "En tratamiento",
        observaciones: "Requiere seguimiento"
    }
];

let bovinos = JSON.parse(localStorage.getItem("bovinos")) || bovinosIniciales;
let usuarios = JSON.parse(localStorage.getItem("usuarios")) || [];
let modoCuenta = "registro";
let editando = null;
let graficaActual = null;

function guardarBovinos() {
    localStorage.setItem("bovinos", JSON.stringify(bovinos));
}

function guardarUsuarios() {
    localStorage.setItem("usuarios", JSON.stringify(usuarios));
}

function cambiarVista(id) {
    document.querySelectorAll(".vista").forEach(vista => {
        vista.classList.remove("activa");
    });

    document.querySelectorAll(".nav-btn").forEach(boton => {
        boton.classList.remove("activo");
    });

    document.getElementById(id).classList.add("activa");

    const boton = document.querySelector(`[data-vista="${id}"]`);

    if (boton) {
        boton.classList.add("activo");
    }

    if (id === "bovinos") {
        mostrarBovinos();
    }

    actualizarEstadisticas();
}

document.querySelectorAll("[data-vista]").forEach(boton => {
    boton.addEventListener("click", () => {
        cambiarVista(boton.dataset.vista);
    });
});

document.querySelectorAll("[data-ir]").forEach(boton => {
    boton.addEventListener("click", () => {
        cambiarVista(boton.dataset.ir);
    });
});

function actualizarEstadisticas() {
    document.getElementById("totalBovinos").textContent = bovinos.length;

    document.getElementById("totalMachos").textContent =
        bovinos.filter(b => b.sexo === "Macho").length;

    document.getElementById("totalHembras").textContent =
        bovinos.filter(b => b.sexo === "Hembra").length;
}

function mostrarBovinos() {
    const tabla = document.getElementById("tablaBovinos");
    const busqueda = document.getElementById("buscarBovino").value
        .trim()
        .toLowerCase();

    const sexo = document.getElementById("filtroSexo").value;
    const orden = document.getElementById("ordenarBovinos").value;

    let resultados = bovinos.filter(bovino => {
        const coincideBusqueda =
            bovino.nombre.toLowerCase().includes(busqueda) ||
            bovino.identificacion.toLowerCase().includes(busqueda);

        const coincideSexo =
            sexo === "Todos" || bovino.sexo === sexo;

        return coincideBusqueda && coincideSexo;
    });

    if (orden === "pesoMenor") {
        resultados.sort((a, b) => a.peso - b.peso);
    }

    if (orden === "pesoMayor") {
        resultados.sort((a, b) => b.peso - a.peso);
    }

    if (orden === "edadMenor") {
        resultados.sort((a, b) => a.edad - b.edad);
    }

    if (orden === "edadMayor") {
        resultados.sort((a, b) => b.edad - a.edad);
    }

    if (orden === "nombre") {
        resultados.sort((a, b) => a.nombre.localeCompare(b.nombre));
    }

    if (orden === "reciente") {
        resultados.reverse();
    }

    tabla.innerHTML = "";

    document.getElementById("contadorResultados").textContent =
        `Se encontraron ${resultados.length} de ${bovinos.length} bovinos.`;

    document.getElementById("mensajeSinResultados")
        .classList.toggle("oculto", resultados.length > 0);

    resultados.forEach(bovino => {
        const fila = document.createElement("tr");

        const valores = [
            bovino.identificacion,
            bovino.nombre,
            bovino.raza,
            bovino.sexo,
            `${bovino.edad} meses`,
            `${bovino.peso} kg`,
            bovino.color,
            bovino.salud,
            bovino.observaciones || "Sin observaciones"
        ];

        valores.forEach(valor => {
            const celda = document.createElement("td");
            celda.textContent = valor;
            fila.appendChild(celda);
        });

        const acciones = document.createElement("td");

        const botonEditar = document.createElement("button");
        botonEditar.textContent = "Editar";
        botonEditar.className = "btn-editar";
        botonEditar.addEventListener("click", () => {
            editarBovino(bovino.identificacion);
        });

        const botonEliminar = document.createElement("button");
        botonEliminar.textContent = "Eliminar";
        botonEliminar.className = "btn-eliminar";
        botonEliminar.addEventListener("click", () => {
            eliminarBovino(bovino.identificacion);
        });

        acciones.appendChild(botonEditar);
        acciones.appendChild(botonEliminar);
        fila.appendChild(acciones);

        tabla.appendChild(fila);
    });
}

document.getElementById("buscarBovino").addEventListener("input", mostrarBovinos);
document.getElementById("filtroSexo").addEventListener("change", mostrarBovinos);
document.getElementById("ordenarBovinos").addEventListener("change", mostrarBovinos);

document.getElementById("btnLimpiarFiltros").addEventListener("click", () => {
    document.getElementById("buscarBovino").value = "";
    document.getElementById("filtroSexo").value = "Todos";
    document.getElementById("ordenarBovinos").value = "reciente";

    mostrarBovinos();
});

document.getElementById("formBovino").addEventListener("submit", evento => {
    evento.preventDefault();

    const identificacion = document.getElementById("identificacion").value
        .trim()
        .toUpperCase();

    const datos = {
        identificacion,
        nombre: document.getElementById("nombre").value.trim(),
        raza: document.getElementById("raza").value,
        sexo: document.getElementById("sexo").value,
        edad: Number(document.getElementById("edad").value),
        peso: Number(document.getElementById("peso").value),
        color: document.getElementById("color").value.trim(),
        salud: document.getElementById("salud").value,
        observaciones: document.getElementById("observaciones").value.trim()
    };

    const duplicado = bovinos.some(b =>
        b.identificacion === identificacion &&
        b.identificacion !== editando
    );

    if (duplicado) {
        alert("Este bovino ya fue registrado. La identificación ya existe.");
        return;
    }

    if (editando) {
        const indice = bovinos.findIndex(b => b.identificacion === editando);

        if (indice !== -1) {
            bovinos[indice] = datos;
        }

        editando = null;
        alert("Bovino actualizado correctamente.");
    } else {
        bovinos.push(datos);
        alert("Bovino registrado correctamente.");
    }

    guardarBovinos();
    evento.target.reset();
    actualizarEstadisticas();
    cambiarVista("bovinos");
});

function editarBovino(identificacion) {
    const bovino = bovinos.find(b => b.identificacion === identificacion);

    if (!bovino) return;

    editando = identificacion;

    document.getElementById("identificacion").value = bovino.identificacion;
    document.getElementById("nombre").value = bovino.nombre;
    document.getElementById("raza").value = bovino.raza;
    document.getElementById("sexo").value = bovino.sexo;
    document.getElementById("edad").value = bovino.edad;
    document.getElementById("peso").value = bovino.peso;
    document.getElementById("color").value = bovino.color;
    document.getElementById("salud").value = bovino.salud;
    document.getElementById("observaciones").value = bovino.observaciones || "";

    cambiarVista("registro");
}

function eliminarBovino(identificacion) {
    const confirmar = confirm("¿Estás seguro de eliminar este bovino?");

    if (!confirmar) return;

    bovinos = bovinos.filter(b => b.identificacion !== identificacion);

    guardarBovinos();
    mostrarBovinos();
    actualizarEstadisticas();
}

// ANALISIS DE DATOS

function obtenerDatosAnalisis(tipo) {
    let etiquetas = [];
    let cantidades = [];

    if (tipo === "sexo") {
        etiquetas = ["Machos", "Hembras"];
        cantidades = [
            bovinos.filter(b => b.sexo === "Macho").length,
            bovinos.filter(b => b.sexo === "Hembra").length
        ];
    }

    if (tipo === "raza") {
        const conteo = {};

        bovinos.forEach(b => {
            conteo[b.raza] = (conteo[b.raza] || 0) + 1;
        });

        etiquetas = Object.keys(conteo);
        cantidades = Object.values(conteo);
    }

    if (tipo === "salud") {
        const estados = ["Saludable", "En observación", "En tratamiento"];

        etiquetas = estados;
        cantidades = estados.map(estado =>
            bovinos.filter(b => b.salud === estado).length
        );
    }

    if (tipo === "peso") {
        const rangos = [
            { nombre: "Menos de 400 kg", condicion: b => b.peso < 400 },
            { nombre: "400 a 499 kg", condicion: b => b.peso >= 400 && b.peso < 500 },
            { nombre: "500 a 599 kg", condicion: b => b.peso >= 500 && b.peso < 600 },
            { nombre: "600 kg o más", condicion: b => b.peso >= 600 }
        ];

        etiquetas = rangos.map(r => r.nombre);
        cantidades = rangos.map(r =>
            bovinos.filter(r.condicion).length
        );
    }

    if (tipo === "edad") {
        const rangos = [
            { nombre: "Menos de 12 meses", condicion: b => b.edad < 12 },
            { nombre: "12 a 23 meses", condicion: b => b.edad >= 12 && b.edad < 24 },
            { nombre: "24 a 35 meses", condicion: b => b.edad >= 24 && b.edad < 36 },
            { nombre: "36 a 47 meses", condicion: b => b.edad >= 36 && b.edad < 48 },
            { nombre: "48 meses o más", condicion: b => b.edad >= 48 }
        ];

        etiquetas = rangos.map(r => r.nombre);
        cantidades = rangos.map(r =>
            bovinos.filter(r.condicion).length
        );
    }

    return { etiquetas, cantidades };
}

function crearAnalisis() {
    if (typeof Chart === "undefined") {
        alert("No se pudo cargar Chart.js. Revisa tu conexión a internet.");
        return;
    }

    if (bovinos.length === 0) {
        document.getElementById("contenedorGrafica").classList.add("oculto");
        document.getElementById("mensajeAnalisis").textContent =
            "No hay bovinos registrados para generar un análisis.";
        document.getElementById("mensajeAnalisis").classList.remove("oculto");
        return;
    }

    const tipo = document.getElementById("tipoAnalisis").value;
    const datos = obtenerDatosAnalisis(tipo);

    const nombres = {
        sexo: "Distribución de bovinos por sexo",
        raza: "Distribución de bovinos por raza",
        salud: "Distribución por estado de salud",
        peso: "Clasificación de bovinos por peso",
        edad: "Clasificación de bovinos por edad"
    };

    if (graficaActual) {
        graficaActual.destroy();
    }

    document.getElementById("tituloGrafica").textContent = nombres[tipo];

    document.getElementById("descripcionGrafica").textContent =
        "Distribución de los " + bovinos.length +
        " bovinos registrados en la finca.";

    document.getElementById("totalAnalizado").textContent =
        "Total de bovinos analizados: " + bovinos.length;

    document.getElementById("contenedorGrafica").classList.remove("oculto");
    document.getElementById("mensajeAnalisis").classList.add("oculto");

    const contexto = document.getElementById("graficaTorta");

    graficaActual = new Chart(contexto, {
        type: "pie",
        data: {
            labels: datos.etiquetas,
            datasets: [{
                data: datos.cantidades,
                backgroundColor: [
                    "#1d6eae",
                    "#4b9bd1",
                    "#83bce3",
                    "#123b66",
                    "#a9d3ef",
                    "#5d83ad",
                    "#9db3cb"
                ],
                borderColor: "#ffffff",
                borderWidth: 3
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
                legend: {
                    position: "bottom"
                },
                tooltip: {
                    callbacks: {
                        label: function(context) {
                            const cantidad = context.raw;
                            const total = context.dataset.data.reduce(
                                (suma, valor) => suma + valor, 0
                            );

                            const porcentaje = total > 0
                                ? ((cantidad / total) * 100).toFixed(1)
                                : 0;

                            return `${context.label}: ${cantidad} bovinos (${porcentaje}%)`;
                        }
                    }
                }
            }
        }
    });
}

document.getElementById("btnCrearAnalisis")
    .addEventListener("click", crearAnalisis);

// CUENTAS DE USUARIO

document.getElementById("btnCuenta").addEventListener("click", () => {
    document.getElementById("menuCuenta").classList.toggle("oculto");
});

function abrirModal(modo) {
    modoCuenta = modo;

    document.getElementById("modalCuenta").classList.remove("oculto");
    document.getElementById("menuCuenta").classList.add("oculto");
    document.getElementById("formCuenta").reset();

    const esRegistro = modo === "registro";

    document.getElementById("tituloModal").textContent =
        esRegistro ? "Crear cuenta" : "Iniciar sesión";

    document.getElementById("btnEnviarCuenta").textContent =
        esRegistro ? "Crear cuenta" : "Iniciar sesión";

    document.getElementById("camposRegistro")
        .classList.toggle("oculto", !esRegistro);

    document.getElementById("dueno").required = esRegistro;
    document.getElementById("nombreFinca").required = esRegistro;
}

document.getElementById("btnCrearCuenta").addEventListener("click", () => {
    abrirModal("registro");
});

document.getElementById("btnIniciarSesion").addEventListener("click", () => {
    abrirModal("login");
});

document.getElementById("cerrarModal").addEventListener("click", () => {
    document.getElementById("modalCuenta").classList.add("oculto");
});

document.getElementById("formCuenta").addEventListener("submit", evento => {
    evento.preventDefault();

    const usuario = document.getElementById("usuario").value.trim();
    const contrasena = document.getElementById("contrasena").value;

    if (modoCuenta === "registro") {
        const existe = usuarios.some(u => u.usuario === usuario);

        if (existe) {
            alert("Este usuario ya existe. Elige otro.");
            return;
        }

        usuarios.push({
            dueno: document.getElementById("dueno").value.trim(),
            nombreFinca: document.getElementById("nombreFinca").value.trim(),
            usuario,
            contrasena
        });

        guardarUsuarios();
        alert("Cuenta creada correctamente.");
    } else {
        const encontrado = usuarios.find(u =>
            u.usuario === usuario && u.contrasena === contrasena
        );

        if (!encontrado) {
            alert("Usuario o contraseña incorrectos.");
            return;
        }

        sessionStorage.setItem("usuarioActivo", usuario);
        alert(`Bienvenido a Mi Finca Digital, ${encontrado.dueno}.`);
    }

    document.getElementById("modalCuenta").classList.add("oculto");
    evento.target.reset();
});

document.getElementById("btnCerrarSesion").addEventListener("click", () => {
    sessionStorage.removeItem("usuarioActivo");
    alert("Sesión cerrada correctamente.");
    document.getElementById("menuCuenta").classList.add("oculto");
});

actualizarEstadisticas();
