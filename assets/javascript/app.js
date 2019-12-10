$(".searchbar").on("mouseout", function() {
  $(".search_input").css("width", "450px");
})


// Beginning of on click function that holds ajax call for YELP and EVENTFUL APIs in the search bar
$(".yelpApiSearch").on("click", function (event) {
  event.preventDefault();
  console.log("Click!");

  var search = $("#userInput").val();
  console.log(search);
  //Beginning of Yelp ajax call
  var queryURL =
    "https://cors-anywhere.herokuapp.com/https://api.yelp.com/v3/businesses/search?term=" +
    search +
    "&location=philadelphia&radius=40000&limit=10&categories=kids,children";

  $.ajax({
    url: queryURL,
    method: "GET",
    headers: {
      Authorization:
        "Bearer xbvcW29zavUCvrlYQUoiGodM98RsayeaJSphvNMVW8WOY8RfwMsGR7NHtsqubWZhb620AwbXXVvGZG3R-Kui783rGEtf72eWS3BuTAqTQM0DsvaT-V6ddjw8sem6XXYx"
    },
    dataType: "json"
  }).then(function (response) {
    console.log(response);
    $("#scrollDiv").empty();
    var business = response.businesses;
    for (var i = 0; i < business.length; i++) {
      console.log(response);
      console.log(business[i].name);
      var cardImage = $("<img>").attr(
        "src",
        business[i].image_url ||
        "http://www.stleos.uq.edu.au/wp-content/uploads/2016/08/image-placeholder.png"
      );
      cardImage.addClass("card-img-top card-size");
      var newCard = $("<div class='card border-0 rounded shadow bg-light card-results pt-3'>");
      var newCardOverlay = $("<div class='card-body text-muted text-left px-4'>");
      newCard.append(cardImage); 
      var isOpen = "Closed";

      var URL = $("<a />").attr("href", business[i].url).text("Go to Website").attr("target", "blank").addClass("stretched-link")

      console.log(business[i].url)

      console.log("BUSINESS LINK "+ business[i].url)

      // var URL = $("<a />");
      // URL.addClass("btn btn-primary stretched-link").attr("href=", business[i].url).text("Go to Website")
      
      console.log(business[i].is_closed)
      if (business[i].is_closed == false) {
        isOpen = "Open";
      }
      newCardOverlay.append(
        "<span>" + "<strong>" + business[i].name + "</strong>" + "<span>" + "<br>",

        "<span>" + (business[i].location.address1 + "</span>" + ", " + "<span>" + business[i].location.city + "</span>" || "No Address Available")
        + "<br>" + "<span>" + business[i].display_phone + "</span>" + "<br>" + "Rating: " + business[i].rating + "<br>" + isOpen + "<br>", URL
      );

      newCard.append(newCardOverlay);

      $("#scrollDiv").append(newCard);
    }
  });
  // End of Yelp ajax call

  // Beginning of Eventful ajax call
  // var eventfullURL =
  //   "https://api.eventful.com/json/events/search?app_key=Z6B5HZN5sj28LmLD&category=" +
  //   search +
  //   "&location=Philadelphia";
  // $.ajax({
  //   url: eventfullURL,
  //   dataType: "jsonp",
  //   method: "GET"
  // }).then(function (response) {
  //   console.log(response);
  //   $("#scrollDiv2").empty();
  //   var events = response.events.event;
  //   console.log(events);
  //   for (var i = 0; i < events.length; i++) {
  //     console.log(response);
  //     console.log(events[i].city_name);
  //     var cardImage2 = $("<img>").attr(
  //       "src",
  //       "http:" + events[i].image.medium.url ||
  //       "http://www.stleos.uq.edu.au/wp-content/uploads/2016/08/image-placeholder.png"
  //     );
  //     cardImage2.addClass("card-img card-size");
  //     var newCard2 = $("<div class='card'>");
  //     var newCardOverlay2 = $("<div class='card-img-overlay'>");
  //     newCard2.append(cardImage2);
  //     newCardOverlay2.append(
  //       "<p>" + "<strong>" + events[i].city_name + "</strong>" + "</p>",
  //       "<p>" + events[i].venue_name + "</p>",
  //       "<p>" + events[i].venue_url + "</p>"
  //     );

  //     newCard2.append(newCardOverlay2);

  //     $("#scrollDiv2").append(newCard2);
  //   }
  // });
  //End of Eventful ajax call
});
//End of On click function for search bar connected to APIs

