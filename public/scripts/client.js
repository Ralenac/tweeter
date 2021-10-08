$(document).ready(() => {

  //// This function loops over each tweet in an array of tweet objects and prepends each tweet in the tweetContainer by calling the createTweetElement function on it.
  const renderTweets = function(tweets) {
    for (const tweet of tweets) {
      const $tweet = createTweetElement(tweet);
      $('#tweets-container').prepend($tweet);
    }

  };

  // This is escape function that prevents XSS
  const escape = function(str) {
    let div = document.createElement("div");
    div.appendChild(document.createTextNode(str));
    return div.innerHTML;
  };


  // This function creates new tweets
  const createTweetElement = ((tweet) => {
    const avatar = tweet.user.avatars;
    const name = tweet.user.name;
    const username = tweet.user.handle;
    const tweetContent = `<p>${escape(tweet.content.text)}</p>`
    const time = timeago.format(new Date());

    const html = `<article class="tweet">
  <header>
    <div class="client"><img src=${avatar} alt="" ><p>${name}</p></div>
       
    <div class="username"><strong>${username}</strong></div>
  </header>
  <p> ${tweetContent}</p>
  <footer class="footer-container">
    
      <div class="date">${time}</div>
      <div class="icons">
        <i class="fas fa-flag"></i>
        <i class="fas fa-retweet"></i>
        <i class="fas fa-heart"></i>
      </div>
  </footer>
  </article>`;

    return html;

  });

  // This function fetch and renders the tweets
  const loadTweets = function() {

    $.ajax({
      method: "GET",
      url: "/tweets",
      success: (tweets) => {
        console.log("data", tweets);
        renderTweets(tweets);
      },
      error: (err) => {
        console.error(`there was an error: ${err}`);
      }
    });

  };

  loadTweets();


  // This function listen for the submit event that is emitted by the form and prevent the default form submission behaviour of sending the post request and reloading the page. If there is no tweet or if is the tweet too long returns error.
  $("#formTweet").submit(function(event) {
    event.preventDefault();

    const error1 = "🛑🛑🛑 The tweet is too long 🛑🛑🛑";
    const error2 = "🛑🛑🛑 Please input text 🛑🛑🛑";

    let inputLength = $(this).children("#tweet-text").val().length;
    if (inputLength > 140) {
      $("#error-message").css("display", "block");
      $("#error-message").text(error1);
      return;
    } else if (!inputLength) {
      $("#error-message").css("display", "block");
      $("#error-message").text(error2);
      return;
    } else {
      const tweet = $("#tweet-text").serialize();
      $.ajax({
        method: "POST",
        url: "/tweets",
        data: tweet
      }).done(() => {
        $("#tweet-text").val("");
        $("tweets-container").empty();
        $(".counter").text("140");
        loadTweets();
      });
    }

  });

});

