require("dotenv").config()

const express = require("express")
const Person = require("./models/person")
const morgan = require("morgan")

const app = express()

app.use(express.json())
app.use(express.static('dist'))

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

app.get('/api/persons', (req, res) => {
    Person.find({}).then(result => {
        res.json(result)
    })
})

app.get('/info', (req, res) => {
    const now = new Date().toString()
    res.send(`
        <div>Phonebook has info for ${persons.length} people</div>
        <div>${now}</div>`)
})

app.get('/api/persons/:id', (req, res) => {
    Person.findById(req.params.id).then(result => {
        res.json(result)
    })
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

    // if (persons.find(p => p.name === body.name)) {
    //     return res.status(400).json({
    //         error: "Name must be unique"
    //     })
    // }

    person = new Person({
        name: body.name,
        number: body.number,
    })

    person.save().then(savedPerson => {
        res.json(savedPerson)
    })
})

const PORT = process.env.PORT
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})