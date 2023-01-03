import * as React from 'react';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';
import AddJoke from './AddJoke';

const FetchJoke = ({ setNavState, jokeToAdd, setJokeToAdd }) => {

    const [category, setCategory] = React.useState();
    const [setup, setSetup] = React.useState();
    const [delivery, setDelivery] = React.useState();
    const [safe, setSafe] = React.useState(); 
    const [showJoke, setShowJoke] = React.useState(false);
    const [showAddJoke, setShowAddJoke] = React.useState(false);

    const fetchJoke = async () => {
        await getData(
            'https://v2.jokeapi.dev/joke/Any?blacklistFlags=nsfw,religious,political,racist,sexist')
            .then(newJoke => {
                console.log(newJoke);
                setCategory(newJoke.category);
                setSetup(newJoke.setup);
                setDelivery(newJoke.delivery);
                setSafe(newJoke.safe);
                setShowJoke(true);
                setShowAddJoke(false);
            });
        
    };

    async function getData(url) {
        try {
            const response = await fetch(url);
            const joke = await response.text();
            const parsedJoke = JSON.parse(joke);
            return (parsedJoke);
        } catch (error) {
            console.error(error);
        };
    }; 

    function addJoke() {
        setShowAddJoke(true);
        setJokeToAdd({ category, setup, delivery, safe });
    };

    function cancelAddJoke() {
        setShowAddJoke(false);
    };
    
    return (

        <Grid container spacing={2} >
            <Grid item xs={12} sm={8} >
                <Typography sx={{ fontSize: 16 }} color="text.primary" gutterBottom>Here you can search for jokes from <a href="https://v2.jokeapi.dev/" rel="noopener noreferrer" target="_blank">JokeAPI</a>. 
                Click the <strong>FETCH A JOKE</strong> button below to retrieve a joke. 
                If you wish to save the joke to the Joke List, click <strong>ADD JOKE TO LIST</strong>.</Typography>
                
            </Grid>
            <Grid item xs={12} sm={10}>
                <Button variant="contained" onClick={fetchJoke} >Fetch a Joke</Button>
            </Grid>
            {showJoke && <Grid item xs={12} sm={4} >
                <Card sx={{ minWidth: 120 }} elevation={8} >
                    <CardContent>
                        <Typography sx={{ fontSize: 10 }} color="text.secondary" gutterBottom>{category}</Typography>
                        <Typography variant="h6" color="text.primary" gutterBottom>{setup}</Typography>
                        <Typography sx={{ fontSize: 16 }} color="text.primary" gutterBottom>{delivery}</Typography>
                    </CardContent>
                    <CardActions>
                        <Button variant="text" onClick={addJoke} >Add Joke to List</Button>
                    </CardActions>
                </Card>
            </Grid>}
            {showAddJoke && <Grid item xs={12} sm={8} >
                <Typography sx={{ fontSize: 16, fontWeight: 'bold' }} gutterBottom >You can edit the joke before clicking SAVE JOKE below to save it.</Typography>
                <p></p>
                <AddJoke jokeToAdd={jokeToAdd} setNavState={setNavState} />
                <Button variant="text" onClick={cancelAddJoke} >Cancel</Button>
                </Grid>
            }
        </Grid>
      );
};

export default FetchJoke;