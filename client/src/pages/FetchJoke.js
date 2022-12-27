import * as React from 'react';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';
import { useNavigate } from 'react-router-dom';

const FetchJoke = ({ navState, setNavState }) => {

    const [category, setCategory] = React.useState();
    const [setup, setSetup] = React.useState();
    const [delivery, setDelivery] = React.useState();
    const [safe, setSafe] = React.useState(); 
    const [showJoke, setShowJoke] = React.useState(false);

    const navigate = useNavigate();

    const fetchJoke = async () => {
        const newJoke = await getData('https://v2.jokeapi.dev/joke/Pun?blacklistFlags=nsfw,religious,political,racist,sexist,explicit');
        console.log(newJoke);
        console.log(newJoke.safe);
        setCategory(newJoke.category);
        setSetup(newJoke.setup);
        setDelivery(newJoke.delivery);
        setSafe(newJoke.safe);
        setShowJoke(true);
    };

    const addJoke = async () => {
        const newJoke = { category, setup, delivery, safe };
        console.log(newJoke);
        const response = await fetch('/jokes', {
            method: 'POST',
            body: JSON.stringify(newJoke),
            headers: {
                'Content-Type': 'application/json',
            },
        });
        if(response.status === 201){
            alert("Successfully added the joke!");
            setNavState(0);
            navigate("/simply-deadpan/");
        } else {
            alert(`Failed to add joke, status code = ${response.status}`);
        };
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
        </Grid>
      );
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
} 

export default FetchJoke;