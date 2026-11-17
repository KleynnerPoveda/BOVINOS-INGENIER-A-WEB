# Aplicación Web para la Gestión y Análisis de Datos Productivos y de Control para Bovinos

## Descripción del proyecto

Este proyecto consiste en el desarrollo de una aplicación web encargada de gestionar, organizar y analizar información relacionada con la producción y el control de bovinos en una finca ganadera.

Surge de la necesidad de digitalizar los procesos de recolección y administración de datos que tradicionalmente se realizan de manera manual mediante libretas u hojas de registro, dificultando la consulta, organización y análisis de la información.

La aplicación busca facilitar el seguimiento individual de cada bovino, permitiendo registrar sus características principales y disponer de información organizada para mejorar la toma de decisiones en la producción ganadera.

## Objetivo general

Desarrollar una aplicación web para gestionar y analizar datos alimenticios, medicinales y otros aspectos de los bovinos en una finca mediante un registro estructurado, con el fin de digitalizar los datos de la producción ganadera.

## Objetivos específicos

- Identificar las características de registro (sexo, color, peso, historial médico, entre otros) y las condiciones sanitarias de la finca.
- Analizar el estado del arte de los sistemas de gestión de datos ganaderos y de los modelos de predicción alimentaria y sanitaria en bovinos.
- Evaluar el funcionamiento y la usabilidad de la aplicación con el propietario de la finca, comparando el tiempo de gestión de datos frente al método manual.

## Funcionalidades principales

Actualmente, la aplicación permite:

- Registrar nuevos bovinos.
- Almacenar información de identificación.
- Registrar el peso de cada animal.
- Registrar el color y sexo.
- Registrar la edad.
- Registrar la raza.
- Registrar el estado de salud.
- Consultar los bovinos registrados.
- Buscar animales por identificación, raza o color.
- Eliminar registros.
- Visualizar estadísticas generales de los bovinos.

## Información administrada

La aplicación contempla diferentes variables importantes para el control ganadero:

| Variable | Descripción |
|---|---|
| Identificación | Código único de cada bovino. |
| Peso | Peso registrado en kilogramos. |
| Color | Características físicas del animal. |
| Sexo | Macho o hembra. |
| Edad | Edad del bovino en años. |
| Raza | Clasificación racial del animal. |
| Estado de salud | Condición sanitaria registrada. |
| Alimentación | Información relacionada con el consumo alimenticio. |
| Historial médico | Registro de información medicinal y sanitaria. |

## Tecnologías utilizadas

El desarrollo de la aplicación utiliza las siguientes tecnologías:

- **HTML5:** estructura y organización del contenido de la página.
- **CSS3:** diseño visual, estilos, colores y distribución de los elementos.
- **JavaScript:** programación de funcionalidades, registro, búsqueda, eliminación y procesamiento de datos.
- **Backend:** administración de la lógica interna de la aplicación y procesamiento de información.
- **API REST:** comunicación entre el frontend y el backend mediante solicitudes HTTP.

## Estructura del proyecto

```text
Registro-Bovino/
│
├── Frontend/
│   ├── index.html
│   ├── style.css
│   └── script.js
│
├── Backend/
│   ├── app.py
│   ├── config.py
│   └── requirements.txt
│
├── API REST/
│   ├── routes/
│   │   └── bovinos.py
│   │
│   └── controllers/
│       └── bovinos_controller.py
│
└── README.md
```

### Descripción de los componentes

- **Frontend:** contiene la interfaz visual de la aplicación, desarrollada con HTML5, CSS3 y JavaScript. Permite interactuar con los registros de los bovinos.
- **Backend:** administra la lógica interna de la aplicación, procesa las solicitudes y gestiona la información recibida desde el frontend.
- **API REST:** permite la comunicación entre el frontend y el backend mediante solicitudes HTTP, facilitando operaciones como registrar, consultar, actualizar y eliminar bovinos.
- **README.md:** contiene la documentación general del proyecto.

## Instalación y ejecución

Para ejecutar el proyecto localmente:

1. Descargar o clonar el repositorio.
2. Abrir la carpeta del proyecto.
3. Verificar que los archivos HTML, CSS y JavaScript estén en sus respectivas carpetas.
4. Configurar el Backend y la API REST cuando estén implementados.
5. Abrir el archivo `index.html` en un navegador web o utilizar Visual Studio Code con la extensión Live Server.
6. Comenzar a utilizar la aplicación.

## Limitaciones actuales

La primera versión del proyecto se centra en el registro y la consulta de información ingresada manualmente por el usuario.

Entre sus limitaciones se encuentran:

- No cuenta todavía con integración de sensores para recopilar datos automáticamente.
- No dispone de sincronización en la nube.
- No cuenta con una base de datos permanente.
- Los análisis predictivos alimentarios y sanitarios se encuentran contemplados como parte del desarrollo futuro.
- Su funcionamiento actual no contempla la sincronización en lugares sin conexión a internet.

## Proyecciones futuras

Se plantea ampliar las funcionalidades de la aplicación mediante:

- Implementación de una base de datos para almacenar permanentemente la información.
- Registro del historial médico de cada bovino.
- Control y seguimiento de la alimentación.
- Seguimiento de peso y crecimiento.
- Análisis estadístico de la producción ganadera.
- Implementación de modelos matemáticos para realizar predicciones alimentarias y sanitarias.
- Generación de reportes sobre el estado general del ganado.
- Mejoras de usabilidad y adaptación a dispositivos móviles.
- Integración completa del frontend, backend y API REST.

## Importancia del proyecto

La aplicación busca contribuir a la digitalización de los procesos ganaderos, facilitando la organización y consulta de información que normalmente se administra de manera manual.

Mediante el uso de herramientas tecnológicas, se pretende optimizar el control de los animales, reducir el tiempo dedicado a la gestión de datos y proporcionar información útil para apoyar las decisiones relacionadas con la alimentación, salud y producción bovina.

## Estado del proyecto

**En desarrollo.**

Este proyecto se encuentra en una etapa inicial de implementación y continuará incorporando funcionalidades relacionadas con la gestión, almacenamiento y análisis de datos productivos y sanitarios de bovinos.