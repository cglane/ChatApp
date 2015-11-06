
var templates ={

//id is unique id for message,
//'span onload' starts the startTime() function on loaded.bs.modal
//"clock" is where the time will be displayed
  newMessage:[
    '<li id = <%= id><p>',
    '<span onload="startTime()>',
    '<span id="clock"></span>',
    '<%=message%>',
    '</p></li>',
  ].join(""),


  users : [

  ].join(""),

};
//
//
