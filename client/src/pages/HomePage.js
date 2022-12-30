import * as React from 'react';
import JokeList from '../components/JokeList';

function HomePage({ navState, setNavState }) {
    const [jokes, setJoke] = React.useState([]);

    const loadJokes = async () => {
        const response = await fetch('/jokes');
        const data = await response.json();
        setJoke(data);
        setNavState(navState);
    };

    React.useEffect(() => {
        loadJokes();
    }, []);

    return (
        <JokeList jokes={jokes} loadJokes={loadJokes} />
    );
}

export default HomePage;