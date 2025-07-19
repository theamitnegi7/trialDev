const{MongoClient,ObjectId}=require('mongodb');
const express=require("express");
const multer = require("multer");
const path = require("path");
const fs = require("fs");
const jwt = require("jsonwebtoken");
const app=express();
const cors=require("cors");
// app.use(express.urlencoded({extended:true}));
app.use(cors());
 app.use("/uploads", express.static("uploads"));
app.use(express.json());
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    const uploadPath = "uploads";
    if (!fs.existsSync(uploadPath)) fs.mkdirSync(uploadPath);
    cb(null, uploadPath);
  },
  filename: function (req, file, cb) {
    const ext = path.extname(file.originalname);
    const filename = `post_${Date.now()}${ext}`;
    cb(null, filename);
  }
});
const upload = multer({ storage: storage });

async function getFriends(email){
  try {

    const uri = 'mongodb://localhost:27017';
    const dbName = 'student';
    const client = new MongoClient(uri);

    await client.connect();
    const db = client.db(dbName);
    const userdataCollection = db.collection('userdata');
    const query = {
      status: 1,
      $or: [
        { semail: email },
        { remail: email }
      ]
    };

    const results = await userdataCollection.find(query).toArray();

    const friends = results.map(doc => {
      return doc.semail === email ? doc.remail : doc.semail;
    });
    return friends;
      
  } catch (error) {
      console.log(error);
  }

}


app.post("/signup",upload.single("profileImage"),async(req,res)=>{
    const { name, email, pass } = req.body;
    const profileImage = req.file ? req.file.path : null;
    console.log(name,email,pass)
    const uri = 'mongodb://localhost:27017';
    const dbName = 'student';
    const client = new MongoClient(uri);
    try {
        await client.connect();
        console.log("connection done");
        const db=client.db(dbName);
        const studentsCollection = db.collection('students');
        const newData = {
                name: name,
                email: email,
                pass: pass,
                profileImage: profileImage }
    
        const insertResult=await studentsCollection.insertOne(newData);
        console.log('Document Inserted:', insertResult.insertedId);
        if(insertResult){
            res.json({message:"Done..."});
            console.log("done");
        }
        
    } catch (error) {
        console.log(error);
    }
    
});
app.post("/update",upload.single("profileImage"),async(req,res)=>{
    const { name, token} = req.body;
    const profileImage = req.file ? req.file.path : null;
    const secretKey = "#$678!qwe9";

  try {
    const payload = jwt.verify(token, secretKey);
    const userEmail = payload.email;
    const uri = "mongodb://localhost:27017";
    const dbName = "student";
    const client = new MongoClient(uri);

    await client.connect();
    const db = client.db(dbName);
     const studentsCollection = db.collection('students');

     const newData = {
                name: name,
                profileImage: profileImage }

    const updateResult = await studentsCollection.updateOne({ email: userEmail },
    { $set: newData } );
    console.log("Updated",)
        if(updateResult){
            res.json({message:"Done..."});
            console.log("done");
        }
        
    } catch (error) {
        console.log(error);
    }
    
});



app.post("/login",async(req,res)=>{
    const {email, pass } = req.body;
    console.log(email,pass)
    const uri = 'mongodb://localhost:27017';
    const dbName = 'student';
    const client = new MongoClient(uri);
    try {
        await client.connect();
        console.log("connection done");
        const db=client.db(dbName);
        const studentsCollection = db.collection('students');
        const query = {
            email: email,
            pass: pass
          };
        const user = await studentsCollection.findOne(query);
        // console.log(user.name);
        if(!user){
            res.status(401).send('Invalid email or password');
        }else{
            const payLoad = { email: user.email, name: user.name};
            const secretKey = "#$678!qwe9";
            const options = { expiresIn: '3600s' };

            const token = jwt.sign(payLoad, secretKey, options);
            const data = { token: token };
            res.json(data);
            console.log(data);
        }
        // res.json(user);
    } catch (error) {
        console.log(error);
    }
    

});
app.post("/sendRequest",async(req,res)=>{
    const { remail, token } = req.body;
    const secretKey = "#$678!qwe9";
  
    try {
      const payload = jwt.verify(token, secretKey);
      const semail = payload.email;


      const uri = 'mongodb://localhost:27017';
      const dbName = 'student';
      const client = new MongoClient(uri);
  
      await client.connect();
      const db = client.db(dbName);
      const userdataCollection = db.collection('userdata');
  
      const newRequest = {
        semail: semail,
        remail: remail,
        status: 0,};
  
      const insertResult = await userdataCollection.insertOne(newRequest);
      console.log("Document Inserted:", insertResult.insertedId);
  
      res.json({ message: "Friend request sent" });
        
    } catch (error) {
        console.log(error);
    }
    
});
app.post("/acceptRequest", async (req, res) => {
    const {id} = req.body;
    console.log(id);
    
  
    try {
      
      const uri = 'mongodb://localhost:27017';
      const dbName = 'student';
      const client = new MongoClient(uri);
  
      await client.connect();
      const db = client.db(dbName);
      const userdataCollection = db.collection('userdata');
  
      const filter = { _id: new ObjectId(id) };
      const update = { $set: { status: 1 } };
  
      const updateResult = await userdataCollection.updateOne(filter, update);
  
      if (updateResult.modifiedCount === 1) {
        res.json({ message: "accepted" });
      } else {
        res.status(404).json({ message: "not found" });
      }
  
    } catch (error) {
      console.error("Error:", error);
      res.json({ error: "Invalid token or update failed" });
    }
  });
  app.post("/rejectRequest", async (req, res) => {
    const {id} = req.body;
    console.log(id);
   
  
    try {
      const uri = 'mongodb://localhost:27017';
      const dbName = 'student';
      const client = new MongoClient(uri);
  
      await client.connect();
      const db = client.db(dbName);
      const userdataCollection = db.collection('userdata');
  
      const filter = { _id: new ObjectId(id) };
      const update = { $set: { status: 2 } };
  
      const updateResult = await userdataCollection.updateOne(filter, update);
  
      if (updateResult.modifiedCount === 1) {
        res.json({ message: "Rejected" });
      } else {
        res.json({ message: "not found" });
      }
  
    } catch (error) {
      console.error("Error:", error);
      res.json({ error: "Invalid token or update failed" });
    }
  });
