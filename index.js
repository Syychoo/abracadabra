import express from 'express';

const app = express();
const PORT = process.env.PORT || 3000;
const __dirname = import.meta.dirname;
const usuarios = ["Juan", "Jocelyn", "Astrid", "Maria", "Ignacia", "Javier", "Brian"];

app.use(express.static(__dirname + "/assets"));

const existUserMiddleware = (req, res, next) => {
    const usuario = req.params.usuario
    const existe = usuarios.find(u => u.toLowerCase() === usuario.toLowerCase())
    if (existe) {
        next()
    }
    else {
        res.sendFile(__dirname + "/assets/who.jpeg")
    }
}

const randomNumber = (numero = 0) => {
    let nNumber = numero
    while (nNumber == numero) {
        nNumber = Math.floor(Math.random() * 4.0) + 1
    }
    return nNumber
}

let globalNumber = randomNumber()

const matchRandomNumberMiddleware = (req, res, next) => {
    const hatNumber = req.params.n
    if (hatNumber == globalNumber) {
        next()
    } else {
        res.sendFile(__dirname + "/assets/voldemort.jpg")
    }
}

app.get('/', (req, res) => {
    try {
        console.log(__dirname)
    } catch (error) {
        console.error(error)
    }
});

app.get('/abracadabra/usuarios', (req, res) => {
    try {
        res.json({
            usuarios: usuarios
        })
    } catch (error) {
        console.error(error)
    }
})

app.get('/abracadabra/juego/:usuario', existUserMiddleware, (req, res) => {
    try {
        return res.sendFile(__dirname + "/index.html")
    } catch (error) {
        console.error(error)
    }
})

app.get('/abracadabra/conejo/:n', matchRandomNumberMiddleware, (req, res) => {
    try {
        globalNumber = randomNumber(globalNumber)
        return res.sendFile(__dirname + "/assets/conejito.jpg")
    } catch (error) {
        console.error(error)
    }
})

app.get('/*', (req, res) => {
    try {
        return res.send("Esta página no existe 😥")
    } catch (error) {
        console.error(error)
    }
})

app.listen(PORT, () => {
    console.log(`El servidor esta levantado en http://localhost:${PORT}/`)
})

