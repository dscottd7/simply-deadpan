import * as React from 'react';
import Grid from '@mui/material/Grid';
import Joke from '../components/Joke';


function HomePage({ navState, setNavState }) {

    const [jokes, setJoke] = React.useState([]);

    const loadJokes = async () => {
        const response = await fetch('/jokes');
        const data = await response.json();
        setJoke(data);
        setNavState(navState);
    };

    const sortedJokes = jokes.sort((a, b) => (a.recs < b.recs) ? 1 : -1);

    React.useEffect(() => {
        loadJokes();
    });

    return (
        <Grid container spacing={2} >
            {sortedJokes.map((joke, i) => 
                <Grid item xs={12} sm={6} md={3} key={i}>
                    <Joke jokes={jokes} joke={joke} loadJokes={loadJokes} key={i} />
                </Grid>
            )}
        </Grid>
    );
}

export default HomePage;