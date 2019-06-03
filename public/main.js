const registerForm = document.getElementById('registration_form');
const email = document.getElementById('email');
const password = document.getElementById('password');
const confirmPassword = document.getElementById('ConfirmPassword');
const error = document.getElementById('error');

registerForm.addEventListener('submit', (event) => {
  event.preventDefault();

  if(email.validity.valueMissing && password.validity.valueMissing || confirmPassword.validity.valueMissing) {
    error.textContent = 'The fields connot be empty, Please enter a values';
  }
  if(password.validity.patternMismatch || confirmPassword.validity.patternMismatch){
  error.textContent = 'Please enter password with 8 characters';
  }
  if(password.value !== confirmPassword.value){
  error.textContent = 'The passwords is not the same!!!';
}
  if(email.validity.valueMissing){
    error.textContent = 'Please enter an email';
  }
  if(email.validity.typeMismatch){
    error.textContent = 'Please enter a valid email';
  }
});
