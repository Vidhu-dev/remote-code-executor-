import express, { Request, Response, Router } from "express";
import { code } from "../controllers/code";

const router: Router = express.Router();

/**
 * Route to handle POST requests for the 'code' functionality.
 * @param req - The HTTP request object.
 * @param res - The HTTP response object.
 */
router.post("/", (req: Request, res: Response) => code(req, res));

export default router;
