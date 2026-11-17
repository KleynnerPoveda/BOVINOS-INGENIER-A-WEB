
let bovinos = [];

// Sistema de cuentas
let cuentas = [];
let usuarioActual = null;
let modoCuenta = "login";

const accountButton = document.getElementById("accountButton");
const accountMenu = document.getElementById("accountMenu");
const accountOptions = document.getElementById("accountOptions");
const accountFormContainer = document.getElementById("accountFormContainer");
const accountForm = document.getElementById("accountForm");
const logoutButton = document.getElementById("logoutButton");

// Abrir y cerrar menú
accountButton.addEventListener("click", () => {
    accountMenu.classList.toggle("show");
});

// Cerrar menú al hacer clic fuera
document.addEventListener("click", event => {
    if (!event.target.closest(".account-container")) {
        accountMenu.classList.remove("show");
    }
});

// Mostrar formulario de inicio de sesión
document.getElementById("showLogin").addEventListener("click", () => {
    mostrarFormularioCuenta("login");
});

// Mostrar formulario de creación de cuenta
document.getElementById("showCreate").addEventListener("click", () => {
    mostrarFormularioCuenta("create");
});

// Cambiar formulario de cuenta
function mostrarFormularioCuenta(modo) {
    modoCuenta = modo;

    accountOptions.classList.add("hidden");
    accountFormContainer.classList.remove("hidden");
    logoutButton.classList.add("hidden");

    const nameField = document.getElementById("nameField");
    const title = document.getElementById("accountFormTitle");
    const submit = document.getElementById("accountSubmit");

    if (modo === "create") {
        title.textContent = "Crear cuenta";
        submit.textContent = "Crear cuenta";
        nameField.classList.remove("hidden");
        document.getElementById("userName").required = true;
    } else {
        title.textContent = "Iniciar sesión";
        submit.textContent = "Iniciar sesión";
        nameField.classList.add("hidden");
        document.getElementById("userName").required = false;
    }

    accountForm.reset();
}

// Volver a las opciones de cuenta
document.getElementById("backAccount").addEventListener("click", () => {
    accountFormContainer.classList.add("hidden");
    accountOptions.classList.remove("hidden");
});

// Crear cuenta o iniciar sesión
accountForm.addEventListener("submit", event => {
    event.preventDefault();

    const nombre = document.getElementById("userName").value.trim();
    const correo = document.getElementById("userEmail").value.trim().toLowerCase();
    const contraseña = document.getElementById("userPassword").value;

    if (modoCuenta === "create") {
        if (cuentas.some(cuenta => cuenta.correo === correo)) {
            alert("Ya existe una cuenta con ese correo electrónico.");
            return;
        }

        const nuevaCuenta = {
            nombre,
            correo,
            contraseña
        };

        cuentas.push(nuevaCuenta);
        usuarioActual = nuevaCuenta;

        alert("Cuenta creada correctamente.");
    } else {
        const cuenta = cuentas.find(cuenta =>
            cuenta.correo === correo &&
            cuenta.contraseña === contraseña
        );

        if (!cuenta) {
            alert("Correo electrónico o contraseña incorrectos.");
            return;
        }

        usuarioActual = cuenta;
        alert("Sesión iniciada correctamente.");
    }

    actualizarCuenta();
});

// Cerrar sesión
logoutButton.addEventListener("click", () => {
    usuarioActual = null;
    actualizarCuenta();

    alert("La sesión se ha cerrado correctamente.");
});

// Actualizar interfaz de cuenta
function actualizarCuenta() {
    const accountName = document.getElementById("accountName");

    if (usuarioActual) {
        accountName.textContent = usuarioActual.nombre;
        accountOptions.classList.add("hidden");
        accountFormContainer.classList.add("hidden");
        logoutButton.classList.remove("hidden");
    } else {
        accountName.textContent = "Mi cuenta";
        accountOptions.classList.remove("hidden");
        accountFormContainer.classList.add("hidden");
        logoutButton.classList.add("hidden");
    }

    accountForm.reset();
}

// Botón de bienvenida para bajar al registro
document.getElementById("goToRegistration").addEventListener("click", () => {
    document.getElementById("registro").scrollIntoView({
        behavior: "smooth",
        block: "start"
    });
});

// Navegación entre apartados
document.querySelectorAll(".nav-button").forEach(button => {
    button.addEventListener("click", () => {
        document.querySelectorAll(".nav-button").forEach(btn => {
            btn.classList.remove("active");
        });

        document.querySelectorAll(".section").forEach(section => {
            section.classList.remove("active");
        });

        button.classList.add("active");

        const seccion = button.dataset.section;
        document.getElementById(seccion).classList.add("active");
    });
});

// Registrar bovino
const formulario = document.getElementById("formBovino");
const tablaBovinos = document.getElementById("tablaBovinos");

