
const cors = require('cors')
const express = require("express");
const app = express();
app.use(cors())

const PORT = process.env.PORT || 3001

const notes = [
    {
      id: 1,
      content: 'HTML is easy',
      important: true
    },
    {
      id: 2,
      content: 'Browser can execute only JavaScript',
      important: false
    },
    {
      id: 3,
      content: 'GET and POST are the most important methods of HTTP protocol',
      important: true
    }
  ]

  
  app.get("/api", function (req, res) {
    const time = Date()
    res.send(`There is ${notes.length} notes <br/>${time}`)
    });
    

    
app.get("/api/notes", function (req, res) {
  res.json(notes)
});

    
app.get("/api/notes/:id", function (req, res) {
  const id = Number(req.params.id);
  const note = notes.find((note) => note.id === id);
  if(note){
    res.json(note)
  }else{
    res.status(404).end()
  }
});

app.post("/api/notes/:id", function (req, res) {

  const body = req.body
  console.log(body)
  if (!body) {
    return res.status(400).json({
      error: 'content missing'
    })
  }

  const note = {
    content: body.content,
    important: body.important || false,
    id: generateId(),
  }

  notes = notes.concat(note)

  res.json(note)
})

app.delete("/api/notes/:id", function (req, res) {
  const id = Number(req.params.id);
  const note = notes.find((note) => note.id === id);
  console.log(note)

  note ? res.status(200).end() :res.status(400).end()

})




app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})