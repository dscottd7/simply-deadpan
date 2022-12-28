import * as React from 'react';
import RecommendIcon from '@mui/icons-material/Recommend';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';


function Counter({ joke, loadJokes }) {

    const incrementCounter = async () => {
        const newRecs = joke.recs + 1;
        const increment = await fetch(`/jokes/${joke._id}`, {
            method: 'PUT',
            body: JSON.stringify({
                category: joke.category, 
                setup: joke.setup, 
                delivery: joke.delivery, 
                safe: joke.safe, 
                recs: newRecs}),
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
                     {joke.recs} VOTES
                </Typography>
            </Button>
        </Box>
    );
  }
  
  export default Counter;