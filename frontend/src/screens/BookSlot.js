import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import axios from 'axios';
import DatePicker from 'react-date-picker';


export default function BookSlot(props) {
  const [value, onChange] = useState(new Date());
  const [slotNum,setSlotNum] = useState('9:00-9:30');
  const [gameName,setGameName] = useState('chess1');
  const [games, setGames] = useState([]);

  const [slotStatus, setSlotStatus] = useState('');

  const userSignin = useSelector((state) => state.userSignin);
 const { userInfo } = userSignin;

  const submitHandler = (e) => {
    e.preventDefault();
    const d = new Date();
    if(d.getDate()>value.getDate()){
      setSlotStatus("Select a slot from upcoming time");
      return;
    }
    console.log(( value.getDate() - d.getDate() ) );
    if( ( ( value.getDate() - d.getDate() ) ) >=10){
      setSlotStatus("You can only schedule a slot from next 10 days ");
      return;
    }
    const curr_hr = d.getHours();
    const curr_min = d.getMinutes();
    const slot_time = (slotNum.split("-")[0]).split(":");
    console.log(slot_time);
    if( (d.getDate()===value.getDate()) && ( parseInt(slot_time[0]) < curr_hr ) ){
       setSlotStatus("Select a slot from upcoming time");
    }
    else if( (d.getDate()===value.getDate()) && ( parseInt(slot_time[0]) === curr_hr ) && ( parseInt(slot_time[1]) < curr_min )){
      setSlotStatus("Select a slot from upcoming time");
    }
    else{
    const slotDate = value.getDate()+"/"+(value.getMonth()+1)+"/"+value.getFullYear();
    console.log(slotDate);
    const slot = {
      slotDate: slotDate,
      email: userInfo.email,
      game: gameName,
      slotTime: slotNum,
    };
    axios.post("http://localhost:3001/api/slots/add",{
      slotDate: slotDate,
      email: userInfo.email,
      game: gameName,
      slotTime: slotNum,
    }).then((res) => 
      {setSlotStatus(res.data.message)}
    );
  }
  }

   useEffect(() => {
    axios.get("http://localhost:3001/api/games").then((res) => {
      const result = res.data.map((cgame) => 
        cgame.game
      )
      setGames([...games, result]);
      console.log(games);
  }
    );
},[])
  return (
    <div>
    <Link to='/'>
      <h2>Back to home</h2>
    </Link>
    <form className="form" onSubmit={submitHandler}>
    <div>
      <h1>Book your slot</h1>
      <div>
      <label htmlFor="date">Date</label>{" "}
      <DatePicker
        onChange={onChange} id="date"
        value={value}
      />
      </div>
      <br></br>
      <div>
        <label htmlFor="gameName">Game</label>{" "}
        <select id="gameName" onChange={(e)=> setGameName(e.target.value)}>
          <option value="chess1">Chess 1</option>
          <option value="chess2">Chess 2</option>
          <option value="carrom1">Carrom 1</option>
          <option value="carrom2">Carrom 2</option>
        </select>
      </div>
      <br></br>
      <div>
        <label htmlFor="slotNum">Slot time</label>{" "}
        <select id="slotNum" onChange={(e) => setSlotNum(e.target.value)}>
          <option value="9:00-9:30">9:00-9:30</option>
          <option value="9:30-10:00">9:30-10:00</option>
          <option value="10:00-10:30">10:00-10:30</option>
          <option value="10:30-11:00">10:30-11:00</option>
          <option value="11:00-11:30">11:00-11:30</option>
          <option value="11:30-12:00">11:30-12:00</option>
          <option value="12:00-12:30">12:00-12:30</option>
          <option value="12:30-13:00">12:30-13:00</option>
          <option value="13:00-13:30">13:00-13:30</option>
        </select>
      </div>
      <br></br>
      <button className="primary" type="submit">Submit</button>
      <br></br>
      {slotStatus}
    </div>
    </form>
    </div>
  );
}
