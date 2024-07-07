/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unsafe-argument */
import bodyParser from "body-parser";
import express from "express";
import path from "path";

import sequelize from "./config/database";
import userRoutes from "./routes/userRoutes";

const app = express();
const PORT: number = parseInt(process.env.PORT as string, 10) || 3000;

app.use(bodyParser.json());
app.use("/api/v1", userRoutes);
app.use(express.static(path.join(__dirname, "../public")));

sequelize
	.sync()
	.then(() => {
		app.listen(PORT, () => {
			// eslint-disable-next-line no-console
			console.log(`Server is running on port ${PORT}`);
		});
	})
	.catch((error) => {
		console.error("Unable to connect to the database:", error);
	});
