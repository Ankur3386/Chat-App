import app from "./app";
import connectdb from "./db";


connectdb();
app.listen(process.env.PORT,(req,res)=>{

res.send(`app listening on port ${PORT}`)
})
