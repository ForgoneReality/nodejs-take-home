const express = require('express');
const { getLastInsertId } = require('../../db');
const { getOpportunity, createOpportunities } = require('./opportunities.service');

const opportunitiesRouter = express.Router();

opportunitiesRouter
    .post( 
        '/'
        , async ( req, res ) => {
            await createOpportunities( {
                title: req.body.title,
                businessId: req.body.businessId,
                operatorId: req.body.operatorId,
                pay: req.body.pay,
                startTime: req.body.startTime,
                endTime: req.body.endTime
            } );

            const opportunitiesId = await getLastInsertId();
            const createdOpportunity = await getOpportunity( opportunitiesId );

            return res
                .status( 201 )
                .json( createdOpportunity )
        }
    );

module.exports = {
    opportunitiesRouter
}