formulario.addEventListener("submit", function(event) {
    event.preventDefault();

    const identificacion = document.getElementById("identificacion").value.trim();

    const existe = bovinos.some(bovino =>
        bovino.identificacion.toLowerCase() === identificacion.toLowerCase()
    );

    if (existe) {
        alert("Ya existe un bovino con esa identificación.");
        return;
    }

    const nuevoBovino = {
        identificacion,
        peso: Number(document.getElementById("peso").value),
        color: document.getElementById("color").value.trim(),
        sexo: document.getElementById("sexo").value,
        edad: Number(document.getElementById("edad").value),
        raza: document.getElementById("raza").value.trim(),
        salud: document.getElementById("salud").value,
        alimentacion: document.getElementById("alimentacion").value.trim(),
        medicamentos: document.getElementById("medicamentos").value.trim()
    };

    bovinos.push(nuevoBovino);

    formulario.reset();

    actualizarAplicacion();

    alert("Bovino registrado correctamente.");
});

// Mostrar bovinos
function mostrarBovinos() {
    tablaBovinos.innerHTML = "";

    const mensaje = document.getElementById("mensajeSinDatos");

    if (bovinos.length === 0) {
        mensaje.style.display = "block";
        return;
    }

    mensaje.style.display = "none";

    bovinos.forEach((bovino, index) => {
        const fila = document.createElement("tr");

        const valores = [
            bovino.identificacion,
            `${bovino.peso} kg`,
            bovino.color,
            bovino.sexo,
            `${bovino.edad} años`,
            bovino.raza,
            bovino.salud,
            bovino.alimentacion,
            bovino.medicamentos || "No registrado"
        ];

        valores.forEach(valor => {
            const celda = document.createElement("td");
            celda.textContent = valor;
            fila.appendChild(celda);
        });

        const celdaAcciones = document.createElement("td");
        const botonEliminar = document.createElement("button");

        botonEliminar.textContent = "Eliminar";
        botonEliminar.className = "delete-button";

        botonEliminar.addEventListener("click", () => {
            eliminarBovino(index);
        });

        celdaAcciones.appendChild(botonEliminar);
        fila.appendChild(celdaAcciones);

        tablaBovinos.appendChild(fila);
    });
}

// Eliminar bovino
function eliminarBovino(index) {
    const confirmar = confirm(
        "¿Estás seguro de que deseas eliminar este registro?"
    );

    if (!confirmar) {
        return;
    }

    bovinos.splice(index, 1);
    actualizarAplicacion();
}

// Actualizar estadísticas
function actualizarEstadisticas() {
    document.getElementById("totalBovinos").textContent = bovinos.length;

    if (bovinos.length === 0) {
        document.getElementById("pesoPromedio").textContent = "0 kg";
    } else {
        const totalPeso = bovinos.reduce(
            (total, bovino) => total + bovino.peso,
            0
        );

        const promedio = totalPeso / bovinos.length;

        document.getElementById("pesoPromedio").textContent =
            `${promedio.toFixed(1)} kg`;
    }

    const observacion = bovinos.filter(
        bovino => bovino.salud === "En observación"
    ).length;

    document.getElementById("enObservacion").textContent = observacion;
}

// Análisis de alimentación
function analizarAlimentacion() {
    const contenedor = document.getElementById("analisisAlimentacion");

    if (bovinos.length === 0) {
        contenedor.innerHTML = "<p>No hay información disponible.</p>";
        return;
    }

    const lista = document.createElement("ul");

    bovinos.forEach(bovino => {
        const elemento = document.createElement("li");

        elemento.textContent =
            `${bovino.identificacion}: ${bovino.alimentacion}. ` +
            `Peso registrado: ${bovino.peso} kg.`;

        lista.appendChild(elemento);
    });

    contenedor.replaceChildren(lista);
}

// Análisis sanitario
function analizarSalud() {
    const contenedor = document.getElementById("analisisSalud");

    if (bovinos.length === 0) {
        contenedor.innerHTML = "<p>No hay información disponible.</p>";
        return;
    }

    const lista = document.createElement("ul");

    bovinos.forEach(bovino => {
        const elemento = document.createElement("li");

        elemento.textContent =
            `${bovino.identificacion}: estado de salud ${bovino.salud}.`;

        lista.appendChild(elemento);
    });

    contenedor.replaceChildren(lista);
}

// Tratamientos registrados
function analizarMedicamentos() {
    const contenedor = document.getElementById("analisisMedicamentos");

    if (bovinos.length === 0) {
        contenedor.innerHTML = "<p>No hay información disponible.</p>";
        return;
    }

    const lista = document.createElement("ul");

    bovinos.forEach(bovino => {
        const elemento = document.createElement("li");

        elemento.textContent =
            `${bovino.identificacion}: ${
                bovino.medicamentos || "Sin tratamiento registrado"
            }.`;

        lista.appendChild(elemento);
    });

    contenedor.replaceChildren(lista);
}

// Actualizar aplicación
function actualizarAplicacion() {
    mostrarBovinos();
    actualizarEstadisticas();
    analizarAlimentacion();
    analizarSalud();
    analizarMedicamentos();
}

// Inicializar
actualizarAplicacion();
actualizarCuenta();
