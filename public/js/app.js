//Global variables
var userInput;

// This function handles events where SEARCH button is clicked
$("#search-btn").on("click", function(event) {
  $("#resultsDiv").empty();
  userInput = $("#search-input")
    .val()
    .trim()
    .split(" ")
    .join("+");

  console.log(userInput);

  renderBooks();
});

function renderBooks() {
  var parameter = "";
  // var userInput = "";
  var queryURL =
    "https://www.googleapis.com/books/v1/volumes?q=" +
    userInput +
    parameter +
    ":keyes&key=AIzaSyBaLr5TPsFewkitZXad_5_EaTeCT35K9No";

  console.log(queryURL);
  $.ajax({
    url: queryURL,
    method: "GET"
  }).then(function(response) {
    console.log(response);

    var booksArr = [];
    var title;
    var author;
    var image;
    var description;
    var isbn;
    var pageCount;
    var publishedDate;

    var results = response.items;

    for (var i = 0; i < results.length; i++) {
      booksArr.push(results[i]);
    }

    for (var i = 0; i < 5; i++) {
      console.log(booksArr[i]);

      title = booksArr[i].volumeInfo.title;
      author = booksArr[i].volumeInfo.authors[0] || "";
      rating = booksArr[i].volumeInfo.averageRating;
      image = booksArr[i].volumeInfo.imageLinks.thumbnail;
      description = booksArr[i].volumeInfo.description;
      isbn = booksArr[i].volumeInfo.industryIdentifiers[0].identifier;
      pageCount = booksArr[i].volumeInfo.pageCount;
      publishedDate = booksArr[i].volumeInfo.publishedDate;

      var card = $("<div>");
      card.addClass("card form-rounded");

      var imageDiv = $("<div>");
      imageDiv.addClass("float-left thumbnail");

      var textDiv = $("<div>");
      textDiv.addClass("float-left textWrap");

      var bookShelfBtn = $("<button>");
      bookShelfBtn.addClass("btn btn-warning form-rounded");
      bookShelfBtn.text("Add to Bookshelf");

      var cardBody = $("<div>");
      cardBody.addClass("card-body");

      var bookTitle = $("<h5>");
      bookTitle.text(title);
      bookTitle.addClass("card-text");

      var bookPageCount = $("<p>");
      bookPageCount.addClass("card-text");
      bookPageCount.text("Page Count: " + pageCount);

      var bookPublishedDate = $("<p>");
      bookPublishedDate.addClass("card-text");
      bookPublishedDate.text("Published Date: " + publishedDate);

      var bookISBN = $("<p>");
      bookISBN.addClass("card-text");
      bookISBN.text("ISBN_10: " + isbn);

      var bookPageCount = $("<p>");
      bookPageCount.addClass("card-text");
      bookPageCount.text("Page Count: " + pageCount);

      var bookRating = $("<span>");
      bookRating.addClass("card-text rating");
      bookRating.attr("data-default-rating", rating);
      bookRating.attr("disabled", true);
      // console.log(rating)

      var br = $("<p>");
      br.text("");

      var bookAuthor = $("<p>");
      bookAuthor.text("By: " + author);
      bookAuthor.addClass("card-text");

      var cardImage = $("<img>");
      cardImage.attr("src", image);

      var modalBtn = $("<button>");
      modalBtn.addClass("btn btn-warning form-rounded modalBtn");
      modalBtn.data("toggle", "modal");
      modalBtn.data("target", "#launchModal");
      modalBtn.text("More Info");
     
      $(".modalBtn").on("click", function(event) {

      //Book Modal
      var modalDiv = $("<div>");
      modalDiv.addClass("modal-fade");
      modalDiv.attr("id", "launchModal");
      modalDiv.attr("")

      var modalContent = $("<div>");
      modalContent.addClass("modal-dialog");
      modalDiv.append(modalContent);

      var modalHeader = $("<div>");
      modalHeader.addClass("modal-header");
      modalContent.append(modalHeader);

      var modalTitle = $("<h5>");
      modalTitle.addClass("modal-header");
      modalTitle.text(title);
      modalHeader.append(modalTitle);
      });
      // cardBody.append(cardImage);
      // cardBody.append(bookTitle);
      // cardBody.append(bookAuthor);
      // cardBody.append(bookRating);
      // cardBody.append(bookPublishedDate);
      // cardBody.append(bookISBN);
      imageDiv.append(cardImage);
      textDiv.append(bookTitle);
      textDiv.append(bookAuthor);
      // textDiv.append(bookPublishedDate);
      // textDiv.append(bookISBN);

      if (rating) {
        textDiv.append(bookRating);
      }

      textDiv.append(br);
      textDiv.append(bookShelfBtn);
      textDiv.append(modalBtn);
      cardBody.append(imageDiv);
      cardBody.append(textDiv);
      card.append(cardBody);
      $("#resultsDiv").append(card);
    }

    var ratings = $(".rating");
    console.log(ratings);

    for (var i = 0; i < ratings.length; i++) {
      var r = new SimpleStarRating(ratings[i]);
    }
  });
}
