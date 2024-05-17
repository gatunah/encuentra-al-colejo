const express = require("express");
const app = express();
app.listen(3000, () => {
  console.log("El servidor está inicializado en el puerto 3000, ingresa a http://localhost:3000/abracadabra/juego/");
});

const usuarios = {
  "usuarios": [
    "Juan",
    "Jocelyn",
    "Astrid",
    "Maria",
    "Ignacia",
    "Javier",
    "Brian"
  ].map(usuario => usuario.toLowerCase())
};

app.use(express.static("assets"));

//RUTA 1
app.get("/abracadabra/usuarios", (req, res) => {
  res.json(usuarios);
});

//RUTA 2 - INGRESAR CON /abracadabra/juego/ PARA QUE SE SOLICITE EL NOMBRE POR MEDIO DE UN ALERT
app.use("/abracadabra/juego/:usuario?", (req, res, next) => {
  //SI SE INGRESA COMO PARAMETRO
  if (req.params.usuario) {
    const usuario = req.params.usuario.toLowerCase();
    if (!usuarios.usuarios.includes(usuario)) {
      res.status(401).sendFile(__dirname + `/who.html`);//ERROR 401 FALTA DE CREDENCIALES VALIDAS
    } else {
      //SIGUIENTE//SE PERMITE ACCESO
      next();
    }
  } else {
    //SI NO SE INGRESA COMO PARAMETRO
    res.send(`
      <script>
        const nombreUsuario = prompt("Por favor, ingresa tu nombre:");
        if (nombreUsuario) {
          window.location.href = '/abracadabra/juego/' + nombreUsuario;
        } else {
          window.location.href = '/abracadabra/juego/';
        }
      </script>
    `);
  }
});

// Ruta específica
app.get("/abracadabra/juego/:usuario?", (req, res) => {
  // Si pasa el middleware de validación, llegará aquí
  res.sendFile(__dirname + '/index.html');
});


//RUTA 3
app.get("/abracadabra/conejo/:n", (req,res) => {
  const numeroEscogido = req.params.n;
  const numeroAleatorio = Math.floor(Math.random() * 4) + 1;

  numeroEscogido == numeroAleatorio ? res.sendFile(__dirname + '/ganador.html') : res.sendFile(__dirname + '/perdedor.html');
  //console.log(numeroEscogido,numeroAleatorio);
})

//RUTA *
app.get("*", (req, res) => {
  res.status(404).send(`Esta página no existe...`);
});


///////APUNTES///////
// npm install express --save
// netstat -ano | findstr :3000
//npm install -g nodemon
//nodemon app.js
