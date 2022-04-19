const express = require('express')
const userRoutes = require("./src/user/routes")

const app = express();
const port = 3001;

app.use(express.json())
app.get('/',(req, res)=>{
    res.send('Hello World')
});
app.use("/api/v1", userRoutes);

app.listen(port, ()=> console.log(`app listening on port ${port}`));