import 'dotenv/config';
import * as jokes from './model.mjs';
import express from 'express';

const PORT = process.env.PORT || 3000;

const app = express();

app.use(express.json());

/* Input validatation function */
const isValidInput = (requestBody) => {
    if (requestBody.category === undefined || requestBody.category === '') {
        return { Error: 'Request failed: category is required' };
    } else if (typeof requestBody.category !== "string") {
        return { Error: 'Request failed: category must be a string' };
    } else if (requestBody.setup === undefined || requestBody.setup === '') {
        return { Error: 'Request failed: setup is required' };
    } else if (typeof requestBody.setup !== "string") {
        return { Error: 'Request failed: setup must be a string' };
    } else if (requestBody.delivery === undefined || requestBody.delivery === '') {
        return { Error: 'Request failed: delivery is required' };
    } else if (typeof requestBody.delivery !== "string") {
        return { Error: 'Request failed: delivery must be a string' };
    } else if (requestBody.safe === undefined || requestBody.safe === 'none') {
        return { Error: 'Request failed: safe is required' };
    } else if ((requestBody.safe !== true) && (requestBody.safe !== false)) {
        return { Error: 'Request failed: safe must be a boolean value' };
    } else {
        return true;
    };
};

/* Create using POST /jokes */
app.post('/jokes', (req, res) => {
   const validation = isValidInput(req.body);
    if (validation !== true) {
        res.status(400).json(validation);
    } else {
        jokes.createJoke(
            req.body.category, 
            req.body.setup, 
            req.body.delivery, 
            req.body.safe,
            0
            )
            .then(joke => {
                res.status(201).json(joke);
            })
            .catch(error => {
                console.error(error);
                res.status(400).json({ Error: 'Request failed' });
            });
    };
});

/* Read using GET /jokes */
 app.get('/jokes', (req, res) => {
    jokes.findJokes()
        .then(joke => {
            res.status(200).json(joke);
        })
        .catch(error => {
            console.error(error);
            res.status(400).json({ Error: 'Request failed' });
        });

});

/* Get using GET /jokes/:_id */
 app.get('/jokes/:_id', (req, res) => {
    jokes.findJokeById(req.params._id)
        .then(joke => { 
            if (joke !== null) {
                res.json(joke);
            } else {
                res.status(404).json({ Error: 'Not found' });
            }         
         })
        .catch(error => {
            res.status(400).json({ Error: 'Request failed' });
        });

});

/* Increment recommends using PUT /jokes/:_id */
 app.put('/jokes/:_id', (req, res) => {
    jokes.incrementJoke(
        req.params._id,
        req.body.category, 
        req.body.setup, 
        req.body.delivery, 
        req.body.safe,
        req.body.recs
        )
        .then(numUpdated => {
            if (numUpdated === 1) {
                res.json({ 
                    _id: req.params._id, 
                    category: req.body.category, 
                    setup: req.body.setup, 
                    delivery: req.body.delivery, 
                    safe: req.body.safe,
                    recs: req.body.recs
                })
            } else {
                res.status(404).json({ Error: 'Not found' });
            }
        })
        .catch(error => {
            console.error(error);
            res.status(400).json({ Error: 'Request failed' });
        });
});

/* Delete using DELETE /jokes/:_id */
 app.delete('/jokes/:_id', (req, res) => {
    jokes.deleteById(req.params._id)
        .then(deletedCount => {
            if (deletedCount === 1) {
                res.status(204).send();
            } else {
                res.status(404).json({ Error: 'Resource not found' });
            }
        })
        .catch(error => {
            console.error(error);
            res.status(400).json({ Error: 'Request failed' });
        });
});

app.listen(PORT, () => {
    console.log(`Server listening on port ${PORT}...`);
});