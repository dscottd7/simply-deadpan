import * as React from 'react';
import Grid from '@mui/material/Grid';
import Joke from './Joke';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Counter from './Counter'

function JokeList({ jokes, loadJokes }) {
    const sortedJokes = jokes.sort((a, b) => (a.recs < b.recs) ? 1 : -1);
    return (
        <Grid container spacing={2} >
            {sortedJokes.map((joke, i) => 
                <Grid item xs={12} sm={6} md={3} key={i}>
                    <Card sx={{ minWidth: 120 }} elevation={8} >
                        <CardContent>
                            <Joke joke={joke} key={i} />
                        </CardContent>
                        <CardActions>
                            <Counter joke={joke} key={i} loadJokes={loadJokes} />
                        </CardActions>
                    </Card>
                    
                </Grid>
            )}
        </Grid>
    );
};

export default JokeList;
