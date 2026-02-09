const fs = require('fs');
const path = require('path');

// Carpetas y archivos a ignorar
const IGNORE_DIRS = ['node_modules', '.git', 'dist', 'build', 'coverage'];
const IGNORE_FILES = ['package-lock.json', '.env', '.DS_Store', 'preparar_contexto.js'];
const EXTENSIONS = ['.js', '.json', '.html', '.css', '.sql', '.env.example'];

const outputFile = 'contexto_para_gemini.txt';

function getAllFiles(dirPath, arrayOfFiles) {
  const files = fs.readdirSync(dirPath);

  arrayOfFiles = arrayOfFiles || [];

  files.forEach(function(file) {
    const fullPath = path.join(dirPath, file);
    
    if (fs.statSync(fullPath).isDirectory()) {
      if (!IGNORE_DIRS.includes(file)) {
        arrayOfFiles = getAllFiles(fullPath, arrayOfFiles);
      }
    } else {
      if (!IGNORE_FILES.includes(file) && EXTENSIONS.includes(path.extname(file))) {
        arrayOfFiles.push(fullPath);
      }
    }
  });

  return arrayOfFiles;
}

const files = getAllFiles(__dirname);
let content = '';

files.forEach(file => {
  // Convertir ruta absoluta a relativa para facilitar lectura
  const relativePath = path.relative(__dirname, file);
  content += `\n\n--- INICIO ARCHIVO: ${relativePath} ---\n`;
  content += fs.readFileSync(file, 'utf8');
  content += `\n--- FIN ARCHIVO: ${relativePath} ---\n`;
});

fs.writeFileSync(outputFile, content);
console.log(`¡Listo! Todo el código se guardó en: ${outputFile}`);