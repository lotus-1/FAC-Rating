const registerForm = document.getElementById('registration_form');
const email = document.getElementById('email');
const password = document.getElementById('password');
const confirmPassword = document.getElementById('ConfirmPassword');
const error = document.getElementById('error');

registerForm.addEventListener('submit', (event) => {
  if(email.validity.valueMissing && password.validity.valueMissing || confirmPassword.validity.valueMissing) {
    error.textContent = 'The fields connot be empty, Please enter a values';
    event.preventDefault();
  }
  if(password.validity.patternMismatch || confirmPassword.validity.patternMismatch){
error.textContent = 'Please enter password with 8 characters';
event.preventDefault();
}
if(password.value !== confirmPassword.value){
  error.textContent = 'The passwords is not the same!!!';
  event.preventDefault();
}
  if(email.validity.valueMissing){
    error.textContent = 'Please enter an email';
    event.preventDefault();
  }
  if(email.validity.typeMismatch){
    error.textContent = 'Please enter a valid email';
    event.preventDefault();
  }
});
