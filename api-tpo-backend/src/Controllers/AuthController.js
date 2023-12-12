const {Pool } = require('pg');
const {getByEmail} = require("../repository/UserRepository");
const jwt = require("jsonwebtoken");
const sgMail = require('@sendgrid/mail');
const {saveRecoverPassword, getRecoverPassword} = require("../repository/AuthRepository");
const {changeUserPassword} = require("../services/UserService");
sgMail.setApiKey('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')

const pool = new Pool({
    user: 'postgres',
    host: 'localhost',
    database: 'api-tpo',
    password: 'testing',
    port: 5432,
});

const authUser = async (req, res) => {
    const {email, password} = req.body;

    const user = await getByEmail(email);
    if (!user || user.pass !== password) {
        return res.status(401).json({ error: 'Unauthorized' });
    }

    const payload = { userId: user.id, email: email };
    const secretKey = 'SuperSecret';
    const options = { expiresIn: '1h' };
    const token = jwt.sign(payload, secretKey, options);

    res.json({ access_token: token });
}

const createAccount = async (req, res) => {

    const {email, password} = req.body;

    const query = 'SELECT * FROM users WHERE email = $1 AND password = $2';
    const result = await pool.query(query, [email, password]);

    if (result.rows.length > 0) {
        res.json({ status: 'success', message: 'Inicio de sesión exitoso', user: { email } });
    } else {
        res.status(400).json({ status: 'error', message: 'Credenciales incorrectas' });
    }
}

const recoverPassword = async (req, res) => {
    const {email} = req.body;
    console.log(email)
    const userSaved = await getByEmail(email);
    const number = generateRandomNumber()
    const emailTemplate = `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Recuperación de Contraseña</title>
  <style>
    body {
      font-family: 'Arial', sans-serif;
      background-color: #f4f4f4;
      margin: 0;
      padding: 0;
    }

    .container {
      max-width: 600px;
      margin: 30px auto;
      background-color: #ffffff;
      padding: 20px;
      border-radius: 5px;
      box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
    }

    h2 {
      color: #333333;
    }

    p {
      color: #555555;
    }

    a {
      color: #3498db;
      text-decoration: none;
    }
  </style>
</head>
<body>
  <div class="container">
    <h2>Recuperación de Contraseña</h2>
    <p>Hola</p>
    <p>Hemos recibido una solicitud para restablecer la contraseña de tu cuenta. </p>
    <p>El código de recuperación es: ${number}</p>
    <p>Si no solicitaste este cambio, puedes ignorar este correo electrónico.</p>
    <p>Gracias</p>
  </div>
</body>
</html>`;

    const msg = {
        to: 'nat.hauser88@gmail.com',
        from: 'axsantoro@uade.edu.ar',
        subject: '[test] Recuperar password',
        html: emailTemplate
    };

    try {
        await sgMail.send(msg);
        await saveRecoverPassword({email: email, recoverToken: number, userId: userSaved.id})
        res.status(200).json({message: "OK"})
    } catch (error) {
        res.status(500)
        console.error('Error al enviar el correo:', error);
    }
}

const changePassword = async (req, res) => {

    const {code, email, newPassword} = req.body;
    try {
        const recoverCodeSaved = await getRecoverPassword(email)

        if(code !== recoverCodeSaved)
            res.status(401).json({status: "Unauthorized"})
        await changeUserPassword({newPassword, email})
        res.status(200).json({message:"OK"})
    } catch (error) {
        res.status(500)
        console.error('error:', error);
    }

}

function generateRandomNumber() {
    const min = 100000; // Mínimo valor de 6 dígitos
    const max = 999999; // Máximo valor de 6 dígitos
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

module.exports = { authUser, createAccount, recoverPassword, changePassword };