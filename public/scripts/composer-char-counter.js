// This function count the number of characters entered in text-box and change colour to red when exceeds the limit.

$(document).ready(function() {
  $('textarea').on("input", function() {
    const maxLength = 140;
    let inputLength = $(this).val().length;

    $("#error-message").css("display", "none");

    const caractersLeft = maxLength - inputLength;

    const $counter = $(this).siblings("footer").children('.tweeter').children('.counter');
    $counter.text(caractersLeft);

    if (caractersLeft < 0) {
      $counter.addClass("counterError");
    } else {
      $counter.removeClass("counterError");
    }
  });

});

