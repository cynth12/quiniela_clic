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

