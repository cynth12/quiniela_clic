// Obtener solo letras seleccionadas (sin nombres de partidos)
function obtenerSoloLetras() {
  const partidos = document.querySelectorAll(".partido");
  let letras = [];

  partidos.forEach(partido => {
    const seleccionada = partido.querySelector(".opcion.selected");
    const valor = seleccionada ? seleccionada.getAttribute("data-valor") : "—";
    letras.push(valor);
  });

  return letras;
}

// Actualizar resumen final con solo letras
function actualizarResumenFinal() {
  const letras = obtenerSoloLetras();
  document.getElementById("resumenFinalVisual").textContent = letras.join(", ");
}

// Activar selección visual de botones
document.querySelectorAll(".opcion").forEach(btn => {
  btn.addEventListener("click", () => {
    const grupo = btn.closest(".partido").querySelectorAll(".opcion");
    grupo.forEach(b => b.classList.remove("selected"));
    btn.classList.add("selected");
    actualizarResumenFinal();
  });
});

// Obtener resultados con nombres de partidos (para WhatsApp o lista completa)
function obtenerResultadosVisuales() {
  const partidos = document.querySelectorAll(".partido");
  let resultados = [];

  partidos.forEach(partido => {
    const nombrePartido = partido.getAttribute("data-partido");
    const seleccionada = partido.querySelector(".opcion.selected");
    const valor = seleccionada ? seleccionada.getAttribute("data-valor") : "—";
    resultados.push(`${nombrePartido}: ${valor}`);
  });

  return resultados;
}

// Aleatorizar selecciones visuales
function aleatorio() {
  const partidos = document.querySelectorAll(".partido");

  partidos.forEach(partido => {
    const opciones = partido.querySelectorAll(".opcion");
    const randomIndex = Math.floor(Math.random() * opciones.length);

    opciones.forEach(btn => btn.classList.remove("selected"));
    opciones[randomIndex].classList.add("selected");
  });

  actualizarResumenFinal();
}

// Limpiar formulario y resultados
function limpiar() {
  document.getElementById("quinielaForm").reset();
  document.getElementById("resultado").innerHTML = "";

  document.querySelectorAll(".opcion").forEach(btn => {
    btn.classList.remove("selected");
  });

  actualizarResumenFinal();
}

// Variables globales
let quinielas = [];
const costoPorQuiniela = 10;

// Agregar quiniela a la lista
function agregarQuiniela() {
  const nombre = document.getElementById("nombre").value.trim();
  const telefono = document.getElementById("telefono").value.trim();
  const resultados = obtenerResultadosVisuales();

  if (resultados.some(r => r.includes(": —"))) {
    alert("Por favor selecciona una opción para todos los partidos.");
    return;
  }

  const resumen = { nombre, telefono, resultados };
  quinielas.push(resumen);
  actualizarLista();
  limpiar();
}

// Actualizar lista visual de quinielas
function actualizarLista() {
  const lista = document.getElementById("listaQuinielas");
  lista.innerHTML = "";

  quinielas.forEach((q, index) => {
    const item = document.createElement("div");
    item.classList.add("quiniela-item");
    item.innerHTML = `
      <strong>#${index + 1} – ${q.nombre}</strong><br>
      ${q.resultados.join("<br>")}
      <hr>
    `;
    lista.appendChild(item);
  });

  const total = quinielas.length * costoPorQuiniela;
  document.getElementById("resumenTotal").textContent = `${quinielas.length} quiniela(s) – Total: $${total} MXN`;

  const btnWhatsapp = document.getElementById("btnWhatsapp");
  btnWhatsapp.disabled = quinielas.length === 0;
}

// Borrar todas las quinielas
function borrarTodo() {
  quinielas = [];
  actualizarLista();
  actualizarResumenFinal();
}

// Generar mensaje para WhatsApp
function generarMensajeWhatsapp() {
  let mensaje = `📋 *Resumen de Quinielas* (${quinielas.length} total)\n\n`;

  quinielas.forEach((q, index) => {
    mensaje += `*#${index + 1} – ${q.nombre}*\n`;
    q.resultados.forEach(r => {
      mensaje += `• ${r}\n`;
    });
    mensaje += `\n`;
  });

  const total = quinielas.length * costoPorQuiniela;
  mensaje += `💰 *Total:* $${total} MXN`;

  return encodeURIComponent(mensaje);
}

// Enviar por WhatsApp usando número ingresado
function enviarPorWhatsapp() {
  const telefono = document.getElementById("telefono").value.trim();
  if (!telefono) {
    alert("Por favor ingresa un número de teléfono.");
    return;
  }

  const mensaje = generarMensajeWhatsapp();
  const url = `https://wa.me/${telefono}?text=${mensaje}`;
  window.open(url, "_blank");
}

// Envío individual por submit
document.getElementById("quinielaForm").addEventListener("submit", function (e) {
  e.preventDefault();

  const nombre = document.getElementById("nombre").value.trim();
  const resultados = obtenerResultadosVisuales();

  if (resultados.some(r => r.includes(": —"))) {
    alert("Por favor selecciona una opción para todos los partidos.");
    return;
  }

  const mensaje = `📝 Quiniela de ${nombre}\n${resultados.join("\n")}`;
  const numeroDestino = "5217331295000"; // ← Reemplaza con tu número real
  const whatsappLink = `https://wa.me/${numeroDestino}?text=${encodeURIComponent(mensaje)}`;

  document.getElementById("resultado").innerHTML = `
    <p>Tu quiniela fue generada correctamente ✅</p>
    <a href="${whatsappLink}" target="_blank">📲 Compartir por WhatsApp</a>
  `;
});
