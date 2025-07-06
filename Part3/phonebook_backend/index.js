const express = require("express")
const morgan = require("morgan")
const cors = require("cors")
const app = express()
app.use(express.json())
app.use(cors())
morgan.token("data", (req, res) => {
    return JSON.stringify(req.body)
})
app.use(morgan((tokens, req, res) => {
    return [
    tokens.method(req, res),
    tokens.url(req, res),
    tokens.status(req, res),
    tokens.res(req, res, 'content-length'), '-',
    tokens['response-time'](req, res), 'ms',
    (tokens.method(req, res) === "POST" ? tokens.data(req, res) : null)
  ].join(' ')
}))

let persons = [
    { 
      "id": "1",
      "name": "Arto Hellas", 
      "number": "040-123456"
    },
    { 
      "id": "2",
      "name": "Ada Lovelace", 
      "number": "39-44-5323523"
    },
    { 
      "id": "3",
      "name": "Dan Abramov", 
      "number": "12-43-234345"
    },
    { 
      "id": "4",
      "name": "Mary Poppendieck", 
      "number": "39-23-6423122"
    }
]

app.get('/api/persons', (req, res) => {
    res.json(persons)
})

app.get('/info', (req, res) => {
    const now = new Date().toString()
    res.send(`
        <div>Phonebook has info for ${persons.length} people</div>
        <div>${now}</div>`)
})

app.get('/api/persons/:id', (req, res) => {
    const id = req.params.id
    const person = persons.find(p => p.id === id)
    if (person) {
        res.json(person)
    }
    else {
        res.status(404).end()
    }
})

app.delete('/api/persons/:id', (req, res) => {
    const id = req.params.id
    persons = persons.filter(p => p.id !== id)

    res.status(204).end()
})

const generateID = () => {
    return Math.floor(Math.random()*10000).toString()
}

app.post('/api/persons', (req, res) => {
    const body = req.body

    if (!body.name) {
        return res.status(400).json({
            error: "Name missing"
        })
    }

    if (!body.number) {
        return res.status(400).json({
            error: "Number missing"
        })
    }

    if (persons.find(p => p.name === body.name)) {
        return res.status(400).json({
            error: "Name must be unique"
        })
    }

    const person = {
        name: body.name,
        number: body.number,
        id: generateID(),
    }

    persons = persons.concat(person)

    res.json(person)
})

const PORT = 3001
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})