'use strict';

$(document).ready(init);

function init() {
  $('#submit').on('click', addRoom)
  $('body').on('click', 'td.delete', deleteRoom)
  $('#itemInp').on('click', showForm)
  $('body').on('click', '#itemSubmit', itemSubmit)
}


function itemSubmit(e){
  e.preventDefault();
  if($('#itemInp').val() && $('#valueInp').val()){
    var obj ={};
    obj.value = $('#valueInp').val();
    obj.description = $('#itemDesc').val();
    obj.name = $('#itemInp').val();
    obj.room = $('#itemRoom').val();

    $.ajax({
      method: 'POST',
      url: '/items',
      data: obj,
      success: function(data, status){

        $('#valueInp').val('');
        $('#itemDesc').val('');
        $('#itemInp').val('');
        $('#itemRoom').val('');

        // ('/:roomId/addItem/:itemId')

        var tableRowID = $("td").filter(function() {
        return $(this).text() == obj.room;
        }).closest("tr").attr('id');


          $.ajax({
            method: 'GET',
            url:'/items/itemsList',
            success: function(data, status){
              var  queryStr = ('/' + tableRowID +'/addItem' +'/' + data[data.length-1]._id)
              $.ajax({
                method: 'PUT',
                url:'/rooms' + queryStr,
                success: function(data, status){
                  var  queryStr = ('/:' + tableRowID +'/addItem' +'/:' + data[data.length-1]._id)
                  console.log('success');
              }
            })
          }
        })
      }
    })
  }
}



function showForm(e){
  if ($('.hidden').length){
  $('.holder').toggleClass('hidden');
  }
}

function addRoom(e){
    e.preventDefault();
    var timeStamp = Date();
    var name = $('#roomInp').val();
    var obj= {};
    obj.name = name;
    obj.createdAt = timeStamp;
    $.ajax({
      method: 'POST',
      url:'/rooms',
      data:obj,
      success: function(data, status){

        $.ajax({
          method: 'GET',
          url:'/rooms/roomsList',
          success: function(data, status){
          var $name = $('<td>').text(data[data.length-1].name);
          var $createdAt = $('<td>').text(obj.createdAt);
          var $edit = $('<td>').addClass('edit');
          var $del = $('<td>').addClass('delete');
          var $editIcon = $('<i>').addClass('fa fa-pencil-square-o fa-lg');
          var $deleteIcon = $('<i>').addClass('fa fa-trash-o fa-lg delete');
          $edit.append($editIcon);
          $del.append($deleteIcon);
          var $newTr = $('<tr>').attr('id', data[data.length-1]._id);
          $newTr.append($name, $createdAt, $edit, $del);
          $('table').append($newTr);
        }
      })
      }
    })
}


function deleteRoom(e){
  $('.editing').addClass('hidden');
  var obj = {};
  var id = $(e.target).closest('tr').attr('id');
  obj._id = id;
  $.ajax({
      method: 'DELETE',
      url: '/rooms',
      data: obj,
      success: function(data,status){
          $(e.target).closest('tr').remove();
      }
    });
}
