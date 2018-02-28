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

function show_event_info()
{
    //Grab chosen event
    let selected_event = sessionStorage.getItem("chosen_event");
    //make array of attendees for that chosen event
    let array_of_attendees = get_attendees(selected_event);
    
    //Turn array of attendees into a string with line breaks
    let string_of_attendees = "";
    
    for(let i = 0; i < array_of_attendees.length; i++)
    {
        string_of_attendees = string_of_attendees + array_of_attendees[i].firstName + " " + array_of_attendees[i].lastName + "\n";
    }
    
    
    for (let i = 0; i < masterEvent.size; i++)
    {
        var node = masterEvent.returnAt(i);
        if(node.data.title == selected_event)
        {
            let date_string = (node.data.date.getMonth()+1) + "/" + node.data.date.getDate() + "/" + node.data.date.getFullYear();
            
            let start_time = node.data.date.getHours() + ":" + node.data.date.getMinutes();
            let end_time = Math.floor((node.data.len/60) + node.data.date.getHours()) + ":" + ((node.data.len)%60);
            
            add_row_to_event_table(date_string, start_time + " - " + end_time, string_of_attendees);
        }

        
    }
}

function add_row_to_event_table(date, time, who)
{
    let event_table = document.getElementById("event_table");
    
    //create table row
    let tr = document.createElement('tr');
    
    //create table data
    let date_data = document.createElement('td');
    let time_data = document.createElement('td');
    let who_data = document.createElement('td');
    
    //create text nodes and append them to data
    date_data.appendChild(document.createTextNode(date));
    time_data.appendChild(document.createTextNode(time));
    who_data.appendChild(document.createTextNode(who));
    
    //append data to table row
    tr.appendChild(date_data);
    tr.appendChild(time_data);
    tr.appendChild(who_data);
    
    //append table row to table
    event_table.appendChild(tr);
    
    //done!
}

function get_attendees(event)
{
    let array_of_attendees = [];
    console.log(event);
    //window[event] is now a linkedlist read from the event info or something??
	linked_list_of_attendees = populateUser(event);
    
	for(var i = 0; i < linked_list_of_attendees.size; i++)
    {
        //Iterates through linked list and gets all the users that have signed up and adds those to table
		array_of_attendees.push(linked_list_of_attendees.returnAt(i).data);
    }
    
    return array_of_attendees;

}

function event_passer()
{
    //grabs chosen event
    sessionStorage.setItem("chosen_event", document.getElementById("events").value);
        
    //redirects to "single event" page
    window.location.href = "single_event.html";
}







