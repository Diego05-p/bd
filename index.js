const app = require('./src/app/app');
const { port } = require('./config');

app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});