//Beginning of on click function that has Yelp ajax call that will produce results in Modal
$(".quick-link-card").on("click", function (event) {
  event.preventDefault();
  $(".modal-body").html("<div class='spinner-border text-primary' role='status'><span class='sr-only'>Loading...</span></div>");
  var term = $(this).attr("data-term");
  console.log(term);
  var queryURL =
    "https://cors-anywhere.herokuapp.com/https://api.yelp.com/v3/businesses/search?term=" +
    term +
    "&location=philadelphia&radius=40000&limit=10&categories=kids,children";

  $.ajax({
    url: queryURL,
    method: "GET",
    headers: {
      Authorization:
        "Bearer xbvcW29zavUCvrlYQUoiGodM98RsayeaJSphvNMVW8WOY8RfwMsGR7NHtsqubWZhb620AwbXXVvGZG3R-Kui783rGEtf72eWS3BuTAqTQM0DsvaT-V6ddjw8sem6XXYx"
    },
    dataType: "json"
  }).then(function (response) {
    console.log(response);
    $("#quickLinkScrollableModal .modal-body").empty();
    var business = response.businesses;
    for (var i = 0; i < business.length; i++) {
      console.log(response);
      console.log(business[i].name);
      var cardImage = $("<img>").attr("src", business[i].image_url);
      cardImage.addClass("img-fluid");
      var row = $("<div class='row mb-2'>");
      var col4 = $("<div class='col-4'>");
      col4.append(cardImage);
      var col8 = $("<div class='col-8'>");
      col8.append("<h4>" + business[i].name + "</h4>");
      col8.append("<p>" + business[i].location.address1 + "</p>");
      col8.append("<p>" + business[i].location.city + "</p>");
      var web = $("<a />", {
        target: "blank",
        href: business[i].url,
        text: "Go to Website"
      });
      console.log(web);

      col8.append(web);
      var row2 = $("<hr>");

      row.append(col4, col8);
      console.log(cardImage);
      $("#quickLinkScrollableModal .modal-body").append(row, row2);
    }
  });
});
//End of quick modal Yelp ajax call

//Carousel
function displayEvent() {
  var eventfullURL =
    "https://api.eventful.com/json/events/search?app_key=Z6B5HZN5sj28LmLD&category=family_fun_kids&location=Philadelphia&date=thismonth&sort_order=popularity";
  $.ajax({
    url: eventfullURL,
    dataType: "jsonp",
    method: "GET"
  }).then(function (response) {
    console.log(response);
    var events = response.events.event;
    console.log(events);
    for (var i = 0; i < events.length; i++) {
      console.log(i);
      var title = events[i].title;
      console.log(title);
      var time = moment(events[i].start_time, "YYYY-MM-DD hh:mm:ss").format(
        "lll"
      );
      console.log(time);
      var venue = events[i].venue_name;
      console.log(venue);
      var vURL = $("<a />", {
        target: "blank",
        href: events[i].venue_url,
        text: events[i].venue_name
      });
      vURL.addClass("venUrl");
      var vAddress = events[i].venue_address;
      console.log(vAddress);
      var city = events[i].city_name;
      var state = events[i].region_abbr;
      var post = events[i].postal_code;
      console.log(post);
      var evURL = $("<a />", {
        target: "blank",
        href: events[i].url,
        text: events[i].title
      });
      evURL.addClass("titleUrl");
      var timeDis = $("<p>").text(time);
      var vAddress = $("<p>").text(vAddress);
      var city = $("<p>").text(city + " " + state + " " + post);
      var image = $("<img>");
      image.addClass("carImg  d-block w-100 text-center rounded");
      image.attr("src", `assets/images/${i + 1}.jpg`);
      var eventSlide = $("<div>");
      eventSlide.addClass("carousel-item text-center");
      if (i === 0) {
        eventSlide.addClass("carousel-item active text-center");
      }
      var caption = $("<div>");
      caption.addClass(
        "carousel-caption border-0 rounded shadow d-none d-md-block pt-2 pb-1"
      );
      caption.append(evURL, timeDis, vURL, vAddress, city);
      eventSlide.append(image, caption);
      $(".carousel-inner").append(eventSlide);
    }
  });
}
displayEvent();
//End of Carousel event

