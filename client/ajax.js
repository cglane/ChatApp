var ajax ={
  urlMessages: "https://tiny-tiny.herokuapp.com/collections/sweetMessage/",
  urlUsers:"https://tiny-tiny.herokuapp.com/collections/sweetUsers/",
  getUsers:function(){
    $.ajax({
      url:ajax.urlUsers,
      method:'GET',
      success:function(user){
        console.log(user);
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
        console.log(data+ " :loaded");
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
      success:function(data){
        console.log(data);
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
  deleteUsers:function(userName){
    $.ajax({
      url: ajax.urlUsers + userId,
      method: 'DELETE',
      success:function(data){
        console.log(data + "deleted");

      },
      failure:function(){
        console.log(data+ " :not deleted, idiot");
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
      url:ajax.urlUsers,
      success:function(data){
        _.each(data,function(el){
          var id = el._id;
          var uniqueUrl = urlUsers + id;
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
  loadTemplate:function(name,data,selector){
    var tmpl = _.template(templates.name);
    $(selector).append(tmpl(data));
  }
};
