import express from "express"
import cors from "cors"

const app = express();
app.use(cors());

let tweets = [
    {
        username: "bobesponja",
            avatar: "https://super.abril.com.br/wp-content/uploads/2020/09/04-09_gato_SITE.jpg?quality=70&strip=info",
          tweet: "eu amo o hub"
    }
]


app.get("/tweets", (req, res) => {

    res.send(tweets)
})

app.post("/sign-up", (req, res) => {

    res.send("OK")
})

app.listen(5000, () => console.log(`App online na porta 5000`));