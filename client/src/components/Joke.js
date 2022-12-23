import * as React from 'react';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import Divider from '@mui/material/Divider';

function Joke({ joke }) {
    return (
      <Box>
        <Typography sx={{ fontSize: 10 }} color="text.secondary" gutterBottom>
          {joke.category}
        </Typography>
        <Typography sx={{ fontSize: 20, fontWeight: 'bold' }} color="text.primary" gutterBottom>
          {joke.setup}
        </Typography>
        <Typography sx={{ fontSize: 16 }} color="text.primary" gutterBottom>
          {joke.delivery}
        </Typography>

        <Divider light sx={{ mt: 3 }} />
      </Box>
    );
};

export default Joke;
