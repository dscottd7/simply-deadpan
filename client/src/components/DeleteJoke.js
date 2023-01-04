import * as React from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import RecommendIcon from '@mui/icons-material/Recommend';



function DeleteJoke({ jokes, joke, loadJokes }) {

    // const [jokeList, setJokeList] = React.useState(jokes);
    // setJokeList(jokes);

    const onDelete = async (_id) => {
        const response = await fetch(`/jokes/${_id}`, {method: 'DELETE'});
        if (response.status === 204) {
            const newJokeList = jokes.filter(e => e._id !== _id);
            alert("Successfully deleted the joke!");
            loadJokes();
        } else {
            console.error(`Failed to delete joke with _id = ${_id}, status code = ${response.status}`);
        }
    }

    return (
        <Box sx={{ width: '100%', maxWidth: 500 }} onClick={() => onDelete(joke._id)}>
            <Button size="medium">
                <RecommendIcon fontSize="medium" />
            </Button>
        </Box>
    );
};

export default DeleteJoke;