const express = require("express")
const app = express()
const morgan = require("morgan")
const PORT = 3000;
app.use(morgan("dev"))
app.set("views", "./src/views")
app.set("view engine", "ejs")
app.use(express.urlencoded({ extended: true }));


const messages = [
    {
      text: "Hi there!",
      user: "Amando",
      added: new Date()
    },
    {
      text: "Hello World!",
      user: "Charles",
      added: new Date()
    }
  ];

app.get("/", (req, res) => {
    res.render("index", { title: "Mini Messageboard", messages: messages })
})

app.get("/new", (req, res) => {
    res.render("new", { title: "Add a New Message" })
})

app.post("/new", (req, res) => {
    const user = req.body.user;
    const text = req.body.text;
    messages.push({ text: text, user: user, added: new Date() });
    res.redirect("/");
})

app.get("/message/:id", (req, res) => {
    const id = parseInt(req.params.id, 10);
    const message = messages[id];

    if (!message) {
        return res.status(404).send("Message not found");
    }

    res.render("message", { title: "Message Details", message });
});

app.listen(PORT, () => {
    console.log(`Listening on port ${PORT}`);
})