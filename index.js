// (function() {
//   var NestedAccordion = PlatformElement.extend({
//     initialize: function() {
var configuration = "\
1, Home\n\
2, Roadmap\n\
2a, Getting Started\n\
2a1, Scoping, /scoping\n\
2a2, Identifying Partners, /identifying-partners\n\
2a3, Building Consensus, /building-consensus\n\
2a4, Making Decisions, /making-decisions\n\
2a4a, Effectiveness of Anticipated Communications Options, /effectiveness\n\
3, Legal Factors\n\
4, Funding\n\
4a, EPA Drinking Water State Revolving Loan Fund, /epa-load-fund\n\
4b, EPA Water Infrastructure Finance and Innovation Act, /epa-wifi-act"


var FOLDER_TEMPLATE = "\
  <div class='folder opened' data-structure={{structure}}>\
    <section>{{label}}</section>\
    <div class='children'>\
    </div>\
  </div>\
"

var LINK_TEMPLATE = "\
  <section {{structure}}><a href='{{url}}'>{{label}}</a></section>\
"

function renderTemplate(template, line) {
  return template.replace(/\{\{(\w+)\}\}/g, function(fullMatch, parensMatch) {
    return line[parensMatch];
  });
}

function getParentStructure(structure) {
  var structure = structure.match(/[a-zA-Z]+|[0-9]+/g);
  var parentStructure = structure.slice(0, -1).join("");
  return parentStructure;
}

function insertLine(line) {
  var parentStructure = getParentStructure(line.structure);
  if (!parentStructure.length) {
    $accordion.append(renderLine(line));
  } else {
    var selector = '[data-structure=' + parentStructure + '] > .children'
    $accordion.find(selector).append(renderLine(line));
  }
}

function renderLine(line) {
  if (line.url) {
    return renderTemplate(LINK_TEMPLATE, line);
  } else {
    return renderTemplate(FOLDER_TEMPLATE, line);
  }
}

var $accordion = $('<div class="nested-accordion"></div>');

$(document).ready(function() {

  var lines = _.map(configuration.split("\n"), function(line) {
    var components = line.split(", ");
    return {
      structure: components[0],
      label: components[1],
      url: components[2]
    }
  });

  _.each(lines, insertLine);
  $('body').append($accordion);

  $('.folder').click(function(e) {
    e.stopPropagation();
    $(this).find('.children').toggle();
    $(this).toggleClass('opened');
  });
});
    // },
//   });

//   return NestedAccordion;
// })();
