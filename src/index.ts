import express, {Request,Response} from "express";
import cors from "cors";
import "dotenv/config";
import mongoose from "mongoose";
import myUserRoute from './routes/MyUserRoutes';

mongoose.connect(process.env.MONGODB_URL as string).then(()=> console.log("connected to database!"));

const app = express();
app.use(express.json());
app.use(cors());

app.get("/health", async (req: Request , res: Response) => {
    res.send({ message: "health ok!"});
});

app.use("/api/my/user", myUserRoute);


const port = process.env.PORT || 9000

app.listen(port, () => {
    console.log(`Server is running on port:${port}`);
});