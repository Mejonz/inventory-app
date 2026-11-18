import { pool } from './pool.js';

export async function getAllItems() {
    const { rows } = await pool.query(`
        SELECT * FROM pedal 
        INNER JOIN type ON pedal.item_type = type.type_name
        INNER JOIN brand ON pedal.item_brand = brand.brand_name
    `);
    return rows;
}

export async function getAllTypes() {
    const { rows } = await pool.query("SELECT * FROM type");
    return rows;
}

export async function getAllBrands() {
    const { rows } = await pool.query("SELECT * FROM brand");
    return rows;
}

export async function getTargetItem(targetId) {
    const { rows } = await pool.query(`
        SELECT * FROM pedal 
        INNER JOIN type ON pedal.item_type = type.type_name
        INNER JOIN brand ON pedal.item_brand = brand.brand_name
        WHERE pedal.item_id = $1
    `, [targetId]);
    return rows;
}

export async function getTargetType(targetType) {
    const { rows } = await pool.query(`
        SELECT * FROM pedal
        INNER JOIN type ON pedal.item_type = type.type_name
        INNER JOIN brand ON pedal.item_brand = brand.brand_name
        WHERE type.type_name = $1
    `, [targetType]);
    return rows;
}

export async function getTargetBrand(targetBrand) {
    const { rows } = await pool.query(`
        SELECT * FROM pedal
        INNER JOIN type ON pedal.item_type = type.type_name
        INNER JOIN brand ON pedal.item_brand = brand.brand_name
        WHERE brand.brand_name = $1
    `, [targetBrand]);
    return rows;
}

export async function searchItem(targetItem) {
    const { rows } = await pool.query(`
        SELECT * FROM pedal
        INNER JOIN type ON pedal.item_type = type.type_name
        INNER JOIN brand ON pedal.item_brand = brand.brand_name
        WHERE pedal.item_name LIKE $1
    `, [`%${targetItem}%`]);
    return rows;
}

export async function updateItem(targetPedal) {
    await pool.query(`UPDATE pedal
        SET item_name = $1,
            item_type = $2,
            item_brand = $3,
            item_price = $4,
            item_quantity = $5
        WHERE item_id = $6    
    `, [targetPedal.pedalName, targetPedal.pedalType, targetPedal.pedalBrand, targetPedal.pedalPrice, targetPedal.pedalQuantity, targetPedal.pedalId]);
}

export async function addNewBrand(newBrand) {
    await pool.query("INSERT INTO brand VALUES($1)", [newBrand]);
}

export async function addNewType(newType) {
    await pool.query("INSERT INTO type VALUES($1)", [newType]);
}

export async function addNewItem(newItem) {
    await pool.query(`INSERT INTO pedal
        VALUES (DEFAULT, $1, $2, $3, $4, $5)
    `, [newItem.pedalName, newItem.pedalType, newItem.pedalBrand, newItem.pedalQuantity, newItem.pedalPrice]);
}

export async function deleteItem(itemId) {
    await pool.query("DELETE FROM pedal WHERE item_id = $1", [itemId]);
}

export async function deleteBrand(targetBrand) {
    await pool.query("DELETE FROM pedal WHERE item_brand = $1", [targetBrand]);
    await pool.query("DELETE FROM brand WHERE brand_name = $1", [targetBrand]);
}