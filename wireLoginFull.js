const fs = require('fs');
const path = require('path');
const file = path.join(__dirname, 'react_frontend/src/pages/CampusAuthentication.jsx');
let content = fs.readFileSync(file, 'utf8');

// Inject role state
content = content.replace(
  "const [email, setEmail] = React.useState('student@bahria.edu.pk');",
  "const [email, setEmail] = React.useState('student@bahria.edu.pk');\n  const [role, setRole] = React.useState('student');"
);

// Update handleLogin to route based on role
content = content.replace(
  "navigate('/menu');",
  "if(data.user.role === 'vendor') { navigate('/vendor'); } else { navigate('/menu'); }"
);

// Inject role-based UI logic for the tabs
// Student Tab
content = content.replace(
  /<button className="font-body-md text-on-surface font-semibold relative pb-1\.5 transition-colors focus:outline-none" id="role-student"  type="button">([\s\S]*?)<\/button>/,
  `<button onClick={() => { setRole('student'); setEmail('student@bahria.edu.pk'); }} className={"font-body-md relative pb-1.5 transition-colors focus:outline-none " + (role === 'student' ? 'text-on-surface font-semibold' : 'text-secondary hover:text-on-surface')} type="button">$1</button>`
);
// Vendor Tab
content = content.replace(
  /<button className="font-body-md text-secondary hover:text-on-surface relative pb-1\.5 transition-colors focus:outline-none" id="role-vendor"  type="button">([\s\S]*?)<\/button>/,
  `<button onClick={() => { setRole('vendor'); setEmail('vendor@bahria.edu.pk'); }} className={"font-body-md relative pb-1.5 transition-colors focus:outline-none " + (role === 'vendor' ? 'text-on-surface font-semibold' : 'text-secondary hover:text-on-surface')} type="button">$1</button>`
);

// Fix the active indicators under the tabs
content = content.replace(
  /id="indicator-student"><\/span>/,
  `id="indicator-student" style={{opacity: role === 'student' ? 1 : 0}}></span>`
);
content = content.replace(
  /id="indicator-vendor"><\/span>/,
  `id="indicator-vendor" style={{opacity: role === 'vendor' ? 1 : 0}}></span>`
);

fs.writeFileSync(file, content);
console.log('wired full login');
