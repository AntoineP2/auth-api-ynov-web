import axios from 'axios';
import { userDataRegisterType } from '../../types/userDataRegisterType';
import { encodePassword } from './securePassword';

const API_URL = 'http://localhost:3001/graphql';

export const getUser = async (email: string, password: string): Promise<string> => {
    const query = `
    query UserExists($email: String!, $password: String!) {
      userExists(email: $email, password: $password)
    }
  `;

    const variables = { email, password };

    const response = await axios.post(API_URL, {
        query,
        variables,
    });
    return response.data.data.userExists;
};

export const registerUser = async (userData: userDataRegisterType): Promise<string> => {
    const query = `
  mutation CreateUser($firstName: String!, $lastName: String!, $trigramme: String!, $email: String!, $password: String!) {
    createUser(createUserInput: {
      firstName: $firstName,
      lastName: $lastName,
      trigramme: $trigramme,
      email: $email,
      password: $password
    })
  }
`;
    const hashedPassword = await encodePassword(userData.password);

    const variables = {
        firstName: userData.firstName,
        lastName: userData.lastName,
        trigramme: userData.trigramme,
        email: userData.email,
        password: hashedPassword,
    };

    const response = await axios.post(API_URL, {
        query,
        variables,
    });
    return response.data.data.createUser;
};
