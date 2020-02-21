const express = require('express');
const helmet = require('helmet')

const ProjectsRouter = require('./projects/project-router.js');
const TasksRouter = require('./tasks/task-router.js');
const ResourcesRouter = require('./resources/resource-router.js');

const server = express();

server.use(express.json());
server.use(helmet())
server.use('/api/projects', ProjectsRouter);
server.use('/api/tasks', TasksRouter);
server.use('/api/resources', ResourcesRouter);


module.exports = server;