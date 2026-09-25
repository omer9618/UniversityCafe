const fs = require('fs');
const path = require('path');

const srcDir = path.join(__dirname, 'frontend/stitch_university_food_court_system');
const destDir = path.join(__dirname, 'react_frontend/src/pages');

if (!fs.existsSync(destDir)) {
  fs.mkdirSync(destDir, { recursive: true });
}

function convertHtmlToJsx(htmlContent, componentName) {
  // Extract content inside body tag
  const bodyMatch = htmlContent.match(/<body[^>]*>([\s\S]*?)<\/body>/i);
  let bodyContent = bodyMatch ? bodyMatch[1] : htmlContent;

  // Simple JSX conversions
  let jsxContent = bodyContent
    .replace(/class=/g, 'className=')
    .replace(/for=/g, 'htmlFor=')
    // Fix self closing tags (basic regex)
    .replace(/<img([^>]*[^\/])>/gi, '<img$1 />')
    .replace(/<input([^>]*[^\/])>/gi, '<input$1 />')
    .replace(/<br>/gi, '<br />')
    .replace(/<hr>/gi, '<hr />')
    // Fix some SVG self-closing paths sometimes broken
    .replace(/<path([^>]*[^\/])>/gi, '<path$1 />');
    
  return `import React from 'react';\n\nexport default function ${componentName}() {\n  return (\n    <div className="w-full h-full min-h-screen bg-gray-50">\n      ${jsxContent}\n    </div>\n  );\n}\n`;
}

const folders = fs.readdirSync(srcDir, { withFileTypes: true })
  .filter(dirent => dirent.isDirectory())
  .map(dirent => dirent.name);

folders.forEach(folder => {
  const codePath = path.join(srcDir, folder, 'code.html');
  if (fs.existsSync(codePath)) {
    const html = fs.readFileSync(codePath, 'utf8');
    // Convert folder name to Component Name (e.g., student_menu_dashboard -> StudentMenuDashboard)
    const componentName = folder.split('_').map(w => w.charAt(0).toUpperCase() + w.slice(1)).join('');
    
    const jsx = convertHtmlToJsx(html, componentName);
    fs.writeFileSync(path.join(destDir, `${componentName}.jsx`), jsx);
    console.log(`Converted ${folder} to ${componentName}.jsx`);
  }
});
