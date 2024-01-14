//Setando Porta
const port = 3003;

//Dependencias
const express = require('express')
const { exec } = require('child_process');
const app = express()
const bodyParser = require('body-parser') 

app.use(bodyParser.urlencoded({extended: true}))

app.post('/desbloquearUsuario', (req, res) => {
    const nomeUsuario = req.body.nomeUsuario;
  
    exec(`powershell.exe -command "import-module ActiveDirectory; Unlock-ADAccount -identity '${nomeUsuario}'"`, 
    (error, stdout, stderr) => {
      if (error) {
        console.error(`Erro ao desbloquear o usuário ${nomeUsuario}: ${error.message}`);
        res.status(500).send(`Erro ao desbloquear o usuário ${nomeUsuario}: ${error.message}`);
        return;
      }
      if (stderr) {
        console.error(`Erro ao desbloquear o usuário ${nomeUsuario}: ${stderr}`);
        res.status(500).send(`Erro ao desbloquear o usuário ${nomeUsuario}: ${stderr}`);
        return;
      }
      console.log(`Usuário ${nomeUsuario} desbloqueado com sucesso`);
      res.send(`Usuário ${nomeUsuario} desbloqueado com sucesso`);
    });
  });

// Reprodução da porta (Substituimos o "0.0.0.0" pelo IP ou DNS do servidor)
app.listen(port, '0.0.0.0', () => {
    console.log(`Servidor executando na porta ${port}`)
})