import express from 'express';
import { MongoClient } from 'mongodb'
import { ObjectId } from 'mongodb';
const app = express();
app.use(express.json());
const url = 'mongodb+srv://sarish:sari@movie.9orvgxr.mongodb.net/?retryWrites=true&w=majority&appName=movie';
const client = new MongoClient(url);
await client.connect();
console.log('Connected to MongoDB');
app.get('/', (req, res) => {
 res.send('Hello Movies!');
    }
);
app.post('/post',async(req,res)=>{
   const getPostman= req.body;
   const sendPostman= await client.db("CRUD").collection('data').insertOne(getPostman);
    res.send(sendPostman);
})
app.post('/postmany',async(req,res)=>{
  const getMany= req.body;
  const sendMethod= await client.db("CRUD").collection('data').insertMany(getMany);
   res.send(sendMethod);
})
app.get('/get',async(req,res)=>{
  const getMethod= await client.db("CRUD").collection('data').find({}).toArray();
  res.send(getMethod);
})
app.get('/getone/:id',async(req,res)=>{
  const {id}= req.params;
  const getMethod= await client.db("CRUD").collection('data').findOne({_id: new ObjectId(id)});
  res.send(getMethod);
})
app.put('/update/:id',async(req,res)=>
{
  const {id}= req.params;
  const getPostman =req.body; 
  const updatedMethod= await client.db("CRUD").collection('data').updateOne({_id: new ObjectId(id)},{$set:getPostman});
  res.send(updatedMethod);
})
app.delete('/delete/:id', async(req,res)=>
{
  const { id } = req.params;
  const result = await client.db("CRUD").collection('data').deleteOne({ _id: new ObjectId(id) });
  res.send(result);
})
app.listen(4000, () => {
  console.log('Movies backend listening on port 3000!');
});