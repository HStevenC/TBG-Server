const express = require("express");
const app = express();
const cors = require("cors");


//middleware
app.use(cors());
app.use(express.json());

//routes
app.use("/chat", require("./routes/chat_routes"));

app.use("/auth", require("./routes/jwtAuth_routes"));

app.use("/dashboard", require("./routes/dashboard_routes"));
app.use("/", require("./routes/dashboard_routes"));

app.listen(5000, () => {
    console.log("server has started on port 5000")
});