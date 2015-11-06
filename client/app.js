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
    });
    $('.register').on('keypress',function(e){
      if(e.which === 13){
        $('#enter-register').click();
      }
    });
    //event handler add time button


},
  //thank you w3 schools
  countDown:function(messageId){
    var count = "counter" + messageId;
    var selector = "#" + messageId;
    console.log(selector);
  localStorage.setItem(count, 20);
  var counter = localStorage[count];
  var interval = setInterval(function() {
      $(selector).html(counter);
      counter--;
      $('#message-form').on('click',function(){
        counter+=5;
      });
      // Display 'counter' wherever you want to display it.
      if (counter == 0) {
          // Display a login box
          $(selector).parent('li').css("display","none");
      }
  }, 1000);
  },

};
