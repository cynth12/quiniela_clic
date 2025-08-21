document.getElementById('quinielaForm').addEventListener('submit', function(e) {
  e.preventDefault();

  const nombre = document.getElementById('nombre').value || 'Sin nombre';
  const telefono = document.getElementById('telefono').value || 'No proporcionado';

  let resumen = `📝 Quiniela Zas! - Semana 1\n👤 Nombre: ${nombre}\n📱 Tel: ${telefono}\n\n`;

  document.querySelectorAll('.match').forEach(match => {
    const equipos = match.querySelector('label').textContent;
    const resultado = match.querySelector('input').value;
    resumen += `⚽ ${equipos}: ${resultado}\n`;
  });

  resumen += `\n💰 Costo: $25 MXN`;

  // Tu número de WhatsApp (sin espacios, con código país)
  const tuNumero = '5219841314389'; // ← reemplaza con tu número real

  const waLink = `https://wa.me/${tuNumero}?text=${encodeURIComponent(resumen)}`;

  // Mostrar botón para enviar
  const resultadoDiv = document.getElementById('resultado');
  resultadoDiv.innerHTML = `<a href="${waLink}" target="_blank">📲 Enviar a ClicConecta Zas!</a>`;
});

