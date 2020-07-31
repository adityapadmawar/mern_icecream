const router = require('express').Router();
let Icecream = require('../models/icecream.model');

router.route('/').get((req, res) => {
  Icecream.find()
    .then(icecreams => res.json(icecreams))
    .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/add').post((req, res) => {
  const username = req.body.username;
  const conewafer = req.body.conewafer;
  const baseflavour = req.body.baseflavour;
  const toppings = req.body.toppings;

  const newIcecream = new Icecream({
    username,
    conewafer,
    baseflavour,
    toppings,
  });

  newIcecream.save()
  .then(() => res.json('Icecream added!'))
  .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/:id').get((req, res) => {
    Icecream.findById(req.params.id)
      .then(icecream => res.json(icecream))
      .catch(err => res.status(400).json('Error: ' + err));
  });
  
  router.route('/:id').delete((req, res) => {
    Icecream.findByIdAndDelete(req.params.id)
      .then(() => res.json('Icecream deleted.'))
      .catch(err => res.status(400).json('Error: ' + err));
  });
  
  router.route('/update/:id').post((req, res) => {
    Icecream.findById(req.params.id)
      .then(icecream => {
        icecream.username = req.body.username;
        icecream.conewafer = req.body.conewafer;
        icecream.baseflavour = req.body.baseflavour;
        icecream.toppings = req.body.toppings;
  
        icecream.save()
          .then(() => res.json('Icecream updated!'))
          .catch(err => res.status(400).json('Error: ' + err));
      })
      .catch(err => res.status(400).json('Error: ' + err));
  });

module.exports = router;