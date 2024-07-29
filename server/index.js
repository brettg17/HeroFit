const express = require("express")
const app = express();
const cors = require("cors")
const pool = require("./db")

// import routes
const homeRoute = require("./routes/homeRoute");
const loginRoute = require("./routes/loginRoute");
const signupRoute = require("./routes/signupRoute");
const classesRoute = require("./routes/classesRoute"); 


//middleware
app.use(cors());
app.use(express.json())

//ROUTES
app.use("/api/home", homeRoute);
app.use("/api/auth", loginRoute);
app.use("/api/auth", signupRoute);
app.use("/api", classesRoute);


app.listen(5000, () => {
  console.log("server has started on 5000")
});
