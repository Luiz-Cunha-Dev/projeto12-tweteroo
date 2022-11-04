import express from "express"
import cors from "cors"

const app = express();
app.use(cors());
app.use(express.json())


let usuarios = [];

let tweets = [];

app.post("/sign-up", (req, res) => {
    const {username, avatar} = req.body

    if(!username || !avatar){
        res.status(409).send("Preencha todos os campos para prosseguir!");
        return;
    }

    let usuario = {
        username,
        avatar
    }

    usuarios.push(usuario)
    res.send("OK")
});

app.get("/tweets", (req, res) => {

    let tweetsRecentes;

    if(tweets.length < 11){
        tweetsRecentes = tweets;
    }else{
        tweetsRecentes = tweets.slice(tweets.length-10, tweets.length);
    }
    

    res.send(tweetsRecentes);
});


app.post("/tweets", (req, res) => {
    const {username, tweet} = req.body;
    if(!tweet){
        res.status(409).send("Campo de tweet vazio");
        return;
    }else if(!username){
        res.status(409).send("Usuario não encontrado");
        return;
    }

    let publicacao = {
        username,
        avatar: usuarios[usuarios.length - 1].avatar,
        tweet
    }

    tweets.push(publicacao) 

    res.send("OK")
});

app.listen(5000, () => console.log(`App online na porta 5000`));