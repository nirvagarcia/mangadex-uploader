const fs = require('fs');

const pageMap = [];
const batchSize = 5; // Puedes ajustar esto según la velocidad de tu conexión
const folderPath = './chapter'; // Asegúrate de que el path es correcto

fs.readdirSync(folderPath).forEach(filename => {
    const parts = filename.split('.');
    const extension = parts[parts.length - 1].toLowerCase();
    if (!filename.includes('.') || !['jpg', 'jpeg', 'png', 'gif'].includes(extension)) {
        return; // Ignora archivos que no son imágenes
    }

    pageMap.push({
        filename: filename,
        extension: extension,
        path: `${folderPath}/${filename}`
    });
});

console.log(pageMap); // Para verificar que todo está cargando correctamente

module.exports = pageMap; // Esto exporta pageMap para ser utilizado en otros archivos