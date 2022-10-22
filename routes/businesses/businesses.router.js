const express = require('express');
const { getLastInsertId } = require('../../db');
const { getBusiness, createBusiness } = require('./businesses.service');

const businessesRouter = express.Router();

businessesRouter
    .post( 
        '/'
        , async ( req, res ) => {
            await createBusiness( {
                name: req.body.name,
                addressLine1: req.body.addressLine1,
                addressLine2: req.body.addressLine2,
                city: req.body.city,
                state: req.body.state,
                zip: req.body.zip
            } );

            const businessId = await getLastInsertId();
            const createdBusiness = await getBusiness( businessId );

            return res
                .status( 201 )
                .json( createdBusiness )
        }
    );

module.exports = {
    businessesRouter
}