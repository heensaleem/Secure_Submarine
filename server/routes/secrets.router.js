const express = require('express');
const pool = require('../modules/pool');
const router = express.Router();
const { rejectUnauthenticated } = require('../modules/authentication-middleware');

router.get('/', (req, res) => {
    if (req.isAuthenticated() && req.isAuthenticated()) {
        console.log('req.user:', req.user);
    pool.query('SELECT * FROM "secret" WHERE "secrecy_level" <= $1;', [req.user.clearance_level])
        .then(results => res.send(results.rows))
        .catch(error => {
            console.log('Error making SELECT for secrets:', error);
            res.sendStatus(500);
        });
    }else {
        //not logged in! GET OUT
        res.sendStatus(403)
    }
    
});

module.exports = router;