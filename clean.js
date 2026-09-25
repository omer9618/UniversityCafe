const fs = require('fs');
const path = require('path');
const dir = path.join(__dirname, 'react_frontend/src/pages');

fs.readdirSync(dir).forEach(file => {
  if (file.endsWith('.jsx') && file !== 'VendorOrderPipeline.jsx') {
    let content = fs.readFileSync(path.join(dir, file), 'utf8');
    
    // Remove all invalid React string event handlers (e.g. onClick="toggle()")
    content = content.replace(/on[a-zA-Z]+="[^"]*"/g, '');
    
    // Ensure all class attributes are className
    content = content.replace(/ class=/g, ' className=');
    content = content.replace(/ for=/g, ' htmlFor=');
    
    fs.writeFileSync(path.join(dir, file), content);
    console.log('Cleaned', file);
  }
});
