import express from "express";
import mongoose from "mongoose";

import { songdetails } from "./data.js";

const app = express();
const port = 4000;
app.use(express.json());

<<<<<<< HEAD
mongoose.connect(
    "mongodb+srv://atharvanagmoti:<password>@machine-learner.rfrlve0.mongodb.net/Song?retryWrites=true&w=majority",
=======
mongoose
  .connect(
    "mongodb+srv://atharvanagmoti:<password>@machine-learner.rfrlve0.mongodb.net/Song?retryWrites=true&w=majority",
>>>>>>> 735cbb1345965d0b0d1c827a9634ec0714652d6e
    { useNewUrlParser: true, useUnifiedTopology: true }
  )
  .then(() => {
    console.log("DataBase Connected");
  });

const songSchema = new mongoose.Schema({
  Song: String,
  Film: String,
  Music_Director: String,
  Singer: String,
  Actor: String,
  Actress: String,
});

const Song = mongoose.model("Song", songSchema);

app.get("/", async (req, res) => {
  try {
    res.send("Server running on the port");
  } catch {
    return "Failure";
  }
});

app.get("/adddata", async (req, res) => {
    try{    
        const song = await Song.insertMany(songdetails);
        if (song){
            res.send("Data added")
        }
        else
        {
            res.send("Data not added")
        }
    }
    catch(err){
        res.send(err)
    }
})

app.get("/count", async (req, res) => {
    try{    
        const song = await Song.countDocuments();
        const songdet = await Song.find()
        res.send({Totalcount: song, songdet})
    }
    catch(err){
        res.send(err)
    }
})

app.get("/music_director", async (req, res) => {
    try{
            
        const song = await Song.find({Music_Director: "Pritam"});
        const songname =  song.map((songs) => songs.Song)
        res.send(songname)
    }
    catch(err){
        res.send(err)
    }
})

app.get("/musicdir_singer", async (req, res) => {
    try{    
        // const musicdirec = res.params.Music_Director
        // const singer = res.paramas.Singer
        const song = await Song.find({Music_Director: "Pritam", Singer: "Manas"});
        const songname =  song.map((songs) => songs.Song)
        console.log(songname)
        res.send(songname)
    }
    catch(err){
        res.send(err)
    }
})

app.get("/film_singer", async (req, res) => {
    try{    
        
        const song = await Song.find({Film: "Tamasha", Singer: "Adi"});
        console.log(song)
        const songname =  song.map((songs) => songs.Song)
        res.send(songname)
    }
    catch(err){
        res.send(err)
    }
})

app.get("/delete/:name", async (req, res) => 
{
    try{
        const{name} = req.params;
        const song = await Song.deleteOne({Song: name})
        if(song)
        {
            res.send("deleted")
        }
        else{
            res.send("Cannot delete")
        }
    }
    catch(err)
    {
        res.send(err)
    }
})

app.listen(port, () => {
  console.log(`server running on ${port}`);
});
