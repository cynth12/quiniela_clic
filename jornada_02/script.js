
document.getElementById("quinielaForm").addEventListener("submit", function (e) {
  e.preventDefault();

  const nombre = document.getElementById("nombre").value.trim();
  const telefono = document.getElementById("telefono").value.trim();
  const selects = document.querySelectorAll("select");
  let resultados = [];

  selects.forEach((select, index) => {
    const label = select.previousElementSibling.textContent;
    const valor = select.options[select.selectedIndex].text;
    resultados.push(`${label}: ${valor}`);
  });

  const mensaje = `📝 Quiniela de ${nombre}\n${resultados.join("\n")}`;
  const numeroDestino = "5217331295000"; // ← Reemplaza con tu número real
  const whatsappLink = `https://wa.me/${numeroDestino}?text=${encodeURIComponent(mensaje)}`;


  document.getElementById("resultado").innerHTML = `
    <p>Tu quiniela fue generada correctamente ✅</p>
    <a href="${whatsappLink}" target="_blank">📲 Compartir por WhatsApp</a>
  `;
});

function limpiar() {
  document.getElementById("quinielaForm").reset();
  document.getElementById("resultado").innerHTML = "";
}

function aleatorio() {
  const selects = document.querySelectorAll("select");
  selects.forEach(select => {
    const opciones = select.options;
    const randomIndex = Math.floor(Math.random() * opciones.length);
    select.selectedIndex = randomIndex;
  });
}

let quinielas = [];
const costoPorQuiniela = 25;

function agregarQuiniela() {
  const nombre = document.getElementById("nombre").value.trim();
  const telefono = document.getElementById("telefono").value.trim();
  const selects = document.querySelectorAll("select");
  let resultados = [];

  selects.forEach(select => {
    const label = select.previousElementSibling.textContent;
    const valor = select.options[select.selectedIndex].text;
    resultados.push(`${label}: ${valor}`);
  });

  const resumen = { nombre, telefono, resultados };
  quinielas.push(resumen);
  actualizarLista();
  document.getElementById("quinielaForm").reset();
}

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

function borrarTodo() {
  quinielas = [];
  actualizarLista();
}

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