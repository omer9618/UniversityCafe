const fs = require('fs');

function fixOrdersButton(filePath) {
  let content = fs.readFileSync(filePath, 'utf8');
  content = content.replace(/<a ([^>]*)data-path="tracker"([^>]*)>([^<]*)<\/a>/g, '<Link to="/tracking" $1$2>$3</Link>');
  // Also fix "tray" link if it exists just in case
  content = content.replace(/<a ([^>]*)data-path="tray"([^>]*)>([\s\S]*?)<\/a>/g, '<Link to="/payment" $1$2>$3</Link>');
  fs.writeFileSync(filePath, content);
}

fixOrdersButton('react_frontend/src/pages/StudentMenuDashboard.jsx');
fixOrdersButton('react_frontend/src/pages/TokenPaymentTrayDrawer.jsx');
fixOrdersButton('react_frontend/src/pages/LiveTokenTracker.jsx');

console.log('Fixed nav buttons across all pages!');
