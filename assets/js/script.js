//init variables
var kanyeTrump;
var answers = 0;

//How to get a Kanye song
function kanyeSong() {
  //URL linking to specific Kanye album search
  var albumsURL =
    "https://theaudiodb.com/api/v1/json/1/searchalbum.php?s=Kanye_West&s=Kanye_West";

  //Call to get Kanye album
  $.ajax({
    url: albumsURL,
    method: "GET"
  }).then(function(album) {
    // set ID to random album
    let albumID =
      album.album[Math.floor(Math.random() * album.album.length)].idAlbum;
    var albumInfoURL =
      "https://theaudiodb.com/api/v1/json/1/track.php?m=" + albumID;
    //Call to get specific album data
    $.ajax({
      url: albumInfoURL,
      method: "GET"
    }).then(function(songs) {
      //set query to random track in album
      let query =
        songs.track[Math.floor(Math.random() * songs.track.length)].strTrack;
      console.log(query);
      //Call to get Youtube video for track picked
      $.ajax({
        url: "https://www.googleapis.com/youtube/v3/search",
        method: "GET",
        data: {
          key: "AIzaSyAIh4pt2_lX-gZ0KipQ4i69duIxKGNMyaY",
          part: "snippet",
          q: "Kanye West" + query,
          type: "video",
          videoEmbeddable: true
        }
      }).then(function(response) {
        console.log(response.items[0].id.videoId);
        $("#video").attr(
          "src",
          "https://www.youtube.com/embed/" +
            response.items[0].id.videoId +
            "?&autoplay=1"
        );
      });
    });
  });
}

//Get a random Kanye quote
function kanyeQuote() {
  kanyeTrump = "kanye";
  $.ajax({
    url: "https://api.kanye.rest/?format=text",
    method: "GET"
  }).then(function(quote) {
    $("#quote").text(quote);
  });
  giphy();
}

//Get a random Trump quote
function trumpQuote() {
  kanyeTrump = "donald trump";
  $.ajax({
    url: "https://www.tronalddump.io/random/quote",
    method: "GET"
  }).then(function(quote) {
    $("#quote").text(quote.value);
  });
  giphy();
}

//Get a random Kanye/Trump gif
function giphy() {
  var giphyKey = "M857JYpnuFQyNxgX8ZnQxOT8fQozrWua";
  var giphyURL =
    "https://api.giphy.com/v1/gifs/random?api_key=" +
    giphyKey +
    "&tag=" +
    kanyeTrump;
  $.ajax({
    url: giphyURL,
    method: "GET"
  }).then(function(gif) {
    $(".gif").attr("src", gif.data.image_original_url);
  });
}

//Submit quiz
$("#submit").on("click", function() {
  $(window).scrollTop(0);
  for (let i = 0; i < 10; i++) {
    if (document.getElementsByName("buttons")[i].checked === true) {
      answers++;
    }
  }
  if (answers === 5) {
    // first add then if
    var sum = 0;

    //hide element
    $("#quest").attr("style", "display: none");
    $("#result").attr("style", "display: block");

    $(".radio:checked").each(function() {
      sum += +this.value;
    });

    answers = 0;

    kanyeSong();
    if (sum > 1) {
      // // run kanye
      kanyeQuote();
    } else {
      // run trump
      trumpQuote();
    }
  } else {
    answers = 0;
  }
});
//Enter from front page
$("#enter").on("click", function() {
  $("#welcome").attr("style", "display: none");
  $("#quest").attr("style", "display: block");
  document.body.style.backgroundColor = "rgb(248, 248, 175)";
});
//Reset to front page
$("#restart").on("click", function() {
  if ($("#welcome").attr("style") === "display: none") {
    document.body.style.backgroundColor = "black";
    $("#welcome").attr("style", "display: block");
    $("#quest").attr("style", "display: none");
    $("#result").attr("style", "display: none");
    for (let i = 0; i < 10; i++) {
      document.getElementsByName("buttons")[i].checked = false;
    }
  } else {
    console.log("Hewwo");
  }
});
