import express from "express";
import cors from "cors";

const app = express();

app.use(cors());
app.use(express.json());

let usuarios = [];
let tweets = [];

app.post("/sign-up", (req, res) => {
  const { username, avatar } = req.body;

  if (!username || !avatar) {
    res.status(400).send("Todos os campos são obrigatórios!");
    return;
  }

  let usuario = {
    username,
    avatar,
  };

  usuarios.push(usuario);
  res.status(201).send("OK");
});

app.post("/tweets", (req, res) => {
  const { username, tweet } = req.body;

  if (!tweet || !username) {
    res.status(400).send("Todos os campos são obrigatórios!");
    return;
  }

  let publicacao = {
    username,
    avatar: usuarios[usuarios.length - 1].avatar,
    tweet,
  };

  tweets.push(publicacao);

  res.status(201).send("OK");
});

app.get("/tweets", (req, res) => {
  let tweetsRecentes;

  if (tweets.length < 11) {
    tweetsRecentes = tweets;
  } else {
    tweetsRecentes = tweets.slice(tweets.length - 10, tweets.length);
  }

  res.send(tweetsRecentes);
});

app.get("/tweets/:username", (req, res) => {
  const { username } = req.params;

  let tweetsFiltrados = tweets.filter((t) => t.username === username);

  res.send(tweetsFiltrados);
});

app.listen(5000, () => console.log("App online na porta 5000"));
