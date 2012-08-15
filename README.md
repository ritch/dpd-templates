# dpd-templates

A dpd resource for rendering templates on the server as well as exposing them for use in the browser.

## Template Files

Templates live in the root of their resource instance folder (eg. `/my-project/resources/templates`) and in a `partials` sub folder.

## Server Rendering

Templates can be rendered on the server. They are passed the same default context as all scripts. So they have access to the following data:

 - me      - the currently logged in user, if one exists
 - query   - the querystring serialized as an object
 - session - the current session 

**Default Routes**

By default, templates are availble at the root of the server. For example a template `foo.html` will be available at `/foo`.

**Layouts**

The template resource will first try to use `/resources/templates/layout.html` as the base layout. This can be overriden during the `route` event.

## Events

 - routes - routes are ready to be defined
 - render - right before a template is rendered

## Script Domain / API

### render(data)

* data {Object}

An object containing data to be passed to the template.

  dpd.todos.get({$limit: 3}, function(todos) {
    render(todos);
  });
  
## dpd.js API
  
### dpd.templates.get([name], fn)

* name {String}

The optional name of the template to render.

* fn(result, err)

A callback containing the raw template string or an error if one occurred.

Here's an example retrieving all templates and putting them in a templates object to be rendered later.

    var templates = {};

    dpd.templates.get(function(all, err) {
      all.forEach(function(name) {
        dpd.templates.get(name, function(str) {
          templates[name] = str;
        });
      });
    });
  
  
  
  