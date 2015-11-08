
var templates ={

//id is unique id for message,
//'span onload' starts the startTime() function on loaded.bs.modal
//"clock" is where the time will be displayed
  newMessage:[
    '<li id = <%=_id%>><a href="#">From<%=username%></a></li>'
  ].join(""),
  messageParagraph:[
    '<p class= <%=_id%>>',
    '<span class= <%=_id%>></span>',
    '<br>',
    '<%=message%>',
    '</p>',

  ].join(""),

  users : [
    '<div id = <%=username%>>',
    '<p><%=username%></p>',
    '</div>',
  ].join(""),

};
//
//
