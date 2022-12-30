import * as React from 'react';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import HomePage from './pages/HomePage';
import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';
import Navigation from './components/Navigation';
import SentimentNeutralIcon from '@mui/icons-material/SentimentNeutral';
import './App.css';
import FetchJoke from './pages/FetchJoke';
import AddJoke from './pages/AddJoke';
import Grid from '@mui/material/Grid';


function App() {

  const [navState, setNavState] = React.useState(0);
  const [jokeToAdd, setJokeToAdd] = React.useState();

  return (
    <Container>
      <Router>
        <Grid container spacing={2} >
          <Grid item xs={12} >
            <Typography variant="h2" component="div">
            <SentimentNeutralIcon sx={{ fontSize: 42, verticalAlign: 'middle' }} /> simply deadpan
            </Typography>
          </Grid>
          <Grid item xs={12} position="sticky" >
            <Navigation navState={navState} setNavState={setNavState} />
          </Grid>
          <Grid item xs={12} >
              <Routes>
                <Route path="/simply-deadpan/" element={
                  <HomePage navState={navState} setNavState={setNavState} />}>
                </Route>
                <Route path="/simply-deadpan/add-joke" element={
                  <AddJoke setNavState={setNavState} jokeToAdd={jokeToAdd} />}>
                </Route>
                <Route path="/simply-deadpan/query-jokeapi" element={
                  <FetchJoke setNavState={setNavState} jokeToAdd={jokeToAdd} setJokeToAdd={setJokeToAdd} />}>
                </Route>
              </Routes>
          </Grid>
          <Grid item xs={12} >
            <Typography variant="h6" component="div">&copy; 2022 David Scott DiPerna</Typography>
          </Grid>
        </Grid>
      </Router>
    </Container>
  );
}

export default App;