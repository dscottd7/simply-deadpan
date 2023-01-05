import * as React from 'react';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import Divider from '@mui/material/Divider';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Counter from '../components/Counter'
import EditJoke from '../components/EditJoke';
import Button from '@mui/material/Button';

function Joke({ jokes, joke, loadJokes }) {

  const [showEditJoke, setShowEditJoke] = React.useState(false);

  const onEdit = () => {
      setShowEditJoke(true);
  };

  return (
    <Box>
      {!showEditJoke && <Card sx={{ minWidth: 120 }} elevation={8} >
        <CardContent>
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
        </CardContent>
        <CardActions>
            <Counter joke={joke} loadJokes={loadJokes} />
            <Button variant="text" color="secondary" onClick={onEdit} >Edit</Button>
        </CardActions>
      </Card>}
      {showEditJoke && <Card sx={{ minWidth: 120 }} elevation={8} >
          <CardContent>
              <EditJoke jokes={jokes} joke={joke} loadJokes={loadJokes} setShowEditJoke={setShowEditJoke} />
          </CardContent>
      </Card>}
    </Box>
  );
};

export default Joke;
