import * as React from 'react';
import Box from '@mui/material/Box';
import Tab from '@mui/material/Tab';
import Tabs from '@mui/material/Tabs';
import { useNavigate } from 'react-router-dom';

function Navigation({ navState, setNavState }) {

  const [value, setValue] = React.useState(navState);

  const navigate = useNavigate();

  const handleChange = (event, newValue) => {
    setValue(newValue);
    setNavState(newValue);
    if (newValue === 0) {
      navigate("/simply-deadpan/");
    } else if (newValue === 1) {
      navigate("/simply-deadpan/add-joke");
    } else if (newValue === 2) {
      navigate("/simply-deadpan/query-jokeapi");
    };
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