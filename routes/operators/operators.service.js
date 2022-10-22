const { query } = require("../../db/query")

const getOperator = async ( operatorId ) => {
    const text = `
        SELECT id
            , "firstName"
            , "lastName"
            , "createdAt"
        FROM operators
        WHERE id = $1;
    `;
    const [ operator ] = await query( text, [ operatorId ] );
    return operator;
};

const getOperatorSchedule = async ( operatorId ) => {
    const text = `
        SELECT title AS opTitle, name AS businessName, pay, startTime, endTime, addressLine1, addressLine2, city, state, zip
        FROM opportunities
        JOIN businesses
        ON opportunities.businessId = businesses.id
        WHERE opportunities.operatorId = $1
        ORDER BY startTime;
    `;
    const operatorSchedule  = await query( text, [ operatorId ] );
    return operatorSchedule;
};

const createOperator = async ( { firstName, lastName } ) => {
    const text = `
        INSERT INTO operators
        ( "firstName", "lastName" )
        VALUES ( $1, $2 )
    `;
    await query( text, [ firstName, lastName ] );
};

module.exports = {
    getOperator,
    getOperatorSchedule,
    createOperator
}