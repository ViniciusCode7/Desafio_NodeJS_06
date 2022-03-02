/**
 * Required External Modules
 */

import * as dotenv from "dotenv";
import express from "express";
import cors from "cors";
import helmet from "helmet";
const readline = require('readline-sync');
const db = require('../models/index.js')

dotenv.config();

/**
 * App Variables
 */

if (!process.env.PORT) {
	process.exit(1);
}

const PORT: number = parseInt(process.env.PORT as string, 10);

const app = express();

/**
 *  App Configuration
 */

app.use(helmet());
app.use(cors());
app.use(express.json());

/**
 * Server Activation
 */

app.listen(PORT, async () => {
	console.log(`Listening on port ${PORT}`);

	const qtd = parseInt(readline.question('Qual a quantidade de alunos? '));
	
	for (let i = 0; i < qtd; i++) {
		
		const id = parseInt(readline.question('Qual o numero do id do aluno? '));

		const name = readline.question('Qual o nome do aluno? ');

		const grade = parseFloat(readline.question('Qual a nota do aluno? '));

		const email = readline.question('Qual o email do aluno? ');
		
		await db.Aluno.create({ id: id, name: name, grade: grade, email: email});
	}

	//Consulta simples findAll
	const users = await db.Aluno.findAll();
	console.log("All users:", JSON.stringify(users, null));
	
	console.log(users);

	//Update
	const item = await db.Aluno.findByPk(1);
	item.name = "Berlimthebest";
	item.grade = 9;
	item.save();
	  
	//Delete
	await db.Aluno.findByPk(6);
	item.destroy();
});