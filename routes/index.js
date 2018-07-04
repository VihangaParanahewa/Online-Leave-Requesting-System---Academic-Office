var express = require('express');
var router = express.Router();
const passport = require('passport');
var User = require('../models/user');
const jwt = require('jsonwebtoken');
var Leave = require('../models/leave');
var validity = false;

router.get('/', function(req, res, next) {
    res.send('respond with a resource');
});

router.post('/register', function (req, res, next) {


    var newUser = new User();

    newUser.name = req.body.name;
    newUser.email = req.body.email;
    newUser.password = newUser.encryptPassword(req.body.password);
    newUser.gender = req.body.gender;
    newUser.mobile = req.body.mobile;
    newUser.role = "Staff Member";
    if(req.body.gender === 'Male'){
        newUser.profileImage = "https://x1.xingassets.com/assets/frontend_minified/img/users/nobody_m.original.jpg";
    } else {
        newUser.profileImage = "/images/lady.jpg"
    }newUser.save(function(err, result) {
        if (err) {
            res.json({state:false,msg:"data not inserted"});
        }else {
            res.json({state: true, msg: "data inserted"});
        }
    });

});


router.post('/login', function (req, res, next) {
    console.log(req.body.email);
    console.log(req.body.password);

    User.findOne({'email': req.body.email}, function(err, user){
        if(err) throw err;
    if(!user) {
        console.log(user);
        return res.json({success: false, msg: 'User not found'});
    }

    newUser = User();

    if(newUser.validPassword(req.body.password, user.password)) {
        const token = jwt.sign({data: user}, 'secret', {
            expiresIn: 604800 // 1 week
        });
        res.json({
            success: true,
            token: 'JWT '+token,
            user: user,
            userRole : user.role
        });
    } else {
        return res.json({success: false, msg: 'Wrong password'});
    }
});
});


router.get('/profile', passport.authenticate('jwt', {session:false}), function(req, res, next){
    res.json({user: req.user});
});

router.post('/addLeave', passport.authenticate('jwt', {session:false}),function(req, res, next){
    req.session.leaveDate = req.body.leaveDate;
    req.session.user = req.user;
    Leave.find({'leaveDate' : req.session.leaveDate}).exec(function (err, docs) {
        var leave = new Leave();

        if(docs.length < 10){

            leave.owner = req.session.user.name;
            leave.email = req.session.user.email;
            leave.leaveDate = req.session.leaveDate;
            leave.profileImage = req.session.user.profileImage;
            leave.status = "Accept";
            leave.ownerId = req.session.user._id;
            leave.save(function(err, result) {
                if (err) {
                    console.log(err);
                    res.json({success:false,msg:"Leave Not Entered Correctly"});
                }else {
                        res.json({success: true, msg: "Leave Accepted", state:true});
                }
            });
        }else {
            leave.owner = req.session.user.name;
            leave.email = req.session.user.email;
            leave.leaveDate = req.session.leaveDate;
            leave.profileImage = req.session.user.profileImage;
            leave.status = "Pending";
            leave.ownerId = req.session.user._id;
            leave.save(function(err, result) {
                if (err) {
                    console.log(err);
                    res.json({success:false,msg:"Leave Not Entered Correctly"});
                }else {
                    res.json({success: false, msg: "Leave Waiting For The Admin's Approval", state:true});
                }
            });
        }
    });

});


router.get('/viewLeave', passport.authenticate('jwt', {session:false}), function(req, res, next){

    req.session.user = req.user;
    Leave.find({'ownerId' : req.session.user._id}).sort({_id : -1}).exec(function (err, docs) {
        res.json({leaves: docs});
    });


});


router.post('/availability', passport.authenticate('jwt', {session:false}), function(req, res, next){
    req.session.leaveDate = req.body.leaveDate;
    Leave.find({'leaveDate' : req.session.leaveDate, 'status' : "Accept"}).exec(function (err, docs) {
        req.session.accept = docs.length;
        if (err) {
            console.log(err);
            res.json({success:false,msg: err});
        }

    Leave.find({'leaveDate' : req.session.leaveDate, 'status' : "Reject"}).exec(function (err, docs) {
        req.session.reject = docs.length;
        if (err) {
            console.log(err);
            res.json({success:false,msg: err});
        }

    Leave.find({'leaveDate' : req.session.leaveDate, 'status' : "Pending"}).exec(function (err, docs) {
        req.session.pending = docs.length;
        if (err) {
            console.log(err);
            res.json({success:false,msg: err});
        }else {
            res.json({success: true, msg: "success", accept : req.session.accept, reject : req.session.reject, pending: req.session.pending, leaveDate : req.session.leaveDate});
        }
          });
       });
    });
});


router.post('/checkLeaves', passport.authenticate('jwt', {session:false}), function(req, res, next){
    req.session.leaveDate = req.body.leaveDate;
    req.session.status = req.body.status;
    Leave.find({'leaveDate' : req.session.leaveDate, 'status' : req.session.status}).exec(function (err, docs) {
        if(err){
            res.json({success : false, msg: err});
        }else {
            res.json({success: true, leavers: docs, leaveDate: req.session.leaveDate});
        }
    });
});

router.post('/checkLeaver', passport.authenticate('jwt', {session:false}), function(req, res, next){
    req.session.ownerId = req.body.ownerId;
    req.session.leaveDate = req.body.leaveDate;
    Leave.find({'ownerId' : req.session.ownerId, 'leaveDate' : req.session.leaveDate}).exec(function (err, docs) {
        if(err){
            res.json({success : false, msg: err});
        }else {
            res.json({success: true, leavers: docs, leaveDate: req.session.leaveDate});
        }
    });
});




module.exports = router;
