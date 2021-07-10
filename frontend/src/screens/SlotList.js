import React, { Component } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { useSelector } from 'react-redux';

const Slot = (props) => (
  <tr>
    <td>{props.slot.slotDate}</td>
    <td>{props.slot.email}</td>
    <td>{props.slot.game}</td>
    <td>{props.slot.slotTime}</td>
    <td>
      <a
        className="btn btn-danger"
        href="#"
        onClick={() => {
          props.deleteSlot(props.slot._id);
        }}
      >
        Delete
      </a>
    </td>
  </tr>
);

class SlotListclass extends Component {

  constructor(props) {
    super(props);
    this.deleteSlot = this.deleteSlot.bind(this);
    this.state = { slots: [] };
  }
  

  componentDidMount() {
    axios
      .get("http://localhost:3001/api/slots/list")
      .then((res) => {
        this.setState({ slots: res.data });
      })
      .catch((err) => console.log(err));
  }

  deleteSlot(id) {
    axios.delete("http://localhost:3001/api/slots/delete/" + id).then((res) => console.log(res.data));
    this.setState({
      slots: this.state.slots.filter((e) => e._id !== id),
    });
  }

  slotsList(userEmail) {
    
    return this.state.slots.filter(slot => slot.email === userEmail).map((currentslot) => {
      return (
        <Slot
          slot={currentslot}
          deleteSlot={this.deleteSlot}
          key={currentslot._id}
        />
      );
    });
  }

  render() {
    return (
      <div>
        <h3>Slot List here</h3>
        <table className="table">
          <thead className="thead-light">
            <tr>
              <th>Date</th>
              <th>Email</th>
              <th>Game</th>
              <th>Slot-time</th>
            </tr>
          </thead>
          <tbody>{this.slotsList(this.props.info.email)}</tbody>
        </table>
      </div>
    );
  }
}

export default function SlotList(){
   const userSignin = useSelector((state) => state.userSignin);
 const { userInfo } = userSignin;
  return(
    <div>
        <Link to='/'>
          <h2>Go to home</h2>
        </Link> 
        <SlotListclass info={userInfo} />
    </div>
  )
}