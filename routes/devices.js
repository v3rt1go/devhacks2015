'use strict';

var express = require('express');
var router = express.Router();

/* GET devices - gets status for all connected devices */
router.get('/devices', function(req, res, next) {
  const deviceStatus = {
    semGr1: {
      a: 'red',
      b: 'green'
    },
    semGr2: {
      a: gts('gr2'),
      b: gts('gr2')
    },
    semGr3: {
      a: gts('gr3'),
      b: gts('gr3')
    },
    semGr4: {
      a: gts('gr4'),
      b: gts('gr4')
    }
  };

  deviceStatus.semGr2.a = newStatus('gr2');
  deviceStatus.semGr2.b = newStatus('gr2', deviceStatus.semGr2.a);
  deviceStatus.semGr3.a = newStatus('gr3');
  deviceStatus.semGr3.b = newStatus('gr3', deviceStatus.semGr3.a);
  deviceStatus.semGr4.a = newStatus('gr4');
  deviceStatus.semGr4.b = newStatus('gr4', deviceStatus.semGr4.a);
  res.send(JSON.stringify(deviceStatus));
});

const gts = () =>  {
  let rand = Math.floor(Math.random() * 2) + 1;
  return rand % 2 === 0 ? 'red' : 'green';
};

const newStatus = (gr, sts) => {
  if (!sts) {
    sts = gts();
    return sts;
  }

  return sts === 'red' ? 'green' : 'red';
};

//  

module.exports = router;
