# dpd-templates

A dpd resource for rendering templates on the server as well as exposing them for use in the browser.

## Template Files

Templates live in the root of their resource instance folder (eg. `/my-project/templates`) and in a `partials` sub folder.

## Server Rendering

Templates can be rendered on the server. They are passed the same default context as all scripts. So they have access to the following data:

 - me      - the currently logged in user, if one exists
 - query   - the query string serialized as an object
 - session - the current session 

**Default Routes**

By default, templates are available at the root of the server. For example a template `/templates/foo.html` will be available at `/foo`.

**Layouts**

The template resource will first try to use `/templates/layout.html` as the base layout. This can be overridden in its config.
  
  
  