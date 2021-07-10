import express from 'express';
import Game from '../models/gameModel.js';

const gameRouter = express.Router();

//get all games
gameRouter.route('/').get((req,res) => {
    Game.find()
    .then((game) => res.json(game))
    .catch((err) => res.status(400).json("Error:" + err));
});

//add game
gameRouter.route("/add").post((req, res) => {
  const game = req.body.game;
  const capacity = req.body.capacity;

  const newGame = new Game({
    game,
    capacity,
  });
  newGame
    .save()
    .then(() => {
      res.json("Game added");
    })
    .catch((err) => res.status(400).json("Error:" + err));
});

//get a single game
gameRouter.route("/:id").get((req, res) => {
  Game.findById(req.params.id)
    .then((game) => res.json(game))
    .catch((err) => res.status(400).json("Error:" + err));
});

//get a single game and delete it
gameRouter.route("/delete/:id").delete((req, res) => {
  Game.findByIdAndDelete(req.params.id)
    .then(() => res.json("Game deleted"))
    .catch((err) => res.status(400).json("Error:" + err));
});

export default gameRouter;