$(document).ready(() => {

const data = [
  {
    "user": {
      "name": "Newton",
      "avatars": "https://i.imgur.com/73hZDYK.png"
      ,
      "handle": "@SirIsaac"
    },
    "content": {
      "text": "If I have seen further it is by standing on the shoulders of giants"
    },
    "created_at": 1461116232227
  },
  {
    "user": {
      "name": "Descartes",
      "avatars": "https://i.imgur.com/nlhLi3I.png",
      "handle": "@rd" },
    "content": {
      "text": "Je pense , donc je suis"
    },
    "created_at": 1461113959088
  }
]

const renderTweets = function(tweets) {
  for (const tweet of tweets) {
    const $tweet = createTweetElement(tweet)
    $('#tweets-container').prepend($tweet); 
  }
  
}


const createTweetElement = ((tweet) => {
  const avatar = tweet.user.avatars;
  const name = tweet.user.name;
  const username = tweet.user.handle;
  const tweetContent = tweet.content.text;
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


renderTweets(data);


$("#formTweet").submit(function(event) {
  event.preventDefault()
  const tweet = $("#tweet-text").serialize();
  $.ajax({
    method: "POST",
    url: "/tweets",
    data: tweet
  })
  console.log(tweet)
});


})

