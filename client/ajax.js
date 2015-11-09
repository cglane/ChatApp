
var currMessages = [];
var ajax ={
  urlMessages: "/get-messages",
  urlUsers:"/get-users",
  loginUsers:function(){
    $.ajax({
      url:ajax.urlUsers,
      method:'GET',
      data: ajax.urlUsers,
      success:function(data){
        // console.log(data);
        _.each(data, function(el, idx, arr){
          console.log(el);
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
          $('.container.main').removeClass('display-none');
        }
        else{
        }
      });
      },
      failure:function(user){
        consle.log(user +":did not load");
      }
    });
  },
  getUsers:function(){
    $.ajax({
      url:ajax.urlUsers,
      method:'GET',
      data: ajax.urlUsers,
      success:function(data){
        // console.log(data);
        var parsedData = JSON.parse(data);
        _.each(parsedData, function(el, idx, arr){
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
          $('.container.main').removeClass('display-none');
          $('.main').removeClass('display-none');
          $('.main').addClass('display-block');
          localStorage.setItem('username',el.username);
        }
        else{
        }
      });
      },
      failure: function(user){
        console.log(user +":did not load");
      }
    });
  },
  getMessageButtons:function(){
    $.ajax({
      type: 'GET',
      url: ajax.urlMessages,
      success: function(data) {
        var username = localStorage['username'];
        var parsedData = JSON.parse(data);
        _.each(parsedData,function(el){
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
        var parsedData = JSON.parse(data);
        var username = localStorage['username'];
        _.each(parsedData,function(el){
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
        url:"/get-messages",
        success:function(data){
          var parsedData = JSON.parse(data);
          _.each(parsedData,function(el){
            if(el._id == messageId){
              ajax.printMessageText(el);
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
      url: "/send-message",
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

  deleteMessages:function(messageId,liSelector,paragraphSelector){
    $.ajax({
      method: 'POST',
      url: "/delete-message",
      data: {id:messageId},
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
        var parsedData = JSON.parse(data);
        _.each(parsedData,function(el){
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
        var parsedData = JSON.parse(data);
        _.each(parsedData,function(el){
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
    console.log("printTemplate");
    $('.users').html('');
    $(selector).append(tmpl(data));
    if(data.username === localStorage['recipient']){
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
