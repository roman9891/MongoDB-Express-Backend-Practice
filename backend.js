const mongoose = require('mongoose')
const express = require('express')

const app = express()
app.use(express.json()) // middleware the allows reading of req.body

// DB Connection
const DB = `mongodb+srv://roman9891:roman999@cluster0.wz5un.mongodb.net/backend-practice?retryWrites=true&w=majority`

mongoose.connect(DB, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useFindAndModify: false,
    useUnifiedTopology: true,
}).then(()=>{console.log('DB connected!')})

// Model
const textSchema = new mongoose.Schema({
    name: String,
    content: String
})

const Text = mongoose.model('Text', textSchema) // first argument is singular of desired collection

// Controller
const createResource = async (req,res) => {
    try {
        const newResource = await Text.create({...req.body})

        res.status(200).json({
            status: "success",
            data: {
                newResource
            }
        })
    } catch(err) {
        res.status(404).json({
            status: "failure"
        })
    }
}

const getResource = (req,res) => {
    
}

const patchResource = (req,res) => {
    
}

const deleteResource = (req,res) => {
    
}

const getAllResource = async (req,res) => {
    try {
        const Texts = await Text.find({...req.query})

        res.status(200).json({
            status: "success",
            data: {
                Texts
            }
        })
    } catch(err) {
        res.status(404).json({
            status: "failure"
        })
    }
}

// Routes
const router = express.Router()

router
    .route('/')
    .get(getAllResource)
    .post(createResource)

router
    .route('/:id')
    .get(getResource)
    .patch(patchResource)
    .delete(deleteResource)

app.use('/backend-practice', router)

// Server
app.listen(4000, ()=>{
    console.log('listening')
})