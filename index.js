const fs = require('fs');
const path = require('path');
const express = require('express');
const bodyParser = require('body-parser');
const multer = require('multer');
const WS = require('ws');
require('dotenv').config();


const filesDirname = path.join(__dirname, 'files/');
const PIN = process.env.PIN || 'cch137';
const app = express();
const server = require('http').createServer(app);
const io = new WS.Server({ server });
const upload = multer();
const port = process.env.PORT || 3000;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.set('trust proxy', true);
app.set('views', 'views');
app.set('view engine', 'pug');
app.locals.pretty = false;

app.use('/static/', express.static('static'));

const stringify = JSON.stringify;

const broadcast = (event, data) => {
  io.clients.forEach(socket => {
    socket.send(stringify({
      event,
      data
    }));
  });
}

const broadcastUpdate = () => {
  driveReaddir()
  .then(data => broadcast('update', data))
  .catch(err => broadcast('error', err));
}

const broadcastOnline = () => {
  broadcast('online', io.clients.size);
}

fs.watchFile(filesDirname, {}, (ev, fn) => {
  broadcastUpdate();
});

const driveReaddir = () => {
  return new Promise((resolve, reject) => {
    fs.readdir(filesDirname, (err, files) => {
      if (err) {
        reject(err);
      } else {
        resolve(files.filter(fn => fs.statSync(path.join(filesDirname, fn)).isFile()));
      }
    });
  });
}

app.get('/login', (req, res) => {
  res.render('login');
});

app.get('/', (req, res) => {
  const { file } = req.query;
  if (file) {
    const fp = path.join(filesDirname, file);
    if (fs.existsSync(fp)) res.sendFile(fp);
    else res.status(404).send();
    return;
  }
  res.render('index');
});

app.post('/list', (req, res) => {
  if (req.body.pin == PIN) {
    driveReaddir()
    .then(data => res.send(data))
    .catch(err => res.status(500).send(err));
  } else {
    res.status(401).send('Not logged in');
  }
});

app.post('/', upload.single('file'), (req, res) => {
  const { file } = req;
  if (file) {
    const filename = file.filename || file.originalname;
    fs.writeFile(path.join(filesDirname, filename), file.buffer, (err) => {
      if (err) {
        res.status(500).send(err);
      } else {
        res.send('OK');
        broadcastUpdate();
      }
    });
  } else {
    res.status(400).send({ error: 'no-file' })
  }
});

app.delete('/', (req, res) => {
  const { file } = req.query;
  const fp = path.join(filesDirname, file);
  try {
    if (fs.existsSync(fp)) {
      fs.rmSync(fp, { recursive: true });
      broadcastUpdate();
    }
    res.send('OK');
  } catch (err) {
    res.status(500).send(err);
  }
});

io.on('connection', (socket, req) => {
  console.log('Someone connected!', new Date());
  socket.on('close', () => broadcastOnline());
  socket.send(stringify({ event: 'update' }));
  broadcastOnline();
});

server.listen(port, () => {
  console.log(`Server is listening to http://localhost:${port}`);
});