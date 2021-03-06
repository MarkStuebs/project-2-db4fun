const express = require('express');
const router = express.Router();

const UserModel = require("../models").User;
const AuthorModel = require('../models').Author;
const JournalModel = require('../models').Journal;
const UserJournalModel = require('../models').UserJournal;

//BASE ROUTE === app.use("/author"

//RR1: INDEX HTTPVerb: GET Purpose: redirect to welcome page SEQ: n/a
router.get('/', (req, res) => {
  let userId = req.user.id;
  AuthorModel.findAll().then( (authors) => {
    res.render('../views/authors/index.ejs', { authors, userId });
  });
});  //Done

//RR2: NEW HTTPVerb: GET Purpose: Display form for NEW Author SEQ: n/a
router.get('/new', (req, res) => {
  console.log(req.user.id);
  let userId = req.user.id;
  res.render('../views/authors/new.ejs', { userId });
});
  
//RR3: CREATE HTTPVerb: POST Purpose: Add NEW Author to db SEQ: CREATE
router.post('/', (req, res) => {
  let userId = req.user.id;

  console.log("RR3.5 new author requested by " + userId + " CREATE, body: " + req.body);

  UserModel.findByPk(userId).then((user) => {
    user.createAuthor(req.body).then((userauthor) => {

      res.redirect('/users/profile/' + userId);

    });
  });
});

//RR5: SHOW HTTPVerb: GET Purpose: Show Edit for an Author SEQ: FINDBYPK
router.get('/:id/edit', (req, res) => {

  console.log("Edit author by id: " + req.params.id)  ;
  // Sequelize

  AuthorModel.findByPk(req.params.id, {
    //include: [{model: Teams}, { model: Pokemon}],
  }).then((author) => {
    // Teams.findAll().then((teams) => {
    //     console.log("Found by ID, Obj[] follows:");
    //     console.log(user.id);
    //     //console.log(teams);
        //console.log(player.teams);
        res.render('../views/authors/edit.ejs', { 
          author, 
          //teams 
        // });
      });
  });
});

//RR4: SHOW HTTPVerb: GET Purpose: Show one Player SEQ: FINDBYPK
router.get('/:id', (req, res) => {

    console.log("Get author by id: " + req.params.id)  ;
    // Sequelize

    AuthorModel.findByPk(req.params.id, {
      //include: [{model: Teams}, { model: Pokemon}],
    }).then((author) => {
      // Teams.findAll().then((teams) => {
      //     console.log("Found by ID, Obj[] follows:");
      //     console.log(user.id);
      //     //console.log(teams);
          //console.log(player.teams);
          res.render('../views/authors/show.ejs', { 
            author, 
            //teams 
          // });
        });
    });
});

//Login GET Route - displays page
router.get('/login', (req, res) => {
    res.render('../views/authors/login.ejs')
  } );
  
// Login POST Route - determines if login successful from db
// router.post('/login', (req, res) => {
//   try {

//     console.log("Trying login");

//     User.findAll({
//       where: {
//         username: req.body.username,
//         password: req.body.password
//       }
//     }).then((user) => {

//       console.log(user);

//       console.log(user.id);

//       //LOGIN SUCCESSFUL
//       if (user != "") {
//         console.log("Login success");

//         console.log(user[0].id);

//         res.redirect('/user/profile/'+ user[0].id);
//       }
//       else {
//         console.log("Log in failed... try again")
//         res.render('user/login');
//       }

//     });
//   }
//   catch (error) {
//     console.error(error);
//     res.render('user');
//   }
// });

//Sign Up GET route
// router.get('/signup', (req, res) => {

//     console.log('/user GET caught 004, renders Sign Up page');

//     res.render('../views/user/signup.ejs')
//   } );

//RR7: DESTROY HTTPVerb: DELETE Purpose: Destroy User SEQ: DESTROY
router.delete('/:id', (req, res) => {

  console.log("Destroy author by id: " + req.params.id);

  AuthorModel.destroy({ where: { id: req.params.id } }).then(() => {
    res.redirect('/');  
  });

});

//RR6: EDIT HTTPVerb: PUT Purpose: Update Player info SEQ: UPDATE
router.put('/:id', (req, res) => {
    AuthorModel.update(req.body, {
      where: { id: req.params.id },
      returning: true,
    }).then((author) => {
      console.group(`changes made`);
      console.log(author);
      res.redirect(`/author/${req.params.id}/edit` ) 
    });
});
  


  

module.exports = router;