var ajax ={
  urlMessages: "https://tiny-tiny.herokuapp.com/collections/sweetMessage/",
  urlUsers:"https://tiny-tiny.herokuapp.com/collections/sweetUsers/",
  getUsers:function(){
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
  getMessages:function(){
    $.ajax({
      type: 'GET',
      url: ajax.urlMessages,
      success: function(data) {
        console.log(data + " :loaded");
      },
      failure: function(data) {
        console.log("FAILURE: ", data);
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
      url: main.urlMessages,
      method: 'POST',
      data: message,
      success: function(resp) {
        // console.log(resp);
        // var tmpl = _.template(templates.userInput);
        // $('.chatfield').append(tmpl(resp));
        // main.startFixedWindowAtBottom('chatfield');
        console.log(resp);
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
  deleteMessages:function(messageId){
    $.ajax({
      method: 'DELETE',
      url: ajax.urlMessages + messageId,
      success: function(data) {
        console.log("DELETED", data);
        // var id = '#' + messageId;
        // $(id).remove();
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
};
