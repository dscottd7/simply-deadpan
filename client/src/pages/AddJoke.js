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

const AddJoke = ({ setNavState, jokeToAdd }) => {

    const [category, setCategory] = React.useState('');
    const [setup, setSetup] = React.useState('');
    const [delivery, setDelivery] = React.useState('');
    const [safe, setSafe] = React.useState('');
    
    const navigate = useNavigate();

    const addJoke = async () => {
        const newJoke = { category, setup, delivery, safe };
        const response = await fetch('/jokes', {
            method: 'POST',
            body: JSON.stringify(newJoke),
            headers: {
                'Content-Type': 'application/json',
            },
        });
        if(response.status === 201){
            setNavState(0);
            navigate("/");
        } else {
            alert(`Failed to add joke, status code = ${response.status}`);
        };
    };

    return (
        <Box sx={{ minWidth: 120 }}>
            <Grid container spacing={2} item xs={12} sm={6} >
                <Grid item xs={12} sm={12} >
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
                <Grid item xs={12} sm={12} >
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
                <Grid item xs={12} sm={12} >
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
                <Grid item xs={12} sm={12} >
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
                <Grid item xs={12} sm={12} >
                    <Button variant="contained" onClick={addJoke} >Save Joke</Button>
                </Grid>
            </Grid>
        </Box>
    );
};

export default AddJoke;