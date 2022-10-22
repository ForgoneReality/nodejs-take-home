const express = require('express');
const { getLastInsertId } = require('../../db');
const { getOperator, getOperatorSchedule, createOperator } = require('./operators.service');

const operatorsRouter = express.Router();

operatorsRouter
    .get( 
        '/:operatorId'
        , async ( req, res ) => {
            const operatorId = req.params.operatorId;
            const operator = await getOperator( operatorId );

            return res
                .status( 200 )
                .json( operator )
        }
    )
    .get( 
        '/:operatorId/schedules'
        , async ( req, res ) => {
            const operatorId = req.params.operatorId;
            const operatorSchedule = await getOperatorSchedule( operatorId );

            return res
                .status( 200 )
                .json( operatorSchedule )
        }
    )
    .post( 
        '/'
        , async ( req, res ) => {
            await createOperator( {
                firstName: req.body.firstName
                , lastName: req.body.lastName
            } );

            const operatorId = await getLastInsertId();
            const createdOperator = await getOperator( operatorId );

            return res
                .status( 201 )
                .json( createdOperator )
        }
    );

module.exports = {
    operatorsRouter
}