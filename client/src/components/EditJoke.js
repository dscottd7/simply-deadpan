import * as React from 'react';
import Box from '@mui/material/Box';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Grid from '@mui/material/Grid';
import { useNavigate } from 'react-router-dom';
import DeleteJoke from './DeleteJoke'


function EditJoke({ jokes, joke, loadJokes, setShowEditJoke }) {

    const [category, setCategory] = React.useState(joke.category);
    const [setup, setSetup] = React.useState(joke.setup);
    const [delivery, setDelivery] = React.useState(joke.delivery);
    const [safe, setSafe] = React.useState(joke.safe);
    const recs = joke.recs;

    const navigate = useNavigate();

    const editJoke = async () => {
        const response = await fetch(`/jokes/${joke._id}`, {
            method: 'PUT',
            body: JSON.stringify({
                category: category, 
                setup: setup, 
                delivery: delivery, 
                safe: safe, 
                recs: recs}),
            headers: {
                'Content-Type': 'application/json',
            },
        });
        if(response.status === 200){
            setShowEditJoke(false);
            loadJokes();
        } else {
            alert(`Failed to edit exercise, status code = ${response.status}`);
        }     
        navigate("/");
    };

    return (
        <Box sx={{ minWidth: 120 }}>
            <Grid container spacing={2} item xs={12} >
                <Grid item xs={12} >
                    <FormControl fullWidth>
                        <TextField
                        id="outlined-textarea"
                        label="Setup"
                        placeholder="Enter your joke's setup line"
                        multiline 
                        value={setup} 
                        onChange={e => setSetup(e.target.value)} 
                        />
                    </FormControl>
                </Grid>
                <Grid item xs={12} >
                    <FormControl fullWidth>
                        <TextField
                        id="outlined-textarea"
                        label="Punchline"
                        placeholder="Enter your joke's punchline"
                        multiline 
                        value={delivery} 
                        onChange={e => setDelivery(e.target.value)} 
                        />
                    </FormControl>
                </Grid>
                <Grid item xs={12} >
                    <FormControl fullWidth>
                        <InputLabel id="demo-simple-select-label">Category</InputLabel>
                        <Select
                            labelId="demo-simple-select-label"
                            id="demo-simple-select"
                            label="Category" 
                            value={category} 
                            onChange={e => setCategory(e.target.value)}>
                            <MenuItem value={"Christmas"}>Christmas</MenuItem>
                            <MenuItem value={"Dad"}>Dad</MenuItem>
                            <MenuItem value={"Dark"}>Dark</MenuItem>
                            <MenuItem value={"Misc"}>Misc</MenuItem>
                            <MenuItem value={"Pun"}>Pun</MenuItem>
                            <MenuItem value={"Programming"}>Programming</MenuItem>
                            <MenuItem value={"Spooky"}>Spooky</MenuItem>
                        </Select>
                    </FormControl>
                </Grid>
                <Grid item xs={12} >
                    <FormControl fullWidth>
                        <InputLabel id="demo-simple-select-label">Appropriateness</InputLabel>
                        <Select
                            labelId="demo-simple-select-label"
                            id="demo-simple-select"
                            label="Appropriateness" 
                            value={safe} 
                            onChange={e => setSafe(e.target.value)}>
                            <MenuItem value={true}>Safe for all audiences</MenuItem>
                            <MenuItem value={false}>Not safe for all audiences</MenuItem>
                        </Select>
                    </FormControl>
                </Grid>
                <Grid item xs={8} >
                    <Button variant="contained" onClick={editJoke} >Save</Button>
                </Grid>
                <Grid item xs={4} >
                    <DeleteJoke jokes={jokes} joke={joke} loadJokes={loadJokes} />
                </Grid>
            </Grid>
        </Box>
    );

};


export default EditJoke;