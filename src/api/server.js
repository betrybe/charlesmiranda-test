const bodyParser = require('body-parser');
const app = require('./app');

const PORT = 3000;

const apiRoutes = require('./routes/api-routes');

app.use(bodyParser.json());

app.use('/', apiRoutes);

app.listen(PORT, () => console.log(`conectado na porta ${PORT}`));
