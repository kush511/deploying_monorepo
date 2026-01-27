import { prisma }from "db/client";
import express from "express";


const app = express();

app.use(express.json());
interface User{
    username:string,
    password:string,
    id:string
}
app.get("/users",async (req, res) => {
await prisma.user.findMany()
    .then((users: User[]) => {
        res.json(users);
    })
    .catch((err: Error) => {
        res.status(500).json({ error: err.message });
    });
})

app.post("/user", async(req, res) => {
  const { username, password } = req.body;
  
  if (!username || !password) {
    res.status(400).json({ error: "Username and password are required" });
    return
  }

 await prisma.user.create({
    data: {
      username,
      password
    }
  })
    .then(user => {
      res.status(201).json(user);
    })
    .catch((err : Error )=> {
      res.status(500).json({ error: err.message });
    });
})

app.listen(8080);