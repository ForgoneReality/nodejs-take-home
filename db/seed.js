const { query }  = require('./query');
const {getLastInsertId} = require('./lastInsertId')


const dropAll = async () => {
    await query(`DROP TABLE IF EXISTS opportunities;`)
    await query(`DROP TABLE IF EXISTS businesses;`)
    await query(`DROP TABLE IF EXISTS operators;`)
}

const createOperators = async () => {
    await query( 
        `
            CREATE TABLE IF NOT EXISTS operators (
                id INTEGER PRIMARY KEY NOT NULL
                , "firstName" TEXT
                , "lastName" TEXT NOT NULL
                , "createdAt" DATE DEFAULT CURRENT_TIMESTAMP
            );
        `
    );
}

const createBusinesses = async () => {
    await query(
        `
            CREATE TABLE IF NOT EXISTS businesses (
            id INTEGER PRIMARY KEY NOT NULL
            , "name" TEXT NOT NULL
            , "addressLine1" TEXT NOT NULL
            , "addressLine2" TEXT
            , "city" TEXT NOT NULL
            , "state" TEXT NOT NULL
            , "zip" INTEGER NOT NULL
            , "createdAt" DATE DEFAULT CURRENT_TIMESTAMP
        );
        `
    )
}


//created indices on both foreign keys of course, but also on startTime
//as I will be using startTime to sort the schedule by earliest start time
//which makes sense when looking at a schedule. indexing will help improve 
//the sorting
const createOpportunities = async () => {
    await query(
        `
            CREATE TABLE IF NOT EXISTS opportunities (
            id INTEGER PRIMARY KEY NOT NULL
            , "title" TEXT NOT NULL
            , "businessId" INTEGER NOT NULL
            , "operatorId" INTEGER NOT NULL
            , "pay" REAL NOT NULL
            , "startTime" DATE NOT NULL
            , "endTime" DATE NOT NULL
            , "createdAt" DATE DEFAULT CURRENT_TIMESTAMP
            , FOREIGN KEY (businessId) REFERENCES businesses(id)
            , FOREIGN KEY (operatorId) REFERENCES operators(id)
        );
            CREATE INDEX businessIndex ON opportunities(businessId);
            CREATE INDEX operatorIndex ON opportunities(operatorId);
            CREATE INDEX startTimeIndex ON opportunities(startTime);

        `
    )
}


