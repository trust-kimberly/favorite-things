/*

Making a Favorites List: Event Delegation

Objective: Use event delegation so that I only have
to set one event listener for all the items once, when the
code first runs, and don't have to add any others whenever 
an item is added.

*/

// adding new item to list

function addToList($list, thing) {
  let $thingLi = $('<li>').html('<span>' + thing + '</span>').addClass('fav-thing');
  addCompleteLink($thingLi);
  addDeleteLink($thingLi);
  $list.append($thingLi);
}

// complete link

function addCompleteLink($li) {
  let $completedLink = $('<input type="checkbox"> ').addClass('complete-task');
  $li.prepend($completedLink);
}

// delete link

function addDeleteLink($li) {
  let $deletedLink = $('<span>').text(' Delete').addClass('delete');
  $li.append($deletedLink);
}

$(document).ready(function() {
  let $thingList = $('#fav-list');
  let $things = $('.fav-thing');
  let $button = $('#new-thing-button');
  let $newThingInput = $('#new-thing');

  $things.toArray().forEach(function(li) {
    addCompleteLink($(li));
    addDeleteLink($(li));
  });

  $thingList.on('mouseenter mouseleave', 'li', function(e) {
    if(e.type == 'mouseenter') {
      $(this).removeClass('inactive');
      $(this).siblings().addClass('inactive');
    } else if (e.type == 'mouseleave') {
      $(this).siblings().removeClass('inactive');
    }
  });

  $button.on('click', function(event) {
    event.preventDefault();
    let newThing = $newThingInput.val();
    if (newThing === '') {
      alert('You must type in a value!');
    } else {
      addToList($thingList, newThing);
      $newThingInput.val('');
    }
  });

  // clicking checkbox again to uncomplete

  $thingList.on('click', 'li .complete-task', function(e) {

    let span = $($(e.target).siblings()[0]);

    if (span.hasClass('completed')) {
      span.removeClass('completed');
    } else {
      span.addClass('completed');
    } 
    console.log(span);
  });

  $thingList.on('click', '.delete', function(e) {
    $(e.target).parent('li').remove();
  });

});
