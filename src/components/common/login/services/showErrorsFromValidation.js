export const renderObjectValidation = (
  name,
  errors,
  value,
  emailReg,
  passReg
) => {
  let validatedObj = {};
  switch (name) {
    case 'username':
      validatedObj = errors.username =
        value.length < 4 ? 'Username must be 4 characters long!' : '';
      break;
    case 'email':
      validatedObj = errors.email =
        value.match(emailReg) && value.length > 5
          ? ''
          : 'Email is not valid or too short';
      break;

    case 'displayName':
      validatedObj = errors.displayName =
        value.length < 5 ? 'Field needs at least 5 characters' : '';
      break;
    case 'password':
      validatedObj = errors.password =
        value.match(passReg) && value.length > 6
          ? ''
          : 'Password needs at least 7 characters. Should contain numbers and special characters';
      break;

    default:
      break;
  }
  return validatedObj;
};

// export const registerValidationObj = (
//   name,
//   errors,
//   value,
//   emailReg,
//   passReg
// ) => {

//   const objectValidator = {
//     username: (errors.username =
//       value.length < 4 ? 'Username must be 4 characters long!' : ''),
//     email: (errors.email =
//       value.match(emailReg) && value.length > 5
//         ? ''
//         : 'Email is not valid or too short'),
//     displayName: (errors.displayName =
//       value.length < 5 ? 'Field needs at least 5 characters' : ''),
//     password: (errors.password =
//       value.match(passReg) && value.length > 6
//         ? ''
//         : 'Password needs at least 7 characters. Should contain numbers and special characters'),
//   };
//   return objectValidator[name];
// };
