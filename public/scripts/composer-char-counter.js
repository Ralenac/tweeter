$(document).ready(function() {
  $('textarea').on("input",function(input) {
    const maxLength = 140
    let inputLength = $(this).val().length

    const caractersLeft = maxLength - inputLength
    
    const $counter = $(this).siblings("footer").children('.tweeter').children('.counter'); 
    $counter.text(caractersLeft)

    if (caractersLeft < 0) {
      $counter.css("color", "red")
    } else {
      $counter
    }
  });

});

