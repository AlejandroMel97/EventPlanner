/**
 * Adds a row to the table on user_availabilty.html. This will
 * be used to add the given events to the table.
 */
var lastName = '';
var firstName = '';

function setName(last, first){
  window.lastName = last;
  window.firstName = first;
  //console.log(lastName + ' ' + firstName);
}

function findMaxYear(){

  var obj = masterEvent.returnAt(masterEvent.size - 1);
  console.log(obj);
  var date = new Date(obj.data.date);
  console.log(date);
}

function addRow() {

    var table = document.getElementById("eventTable")

    tr = document.createElement('tr');
    tr.appendChild(document.createElement('td'));
    tr.appendChild(document.createElement('td'));
    tr.appendChild(document.createElement('td'));
    tr.appendChild(document.createElement('td'));

    var checkbox = document.createElement("INPUT");
    checkbox.type = "checkbox";

    tr.cells[0].appendChild(document.createTextNode('Meeting'));
    tr.cells[1].appendChild(document.createTextNode('2/7/18'));
    tr.cells[2].appendChild( document.createTextNode('10:20 AM - 11:00 PM') );
    tr.cells[3].appendChild(checkbox);

    table.appendChild(tr);

}
