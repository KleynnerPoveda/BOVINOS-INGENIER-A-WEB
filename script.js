const bovinos = [
  {id:"BOV-001",peso:320,color:"Blanco y negro",sexo:"Hembra",edad:2.5,raza:"Holstein",salud:"Bueno"},
  {id:"BOV-002",peso:410,color:"Rojo",sexo:"Macho",edad:3,raza:"Brahman",salud:"Bueno"},
  {id:"BOV-003",peso:285,color:"Blanco",sexo:"Hembra",edad:1.8,raza:"Cruzado",salud:"En observación"}
];

const form = document.getElementById("formBovino");
const tabla = document.getElementById("tablaBovinos");
const buscar = document.getElementById("buscar");

function actualizarResumen(){
  document.getElementById("total").textContent = bovinos.length;
  const promedio = bovinos.length ? bovinos.reduce((s,b)=>s+b.peso,0)/bovinos.length : 0;
  document.getElementById("promedio").textContent = promedio.toFixed(1)+" kg";
  document.getElementById("machos").textContent = bovinos.filter(b=>b.sexo==="Macho").length;
  document.getElementById("hembras").textContent = bovinos.filter(b=>b.sexo==="Hembra").length;
}

function mostrarBovinos(){
  const texto = buscar.value.toLowerCase();
  const filtrados = bovinos.filter(b =>
    [b.id,b.raza,b.color,b.sexo].some(v=>String(v).toLowerCase().includes(texto))
  );
  tabla.innerHTML = "";
  filtrados.forEach(b=>{
    const fila = document.createElement("tr");
    fila.innerHTML = `
      <td><strong>${b.id}</strong></td>
      <td>${b.peso} kg</td><td>${b.color}</td><td>${b.sexo}</td>
      <td>${b.edad} años</td><td>${b.raza}</td>
      <td><span class="estado">${b.salud}</span></td>
      <td><button type="button" onclick="eliminarBovino('${b.id}')">Eliminar</button></td>`;
    tabla.appendChild(fila);
  });
  actualizarResumen();
}

form.addEventListener("submit",e=>{
  e.preventDefault();
  const id = document.getElementById("idBovino").value.trim();
  if(bovinos.some(b=>b.id.toLowerCase()===id.toLowerCase())){
    alert("Ya existe un bovino con esa identificación.");
    return;
  }
  bovinos.push({
    id,
    peso:Number(document.getElementById("peso").value),
    color:document.getElementById("color").value.trim(),
    sexo:document.getElementById("sexo").value,
    edad:Number(document.getElementById("edad").value),
    raza:document.getElementById("raza").value.trim(),
    salud:document.getElementById("salud").value
  });
  form.reset();
  mostrarBovinos();
});

function eliminarBovino(id){
  const indice=bovinos.findIndex(b=>b.id===id);
  if(indice>=0 && confirm("¿Eliminar el registro "+id+"?")){
    bovinos.splice(indice,1);
    mostrarBovinos();
  }
}
buscar.addEventListener("input",mostrarBovinos);
mostrarBovinos();
