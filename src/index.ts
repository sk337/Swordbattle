import fetch from "node-fetch";
import { privUser, ApiResponse } from "./Types";


const apiUrl: string = "https://sb-api-fb48ef34a197.herokuapp.com";

/**
 * Logs in the user with the specified username and password
 * @param {string} username - The username of the user
 * @param {string} password - The password of the user
 * @returns {Promise<privUser>} A promise that resolves to a privUser object
 */
export async function Login(username: string, password: string): Promise<privUser> {
  const response = await fetch(apiUrl + "/auth/login/", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      username: username,
      password: password,
    }),
  });
  const data = await response.json();
  const ec = data as ApiResponse;
  if (ec.error) {
    throw new Error(ec.message);
  }
  return data as privUser;
}

/**
 * Logs in the user with legacy token
 * @param {string} secret - account secret used in legacy accounts
 * @returns {Promise<privUser>} A promise that resolves to a privUser object
 */
export async function legacyLogin(secret: string): Promise<privUser> {
  const response = await fetch(apiUrl + "/auth/legacyLogin/", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      secret: secret,
    }),
  });
  const data = await response.json();
  const ec = data as ApiResponse;
  if (ec.error) {
    throw new Error(ec.message);
  }
  return data as privUser;
}

/**
 * Changes the username for the logged-in user
 * @param {string} token - The user's authentication token
 * @param {string} username - The new username
 * @returns {Promise<privUser>} A promise that resolves to a privUser object
 */
export async function changeUsername(token: string, username: string): Promise<privUser>{
  const response = await fetch(apiUrl + "/auth/legacyLogin/", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "Authorization": `bearer ${token}`,
    },
    body: JSON.stringify({
      newUsername: username,
    }),
  });
  const data = await response.json();
  const ec = data as ApiResponse;
  if (ec.error){
    throw new Error(ec.message);
  }
  return data as privUser;
}

/**
 * Retrieves private user data using the authentication token
 * @param {string} token - The user's authentication token
 * @returns {Promise<privUser>} A promise that resolves to a privUser object
 */
export async function getPrivatedata(token: string): Promise<privUser> {
  const response = await fetch(apiUrl + "/auth/privatedata/", {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      "Authorization": `bearer ${token}`,
    },
  });
  const data = await response.json();
  const ec = data as ApiResponse;
  if (ec.error) {
    throw new Error(ec.message);
  }
  return data as privUser;
}
