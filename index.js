const fs = require('fs');
const path = require('path');
const express = require('express');
const bodyParser = require('body-parser');
const multer = require('multer');
const WS = require('ws');
require('dotenv').config();


const filesDirname = path.join(__dirname, 'drive/');
const getStoredFp = (rPath) => path.join(filesDirname, rPath);
const PIN = process.env.PIN || 'cch137';
const app = express();
const server = require('http').createServer(app);
const io = new WS.Server({ server });
const upload = multer();
const port = process.env.PORT || 3000;

if (!fs.existsSync(filesDirname)) fs.mkdirSync(filesDirname);

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.set('trust proxy', true);
app.set('views', 'views');
app.set('view engine', 'pug');
app.enable('view cache');
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
  broadcast('update', data);
}

const broadcastOnline = () => {
  broadcast('online', io.clients.size);
}

fs.watchFile(filesDirname, {}, (ev, fn) => {
  broadcastUpdate();
});

app.get('/login', (req, res) => {
  res.render('login');
});

app.get('/', (req, res) => {
  const { file, pin } = req.query;
  if (file) {
    if (pin != PIN) return res.status(401).send();
    const fp = getStoredFp(file);
    if (fs.existsSync(fp)) res.sendFile(fp);
    else res.status(404).send();
    return;
  }
  res.render('index');
});

app.post('/list', (req, res) => {
  if (req.body.pin != PIN) return res.status(401).send('Not logged in');
  fs.readdir(filesDirname, (err, files) => {
    if (err) return res.status(500).send(err);
    res.send(files.filter(fn => fs.statSync(getStoredFp(fn)).isFile()));
  });
});

app.post('/', upload.single('file'), (req, res) => {
  const { file } = req;
  if (file) {
    const filename = file.filename || file.originalname;
    fs.writeFile(getStoredFp(filename), file.buffer, (err) => {
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
  const fp = getStoredFp(file);
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