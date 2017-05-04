const models = require("../models");


exports.todo_add = (req, res, next) => {
    console.log(req.body.todo);
    console.log(req.user._id);
    req.checkBody('todo', 'Content must not be empty').notEmpty();
    req.sanitize('todo').escape();
    req.sanitize('todo').trim();

    var errors = req.validationErrors();

    let todo = new models.Todo(
      {
          authorid: req.user._id,
          content: req.body.todo

      });

      if (errors) {
          console.log('todo: '+req.body.todo);
      }
      else {
          todo.save(function (err) {
              if (err) { return next(err); }
                 res.redirect('/');
              });
      }

  };


  exports.index = (req, res, next) => {

    models.Todo.find({'authorid':req.user._id})
      .sort([['title', 'ascending']])
      .exec(function (err, todos) {
        if (err) { return next(err); }
        res.render('index', { title: 'My Todos', todo_list: todos});
    });

  };

  exports.todo_delete = (req, res, next) => {

    models.Todo.findByIdAndRemove(req.body.todoid, function (err) {
        if (err) { return next(err); }
        res.redirect('/');
    });

  };

  exports.todo_complete = (req, res, next) => {

    models.Todo.findByIdAndUpdate(req.body.todoid, {$set: { completed: true }}, function (err) {
        if (err) { return next(err); }
        res.redirect('/');
    });

  };
