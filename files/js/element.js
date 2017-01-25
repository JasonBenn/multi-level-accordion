/**
 * This is required for element rendering to be possible
 * @type {PlatformElement}
 */
(function() {
  var configuration = "\
    1, Home\n\
    2, Roadmap\n\
    2a, Getting Started\n\
    2a1, Scoping, /scoping\n\
    2a2, Identifying Partners, /identifying-partners\n\
    2a3, Building Consensus, /building-consensus\n\
    2a4, Making Decisions\n\
    2a4a, Effectiveness of Anticipated Communications Options, /effectiveness\n\
    3, Legal Factors\n\
    4, Funding\n\
    4a, EPA Drinking Water State Revolving Loan Fund, /epa-load-fund\n\
    4b, EPA Water Infrastructure Finance and Innovation Act, /epa-wifi-act\n\
    5, EPA Water Infrastructure Finance and Innovation Act, /epa-wifi-act"

  var $accordion = $('<div class="nested-accordion"></div>');

  var NestedAccordion = PlatformElement.extend({
    initialize: function(options) {
      _.extend(this, options);
      var lines = _.map(configuration.split("\n"), function(line) {
        var components = line.split(", ");
        var structure = components[0].trim();
        var nesting = structure.length - 1;
        return {
          structure: structure,
          nesting: nesting,
          label: components[1],
          url: components[2]
        }
      });

      _.each(lines, this.insertLine.bind(this));
      this.openToCurrentUrl($accordion)
      this.$el.append($accordion);

      $('.folder').click(function(e) {
        e.stopPropagation();
        $(this).children('.children').slideToggle();
        $(this).toggleClass('opened');
      });
    },

    linkTemplate: function() {
      return "<section class='nesting-{{nesting}}' {{structure}}><a href='{{url}}'>{{label}}</a></section>"
    },

    renderTemplate: function(template, line) {
      return template.replace(/\{\{(\w+)\}\}/g, function(fullMatch, parensMatch) {
        return line[parensMatch];
      });
    },

    folderTemplate: function() {
      console.log(this);
      return "\
      <div class='folder' data-structure={{structure}}>\
        <section class='folder-label nesting-{{nesting}}'>\
          <img src='"+this.assets_path+"angle-right.svg' class='folder-arrow'>\
          {{label}}\
        </section>\
        <div class='children' style='display: none;'>\
        </div>\
      </div>"
    },

    getParentStructure: function(structure) {
      var structure = structure.match(/[a-zA-Z]+|[0-9]+/g);
      var parentStructure = structure.slice(0, -1).join("");
      return parentStructure;
    },

    insertLine: function(line) {
      var parentStructure = this.getParentStructure(line.structure);
      if (!parentStructure.length) {
        $accordion.append(this.renderLine(line));
      } else {
        var selector = '[data-structure=' + parentStructure + '] > .children'
        $accordion.find(selector).append(this.renderLine(line));
      }
    },

    renderLine: function(line) {
      if (line.url) {
        return this.renderTemplate(this.linkTemplate(), line);
      } else {
        return this.renderTemplate(this.folderTemplate(), line);
      }
    },

    openToCurrentUrl: function(accordion) {
      // TODO: use location.pathname
      var $currentLink = $accordion.find("[href='" + "/identifying-partners" + "']");
      $currentLink.closest('section').addClass('current');
      var $currentLink = $accordion.find("[href='" + "/effectiveness" + "']");
      $currentLink.closest('section').addClass('current');
      $currentLink.parentsUntil('.nested-accordion', '.folder').addClass('opened');
      $currentLink.parentsUntil('.nested-accordion', '.children').toggle();
    }
  });

  window.NestedAccordion = NestedAccordion;
  return NestedAccordion;
})();
