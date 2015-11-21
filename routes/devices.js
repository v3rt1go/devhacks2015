'use strict';

var express = require('express');
var router = express.Router();

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
const deviceOwner = {
  deviceId: 123,
  deviceType: 'Car sensor',
  name: 'Gigi Kent',
  phone: '+40742667455',
  address: {
    street: 'Some cool street',
    nr: 32,
    postalCode: '010075',
    city: 'Bucharest',
    country: 'Romania'
  },
  medicalCondition: ['diabetes - insulin', 'sleeping disorder', 'alergic to penicilin'],
  emergencyContact: {
    name: 'Maria Kent',
    phone: '+40742345678',
    email: 'maria@thekents.com'
  }
};

/* GET devices - gets status for all connected devices */
router.get('/devices', function(req, res, next) {
  deviceStatus.semGr2.a = newStatus('gr2');
  deviceStatus.semGr2.b = newStatus('gr2', deviceStatus.semGr2.a);
  deviceStatus.semGr3.a = newStatus('gr3');
  deviceStatus.semGr3.b = newStatus('gr3', deviceStatus.semGr3.a);
  deviceStatus.semGr4.a = newStatus('gr4');
  deviceStatus.semGr4.b = newStatus('gr4', deviceStatus.semGr4.a);
  res.send(JSON.stringify(deviceStatus));
});

/* activate panic button */
router.get('/panic', (req, res, next) => {
  // Read the panic details
  const deviceId = req.param('device');
  const coords = req.param('coords');

  // Find nearest ambulance
  const ambulanceLocation = '44.44589077681009,26.11595373068849'; 
  // Plot course from ambulance to accident
  
  // Update ambulance ui with location of accident
  
  // Update traffic lights to prioritize ambulance course
  
  // Call sms api and send text to emergency contact
  res.send('foo' + deviceId + coords);
});


module.exports = router;
