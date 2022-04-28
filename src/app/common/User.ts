export class User {
  userName: string;
  email: string;
  password: string;
  role: string;
  token: string;
  private tokenExpirationDate: Date;
  constructor(
    userName: string,
    email: string,
    password: string,
    role: string,
    token: string
  ) {
    this.userName = userName;
    this.email = email;
    this.password = password;
    this.role = role;
    this.token = token;
  }

  getToken() {
    if (!this.tokenExpirationDate || new Date() > this.tokenExpirationDate) {
      return null;
    }
    return this.token;
  }
}
