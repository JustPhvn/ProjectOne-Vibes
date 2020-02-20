var kanyeTrump;

function kanyeSong() {
  var albumsURL =
    "https://theaudiodb.com/api/v1/json/1/searchalbum.php?s=Kanye_West&s=Kanye_West";

  $.ajax({
    url: albumsURL,
    method: "GET"
  }).then(function(album) {
    let albumID =
      album.album[Math.floor(Math.random() * album.album.length)].idAlbum;
    var albumInfoURL =
      "https://theaudiodb.com/api/v1/json/1/track.php?m=" + albumID;
    $.ajax({
      url: albumInfoURL,
      method: "GET"
    }).then(function(songs) {
      // console.log(albumInfo);
      let query =
        songs.track[Math.floor(Math.random() * songs.track.length)].strTrack;
      console.log(query);
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
          "https://www.youtube.com/embed/" + response.items[0].id.videoId
        );
      });
    });
  });
}

function kanyeQuote() {
  kanyeTrump = "kanye";
  $.ajax({
    url: "https://api.kanye.rest/?format=text",
    method: "GET"
  }).then(function(quote) {
    // console.log(quote);
    $("#quote").text(quote);
  });
  giphy();
}

function trumpQuote() {
  kanyeTrump = "donald trump";
  $.ajax({
    url: "https://www.tronalddump.io/random/quote",
    method: "GET"
  }).then(function(quote) {
    // console.log(quote.value);
    $("#quote").text(quote.value);
  });
  giphy();
}

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
    // console.log(gif.data.url);
  });
}

$("#submit").on("click", function() {
  // first add then if
  var sum = 0;

  //hide element
  $("#quest").attr("style", "display: none");
  $("#result").attr("style", "display: block");

  $(".radio:checked").each(function() {
    sum += +this.value;
  });
  console.log(sum);
  kanyeSong();
  if (sum > 1) {
    // // run kanye
    kanyeQuote();
  } else {
    // run trump
    trumpQuote();
  }
});
