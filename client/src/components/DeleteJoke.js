import * as React from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';


function DeleteJoke({ jokes, joke, loadJokes }) {

    const onDelete = async (_id) => {
        const response = await fetch(`/jokes/${_id}`, {method: 'DELETE'});
        if (response.status === 204) {
            // const newJokeList = jokes.filter(e => e._id !== _id);
            loadJokes();
        } else {
            console.error(`Failed to delete joke with _id = ${_id}, status code = ${response.status}`);
        }
    }

    return (
        <Box onClick={() => onDelete(joke._id)}>
            <Button variant="text" color="secondary" size="small" >
                Delete
            </Button>
        </Box>
    );
};

export default DeleteJoke;