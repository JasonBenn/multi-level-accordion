$(document).ready(function() {
  $('.folder').click(function(e) {
    e.stopPropagation();
    $(this).find('.children').toggle();
    $(this).toggleClass('opened');
  });

  // setInterval(function() {
  //   $('.folder:nth-child(2)').click();
  // }, 1500)
})
