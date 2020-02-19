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
    }).then(function(albumInfo) {
      console.log(albumInfo);
      $.ajax({
        url: someurl,
        method: "GET"
      }).then(function(songs) {
        let query = songs.track[ath.random() * songs.track.length].strTrack;
        $.ajax({
          url: "https://www.googleapis.com/youtube/v3/search",
          method: "GET",
          data: {
            key: "AIzaSyAIh4pt2_lX-gZ0KipQ4i69duIxKGNMyaY",
            part: "snippet",
            q: query,
            type: "video",
            videoEmbeddable: true
          }
        }).then(function(response) {
          console.log(response.items[0].id.videoId);
        });
      });
    });
  });
}

function kanyeQuote() {
  $.ajax({
    url: "https://api.kanye.rest/?format=text",
    method: "GET"
  }).then(function(quote) {
    console.log(quote);
  });
}

function trumpQuote() {
  $.ajax({
    url: "https://www.tronalddump.io/random/quote",
    method: "GET"
  }).then(function(quote) {
    console.log(quote.value);
  });
}

function giphy() {
  var giphyKey = "M857JYpnuFQyNxgX8ZnQxOT8fQozrWua";
  var giphyURL =
    "api.giphy.com/v1/gifs/random?api_key" + giphyKey + "&tag=" + kanyeTrump;
  $.ajax({
    url: giphyURL,
    method: "GET"
  }).then(function(gif) {
    console.log(gif);
  });
}

$("#submit").on("click", function() {
  // first add then if
  var sum = 0;

  //hide element
  $("#quest").attr("style", "display: none");

  $(".radio:checked").each(function() {
    sum += +this.value;
  });
  console.log(sum);
  if (sum > 1) {
    // // run kanye
    kanyeQuote();
  } else {
    // run trump
    trumpQuote();
  }
});
