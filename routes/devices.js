'use strict';

var express = require('express');
var router = express.Router();
const twilio = require('twilio')('AC0aa2d78af780cc99c5efdb2ef4d0fcb0', '4ed8f2736ae7b00102c457f8e1c565f4');
const request = require('request');
const gMapsKey = 'AIzaSyCmD5SvAcTk3z9itXbK1sA5PMxmhUYR8Us';  
const distance = require('google-distance');
distance.apiKey = gMapsKey; 
const GoogleMapsApi = require('googlemaps');

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

/* init devices */
const devicesStatus = {
  semGr1: {
    a: {
      lat: '44.44634660434772',
      long: '26.11520073244162',
      state: 'green'
    },
    b: {
      lat: '44.4464078794009',
      long: '26.114943240376192',
      state: 'red'
    },
  },
  semGr2: {
    a: {
      lat: '44.44512874933136',
      long: '26.11425659486838',
      state: gts('gr2')
    },
    b: {
      lat: '44.44494491995363',
      long: '26.114063475819307',
      state: gts('gr2')
    }
  },
  semGr3: {
    a: {
      lat: '44.44349724338838',
      long: '26.11899874040671',
      state: gts('gr3')
    },
    b: {
      lat: '44.44361213966448',
      long: '26.119132850857454',
      state: gts('gr3')
    }
  },
  semGr4: {
    a: {
      lat: '44.43781342553688',
      long: '26.114181493015963',
      state: gts('gr4')
    },
    b: {
      lat: '44.43762957314023',
      long: '26.114127848835665',
      state: gts('gr4')
    }
  }
};

const deviceOwner = {
  deviceId: 123,
  deviceType: 'Car sensor',
  name: 'Gigi Kent',
  phone: '+4074123321',
  address: {
    street: 'Some cool street',
    nr: 32,
    postalCode: '010075',
    city: 'Bucharest',
    country: 'Romania'
  },
  medicalCondition: ['diabetes - insulin', 'sleeping disorder', 'allergic to penicillin'],
  emergencyContact: {
    name: 'Maria Kent',
    phone: '+40723846180',
    email: 'maria@thekents.com'
  }
};

/* GET devices - gets status for all connected devices */
router.get('/devices', function(req, res, next) {
  devicesStatus.semGr2.a.state = newStatus('gr2');
  devicesStatus.semGr2.b.state = newStatus('gr2', devicesStatus.semGr2.a.state);
  devicesStatus.semGr3.a.state = newStatus('gr3');
  devicesStatus.semGr3.b.state = newStatus('gr3', devicesStatus.semGr3.a.state);
  devicesStatus.semGr4.a.state = newStatus('gr4');
  devicesStatus.semGr4.b.state = newStatus('gr4', devicesStatus.semGr4.a.state);
  res.json(devicesStatus);
});

router.get('/devices/:sem/turn/:color', (req, res, next) => {
  const sem = req.params.sem;
  const color = req.params.color;

  let otherSem;
  let otherColor;

  otherSem = sem === 'a' ? 'b' : 'a';
  otherColor = color === 'red' ? 'green' : 'red';

  controlSemaphore(sem, color, (err, data) => {
    if (err) {
      console.log(err);
      next(err);
    }
    devicesStatus.semGr1[sem].state = color;
    devicesStatus.semGr1[otherSem].state = otherColor;
    res.json(data);
  });
});

/* activate panic button */
router.get('/panic', (req, res, next) => {
  // Read the panic details
  const deviceId = req.param('device');
  const coords = req.param('coords');
  const gMaps = new GoogleMapsApi({
    key: gMapsKey,
    stagger_time:       1000, // for elevationPath
    encode_polylines:   false
  });

  // Find nearest ambulance
  const ambulanceLocation = '44.44589077681009,26.11595373068849'; 
  // Plot course from ambulance to accident
  
  // Update ambulance ui with location of accident
  
  // Update traffic lights to prioritize ambulance course
  
  // Call sms api and send text to emergency contact
  distance.get({
    origin: ambulanceLocation,
    destination: coords
  }, (err, data) => {
    if (err) console.log(err);

    const params = {
      origin: ambulanceLocation,
      destination: coords
    };
    gMaps.directions(params, (err, results) => {
      if (err) throw err;

      twilio.sendMessage({
        from: '+48732483434',
        to: deviceOwner.emergencyContact.phone,
        message: "Hi Mr. Daniel Cana, we're sorry to inform you but you need to turn the traffic lights to green, an ambulance is on the way :D"
      }, (err, data) => {
        if (err) {
          console.log(err);
        }

        res.send({
          accidentDetails: {
            coords: coords,
            victimDetails: deviceOwner,
            emergencyContactNotified: !err
          },
          routeWaypoints: results.routes[0].legs[0].steps,
          routeDetails: data
        });
      })
    });
  })
});

const controlSemaphore = (sem, color, cb) => {
  const endpoint = 'http://192.168.3.216/status/index/turn/';
  const url = endpoint + color + '/device/' + sem;
  request(url, (err, res, body) => {
    if (err) {
      console.log(err);
      cb(err);
    };

    if (res.statusCode === 200) {
      cb(null, body);
    } else {
      cb('something went wrong');
    }
  }); 
}
module.exports = router;
