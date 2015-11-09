$(document).ready(function(){
  page.init();
});
var page = {

init:function(){
page.styles();
page.events();
},
styles:function(){
  ajax.getUsers();
  ajax.getMessageButtons();
  setInterval(ajax.getNewMessageButtons,1000);
},
events:function(){
    //event handler for sign-in button 'register'
    $('.sign-in').on('click', '#register',function(e){
        $('.sign-in').removeClass('display-block');
        $('.sign-in').addClass('display-none');
        $('.register').removeClass('display-none');
        $('.register').addClass('display-block');
    });
    //event handler Enter button on sign-in page
    $('#enter-sign-in').on('click' ,function(e){
        page.signIn();
    });
    $('.sign-in').on('keypress',function(e){
      if(e.which === 13){
        $('#enter-sign-in').click();
      }
    });

    //event handler for register page login-in button
    $('.register').on('click', '#sign-in',function(e){
        $('.register').removeClass('display-block');
        $('.register').addClass('display-none');
        $('.sign-in').removeClass('display-none');
        $('.sign-in').addClass('display-block');
    });
    //event handler Enter button on register page
    $('#enter-register').on('click' ,function(e){
        $('.register').removeClass('display-block');
        $('.register').addClass('display-none');
        $('.sign-in').removeClass('display-none');
        $('.sign-in').addClass('display-block');
        page.createAccount();
    });
    $('.register').on('keypress',function(e){
      if(e.which === 13){
        $('#enter-register').click();
      }
    });
    //post message to database/to screen
    $('#message-form').on('click','.submit-message',function(e){
      e.preventDefault();
        data ={
            username: localStorage['username'],
            recipient: localStorage['recipient'],
            message:$('input[name="message"]').val(),
        };
        console.log(data);

        ajax.postMessages(data);
        $('input[name="message"]').val('');
      });
      $('.submit-message').on('keypress',function(e){
          if(e.which === 13){
            $('#message-form').click();
          }
      });

      $('.users').on('click','p',function(){
        var recipient = $(this).closest('div').attr('id');
        localStorage.setItem('recipient', recipient);
        $('.users p').css('color','black');
        $('.users span').css('color','black');_
        $(this).css("color",'red');
      });
      //event handler for showing messages
      $('.nav-tabs').on('click','li',function(e){
        e.preventDefault();
        var navBarID = $(this).closest('li').attr('id');
        page.countDown(navBarID);
        ajax.getMessageText(navBarID);

      });

},
  createAccount:function(){
    var data = {
        username: $('input[name="rusername"]').val(),
        password: function(){
            if($('input[name="rpassword"]').val() === $('input[name="rpassword-confirm"]').val()){
              return $('input[name="rpassword"]').val();
            }

        },
        status: false,
    };
    ajax.postUsers(data);
  },
  signIn: function(){
    ajax.getUsers();
  },
  //thank you w3 schools
  countDown:function(messageId){
    var setTime = 5;
    var liSelector = "#" + messageId;
    var spanSelector = 'span' + "." + messageId;
    var paragraphSelector = "."+ messageId;
    var interval = setInterval(function() {
        setTime--;
      $(spanSelector).html(setTime);
      $('#message-form').on('click',function(){
        setTime+=5;
      })
      if (setTime === 0) {
          ajax.deleteMessages(messageId,liSelector,paragraphSelector);
      }
  }, 1000);
  },


};
