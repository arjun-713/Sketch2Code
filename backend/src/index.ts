import cors from "cors";
import dotenv from "dotenv";
import express from "express";
import path from "path";
import { fileURLToPath } from "url";
import { analyzeRouter } from "./routes/analyze.js";
import { streamRouter } from "./routes/stream.js";
import { traceRouter } from "./routes/trace.js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Load backend-specific .env
dotenv.config();
// Load root workspace .env.local as fallback (for GEMINI_API_KEY)
dotenv.config({ path: path.resolve(__dirname, "../../.env.local") });

const app = express();
const port = Number(process.env.PORT ?? 4001);

app.use(cors({ origin: ["http://localhost:4000", "https://sketchcode.lovable.app"] }));
app.use(express.json({ limit: "1mb" }));

app.get("/api/health", (_request, response) => {
  response.json({ ok: true, service: "sketch2code-backend" });
});

app.use("/stream", streamRouter);
app.use("/analyze", analyzeRouter);
app.use("/trace", traceRouter);

app.listen(port, () => {
  console.log(`Sketch2Code backend listening on ${port}`);
});