//Player Section
function displayVideo() {
  var ytURL =
    "https://www.googleapis.com/youtube/v3/search?part=snippet&q=Kids+DIY&type=video&order=viewCount&maxResults=7&key=AIzaSyBF9BwZdN66yQbMhHnYanjqRPuVrP2AU2Q";

  $.ajax({
    url: ytURL,
    method: "GET"
  }).then(function (ytResponse) {
    console.log(ytResponse);
    var firstVid;

    for (let i = 0; i < ytResponse.items.length; i++) {

      var url = $("<div>").addClass("vid-item");

      url.attr(
        "data-url",
        "https://www.youtube.com/embed/" + ytResponse.items[i].id.videoId
      );
      var name = ytResponse.items[i].snippet.title;
      firstVid = "https://www.youtube.com/embed/" + ytResponse.items[0].id.videoId;
      console.log(ytResponse.items[i].id.videoId);
      console.log(url);
      console.log(name);

      var thumbnailDiv = $("<div>").addClass("thumb");
      var thumbnailImg = $("<img>").attr(
        "src",
        ytResponse.items[i].snippet.thumbnails.default.url
      );
      thumbnailDiv.append(thumbnailImg);
      url.append(thumbnailDiv);

      var vidTitleDiv = $("<div>").addClass("desc");
      vidTitleDiv.text(name);
      url.append(vidTitleDiv);

      $(".vid-list").append(url);
    }
    $("#vid_frame").attr("src", firstVid);
  });
}
displayVideo();

$(document).on("click", ".vid-item", function () {
  var youtubeURL = $(this).attr("data-url");
  console.log(youtubeURL);
  document.getElementById("vid_frame").src = youtubeURL;
});

//Player arrows

$(document).ready(function () {
  $(".arrow-right").bind("click", function (event) {
    event.preventDefault();
    $(".vid-list-container")
      .stop()
      .animate(
        {
          scrollLeft: "+=336"
        },
        750
      );
  });
  $(".arrow-left").bind("click", function (event) {
    event.preventDefault();
    $(".vid-list-container")
      .stop()
      .animate(
        {
          scrollLeft: "-=336"
        },
        750
      );
  });
});
//End of Player

//Openweather Map query
var APIKey = "166a433c57516f51dfab1f7edaed8413";
var queryURL =
  "https://api.openweathermap.org/data/2.5/weather?" +
  "q=Philadelphia&units=imperial&appid=" +
  APIKey;

// Here we run our AJAX call to the OpenWeatherMap API
$.ajax({
  url: queryURL,
  method: "GET"
})
  // We store all of the retrieved data inside of an object called "response"
  .then(function (response) {
    // Log the queryURL
    console.log(queryURL);
    var weatherIcon = response.weather[0].icon;
    var iconImg = $("<img>");
    // Log the resulting object
    console.log(response);
    iconImg.attr("src", "http://openweathermap.org/img/wn/" + weatherIcon + "@2x.png");

    // Transfer content to HTML
    city = $("#city").html("<h4>" + response.name + "</h4>");
    city.addClass("text-center");
    wind = $("#wind").text("Wind Speed: " + response.wind.speed);
    humidity = $("#humidity").text("Humidity: " + response.main.humidity);
    temp = $("#temp").text(Math.floor(response.main.temp) + "º" + " F");
    minTemp = $("#minTemp").text("Lowest: " + Math.floor(response.main.temp_min) + "º" + " F");
    maxTemp = $("#maxTemp").text("Highest: " + Math.floor(response.main.temp_max) + "º" + " F");
    $("#icon").append(iconImg);



    // Log the data in the console as well
    console.log("Wind Speed: " + wind);
    console.log("Humidity: " + humidity);
    console.log("Temperature (F): " + temp);
  });
//End of openweather map
