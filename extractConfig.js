const fs = require('fs');
const html = fs.readFileSync('stitch_university_food_court_system/vendor_order_pipeline/code.html', 'utf8');
const match = html.match(/tailwind\.config = (\{[\s\S]*?\});/);
if (match) {
  const configStr = match[1];
  const configFn = new Function('return ' + configStr);
  const config = configFn();
  const finalConfig = {
    content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
    darkMode: "class",
    theme: config.theme
  };
  fs.writeFileSync('react_frontend/tailwind.config.js', `export default ${JSON.stringify(finalConfig, null, 2)}`);
  console.log('Tailwind config extracted!');
}
