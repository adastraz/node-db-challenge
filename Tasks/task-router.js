const express = require('express');

const Tasks = require('./task-model.js');

const router = express.Router();

router.get('/', (req, res) => {
  Tasks.find()
      .then(tasks => {
      res.json(tasks);
  })
  .catch(err => {
      console.log(err)
      res.status(500).json({ message: 'Failed to get tasks' });
  });
});

router.get('/:id', (req, res) => {
  const { id } = req.params;

  Tasks.findById(id)
  .then(task => {
      if (task) {
          res.json(task);
      } else {
          res.status(404).json({ message: 'Could not find task with given id.' })
      }
  })
  .catch(err => {
      console.log(err)
      res.status(500).json({ message: 'Failed to get task' });
  });
});

router.get('/:id/resources', (req, res) => {
    const { id } = req.params;
  
    Tasks.findResources(id)
    .then(resources => {
      if (resources.length) {
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

    Tasks.findById(id)
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

router.put('/:id', (req, res) => {
  const { id } = req.params

  Tasks.findById(id)
  .then(task => {
      if (task) {
          Tasks.update(req.body, id)
          .then(updatedtask => {
              res.json(updatedtask);
      });
      } else {
          res.status(404).json({ message: 'Could not find task with given id' });
      }
  })
  .catch (err => {
      console.log(err)
      res.status(500).json({ message: 'Failed to update task' });
  });
});

router.delete('/:id', (req, res) => {
  const { id } = req.params;

  Tasks.remove(id)
  .then(deleted => {
      if (deleted) {
          res.json({ removed: deleted });
      } else {
          res.status(404).json({ message: 'Could not find task with given id' });
      }
  })
  .catch(err => {
      console.log(err)
      res.status(500).json({ message: 'Failed to delete task' });
  });
});

module.exports = router;