import express from 'express';
import path from 'node:path';
import inventoryRouter from './routes/inventoryRouter.js';

const app = express();
const __dirname = import.meta.dirname;
const assetsPath = path.join(__dirname, "public");

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');
app.use(express.urlencoded({ extended: true }));
app.use(express.static(assetsPath));

app.use('/', inventoryRouter);

const PORT = process.env.PORT || 3000;
app.listen(PORT, (error) => {
    if (error) {
        throw error;
    }

    console.log(`server is listening on port ${PORT}`);
});