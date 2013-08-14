$(document).ready(function(){

	var	tools = {
			pluralize: function(element, word) {
				return element > 1 ?  word + 's' : word;
			},
			showHide: function(trigger, element) {
				return !trigger.length ? element.fadeOut() : element.fadeIn();
			},
			getDate: function(month, day){
				date = new Date();
				month = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dic'];
				return month[date.getMonth()] + ' ' + date.getDay() + ' @ ' + date.getHours() + ':' + date.getMinutes();
			}
		};

	var App = {

		init: function(){
			this.getElements();
			this.events();
		},

		getElements: function(){
			twitterUser = 'olverajuanluis';
			manyTweets = 3;
			form = $('.app-todo');
			add = $('.add-todo');
			date = new Date();
			list = $('.list');
			options = $('.options');
			items = $('.items');
			clear = $('.clear');
			check = $('.done-todo');
			twitter = $('.twitter');
			task = ({
				template: function(desc){
					return '<li class="li-todo"><input name="done-todo" type="checkbox" class="done-todo"><p class="desc" style="width: 70%;">' + desc + '</p> <span class="date">' + tools.getDate() + '</span></li>';
				}
			});
			numOfTasks = $('.tasks');
			getTasks = 0;
		},

		events: function(){
			form.submit(this.create);
			check.live('click', this.toggleDone);
			clear.click(this.clearCompleted);
			$('.desc').live('dblclick', this.edit);
			twitter.showTweets;
		},

		//what happens when we create a new task
		create: function(e){
			e.preventDefault();
			//insert the 'li' that represent the new task
			list.prepend(task.template(add.val()));
			//clean the input
			add.val('');
			getTasks++;		

			App.render();
		},

		toggleDone: function(){
			$(this).next().toggleClass('checked');
			$(this).next().hasClass('checked') ? getTasks-- : getTasks++;

			App.render();
		},

		clearCompleted: function(){
			listItems.find('input:checked').parent().remove();

			App.render();
		},

		edit: function(){
			$(this).next().hide()
				   .parent().addClass('white');
			$(this).attr('contentEditable', 'true').focus().keypress(function(event){
				var keycode = (event.keyCode ? event.keyCode : event.which);
		   		if(keycode == '13'){
			        //when editing and press enter, take off contenteditable attr and set outline none to take the focus off
			        event.target.blur();
			        $(this).attr('contenteditable','false').parent().removeClass('white');
			        $('.date').show();   
		        } 
			});
		},

		showTweets: function(){
			$.ajax({
			    url: 'http://api.twitter.com/1/statuses/user_timeline/' + twitterUser + '.json?&count=' + manyTweets +'&callback=?',
			    dataType: 'json',
			    timeout: 15000,

			    success: function(data) {
			      for (i=0; i<data.length; i++) {
			        $(this).append('<li class="each">' + data[i].text + '<strong>' + data[i].created_at + '</strong></li>');
			      }
			    },

			    error: function() {
			      $(this).html('Problem loading Tweets');
			    }

			});

		},

		render: function(){
			listItems = $('.list li');
			//get task or tasks
			items.html(tools.pluralize(getTasks, 'task'));
			//show the number of tasks created
			numOfTasks.html(getTasks);
			//call the method that show options and clear option
			tools.showHide(listItems.find('input:checked'), clear);
			tools.showHide(listItems, options);
		}
	};
	
	App.init();
});