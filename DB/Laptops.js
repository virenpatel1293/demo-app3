const config = require('./DBConfig');
const sql = require('mssql');

const getLaptopById = async(npid) => {
    try{
        let pool = await sql.connect(config);
        let products = pool.request().query(`EXECUTE Get_Mobile_Product_ByPID '${npid}'`);
        return products;
    }
    catch(e){
        console.log(e);
    }
};

const getLaptopGalleryById = async(npid)=>{
    try{
        let pool = await sql.connect(config);
        let gallery =  pool.request().query(`exec Get_Laptop_Gallery_by_id ${npid}`);
        return gallery;
    }
    catch(e){
        console.log(e);
    }
}


module.exports = {
    getLaptopById,
    getLaptopGalleryById
}