//I use getLastInsertId here because I don't want to hard-code the ID based on assumptions i.e. that the first operator would start at id = 1
const seedAll = async () => {
    //seed some operators
    await query(`INSERT INTO operators ( "firstName", "lastName") VALUES ( $1, $2 )`, [ "Joseph", "Bernat" ] );
    const operator1_id = await getLastInsertId();
    await query(`INSERT INTO operators ( "firstName", "lastName") VALUES ( $1, $2 )`, [ "Charlie", "Xu"] );
    const operator2_id = await getLastInsertId();
    await query(`INSERT INTO operators ( "firstName", "lastName") VALUES ( $1, $2 )`, [ "Sandra", "Gupta" ] );
    const operator3_id = await getLastInsertId();
    await query(`INSERT INTO operators ( "firstName", "lastName") VALUES ( $1, $2 )`, [ "Dale", "Newman" ] );
    const operator4_id = await getLastInsertId();
    await query(`INSERT INTO operators ( "firstName", "lastName") VALUES ( $1, $2 )`, [ "Barrack", "Obama" ] );
    const operator5_id = await getLastInsertId();
    await query(`INSERT INTO operators ( "firstName", "lastName") VALUES ( $1, $2 )`, [ "Linda", "Aviere" ] );
    const operator6_id = await getLastInsertId();


    //seed some businesses
    await query(`INSERT INTO businesses ( "name", "addressLine1", "city", "state", "zip" ) VALUES ( $1, $2, $3, $4, $5 )`, [ "Veryable", "2019 N Lamar St", "Dallas", "TX", 75202 ] );
    const business1_id = await getLastInsertId();
    await query(`INSERT INTO businesses ( "name", "addressLine1", "city", "state", "zip" ) VALUES ( $1, $2, $3, $4, $5 )`, [ "Tesla", "3500 Deer Creek Rd", "Palo Alto", "CA", 94304 ] );
    const business2_id = await getLastInsertId();
    await query(`INSERT INTO businesses ( "name", "addressLine1", "city", "state", "zip" ) VALUES ( $1, $2, $3, $4, $5 )`, [ "Google", "1600 Amphitheatre Parkway", "Mountain View", "CA", 94105 ] );
    const business3_id = await getLastInsertId();
    await query(`INSERT INTO businesses ( "name", "addressLine1", "city", "state", "zip" ) VALUES ( $1, $2, $3, $4, $5 )`, [ "Yahoo!", "1199 Coleman Ave", "San Jose", "CA", 95110 ] );
    const business4_id = await getLastInsertId();
    await query(`INSERT INTO businesses ( "name", "addressLine1", "city", "state", "zip" ) VALUES ( $1, $2, $3, $4, $5 )`, [ "Amazon", "440 Terry Ave N", "Seattle", "WA", 98109 ] );
    const business5_id = await getLastInsertId();

    //seed some opportunities

    await query(`INSERT INTO opportunities ( "title", "businessId", "operatorId", "pay", "startTime", "endTime" ) VALUES ( $1, $2, $3, $4, $5, $6 )`, [ "Software Engineer", business1_id, operator1_id, 220.5, '2022-11-30 12:00:00', '2022-11-30 20:00:00'] );
    await query(`INSERT INTO opportunities ( "title", "businessId", "operatorId", "pay", "startTime", "endTime" ) VALUES ( $1, $2, $3, $4, $5, $6 )`, [ "Data Scientist", business3_id, operator1_id, 150.0, '2022-12-1 9:00:00', '2022-12-01 17:00:00'] );
    await query(`INSERT INTO opportunities ( "title", "businessId", "operatorId", "pay", "startTime", "endTime" ) VALUES ( $1, $2, $3, $4, $5, $6 )`, [ "CEO for the Day", business1_id, operator2_id, 3000.0, '2022-10-15 9:00:00', '2022-10-15 12:00:00'] );
    await query(`INSERT INTO opportunities ( "title", "businessId", "operatorId", "pay", "startTime", "endTime" ) VALUES ( $1, $2, $3, $4, $5, $6 )`, [ "Software Engineer", business5_id, operator2_id, 260.3, '2022-10-20 12:00:00', '2022-10-20 18:00:00'] );
    await query(`INSERT INTO opportunities ( "title", "businessId", "operatorId", "pay", "startTime", "endTime" ) VALUES ( $1, $2, $3, $4, $5, $6 )`, [ "Support Engineer", business5_id, operator2_id, 103.5, '2022-10-25 9:00:00', '2022-10-25 17:00:00'] );
    await query(`INSERT INTO opportunities ( "title", "businessId", "operatorId", "pay", "startTime", "endTime" ) VALUES ( $1, $2, $3, $4, $5, $6 )`, [ "DevOps Engineer", business4_id, operator3_id, 99.9, '2022-11-05 8:00:00', '2022-11-05 14:00:00'] );
    await query(`INSERT INTO opportunities ( "title", "businessId", "operatorId", "pay", "startTime", "endTime" ) VALUES ( $1, $2, $3, $4, $5, $6 )`, [ "DevOps Engineer", business2_id, operator4_id, 99.9, '2022-11-06 8:00:00', '2022-11-06 14:00:00'] );
    await query(`INSERT INTO opportunities ( "title", "businessId", "operatorId", "pay", "startTime", "endTime" ) VALUES ( $1, $2, $3, $4, $5, $6 )`, [ "Software Engineer", business3_id, operator5_id, 141.0, '2022-11-11 11:00:00', '2022-11-11 14:00:00'] );
    await query(`INSERT INTO opportunities ( "title", "businessId", "operatorId", "pay", "startTime", "endTime" ) VALUES ( $1, $2, $3, $4, $5, $6 )`, [ "Senior Software Engineer", business5_id, operator6_id, 999.0, '2022-11-12 8:00:00', '2022-11-12 14:00:00'] );

}

const seed = async () => {
    console.log( 'Seeding...' );

    //I decided to clear all tables on reseed so I don't make duplicate entries
    //everytime I run the program
    
    await dropAll();

    await createOperators();
    await createBusinesses();
    await createOpportunities();

    await seedAll();

    console.log( 'Seeding Completed.' );
}

module.exports = {
    seed
}