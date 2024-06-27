import express from "express";

const app = express();


app.post('/hdfcwebbhook', (req, res) => {
	//here we add zode validation
	const paymentInfo = {
		token : req.body.token,
		userId : req.body.user_identifier,
		amount : req.body.amount
	}
})