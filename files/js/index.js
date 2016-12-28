(function() {
  var NestedAccordion = PlatformElement.extend({
    initialize: function() {
      $('.folder').click(this.toggleFolder);
    },

    toggleFolder: function(e) {
      e.stopPropagation();
      $(this).find('.children').toggle();
      $(this).toggleClass('opened');
    }
  });

  return NestedAccordion;
})();
