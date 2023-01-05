import * as React from 'react';
import Grid from '@mui/material/Grid';
import Joke from './Joke';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Counter from './Counter'
import DeleteJoke from './DeleteJoke'
import EditJoke from './EditJoke';
import Button from '@mui/material/Button';

function JokeList({ jokes, loadJokes }) {
    
    const sortedJokes = jokes.sort((a, b) => (a.recs < b.recs) ? 1 : -1);

    const [showEditJoke, setShowEditJoke] = React.useState(false);

    const onEdit = () => {
        setShowEditJoke(true);
    };

    return (
        <Grid container spacing={2} >
            {sortedJokes.map((joke, i) => 
                <Grid item xs={12} sm={6} md={3} key={i}>
                    {!showEditJoke && <Card sx={{ minWidth: 120 }} elevation={8} >
                        <CardContent>
                            <Joke joke={joke} key={i} />
                        </CardContent>
                        <CardActions>
                            <Counter joke={joke} loadJokes={loadJokes} />
                            <Button variant="outlined" color="secondary" onClick={onEdit} >Edit Joke</Button>
                        </CardActions>
                    </Card>}
                    {showEditJoke && <Card sx={{ minWidth: 120 }} elevation={8} >
                        <CardContent>
                            <EditJoke joke={joke} loadJokes={loadJokes} />
                        </CardContent>
                        <CardActions>
                            <DeleteJoke jokes={jokes} joke={joke} loadJokes={loadJokes} />
                        </CardActions>
                    </Card>}
                    
                </Grid>
            )}
        </Grid>
    );
};

export default JokeList;
