import { body, validationResult, matchedData, check } from 'express-validator';
import { getAllItems, getAllTypes, getTargetType, getAllBrands, getTargetBrand, searchItem, getTargetItem, addNewBrand, addNewType, updateItem, addNewItem, deleteItem, deleteBrand } from '../db/queries.js';

const validateAddPedal = [
    body("pedalName").trim()
        .notEmpty().withMessage("pedal name required"),
    body("pedalType")
        .notEmpty().withMessage("please select a type"),
    body("pedalBrand")
        .notEmpty().withMessage("please select a brand"),
    body("pedalPrice").trim()
        .notEmpty().withMessage("price required"),
    body("pedalQuantity").trim()
        .notEmpty().withMessage("quantity required")
        .isInt({min: 0}).withMessage("cannot be lower than 0"),
    body("adminPw").trim()
        .notEmpty().withMessage("password required"),
];

const validateUpdatePedal = [
    body("pedalId").trim(),
    body("pedalName").trim()
        .notEmpty().withMessage("pedal name required"),
    body("pedalType")
        .notEmpty().withMessage("please select a type"),
    body("pedalBrand")
        .notEmpty().withMessage("please select a brand"),
    body("pedalPrice").trim()
        .notEmpty().withMessage("price required"),
    body("pedalQuantity").trim()
        .notEmpty().withMessage("quantity required")
        .isInt({min: 0}).withMessage("cannot be lower than 0"),
    body("adminPw").trim()
        .notEmpty().withMessage("password required"),
];

const validateAddBrand = [
    body("newBrand").trim()
        .notEmpty().withMessage("brand name required"),
    body("adminPw").trim()
        .notEmpty().withMessage("password required"),
];

const validateAddType = [
    body("newType").trim()
        .notEmpty().withMessage("type name required"),
    body("adminPw").trim()
        .notEmpty().withMessage("password required"),
];


function checkPassword(userInput) {
    const pw = "pw123";
    if (pw === userInput) return true;
    else return false;
}

export async function getItemsList(req, res) {
    const pedals = await getAllItems();
    console.log("Pedals: ", pedals);
    const types = await getAllTypes();
    const brands = await getAllBrands();
    res.render('index', {
        title: "Pedal Inventory",
        pedals: pedals,
        types: types,
        brands: brands,
    })
};

export async function getTypesList(req, res) {
    const types = await getAllTypes();
    console.log("Types: ", types);
    res.render('category', {
        title: "Types of Pedals",
        types: types,
    })
};

export async function getItemsByType(req, res) {
    const targetType = req.params.category;
    const pedals = await getTargetType(targetType);
    console.log("Target type:", targetType);
    res.render('pedalsList', {
        title: targetType + "pedals",
        pedals: pedals,
    })
};

export async function getBrandsList(req, res) {
    const brands = await getAllBrands();
    console.log("Brands: ", brands);
    res.render('brand', {
        title: "Pedal Brands",
        brands: brands,
    })
};

export async function getItemsByBrand(req, res) {
    const targetBrand = req.params.brand;
    const pedals = await getTargetBrand(targetBrand);
    console.log("Target brand: ", targetBrand);
    res.render('pedalsList', {
        title: targetBrand + "pedals",
        pedals: pedals,
    })
};

export async function getSearchTargetItem(req, res) {
    const targetPedal = req.query.targetItem;
    console.log(targetPedal);
    const pedals = await searchItem(targetPedal);
    console.log("Search result:", pedals);
    res.render('pedalsList', {
        title: "Search Result",
        pedals: pedals,
    })
};

export async function getItem(req, res) {
    const targetItem = req.params.item;
    // console.log(targetItem);
    const pedal = await getTargetItem(targetItem);
    const brands = await getAllBrands();
    const types = await getAllTypes();
    console.log("brands: ", brands);
    console.log("Item: ", pedal);
    res.render('pedal', {
        title: pedal[0].item_name,
        pedal: pedal,
        brands: brands,
        types: types,
    })
};

export const postAddBrand = [
    validateAddBrand,
    async (req, res) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            const brands = await getAllBrands();
            return res.render('brand', {
                title: "Pedal brands",
                brands: brands,
                errors: errors.array(),
            });
        }
        const result = matchedData(req);
        if (!checkPassword(result.adminPw)) {
            return;
        }
        else {
            await addNewBrand(result.newBrand);
            res.redirect('/');
        }
    }
]

export const postAddType = [
    validateAddType,
    async (req, res) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            const types = await getAllTypes();
            return res.render('category', {
                title: "Types of pedals",
                types: types,
                errors: errors.array(),
            }); 
        }
        const result = matchedData(req);
        if (!checkPassword(result.adminPw)) {
            return;
        }
        else {
            await addNewType(result.newType);
            res.redirect('/');
        }
    }
]

// export async function postUpdateItem(req, res) {
//     const targetPedal = req.body;
//     console.log("target pedal: ", targetPedal)
//     await updateItem(targetPedal);
//     res.redirect('/');
// }

export const postUpdateItem = [
    validateUpdatePedal,
    async (req, res) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            const targetItem = req.body.pedalId;
            const pedal = await getTargetItem(targetItem);
            const brands = await getAllBrands();
            const types = await getAllTypes();
            console.log("brands: ", brands);
            console.log("Item: ", pedal);
            res.render('pedal', {
                title: pedal[0].item_name,
                pedal: pedal,
                brands: brands,
                types: types,
                errors: errors.array(),
            })
        }
        const result = matchedData(req);
        console.log("result: ", result);
        if (!checkPassword(result.adminPw)) {
            return;
        }
        else {
            await updateItem(result);
            res.redirect('/');
        }
    }
]

export const postAddItem =[
    validateAddPedal,
    async (req, res) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            const pedals = await getAllItems();
            const types = await getAllTypes();
            const brands = await getAllBrands();
            return res.render('index', {
                title: "Pedal Inventory",
                pedals: pedals,
                types: types,
                brands: brands,
                errors: errors.array(),
            });
        }
        const result = matchedData(req);
        if (!checkPassword(result.adminPw)) {
            return;
        }
        else {
            await addNewItem(result);
            res.redirect('/');
        }
    }
]

export async function postDeleteItem(req, res) {
    const targetItem = req.body;
    console.log("targetItem: ", targetItem);
    if (!checkPassword(targetItem.adminPw)){
        return;
    }
    else {
        await deleteItem(targetItem.pedalToDeleteId);
        res.redirect('/');
    }
}    

export async function postDeleteBrand(req, res) {
    const targetBrand = req.body;
    console.log("targetBrand: ", targetBrand);
    if (!checkPassword(targetBrand.adminPw)) {
        return;
    }
    else {
        await deleteBrand(targetBrand.brandToDelete);
        res.redirect('/');
    }
}