app.post("/allFriends",async(req,res)=>{
    const { token } = req.body;
    const secretKey = "#$678!qwe9";
    try {
      const payload = jwt.verify(token, secretKey);
      const userEmail = payload.email;
      console.log("Email from token:", userEmail);
  
      const uri = 'mongodb://localhost:27017';
      const dbName = 'student';
      const client = new MongoClient(uri);
  
      await client.connect();
      const db = client.db(dbName);
      const userdataCollection = db.collection('userdata');
      const query = {status: 0,remail: userEmail};
      const skip = (page -1)*limit;
  
      const results = await userdataCollection.find(query).skip(skip).limit(limit).toArray();
      const total = await userdataCollection.countDocuments(query);
      res.json({results,total});
      console.log("Friends list:",{ results,total});
        
    } catch (error) {
        console.log(error);
    }
    // const payload = jwt.verify(token, secretKey);
    // const userEmail = payload.email;
    // let friends = await getFriends(userEmail);
    // res.json(friends);
    // console.log(friends);
  
    
});
app.post("/pendingFriends",async(req,res)=>{
    const { token ,page=1,limit=3} = req.body;
    const secretKey = "#$678!qwe9";
  
    try {
      const payload = jwt.verify(token, secretKey);
      const userEmail = payload.email;
      console.log("Email from token:", userEmail);
  
      const uri = 'mongodb://localhost:27017';
      const dbName = 'student';
      const client = new MongoClient(uri);
  
      await client.connect();
      const db = client.db(dbName);
      const userdataCollection = db.collection('userdata');
      const query = {status: 0,remail: userEmail};
      const skip = (page -1)*limit;
  
      const results = await userdataCollection.find(query).skip(skip).limit(limit).toArray();
      const total = await userdataCollection.countDocuments(query);
      res.json({results,total});
      console.log("Friends list:",{ results,total});
        
    } catch (error) {
        console.log(error);
    }
});
app.post("/postSave", upload.single("postImage"), async (req, res) => {
  const { caption, token } = req.body;
  const secretKey = "#$678!qwe9";

  try {
    const payload = jwt.verify(token, secretKey);
    const userEmail = payload.email;

    const imagePath = req.file ? req.file.path : null;

    const uri = "mongodb://localhost:27017";
    const dbName = "student";
    const client = new MongoClient(uri);

    await client.connect();
    const db = client.db(dbName);
    const postCollection = db.collection("post");

    const newPost = {
      semail: userEmail,
      post: imagePath,
      caption: caption,
    };

    const insertResult = await postCollection.insertOne(newPost);
    console.log("Document Inserted:", insertResult.insertedId);

    res.json({ message: "New Post Done!!!!" });
  } catch (error) {
    console.error("Error saving post:", error);
  }
});
app.post("/fetchPost",async(req,res)=>{
  const { token ,page=1,limit=5} = req.body;
  const secretKey = "#$678!qwe9";
  try {
    const payload = jwt.verify(token, secretKey);
    const userEmail = payload.email;
    let friends = await getFriends(userEmail);
    const all = [userEmail, ...friends];

    const uri = "mongodb://localhost:27017";
    const dbName = "student";
    const client = new MongoClient(uri);

    await client.connect();
    const db = client.db(dbName);
    const postCollection = db.collection("post");
    const skip=(page-1)*limit;

    const posts = await postCollection.find({ semail: { $in: all } }).sort({ _id:-1 }).skip(skip).limit(limit).toArray();
    const total = await postCollection.countDocuments({ semail:{ $in: all }});
    res.json({posts,total});
    console.log(posts,total);


    
  } catch (error) {
    console.error(error);
  }


});
app.post("/profile",async(req,res)=>{
    const { token } = req.body;
    const secretKey = "#$678!qwe9";
    const payload = jwt.verify(token, secretKey);
    const userEmail = payload.email;
    const uri = 'mongodb://localhost:27017';
    const dbName = 'student';
    const client = new MongoClient(uri);
    try {
      await client.connect();
      const db = client.db(dbName);
      const studentsCollection = db.collection('students');

      const profile = await studentsCollection.findOne(
        { email: userEmail },
        { projection: { pass: 0 } })

      if (!profile) return res.json({ message: "Profile not found" });

    res.json(profile);
    console.log(profile);
      
    } catch (error) {
      console.error("Error fetching profile:", error);
      res.status(500).json({ message: "Error fetching profile" });
      
    }


});
app.get('/test', (req, res) => {
  res.sendFile(path.join(__dirname, 'login/uploads/post_1747678464679.jpeg'));
});

app.listen(8000);