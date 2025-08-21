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
});