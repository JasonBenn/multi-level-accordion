// (function() {
//   var NestedAccordion = PlatformElement.extend({
//     initialize: function() {
$(document).ready(function() {

  $('.folder').click(function(e) {
    e.stopPropagation();
    $(this).find('.children').toggle();
    $(this).toggleClass('opened');
  });
})
    // },
//   });

//   return NestedAccordion;
// })();
