$(document).ready(() => {

  const renderTweets = function (tweets) {
    for (const tweet of tweets) {
      const $tweet = createTweetElement(tweet)
      $('#tweets-container').prepend($tweet);
    }

  }

  const escape = function (str) {
    let div = document.createElement("div");
    div.appendChild(document.createTextNode(str));
    return div.innerHTML;
  };

  

  const createTweetElement = ((tweet) => {
    const avatar = tweet.user.avatars;
    const name = tweet.user.name;
    const username = tweet.user.handle;
    const tweetContent = `<p>${escape(tweet.content.text)}</p>`
    const time = timeago.format(new Date())

   


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
</article>`
    return html;

  })

  const loadTweets = function () {

    $.ajax({
      method: "GET",
      url: "/tweets",
      success: (tweets) => {
        console.log("data", tweets)
        renderTweets(tweets)
      },
      error: (err) => {
        console.error(`there was an error: ${err}`);
      }
    })

  }

  loadTweets();

  $("#formTweet").submit(function (event) {
    event.preventDefault()

    let inputLength = $(this).children("#tweet-text").val().length
    if (inputLength > 140) {
      alert("The content is too long")
    } else if (!inputLength) {
      alert("The content couldn't be emply")
    } else {
      const tweet = $("#tweet-text").serialize();
      $.ajax({
        method: "POST",
        url: "/tweets",
        data: tweet
      }).done(() => {
        loadTweets()
      })
    }

  });


})

