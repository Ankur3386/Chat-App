import app from "./app";
app.listen(process.env.PORT,(req,res)=>{

res.send(`app listening on port ${PORT}`)
})
