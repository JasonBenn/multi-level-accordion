$(document).ready(function() {
  $('.folder').click(function() {
    $(this).toggleClass('opened');
  });

  setInterval(function() {
    $('.folder:nth-child(2)').click();
  }, 1500)
})
