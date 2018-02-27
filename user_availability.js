/**
 * @module user_availability
 * @class   user_availability
 */

/**
 * Adds a row to the table on user_availabilty.html. This will
 * be used to add the given events to the table.
 */
var lastName = '';
var firstName = '';

/**
 * Sets the username for the user
 * @method setName
 */
function setName(){
  var name = sessionStorage.getItem("userName");
  var i = 0;
  while (name[i] != ' '){
      firstName += name[i];
      i++;
  }
  i++;
  while (i < name.length){
    lastName += name[i];
    i++;
  } // end while
}


/**
 * @method addRow
 * @param {string} title 
 * @param {string} date 
 * @param {string} time 
 * Adds the event to the Event Table
 */
function addRow(title, date, time) {

    var table = document.getElementById("eventTable")

    tr = document.createElement('tr');
    tr.appendChild(document.createElement('td'));
    tr.appendChild(document.createElement('td'));
    tr.appendChild(document.createElement('td'));
    tr.appendChild(document.createElement('td'));

    var checkbox = document.createElement("INPUT");
    checkbox.type = "checkbox";

    tr.cells[0].appendChild(document.createTextNode(title));
    tr.cells[1].appendChild(document.createTextNode(date));
    tr.cells[2].appendChild( document.createTextNode(time) );
    tr.cells[3].appendChild(checkbox);

    table.appendChild(tr);

}

/**
 * Loads the events from the list and shows which ones are available to the user
 * @method loadEvents
 */
function loadEvents(){

    //var has function scope so it's fine to declare them in for block
    for (let i = 0; i < masterEvent.size; i++){
        var node = masterEvent.returnAt(i);
        var date = node.data.date;
        var month = date.getMonth() + 1;
        var year = date.getFullYear();
        var day = date.getDate();
        var startHours = date.getHours();
        var startMin = date.getMinutes();
        var endHours = Math.floor((node.data.len)/60) + startHours;
        var endMin = (node.data.len)%60;
        var timeString = startHours + ':' + startMin + ' to ' + endHours + ':' + endMin;
        
        addRow(node.data.title, month+'/'+day+'/'+year,timeString);
    }
    
    if (masterEvent.size == 0)
    {
        document.getElementById("list").innerHTML = "No events at this time";
    }


    //Check to see if user is going to event??
    var checkBoxArray = document.getElementById("eventTable").getElementsByTagName("INPUT");

    for (var i = 0; i < masterEvent.size; i++)
    {

        var node = masterEvent.returnAt(i);
        var eventTitle = node.data.title;
        window[eventTitle] = populateUser(eventTitle);
        var attending = window[eventTitle].search(lastName);
        
        if (attending)
        {
            checkBoxArray[i].hidden = true;
        }
    }
}

/**
 * Adds user to the event they have chosen for their availability
 * @method submit
 */
function submit(){

  //console.log("inside submit");
  var checkBoxArray = document.getElementById("eventTable").getElementsByTagName("INPUT");
  var itemArray = document.getElementById("eventTable").getElementsByTagName("td");
  var nameArray = new Array;
  for (var i = 0; i < itemArray.length; i+=4){
    nameArray[i/4] = itemArray[i];
  }


/** 
 * Here we keep track of which events had a check by there name
 * Next thing to do is write to file (filename being that event)
 * that the person who is logged in is attending
 */
  for (var i = 0; i < checkBoxArray.length; i++){
    if (checkBoxArray[i].checked == true){

      console.log(checkBoxArray[i]);
      checkBoxArray[i].hidden = "true";

      /**
       *  Populate the list of that event
       */
      var eventTitle = nameArray[i].textContent;
      var list = populateUser(eventTitle);
      var attending = list.search(window.lastName);
      if(attending != 0){
        console.log("already in " + eventTitle);
      }

      else {
      /**
       *  create a new attendee with the user logged in
       */
      var person = new attendee(window.lastName, window.firstName);
      /**
       *  add the person to the list
       */
      list.add(person);
      /**
       *  write the list to file
       */
      var tempArr = userArray(list);
      writeData(tempArr, 2, eventTitle);
    }
    }
  }
}
