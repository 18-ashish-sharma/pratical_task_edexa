const express = require('express');
const app = express();
const mongoose = require('mongoose');
const { findOneAndUpdate } = require('./User');

const CustomerModel = require('./User')

const DATABASE = 'mongodb+srv://user:123@cluster0.ncxvo.mongodb.net/myFirstDatabase?retryWrites=true&w=majority'

// mongoDb Database connect

mongoose.connect(DATABASE, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
    useCreateIndex: true
}, (err) => {
    if (err) throw err
    console.log('MONGO DB DataBase Connected')
})


app.use(express.urlencoded({ extended: true }))
app.use(express.json())




// Create a new user # give email and pass here to verify

app.post('/user/:email/:password', async (req, res) => {
    const { email , password } = req.params

    const dataByEmail = await CustomerModel.findOne({email})

    if(dataByEmail.password == password && dataByEmail.designation == 'manager'){
        const { name, designation , email, password } = req.body
    
        const data = {
            name,
            designation,
            email,
            password
        }
        
        try {
    
            const newUserDoc = new CustomerModel(data)
    
            const savedUserDoc = await newUserDoc.save()
    
            res.send('DATA SAVED')
    
        } catch (error) {
            console.log(error)
            res.send(`Internal Error Occurred: ${error._message}`)
        }
    
    }

    else{
        res.send('Check password or You are not manager')
    }


})




// // Retrieve all user # give email and pass here to verify

app.get('/user/:email/:password', async (req, res) => {
    try{
        const { email , password } = req.params

        const dataByEmail = await CustomerModel.findOne({email})

        if(dataByEmail.password == password && dataByEmail.designation == 'manager'){
            const allData = await CustomerModel.find({})
            res.send(allData)
        }
        else{
            res.send('you r nt manager or check pasword')
        }
    }catch(error){
        res.send(`Internal Error Occurred : ${error._message} or Your designation is not HR`)
    }
})

// Retrieve a single user with user name # give email and pass here to verify

app.get('/user/:email/:password', async (req, res) => {
    
    const { email , password } = req.params

    const dataByEmail = await CustomerModel.findOne({email})

    if(dataByEmail.password == password && dataByEmail.designation == 'manager'){
        const name  = req.body.name
        const dataByName = await CustomerModel.findOne({name})
        res.send(dataByName)
    }
    else{
        res.send('You are not manager or check password')
    }
    
})

// Update a user with name # give email and pass here to verify
app.put('/user/:email/:password' , async (req, res) => {

    const { email , password , name } = req.params
    const changedto  = req.body.change
    const previous = req.body.prev
    const dataByEmail = await CustomerModel.findOne({email})

    if(dataByEmail.password == password && dataByEmail.designation == 'manager')
    
    {
        const data = CustomerModel.findOneAndUpdate({name : previous}, {$set:{name : changedto}}, {new: true}, (err, doc) => {
            if (err) {
                console.log("Something wrong when updating data!");
            }
        
            console.log(doc);
            res.send(doc)
        });
    }
    else{
        res.send('You are not manager or check password')
    }
    
})

// Delete a user with designation # giuve email pass to verify
app.delete('/user/:email/:password', async (req, res) => {
    const { email , password } = req.params
    const name  = req.body.name
    const dataByEmail = await CustomerModel.findOne({email})

    if(dataByEmail.password == password && dataByEmail.designation == 'manager' || dataByEmail.designation == 'HR'){
        CustomerModel.findOneAndRemove({name : name}, function(err) {
            if (err)
                res.send(err);
            else
                res.json({ message: 'Deleted!'});
        });
    }
    else{
        res.send('You are not manager or HR')
    }
    
})


app.listen(3000, function() {console.log('listening on 3000')})