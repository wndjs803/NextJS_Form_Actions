export const EMAIL_REGEX = new RegExp(/^[a-zA-Z0-9._%+-]+@zod\.com$/);
export const EMAIL_REGEX_ERROR = "@zod.com 형식의 이메일만 가능합니다.";

export const USERNAME_MIN_LENGTH = 5;
export const USERNAME_MIN_LENGTH_ERROR =
  "username은 최소 5글자 이상이어야 합니다.";

export const PASSWORD_MIN_LENGTH = 10;
export const PASSWORD_MIN_LENGTH_ERROR =
  "비밀번호는 최소 10글자 이상이어야 합니다.";

export const PASSWORD_REGEX = new RegExp(/\d/);
export const PASSWORD_REGEX_ERROR =
  "비밀번호는 반드시 1개 이상의 숫자를 포함해야 합니다.";
