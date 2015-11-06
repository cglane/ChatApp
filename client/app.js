$(document).ready(function(){
  console.log('hello world');
  page.init();
});

var page = {

init:function(){
page.styles();
page.events();
},
styles:function(){
  page.countDown('txt');
  ajax.getUsers();
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
        $('.paywall').removeClass('display-block');
        $('.paywall').addClass('display-none');
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
    //event handler add time button


},
  createAccount:function(){
    var data = {
        username: $('input[name="rusername"]').val(),
        password: function(){
            if($('input[name="rpassword"]').val() === $('input[name="rpassword-confirm"]').val()){
              return $('input[name="rpassword"]').val();
            }
            else{
              alert('those passwords are not the same');
            }
        }
    };
    ajax.postUsers(data);
  },
  signIn: function(){
    ajax.getUsers();
  },
  //thank you w3 schools
  countDown:function(messageId){
    var count = "counter" + messageId;
    var timerSelector = "#" + messageId;
    var paragraphSelector = "."+messageId;
  localStorage.setItem(count, 5);
  var counter = localStorage[count];
  var interval = setInterval(function() {
      $(timerSelector).html(counter);
      counter--;
      $('#message-form').on('click',function(){
        counter+=5;
      });
      // Display 'counter' wherever you want to display it.
      if (counter === 0) {
          // Display a login box
          $(timerSelector).parent('li').css("display","none");
          $(paragraphSelector).remove();
      }
  }, 1000);
  },


};
