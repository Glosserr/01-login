var router = require('express').Router();
const { requiresAuth } = require('express-openid-connect');

router.get('/', function (req, res, next) {
  res.render('index', {
    title: 'CarbonCount',
    isAuthenticated: req.oidc.isAuthenticated()
  });
});

router.get('/profile', requiresAuth(), function (req, res, next) {
  res.render('profile', {
    userProfile: JSON.stringify(req.oidc.user, null, 2),
    title: 'Profile page'
  });
});
router.get('/leaderboard', requiresAuth(), function (req, res, next) {
  res.render('leaderboard', {
    userProfile: JSON.stringify(req.oidc.user, null, 2),
    title: 'Profile page'
  });
});

const kintone = require('kintone-nodejs-sdk');

let kintoneAuthWithAPIToken = (new kintone.Auth()).setApiToken('A8mvHRY5yrVQhIkcTSDW9amw4bX3J4XfXv3U2cLm');
let kintoneConnection = new kintone.Connection('your.FQDN.tld', kintoneAuthWithAPIToken);

let kintoneRecord = new kintone.Record(kintoneConnection);

let appID = {your_app_id};
let recordID = {record_id_that_will_be_retrived};
kintoneRecord.getRecord(appID, recordID)
    .then((rsp) => {
        console.log(rsp);
    })
    .catch((err) => {
        // The promise function always reject with KintoneAPIExeption
        console.log(err.get());
    });

module.exports = router;
