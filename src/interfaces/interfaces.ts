export interface UserAttributes {
  id: string;
  login: string;
  password: string;
  age: number;
  isDeleted: boolean;
}

export interface GroupAttributes {
  id: string;
  name: string;
  permissions: string[];
}

export interface UserRawInterface {
  dataValues: UserAttributes;
  _prevDataValues: UserAttributes;
  [key: string]: any;
}
