var li = document.createElement('li');
var span = document.createElement('span');
var i = document.createElement('i');
var ul = document.createElement('ul');

var removeItem = function onclick(){
    var containingEl = this.parentNode;
    fetch('/deletetask', {
	method: 'POST',
  credentials: 'same-origin',
  body: JSON.stringify({ todoid: containingEl.getAttribute('id') }),
  headers: { 'Content-Type': 'application/json' }
}).then(function() { window.location.reload(); });
};

var completedItem = function onclick(){
    var containingEl = this.parentNode;
    fetch('/completetask', {
	method: 'POST',
  credentials: 'same-origin',
  body: JSON.stringify({ todoid: containingEl.getAttribute('id') }),
  headers: { 'Content-Type': 'application/json' }
}).then(function() { window.location.reload(); });
};

function buildTask(todoText,checkedFlag,todoId){
    var newEl = li.cloneNode(false);
    var newText = document.createTextNode(todoText);
    newEl.setAttribute('id', todoId);
    newEl.setAttribute('data-isdone', checkedFlag);
    newEl.appendChild(newText);
    newEl.classList.add('row');
    if (newEl.getAttribute('data-isdone')==='true') newEl.setAttribute('class','complete');

    function newSpan(c1, c2){
        var newSpan = span.cloneNode(false);
        newSpan.classList.add(c1);
        var newI = i.cloneNode(false);
        newI.classList.add("fa", c2);
        newSpan.appendChild(newI);
        if (c1==='remove'){
            newSpan.onclick = removeItem;
        }
        else {
            newSpan.onclick = completedItem;
        }
        return newSpan;
    }

    newEl.appendChild(newSpan('remove', "fa-trash-o"));
    newEl.appendChild(newSpan('completed', "fa-check"));
    var position = document.getElementsByTagName('ul')[0];
    position.appendChild(newEl);
}

var position = document.getElementsByClassName('container')[0];
position.appendChild(ul);

for (var count=0; count<allTasks.length; count++){
    buildTask(allTasks[count].content,allTasks[count].completed,allTasks[count]._id);
}

add_task.onclick = function(){
  if (todo_text.value) {
    fetch('/addtask', {
	  method: 'POST',
    credentials: 'same-origin',
	  body: JSON.stringify({ todo: todo_text.value }),
    headers: { 'Content-Type': 'application/json' }
    }).then(function() { window.location.reload(); });
 }
};
