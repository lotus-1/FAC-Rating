// const addButton = document.getElementById('button');
// // addButton.addEventListener('click', (event) => {
// //   event.preventDefault();
// //   const userFirstName = document.getElementById('F.name').value;
// //   const userLastName = document.getElementById('L.name').value;
// //   const userLocation = document.getElementById('locat').value;
// //   const userCohortName = document.getElementById('cohortN').value;
// //   const userCohortRate = document.getElementById('rate').value;
//
//   console.log(userFirstName, userLastName, userLocation, userCohortName, userCohortRate);
//   // fetch('/postStudentData/' + userFirstName)
//   // .then((response) => {
//   //   console.log('my response is ->', response);
//   // return response.json();
//   // })
//   // .then((data) => {
//   //   console.log('this is my data', data);
//   // })
//   //   .catch((err) => {
//   //     console.log(err);
//   // })
// //

// function fetchData(data) {

  // fetch("getStudentData", {
  //   method: 'POST',
  //   body:JSON.stringify(data),
  // })

  fetch("/getStudentData")

    .then((response) => {
      return response.json();
    })

    .then((data) => {
      console.log(' this is the data in the fetch function', data);
      var table = document.getElementById('students-table');
      data.forEach(function(user) {
        console.log(user);
        var row = document.createElement('tr');

        var firstName = document.createElement('td');
        firstName.textContent = user.first_name;
        row.appendChild(firstName);

        var lastName = document.createElement('td');
        lastName.textContent = user.last_name;
        row.appendChild(lastName);

        var location = document.createElement('td');
        location.textContent = user.location;
        row.appendChild(location);

        var cohortName = document.createElement('td');
        cohortName.textContent = user.cohortname;
        row.appendChild(cohortName);

        var cohortRate = document.createElement('td');
        cohortRate.textContent = user.rate;
        row.appendChild(cohortRate);

        table.appendChild(row);
      });
    })

    .catch((err) => {
    })

// }
