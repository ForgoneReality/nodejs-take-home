const { query } = require("../../db/query")

const getOpportunity = async ( opportunitiesId ) => {
    const text = `
        SELECT *
        FROM opportunities
        WHERE id = $1;
    `;
    const [ opportunity ] = await query( text, [ opportunitiesId ] );
    return opportunity
}

const createOpportunities = async ( { title, businessId, operatorId, pay, startTime, endTime } ) => {
    const text = `
        INSERT INTO opportunities
        ( "title", "businessId", "operatorId", "pay", "startTime", "endTime" )
        VALUES ( $1, $2, $3, $4, $5, $6 )
    `;
    await query( text, [ title, businessId, operatorId, pay, startTime, endTime ] );
};

module.exports = {
    createOpportunities
    , getOpportunity

}