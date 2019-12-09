var db = require("../models");
var request = require("request");
module.exports = function (app) {

  // Get the google API data 
  app.get("/api/googlebooks", function (req, res) {
    var parameter = "";
    var search = "Harry Potter"
    var refine = "&orderBy=relevance&"
    // get the user input
    request("https://www.googleapis.com/books/v1/volumes?q=" + search + parameter + refine + ":keyes&key=AIzaSyBaLr5TPsFewkitZXad_5_EaTeCT35K9No", function (error, response, body) {
      if (!error && response.statusCode == 200) {

        var bodyres = JSON.parse(body)
        console.log(body)
      }
      res.json(bodyres)
      // res.json(body.title)
    })


  });
  /***************************NOTES**********************/
  // get book id
  app.get("/api/mybooks/:id", function (req, res) {
    // get the book id 
    db.Note.findOne({
      where: {
        bookId: req.params.id
      }
    }).then(function (dbNotes) {
      res.json(dbNotes);
    });
  });

  // display all the notes
  app.get("/api/mybooks", function (req, res) {


    // console.log("fav-notes/:id req is:", req);
    console.log("fav-notes/:id req.user is:", req.user);  
    console.log("fav-notes/:id req.user.id is:", req.user.id); 

    // console.log("fav-notes res is: ", res); 

    db.Note.findAll({
      where: {
        userId: req.user.id,
      }
    }).then(function (dbNotes) {
      res.json(dbNotes);
    });

  });

  // Create a new note
  app.post("/api/mybooks", function (req, res) {
    console.log("This is the req body")
    console.log(req.body);
    db.Note.create(req.body)
      .then(function (dbNotes) {
        res.json(dbNotes);
      });
  });

  // Delete a note by id
  app.get("/api/mybooks/:id", function (req, res) {
    db.Note.findOne({
      where: {
        id: req.params.id
      }
    }).then(function (dbNotes) {
      res.json(dbNotes);
    });
  });

  app.delete("/api/mybooks/:id", function (req, res) {
    db.Note.destroy({
      where: {
        id: req.params.id
      }
    }).then(function (
      dbNotes
    ) {
      res.json(dbNotes);
    });
  });

  /*************BOOKS ****************/ 

  // put to update book as currently reading 

  app.put("/api/update", function(req, res) {

    console.log("req body: ", req.body); 
    console.log("req.body.bookId: ", req.body.bookId);
    console.log("req.body.userId: ", req.body.userId); 

    db.Book.update({currentlyReading: req.body.currentlyReading},
      {
        where: {
          id: req.body.bookId,
          userId: req.body.userId
        },
        returning: true
      })
      .then(function (result) {
        console.log("result is:", result); 
      })
  });


   // get user id
   app.get("/api/mybooks/:id", function (req, res) {
    // get the book id 
    db.Book.findOne({
      where: {
        userId: req.params.id
      }
    }).then(function (dbBooks) {
      res.json(dbBooks);
    });
  });

  // display all the books
  app.get("/api/fav-books", function (req, res) {

    // console.log("fav-books/:id req is:", req);
    // console.log("fav-books/:id req.user is:", req.user);  
    // console.log("fav-books/:id req.user.id is:", req.user.id); 
    
    // console.log("res is: ", res); 

    db.Book.findAll({
      where: {
        userId: req.user.id
      }
    }).then(function (dbBooks) {
      res.json(dbBooks);
    });
  });


  // display the book that is currently being read 

app.get("/api/fav-books", function(req, res) {

  db.Book.findOne({
    where: {
      currentlyReading: 1,
      userId: req.body.userId
    }
  })
  .then(function (currBook) {
    res.json(currBook);
  });

});



// find a book by id 
  // app.get("/api/fav-books/:id", function (req, res) {

  //   db.Book.findOne({
  //     where: {
  //       userId: req.user.id
  //     }
  //   }).then(function (dbBooks) {
  //     res.json(dbBooks);
  //   });
  // });

  // delete a book 

  app.delete("/api/fav-books/:id", function (req, res) {
    db.Book.destroy({
      where: {
        id: req.params.id
      }
    }).then(function (
      dbBooks
    ) {
      res.json(dbBooks);
    });
  });

  //save a new book

  app.post("/api/favorites", function (req, res) {
    
    console.log("req is: ", req); 
    console.log("req.session is: ", req.session); 
    // console.log("req.user.id is: ", req.user.id); 

    req.body.userId = req.user.id; 
    console.log("req.body.userId", req.body.userId); 

    // console.log("newBook: ", newBook); 

    db.Book.create(req.body).then( function(newfavBook) {
      res.status(201).json(newfavBook);
    })
  }) 
};


