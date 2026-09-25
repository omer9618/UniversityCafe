const fs = require('fs');
const path = require('path');
const file = path.join(__dirname, 'react_frontend/src/pages/CampusAuthentication.jsx');
let content = fs.readFileSync(file, 'utf8');

if(!content.includes('const handleLogin')) {
  content = content.replace(
    "export default function CampusAuthentication() {",
    "import { useNavigate } from 'react-router-dom';\nexport default function CampusAuthentication() {\n  const navigate = useNavigate();\n  const [email, setEmail] = React.useState('student@bahria.edu.pk');\n  const [password, setPassword] = React.useState('password123');\n\n  const handleLogin = async (e) => {\n    e.preventDefault();\n    try {\n      const res = await fetch('http://localhost:5000/api/login', {\n        method: 'POST',\n        headers: {'Content-Type': 'application/json'},\n        body: JSON.stringify({email, password})\n      });\n      const data = await res.json();\n      if(data.success) {\n        navigate('/menu');\n      } else {\n        alert('Invalid credentials!');\n      }\n    } catch(err) { console.error(err); }\n  };\n"
  );

  content = content.replace(
    /type="email"[^>]*>/,
    `type="email" value={email} onChange={e => setEmail(e.target.value)} />`
  );
  content = content.replace(
    /type="password"[^>]*>/,
    `type="password" value={password} onChange={e => setPassword(e.target.value)} />`
  );

  content = content.replace(
    />\s*SIGN IN\s*<\/button>/i,
    ` onClick={handleLogin}>SIGN IN</button>`
  );

  fs.writeFileSync(file, content);
}
console.log('wired up login');
