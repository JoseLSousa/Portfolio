const express = require('express');
require('dotenv').config();
const bodyParser = require('body-parser');
const nodemailer = require('nodemailer');

const app = express();

// Middleware para parsear o body das requisições
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Rota para renderizar o formulário
app.use(express.static('public'));

// Rota para enviar o email
app.post('/sendEmail', (req, res) => {
    const { InputNome, InputEmail, InputMensagem } = req.body;

    // Configurar o transporte do Nodemailer
    const transporter = nodemailer.createTransport({
        service: "Gmail",
        host: "smtp.gmail.com",
        port: "465",
        auth: {
            user: process.env.MEUEMAIL,
            pass: process.env.SENHAAPP
        }
    });

    // Configurar o email a ser enviado
    const mailOptions = {
        from: process.env.MEUEMAIL,
        to: InputEmail,
        subject: `Contato de ${InputNome}`,
        text: InputMensagem
    };

    // Enviar o email
    transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
            console.log(error);
            res.status(500).send('Houve um erro ao enviar o email.');
        } else {
            console.log('Email enviado: ' + info.response);
            res.send('Email enviado com sucesso!');
        }
    });
});

// Iniciar o servidor
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Servidor rodando na porta ${PORT}`);
});
