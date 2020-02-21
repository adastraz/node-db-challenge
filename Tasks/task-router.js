const express = require('express');

const Tasks = require('./task-model.js');

const router = express.Router();

router.get('/:id/resources', (req, res) => {
    const { id } = req.params;
  
    Schemes.findResources(id)
    .then(resources => {
      if (recources.length) {
        res.json(resources);
      } else {
        res.status(404).json({ message: 'Could not find resources for given task' })
      }
    })
    .catch(err => {
        console.log(err)
      res.status(500).json({ message: 'Failed to get resources' });
    });
  });

router.post('/:id/resources', (req, res) => {
    const { id } = req.params; 

    Schemes.findById(id)
    .then(resource => {
        if (resource) {
            Tasks.addResource(req.body, id)
            .then(resource => {
                res.status(201).json(resource);
            })
        } else {
            res.status(404).json({ message: 'Could not find resource with given task id.' })
        }
    })
    .catch (err => {
        console.log(err)
        res.status(500).json({ message: 'Failed to create new resource' });
    });
});

module.exports = router;