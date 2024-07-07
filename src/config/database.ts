/* eslint-disable no-console */
import dotenv from "dotenv";
import { Sequelize } from "sequelize";

dotenv.config();

const { DB_NAME, DB_USER, DB_PASSWORD, DB_HOST, DB_PORT, DB_DIALECT } = process.env;

if (!DB_NAME || !DB_USER || !DB_PASSWORD || !DB_HOST || !DB_DIALECT) {
	throw new Error("Please define all the required environment variables");
}

const sequelize = new Sequelize(DB_NAME, DB_USER, DB_PASSWORD, {
	host: process.env.DB_HOST,
	port: Number(DB_PORT ?? "6543"),
	dialect: process.env.DB_DIALECT as "postgres",
	dialectOptions: {
		ssl: {
			require: true,
			rejectUnauthorized: false,
		},
	},
});

export default sequelize;
