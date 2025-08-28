const dotenv = require('dotenv');
const connectDB = require('./src/config/database')
const app = require('./src/app');
dotenv.config();

const port = process.env.PORT;

connectDB();

app.listen(port, () => {
    console.log('Server running at Port', port)
})
