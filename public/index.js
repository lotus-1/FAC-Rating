const addButton = document.getElementById('button');
addButton.addEventListener('click', (event) => {
  event.preventDefault();
  const userFirstName = document.getElementById('F.name').value;
  const userLastName = document.getElementById('L.name').value;
  const userLocation = document.getElementById('locat').value;
  const userCohortName = document.getElementById('cohortN').value;
  const userCohortRate = document.getElementById('rate').value;

  console.log(userFirstName, userLastName, userLocation, userCohortName, userCohortRate);
  fetch('/postStudentData/' + userFirstName)
  .then((response) => {
    console.log('my response is ->', response);
  return response.json();
  })
  .then((data) => {
    console.log('this is my data', data);
  })
    .catch((err) => {
      console.log(err);
  })
});
