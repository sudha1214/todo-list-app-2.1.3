var options = $('.options'),
    clear = $('.clear'),
    list = $('.list');

  //Function to add a task to the list
  $('form.app-todo').submit(function() {


  	//Create a var for the input class
    var Todo = $('.add-todo'),
    //Var with a li element with a checkbox input and I added the input value on it
      	newTodo = '<li class="li-todo"><input name="done-todo" type="checkbox" class="done-todo" value="">' + Todo.val() +  '</li>'; 

    //Insert the task in to the list
    list.prepend(newTodo);

    //Clear the input field to be ready for type the next task
    Todo.val('');
    
    //Show the little option div behind the list
    options.fadeIn();

    //This is for show the tasks that are able to be done
    $('span.items').html($('.list li').length);

    //This stop the refresh page after the submit
    return false;
  });

  //Add style to completed task
  //I use live because the element I'm targeting is added dynamically
  //So I need to bind the function to that element added using live
  $('.done-todo').live('click', function(){

  	//When we do click on checkbox add this class to the element
  	$(this).parent().toggleClass('checked');

  	//Also show the option "Clear completed tasks"
  	clear.fadeIn();
  });

  //Function to clear tasks done
  clear.click(function(){

  	//We save all the checkbox that are checked in to a variable
    var checked = $('input:checked');

    //This find all the checked inputs, take the parent element in this case 'li'
    //Do a fadeout effect and then remove it from the page
    list.find(checked).parent().fadeOut().remove();

    //Update the tasks that are able to be done showing how many 'li' elements are there
    $('span.items').html($('.list li').length);

    //If we have no tasks left, disappear the div behind the list
    //because we don't need it if we don't have tasks
    if ($('.list li').length == 0) {
    	options.fadeOut();
    	clear.fadeOut();
    }

  });
