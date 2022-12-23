import React, { useState } from 'react';
import RecommendIcon from '@mui/icons-material/Recommend';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';


function Counter({ joke, loadJokes }) {

    const category = joke.category;
    const setup = joke.setup;
    const delivery = joke.delivery;
    const safe = joke.safe;
    const [recs, setRecs] = useState(joke.recs);

    function incrementCounter() {
        setRecs(prevRecs => prevRecs + 1);
        storeRecs(recs);
    }

    const storeRecs = async () => {
        const increment = await fetch(`/jokes/${joke._id}`, {
            method: 'PUT',
            body: JSON.stringify({
                category: category, 
                setup: setup, 
                delivery: delivery, 
                safe: safe, 
                recs: recs}),
            headers: {'Content-Type': 'application/json'}
        });
        if(increment.status === 200){
            loadJokes();
        } else {
            alert(`Failed to edit exercise, status code = ${increment.status}`);
        };
    };

    return (
        <Box sx={{ width: '100%', maxWidth: 500 }} onClick={incrementCounter}>
            <Button size="medium">
                <RecommendIcon fontSize="medium" /> &nbsp;
                <Typography variant="button" gutterBottom>
                     {recs} VOTES
                </Typography>
            </Button>
        </Box>
    );
  }
  
  export default Counter;