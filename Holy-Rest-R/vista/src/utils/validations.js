export function isEmailValid(email) {
  // eslint-disable-next-line no-useless-escape
  const emailValid = /^([a-zA-Z0-9_\.\-])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/;
  return emailValid.test(String(email).toLowerCase());
}

export function isNameValid(name) {
  const nameValid = /^[a-zA-ZÀ-ÿ\s]{2,15}$/;
  return nameValid.test(String(name).toLowerCase());
}

export function isSurnamesValid(surnames) {
  const surnamesValid = /^[a-zA-ZÀ-ÿ\s]{2,30}$/;
  return surnamesValid.test(String(surnames).toLowerCase());
}

export function isPasswordValid(password) {
  const passwordValid = /^.{4,12}$/;
  return passwordValid.test(String(password).toLowerCase());
}
