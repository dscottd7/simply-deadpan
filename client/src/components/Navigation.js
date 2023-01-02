import * as React from 'react';
import Box from '@mui/material/Box';
import Tab from '@mui/material/Tab';
import Tabs from '@mui/material/Tabs';
import useMediaQuery from '@mui/material/useMediaQuery';
import { useNavigate } from 'react-router-dom';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';

function Navigation({ navState, setNavState }) {

  let value = navState;

  const navigate = useNavigate();

  const [mobileToggle, setMobleToggle] = React.useState(false);
  const matches = useMediaQuery('(min-width:425px)');
  React.useEffect(() => {
    setMobleToggle(matches);
  }, []);
  

  const handleChange = (event, newValue) => {
    if (matches) {
      setNavState(newValue);
    } else {
      setNavState(event.target.value);
      newValue = event.target.value
    };
    if (newValue === 0) {
      navigate("/");
    } else if (newValue === 1) {
      navigate("/add-joke");
    } else if (newValue === 2) {
      navigate("/query-jokeapi");
    };
  };

  return (
    <Box sx={{ width: '100%' }}>
      {mobileToggle && <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
        <Tabs value={value} onChange={handleChange} >
            <Tab label="Joke List" value={0} />
            <Tab label="Add Your Joke" value={1} />
            <Tab label="Query JokeAPI" value={2} />
        </Tabs>
      </Box>}
      {!mobileToggle && <Box sx={{ minWidth: 120 }}>
        <FormControl fullWidth>
          <InputLabel >Menu</InputLabel>
          <Select
            value={value}
            label="Menu"
            onChange={handleChange}
          >
            <MenuItem value={0}>Joke List</MenuItem>
            <MenuItem value={1}>Add Your Joke</MenuItem>
            <MenuItem value={2}>Query JokeAPI</MenuItem>
          </Select>
        </FormControl>
      </Box>}
    </Box>
  );
};

export default Navigation;