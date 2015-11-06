
var templates ={

//id is unique id for message,
//'span onload' starts the startTime() function on loaded.bs.modal
//"clock" is where the time will be displayed
  newMessage:[
    '<li id = <%=_id>',
    '<span onload="startTime()>',
    '<span id="_id"></span>',
    '</li>',
  ].join(""),
  messageParagraph:[
    '<p class= <%=_id%>',
    '<%=message%>',
    '</p>',
  ].join(""),

  users : [
    '<div id = <%=username%>>'
    '<p><%=username%>'
    '</div>'
  ].join(""),

};
//
//
