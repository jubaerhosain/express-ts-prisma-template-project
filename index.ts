import express, { Request, Response } from "express";

const app = express();

// Example route using Prisma Client
app.get("/posts", async (req: Request, res: Response) => {
    
});

app.listen(3000, () => {
    console.log("Server listening on port 3000");
});
