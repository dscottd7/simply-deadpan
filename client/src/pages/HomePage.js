import React from 'react';
import JokeList from '../components/JokeList';
import { useState, useEffect } from 'react';

function HomePage({ navState, setNavState }) {
    const [jokes, setJoke] = useState([]);

    const loadJokes = async () => {
        const response = await fetch('/jokes');
        const data = await response.json();
        setJoke(data);
        setNavState(navState);
    };

    useEffect(() => {
        loadJokes();
    }, []);

    return (
        <JokeList jokes={jokes} loadJokes={loadJokes} />
    );
}

export default HomePage;