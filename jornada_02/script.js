const costoPorQuiniela = 10;
const quinielas = [];

function seleccionarOpcion(btn) {
  const fila = btn.closest("tr");
  fila.querySelectorAll(".opcion").forEach(b => b.classList.remove("selected"));
  btn.classList.add("selected");
  actualizarResumenFinal();
}

function obtenerSoloLetras() {
  const partidos = document.querySelectorAll("tr.partido");
  const letras = [];

  partidos.forEach(fila => {
    const seleccionada = fila.querySelector(".opcion.selected");
    letras.push(seleccionada ? seleccionada.textContent.trim() : "—");
  });

  return letras;
}

function actualizarResumenFinal() {
  const letras = obtenerSoloLetras();
  const resumen = letras.join(", ");
  document.getElementById("resumenFinalVisual").textContent = resumen;
}

function agregarQuiniela() {
  const nombre = document.getElementById("nombre").value.trim();
  const telefono = document.getElementById("telefono").value.trim();
  const letras = obtenerSoloLetras();

  if (letras.includes("—")) {
    alert("Por favor selecciona una opción para todos los partidos.");
    return;
  }

  const resumen = { nombre, telefono, letras };
  quinielas.push(resumen);
  actualizarLista();
  limpiarSeleccion();
  actualizarResumenFinal();
}

function actualizarLista() {
  const lista = document.getElementById("listaQuinielas");
  lista.innerHTML = "";

  quinielas.forEach((q, index) => {
    const item = document.createElement("div");
    item.classList.add("quiniela-item");
    item.innerHTML = `
      <strong>#${index + 1} – ${q.nombre || "Sin nombre"}</strong><br>
      <span>${q.letras.join(", ")}</span>
      <hr>
    `;
    lista.appendChild(item);
  });

  const total = quinielas.length * costoPorQuiniela;
  document.getElementById("resumenTotal").textContent = `${quinielas.length} quiniela(s) – Total: $${total} MXN`;

  document.getElementById("btnWhatsapp").disabled = quinielas.length === 0;
}

function limpiarSeleccion() {
  document.querySelectorAll(".opcion").forEach(btn => {
    btn.classList.remove("selected");
  });
}

function aleatorio() {
  const partidos = document.querySelectorAll("tr.partido");

  partidos.forEach(fila => {
    const opciones = fila.querySelectorAll(".opcion");
    const aleatoria = opciones[Math.floor(Math.random() * opciones.length)];
    opciones.forEach(b => b.classList.remove("selected"));
    aleatoria.classList.add("selected");
  });

  actualizarResumenFinal();
}

function enviarPorWhatsapp() {
  if (quinielas.length === 0) return;

  const nombre = document.getElementById("nombre").value.trim();
  let mensaje = `Quinielas de ${nombre || "participante"}:\n\n`;

  quinielas.forEach((q, i) => {
    mensaje += `#${i + 1}: ${q.letras.join(", ")}\n`;
  });

  mensaje += `\nTotal: $${quinielas.length * costoPorQuiniela} MXN`;

  const telefono = document.getElementById("telefono").value.trim();
  const numero = telefono || "5217731295000"; // Reemplaza con número destino por defecto
  const url = `https://wa.me/${numero}?text=${encodeURIComponent(mensaje)}`;
  window.open(url, "_blank");
}


