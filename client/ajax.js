
var currMessages = [];
var ajax ={
  urlMessages: "/get-messages",
  urlUsers:"/get-users",
  getUsers:function(){
    $.ajax({
      url:ajax.urlUsers,
      method:'GET',
      data: ajax.urlUsers,
      success:function(data){
        // console.log(data);
        _.each(data, function(el, idx, arr){
          ajax.printUsers(el, 'users');
        if(idx > 0 && $('input[name="rusername"]').val() === el.username){
          $.ajax({
            url:ajax.urlUsers + el._id,
            method:'DELETE',
            success:function(){
              console.log('success');
            }
          });
        }
        if($('input[name="username"]').val() === el.username && $('input[name="password"]').val() === el.password){
          $('.paywall').removeClass('display-block');
          $('.paywall').addClass('display-none');
          $('.main').removeClass('display-none');
          $('.main').addClass('display-block');
          localStorage.setItem('username',el.username);
        }
        else{
          $('input[name="username"]').val('');
          $('input[name="password"]').val('');
          alert('this is not my password');
        }
      });
      },
      failure:function(user){
        consle.log(user +":did not load");
      }
    });
  },
  getMessageButtons:function(){
    $.ajax({
      type: 'GET',
      url: ajax.urlMessages,
      success: function(data) {
        var username = localStorage['username'];
        _.each(data,function(el){
          if(el.recipient == username){
            ajax.printMessageButton(el);
            //add message id to currMessages array
            currMessages.push(el._id);
          }
        });
      },
      failure: function(data) {
        console.log("FAILURE: ", data);
      }
    });
  },
  getNewMessageButtons:function(){
    $.ajax({
      type: 'GET',
      url: ajax.urlMessages,
      success: function(data) {
        var username = localStorage['username'];
        _.each(data,function(el){
          if(el.recipient == username){
            if(!_.contains(currMessages,el._id)){
            ajax.printMessageButton(el);
            currMessages.push(el._id);
              }
          }
        });
      },
      failure: function(data) {
        console.log("FAILURE: ", data);
      }
    });
  },
  getMessageText:function(messageId){
      $.ajax({
        type:'GET',
        url:ajax.urlMessages,
        success:function(data){
          _.each(data,function(el){
            if(el._id ===messageId){
              ajax.printMessageText(el);
              console.log(el.message);
            }
          });
        }
      });
  },
  postUsers:function(user){
    $.ajax({
      url:ajax.urlUsers,
      method:'POST',
      data: user,
      success:function(user){
        ajax.getUsers();
      },
      failure:function(data){
        console.log("You are a failure" + data);
      }
    });
  },
  postMessages:function(message){
    $.ajax({
      url: ajax.urlMessages,
      method: 'POST',
      data: message,
      success: function(resp) {
        console.log('success');
      },
      failure: function(resp) {
        console.log("FAILURE", resp);
      }
    });
  },
  deleteUsers:function(userid){
    $.ajax({
      url: ajax.urlUsers + userid,
      method: 'DELETE',
      success:function(data){
        console.log(data + "deleted");

      },
      failure:function(){
        console.log(data + " :not deleted, idiot");
      }

    });
  },
  deleteMessages:function(messageId,liSelector,paragraphSelector){
    $.ajax({
      method: 'DELETE',
      url: ajax.urlMessages + messageId,
      success: function(data) {
        console.log("DELETED", data);
        $(liSelector).remove();
        $(paragraphSelector).remove();
      },
      failure: function(data) {
        console.log("ERROR", data);
      }
    });
  },
  deleteAllUsers:function(){
    $.ajax({
      method:'GET',
      url: ajax.urlUsers,
      success:function(data){
        _.each(data,function(el){
          var id = el._id;
          var uniqueUrl = ajax.urlUsers + id;
          ajax.deleteUsers(id);
        });
      }
    });
  },
  deleteAllMessages:function(){
    $.ajax({
      method:'GET',
      url:ajax.urlMessages,
      success:function(data){
        _.each(data,function(el){
          var id = el._id;
          var uniqueUrl = messageUrl + id;
          ajax.deleteMessages(id);
        });
      }
    });
  },
  printUsers:function(data,selectorName){
    var selector = "." + selectorName;
    var tmpl = _.template(templates.users);
    $(selector).append(tmpl(data));
    if(data.username === localStorage['recipient']){
      console.log(data.username);
      var currRecipientSelector = "#"+data.username;
      $(currRecipientSelector).css("color","red");
    }


  },
  printMessageButton:function(data){
    var tmpl = _.template(templates.newMessage);
      $('.nav-tabs').append(tmpl(data));
  },
    printMessageText:function(data){
      var tmpl = _.template(templates.messageParagraph);
      $('.message-text-box').append(tmpl(data));
    },

};
