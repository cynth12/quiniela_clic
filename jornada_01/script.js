function limpiar() {
  document.querySelectorAll('input[type="text"]').forEach(input => input.value = '');
}

function aleatorio() {
  document.querySelectorAll('.match input').forEach(input => {
    const golesA = Math.floor(Math.random() * 5);
    const golesB = Math.floor(Math.random() * 5);
    input.value = `${golesA}-${golesB}`;
  });
}

document.getElementById('quinielaForm').addEventListener('submit', function(e) {
  e.preventDefault();
  alert('¡Quiniela enviada correctamente!');

  // Generar resumen
  const nombre = document.getElementById('nombre').value || 'Sin nombre';
  let resumen = `📝 Quiniela Zas! - Semana 1\n👤 Nombre: ${nombre}\n\n`;

  document.querySelectorAll('.match').forEach((match, index) => {
    const equipos = match.querySelector('label').textContent;
    const resultado = match.querySelector('input').value;
    resumen += `⚽ ${equipos}: ${resultado}\n`;
  });

  resumen += `\n💰 Costo: $25 MXN`;

  // Generar link de WhatsApp
  const encoded = encodeURIComponent(resumen);
  const waLink = `https://wa.me/?text=${encoded}`;

  // Mostrar botón para compartir
  const resultadoDiv = document.getElementById('resultado');
  resultadoDiv.innerHTML = `<a href="${waLink}" target="_blank">📲 Compartir por WhatsApp</a>`;
});
