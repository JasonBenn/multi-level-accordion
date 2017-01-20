Review checklist: https://dev.weebly.com/app-policy-review-checklist.html
Element structure: https://dev.weebly.com/add-element-folders.html
- What is editor_element.tpl/css?
  - Ah, it's placeholder content when you drop it onto a page. I'll need it, then.
- Don't set width on element.

x- Put accordion on site
- Change colors to their scheme
- change sublevel coloring
x- experiment with manifest settings
x- automatically open accordion to url

- Subpages are clearly delineated with different colors/shades as well as smaller and indented text
- The page one is currently on is highlighted
- Triangle icon indicating additional subpages works, but we are open to a different icon


Hmm.

Their accordion allows you to put other elements inside of it with this line: {content_{{items_index}}:content}
  - This won't work, though - I'm still necessary. Can't style entire content area, even with "Embed Code".
  - "Embed Code" COULD work in general, although it won't allow them to easily update the accordion.
However, all I can do is allow them to choose number of rows. That sucks!
  - Means we'll need a clever hack to get around it.
