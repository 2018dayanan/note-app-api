// Express Initialization
const express = require("express");
const app = express();
const Note = require('./models/Note')
// Mongoose
const mongoose = require('mongoose');

// parser
const bodyparser = require('body-parser');
app.use(bodyparser.urlencoded({ extended: false }));
app.use(bodyparser.json());

mongoose.connect("mongodb+srv://Dayananchy2023:1122334455@cluster0.agyoqso.mongodb.net/?retryWrites=true&w=majority").then(function () {

    app.get("/", function (req, res) {
        const response = {message: "Api works!"};
        res.json(response);
    })

    app.post("/notes/list/", async function (req, res) {
        var notes = await Note.find({ userId: req.body.userId });
        res.json(notes);
    })

    app.post("/notes/add", async function (req, res) {

        await Note.deleteOne({ id: req.body.id });

        var newNote = new Note({
            id: req.body.id,
            userId: req.body.userId,
            title: req.body.title,
            content: req.body.content
        })
        await newNote.save();
        const response = { message: "New Note Create!" + `id: ${req.body.id}` };

        res.json(response);
        // res.json(req.body);
    })

    // Delete
    app.post("/notes/delete", async function (req, res) {
        await Note.deleteOne({ id: req.body.id });
        const response = { message: "Note Deleted!" + `id: ${req.body.id}` };

        res.json(response);
    })
});





const PORT = process.env.PORT || 5000;
app.listen(5000, function () {
    console.log("Server started at port: 5000");
});
