import { Router } from "express";
import { getItemsList, getTypesList, getItemsByType, getBrandsList, getItemsByBrand, getSearchTargetItem, getItem, postAddBrand, postAddType, postUpdateItem, postAddItem, postDeleteItem, postDeleteBrand } from "../controllers/inventoryController.js";

const inventoryRouter = Router();

inventoryRouter.get('/', getItemsList); // index page
inventoryRouter.get('/item/:item', getItem); // view item
inventoryRouter.get('/category', getTypesList); //categories list page
inventoryRouter.get('/category/:category', getItemsByType); // display result page by category
inventoryRouter.get('/brand', getBrandsList) //brands list page
inventoryRouter.get('/brand/:brand', getItemsByBrand); // display result page by brand
inventoryRouter.get('/search', getSearchTargetItem); // display search results

inventoryRouter.post('/deleteItem', postDeleteItem); // delete item
inventoryRouter.post('/new', postAddItem) //add a new item
inventoryRouter.post('/update', postUpdateItem); //update item
inventoryRouter.post('/category', postAddType); // add category
inventoryRouter.post('/brand', postAddBrand); //add brand
inventoryRouter.post('/deleteBrand', postDeleteBrand); //delete brand

export default inventoryRouter;
