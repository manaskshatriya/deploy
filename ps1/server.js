import express from "express";
import mongoose from "mongoose";

import { studentsData } from "./data.js";

const app = express();
const port = 4000;
app.use(express.json());

//Connect to mongo
mongoose.connect(
    "mongodb+srv://atharvanagmoti:<password>@machine-learner.rfrlve0.mongodb.net/Student?retryWrites=true&w=majority",
    { useNewUrlParser: true, useUnifiedTopology: true }
  )
  .then(() => {
    console.log("Connected to MongoDB");
  });

//Create and new structure for students in mongo
const studentSchema = new mongoose.Schema({
  Name: String,
  Roll_No: Number,
  WAD_Marks: Number,
  DSBDA_Marks: Number,
  CNS_Marks: Number,
  CC_Marks: Number,
  AI_marks: Number,
});

const Student = mongoose.model("Student", studentSchema);

app.get("/", async (req, res) => {
  try {
    res.send("Statement_1");
  } catch (err) {
    return "Failure";
  }
});

app.get("/addData", async (req, res) => {
  try {
    Student.insertMany(studentsData);
    // console.log(studentsData)
    res.send("Data added");
  } catch (err) {
    res.send(err);
  }
});

app.get("/getStudents", async (req, res) => {
  try {
    const totalCount = await Student.countDocuments();
    const students = await Student.find();
    const tableRows = students.map((student) => {
      return `
              <tr>
                <td>${student.Name}</td>
                <td>${student.Roll_No}</td>
                <td>${student.WAD_Marks}</td>
                <td>${student.DSBDA_Marks}</td>
                <td>${student.CNS_Marks}</td>
                <td>${student.CC_Marks}</td>
                <td>${student.AI_marks}</td>
              </tr>
            `;
    });

    const table = `
            <table>
              <thead>
                <tr>
                  <th>Name</th>
                  <th>RollNo</th>
                  <th>WAD</th>
                  <th>DSBDA</th>
                  <th>CNS</th>
                  <th>CC</th>
                  <th>AI</th>
                </tr>
              </thead>
              <tbody>
                ${tableRows.join("")}
              </tbody>
            </table>
          `;

    res.send(`Total Count: ${totalCount}<br><br>${table}`);
  } catch (err) {
    res.send(err);
  }
});

app.get("/dsbda", async (req, res) => {
  try {
    const students = await Student.find({ DSBDA_Marks: { $gt: 20 } });
    const studentNames = students.map((student) => student.Name);
    res.send(
      `Students who got more than 20 marks in DSBDA: ${studentNames.join(", ")}`
    );
  } catch (err) {
    res.send(err);
  }
});

app.put("/update", async (req, res) => {
  const { rollNo, wad, cc, dsbda, cns, ai } = req.body;
  try {
    const filter = { Roll_No: rollNo };
    const update = {
      $inc: {
        WAD_Marks: wad,
        CC_Marks: cc,
        DSBDA_Marks: dsbda,
        CNS_Marks: cns,
        AI_marks: ai,
      },
    };
    const updatedStudent = await Student.findOneAndUpdate(filter, update, {
      new: true,
    });
    if (updatedStudent) {
      res.send("Marks updated successfully");
    } else {
      res.send("Student not found");
    }
  } catch (err) {
    res.send(err);
  }
});

app.get("/allAbove25", async (req, res) => {
  try {
    const students = await Student.find({
      WAD_Marks: { $gt: 25 },
      CC_Marks: { $gt: 25 },
      DSBDA_Marks: { $gt: 25 },
      CNS_Marks: { $gt: 25 },
    });
    res.send(students);
  } catch (err) {
    res.send(err);
  }
});

app.get("/lowMathScience", async (req, res) => {
  try {
    const students = await Student.find({
      WAD_Marks: { $lt: 40 },
      CC_Marks: { $lt: 40 },
    });
    res.send(students);
  } catch (err) {
    res.send(err);
  }
});

app.delete("/delete/:rollNo", async (req, res) => {
  try {
    const rollNo = req.params.rollNo;
    const deleteStudent = await Student.deleteOne({ Roll_No: rollNo });
    if (deleteStudent) {
      res.send("Deleted");
    } else {
      res.send("Cannot delete");
    }
  } catch (err) {
    res.send(err);
  }
});

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
