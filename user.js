/**
 * @module user
 * @class   user
 */

/** USER.JS
 *
 * JavaScirpt file that accompanies user.html
 *
 * Has the user select from a drop down menu of people
 * If their name is not listed, user has the option to add their name
 * Clicks continue to move on to add availability
*/

function check_and_submit()
{
    console.log("in check_and_submit");
    //Check if the user exists
    if(user_in_list())
    {
        //Tell the user they already exist
        document.getElementById("info").innerHTML = "User already in user list.";
    }
    else
    {        
        //Add the given name to list of users
        submitName();
        
        //Outputs "User firstname lastname successfully created!" to info paragraph
        document.getElementById("info").innerHTML = "User " + 
                document.getElementById("userFirstName").value.trim() +
                " " + document.getElementById("userLastName").value.trim() +
                " successfully created!";      
    }
}

function user_in_list()
{
    //Grab the input values and remove any whitespace
    let first_name = document.getElementById("userFirstName").value.trim();
    let last_name = document.getElementById("userLastName").value.trim();
    
    let in_list = false;

    
    let info = "Given username: " + first_name + " " + last_name + "<br>";
    info = info + document.getElementById("info").innerHTML + "Checking against.<br>";
    
    
    
    //Iterate through the list of users and see if the input matches any of them
    for(let i = 0; i < masterUser.size; i++)
    {
        info = info + masterUser.returnAt(i).data.firstName + " " + masterUser.returnAt(i).data.lastName + "<br>";
        if(masterUser.returnAt(i).data.firstName == first_name && masterUser.returnAt(i).data.lastName == last_name)
        {
            in_list = true;
        }    
    }
    
    document.getElementById("info").innerHTML = info;
    
    return in_list;
}

 

/**
* Takes in user input for the username and submits it
* @method submitName
*/
function submitName()  {
    var firstName = document.getElementById("userFirstName").value;
    var lastName = document.getElementById("userLastName").value;

    //Removes any whitespace from input
    firstName = firstName.trim();
    lastName =lastName.trim();

    if(firstName == "" || lastName == ""){
        alert("Invalid Name")
        return;
    }

    //masterUser.printAll();
    var person = new attendee(lastName,firstName);
    masterUser.add(person);
    var arr = userArray(masterUser);
    writeData(arr, 2, "masterUser");

    populateUserSelect("userName");


}

/**
 * @method populateUserSelect
 * @param {string} id
 * Populates the usernames so that the user can select one
 */
function populateUserSelect(id) {

    window.masterUser = populateUser("masterUser");
    unpopulateNames();
    var docfrag = document.createDocumentFragment();

      for(var i = 0; i < masterUser.size; i++){

          /**
           * Get the node at index i from masterUser
           */

          var node = masterUser.returnAt(i);
          var name = node.data.firstName  + ' ' + node.data.lastName;
          //console.log(name);

          docfrag.appendChild(new Option(name));


      }


  var select = document.getElementById(id);
  select.appendChild(docfrag);

}

/**
 * Removes the usernames when page is reloaded
 * @method unpopulateNames
 */
function unpopulateNames(){

    var names = document.getElementById("userName");

    for( var i = 0; i < masterUser.size; i++){
        names.remove(names.i);
    }

}

/**
 * Takes the selected username and carries it over from user.html to user_availability.html
 * @method addAvailability
 * @param {string} dest this is the destination for the button.
 */
function addAvailability(dest){
    var name = document.getElementById("userName").value;
    
    
    name = name.trim();
    console.log(name);
    if(name == ""){
        alert("Please select your name or create a new one.")
        window.location.href= "user.html";
        return;

    }
    else{
        sessionStorage.setItem("userName", name);
        if( dest == "avail"){
            console.log("in here");
            window.location.href="user_availability.html";
            return true;

        }
        else if( dest == "admin"){
            window.location.href="adminMode.html";
            return true;
        }
        

    }
  

}
