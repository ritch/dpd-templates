var Resource = require('deployd/lib/resource')
  , util = require('util')
  , fs = require('fs')
  , ejs = require('ejs');

function Templates(name, options) {
  Resource.apply(this, arguments);
  var server = options.server;
  // override the configured path
  // so we can handle all requests
  this.path = '/';
  this.ext = options.extension || '.html';
  this.dir = options.dir || 'templates';
  
  var layout = this.dir + '/layout.html';
  
  fs.exists(layout, function (exists) {
    if(!exists) {
      fs.writeFileSync(layout, fs.readFileSync(__dirname + '/example-layout.html'));
    }
  })
}


util.inherits(Templates, Resource);
module.exports = Templates;

Templates.basicDashboard = {
  settings: [
    {
       type: 'text'
     , name: 'extension'
    }
  ]
};

Templates.prototype.handle = function (ctx, next) {
  var path = ctx.url === '/' ? '/index' : ctx.url
    , temp = this
    , file = this.dir + path + this.ext
    , options = {};
    
  options.partial = function (name, data) {
    var result;
    try {
      result = fs.readFileSync(temp.dir + '/partials/' + name + temp.ext, 'utf-8');
    } catch(e) {}
    
    if(result) {
      result = ejs.render(result, data || {});
    }
    
    return result;
  }
  
  fs.exists(file, function (exists) {
    if(exists) {
      fs.readFile(temp.dir + '/layout.html', 'utf-8', function (err, layout) {
        fs.readFile(file, 'utf-8', function (err, page) {
          if(err) return ctx.done(err);
          options.body = ejs.render(page, options);
          var result = ejs.render(layout, options);

          ctx.res.setHeader('content-type', 'text/html');
          ctx.res.setHeader('content-length', result.length);
          ctx.res.end(result);
        });
      });
    } else {
      next();
    }
  })
}