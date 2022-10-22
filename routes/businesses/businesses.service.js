const { query } = require("../../db/query")

const getBusiness = async ( businessId ) => {
    const text = `
        SELECT *
        FROM businesses
        WHERE id = $1;
    `;
    const [ business ] = await query( text, [ businessId ] );
    return business;
};

const createBusiness = async ( { name, addressLine1, addressLine2, city, state, zip } ) => {
    const text = `
        INSERT INTO businesses
        ( "name", "addressLine1", "addressLine2", "city", "state", "zip" )
        VALUES ( $1, $2, $3, $4, $5, $6 )
    `;
    await query( text, [ name, addressLine1, addressLine2, city, state, zip ] );
};

module.exports = {
    createBusiness
    , getBusiness

}