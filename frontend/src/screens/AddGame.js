import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';


export default function AddGame(props) {
  const [gameName, setGameName] = useState('');
  const [capacity,setCapacity] = useState(0);

  const [gameStatus, setGameStatus] = useState('');
 
  const submitHandler = (e) => {
    e.preventDefault();
    
    const games = {
      game: gameName,
      capacity: capacity,
    };
    axios.post("http://localhost:3001/api/games/add",{
      game: gameName,
      capacity: capacity,
    }).then((res) => 
      {
        setGameStatus(res.data);
    }
    );
  }
  return (
    <div>
    <Link to='/'>
      <h2>Back to home</h2>
    </Link>
    <form className="form" onSubmit={submitHandler}>
    <div>
      <h1>Add game</h1>
      <div>
        <label htmlFor="gameName">Game</label>{" "}
        <input type='text' id='gameName' onChange={(e) => setGameName(e.target.value)}></input>
      </div>
      <br></br>
      <div>
        <label htmlFor="capacity">Capacity</label>{" "}
        <input type='number' id='capcity' onChange={(e) => setCapacity(e.target.value)}></input>
      </div>
      <br></br>
      <button className="primary" type="submit">Submit</button>
      <br></br>
      {gameStatus}
    </div>
    </form>
    </div>
  );
}
