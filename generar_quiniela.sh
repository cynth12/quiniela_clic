#!/bin/bash

# 🗓️ Solicita número de jornada
read -p "Número de jornada (ej. 02): " jornada

# 📁 Define rutas
PLANTILLA="plantilla_base"
NUEVA_JORNADA="jornada_${jornada}"
INDEX_HTML="index.html"

# 🧼 Limpieza previa
rm -rf "$NUEVA_JORNADA"

# 📦 Copia plantilla
cp -r "$PLANTILLA" "$NUEVA_JORNADA"

# ✏️ Inserta partidos (puedes mejorar esto con un archivo CSV o JSON si quieres)
read -p "Partidos (separados por '|'): " partidos
IFS='|' read -ra LISTA <<< "$partidos"

# 🧠 Inserta partidos en el HTML
PARTIDOS_HTML=""
for partido in "${LISTA[@]}"; do
    PARTIDOS_HTML+="<li>$partido</li>\n"
done

sed -i "s|<!--PARTIDOS-->|$PARTIDOS_HTML|g" "$NUEVA_JORNADA/index.html"

# 🔄 Actualiza redirección en index.html raíz
cat > "$INDEX_HTML" <<EOF
<!DOCTYPE html>
<html lang="es">
<head>
    <meta charset="UTF-8">
    <title>Quiniela ClicConecta Zas!</title>
    <script>
        window.location.href = "./jornada_${jornada}/index.html";
    </script>
</head>
<body>
    <p>Redireccionando a la jornada actual...</p>
</body>
</html>
EOF

# 🧾 Git commit & push
git add .
git commit -m "Publicada jornada ${jornada} con partidos actualizados"
git push

echo "✅ Jornada ${jornada} publicada y redirección actualizada."
