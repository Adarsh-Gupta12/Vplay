import React, { Component } from "react";
import axios from "axios";

//functional component
const Game = (props) => (
  <tr>
    <td>{props.cgame.game}</td>
    <td>{props.cgame.capacity}</td>
    <td>
      <a
        className="btn btn-danger"
        href="#"
        onClick={() => {
          props.deleteGame(props.cgame._id);
        }}
      >
        Delete
      </a>
    </td>
  </tr>
);

export default class GamesList extends Component {
  constructor(props) {
    super(props);

    this.deleteGame = this.deleteGame.bind(this);

    this.state = { games: [] };
  }

  componentDidMount() {
    axios
      .get("http://localhost:3001/api/games")
      .then((res) => {
        this.setState({ games: res.data });
      })
      .catch((err) => console.log(err));
  }

  deleteGame(id) {
    axios.delete("http://localhost:3001/api/games/delete/" + id).then((res) => console.log(res.data));
    this.setState({
      games: this.state.games.filter((e) => e._id !== id),
    });
  }

  gamesList() {
    return this.state.games.map((currentgame) => {
      return (
        <Game
          cgame={currentgame}
          deleteGame={this.deleteGame}
          key={currentgame._id}
        />
      );
    });
  }

  render() {
    return (
      <div>
        <h3>Games List here</h3>
        <table className="table">
          <thead className="thead-light">
            <tr>
              <th>Name</th>
              <th>Capacity</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>{this.gamesList()}</tbody>
        </table>
      </div>
    );
  }
}