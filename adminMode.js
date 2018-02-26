/**
 * @module adminMode
 * @class adminMode
 */


/**
 * Populates the events to see which events can be selected
 * @method populateEventSelect
 *  
 */
function populateEventSelect(id) {


	//console.log("DEBUG: ran populateEventSelect");
    unpopulateEvents();
    var docfrag = document.createDocumentFragment();
	//console.log(masterEvent.size);

      for(var i = 0; i < masterEvent.size; i++){

		  /**
		  * Get the node at index i from masterEvent
		  */

          var node = masterEvent.returnAt(i);
          var event = node.data.title;
          //console.log(event);

          docfrag.appendChild(new Option(event));


      }


  var select = document.getElementById(id);
  select.appendChild(docfrag);

}

/**
 * Removes the events when page is reloaded
 * @method unpopulateEvents
 */
function unpopulateEvents(){

    var events = document.getElementById("events");

    for( var i = 0; i < masterEvent.size; i++){
        events.remove(events.i);
    }

}

/**
 * @method addRow
 * @param {string} name
 * Adds the attendee to the Attendee Table
 */
function addRow(name) {

	//console.log("ran addRow");

    var table = document.getElementById("attendeeTable");

    tr = document.createElement('tr');
    tr.appendChild(document.createElement('td'));
    tr.cells[0].appendChild(document.createTextNode(name));
    table.appendChild(tr);

}

/**
 * Populates the Attendee Table to see who is attending
 * @method populateAttendeeTable
 */
function populateAttendeeTable() {

	
	var event = document.getElementById("events").value;
	
	var firstName;
	var lastName;
    
    //window[event] is now a linkedlist read from the event info or something??
	window[event] = populateUser(event);

	for(var i = 0; i < window[event].size; i++) {
		
        //Iterates through linked list and gets all the users that have signed up and adds those to table
		var node = window[event].returnAt(i);
		firstName = node.data.firstName;
		lastName = node.data.lastName;

		name = firstName + " " + lastName;
		addRow(name);
	}
}

/**
* Removes the Attendee Table when page is reloaded
 * @method unpopulateTable
 */
function unpopulateTable() {


	var table = document.getElementById("attendeeTable");
	//console.log(table);
	for(var i = table.rows.length - 1; i > 0; i--)
	{
		table.deleteRow(i);
	}
}
