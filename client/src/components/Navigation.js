import * as React from 'react';
import Box from '@mui/material/Box';
import Tab from '@mui/material/Tab';
import Tabs from '@mui/material/Tabs';
import { useNavigate } from 'react-router-dom';

function Navigation() {

  const [value, setValue] = React.useState(0);

  const navigate = useNavigate();

  const handleChange = (event, newValue) => {
    if (newValue === 0) {
      navigate("/");
    } else if (newValue === 1) {
      navigate("/add-joke");
    } else if (newValue === 2) {
      navigate("/query-jokeapi");
    };
    setValue(newValue);
  };

  return (
    <Box sx={{ width: '100%' }}>
      <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
        <Tabs value={value} onChange={handleChange} >
            <Tab label="Joke List" value={0} />
            <Tab label="Add Your Joke" value={1} />
            <Tab label="Query JokeAPI" value={2} />
        </Tabs>
      </Box>
    </Box>
  );
};

export default Navigation;