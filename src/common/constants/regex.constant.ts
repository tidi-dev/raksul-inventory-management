// password must contain character, number, special character and at least between 8 characters
export const PASSWORD_REGEX = /^(?=.*[0-9])(?=.*[a-z])(?=.*\W)(?!.* ).{8,}$/;

// phone number must follow Vietnamese phone number format
export const PHONE_NUMBER_REGEX = /(^0[3|5|7|8|9])([0-9]{8})\b/;
