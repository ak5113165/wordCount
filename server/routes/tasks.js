import express from "express";
import { addtask,getalltask,deletetask,addfavorite} from "../controllers/task.js"
const router = express.Router();

router.post("/insight", addtask);
router.get("/insight", getalltask);
router.delete("/insight/:id", deletetask);
router.put("/insight/:id/favourite", addfavorite);


export default router;
