//https://www.youtube.com/watch?v=gnM3Ld6_upE-- REVISAR
//https://medium.com/agora-io/how-does-webrtc-work-996748603141
import * as path from 'path';
import { URL } from 'url';

const __filename = new URL('', import.meta.url).pathname;
const __dirname = new URL('.', import.meta.url).pathname;

import express, { json } from 'express';
import { createServer } from 'http';
import { corsMiddleware } from './middlewares/cors.js';
import { devicesRouter } from './routes/devices.js';
import { categoryRouter } from './routes/category.js';
import { positionsRouter } from './routes/positions.js';
import { eventsRouter } from './routes/events.js';
import { commandsRouter } from './routes/commands.js';
import { rosRouter } from './routes/ros.js';
import { mapRouter } from './routes/map.js';
import { utilsRouter } from './routes/utils.js';
import { missionRouter } from './routes/mission.js';
import { filesRouter } from './routes/files.js';
import { WebsocketManager } from './WebsocketManager.js';

const app = express();
const port = 4000;
app.set('port', port);
app.use(corsMiddleware());
app.use(json());

app.use(express.static(path.resolve(__dirname, '../client/build')));
app.use('/api/devices', devicesRouter);
app.use('/api/category', categoryRouter);
app.use('/api/positions', positionsRouter);
app.use('/api/events', eventsRouter);
app.use('/api/commands', commandsRouter);
app.use('/api/ros', rosRouter);
app.use('/api/map', mapRouter);
app.use('/api/utils', utilsRouter);
app.use('/api/missions', missionRouter);
app.use('/api/files', filesRouter);

const server = createServer(app);
var ws = new WebsocketManager(server, '/api/socket');

//
// Start the server.
//
server.listen(app.get('port'), () => {
  console.log('Servidor iniciado en el puerto: ' + app.get('port'));
});
