import axios from "axios";

const API_URL_USERS = "http://localhost:3000/users";
const API_URL_TEAMS = "http://localhost:3000/teams"; // Separate endpoint for teams

export default {
  async getUsers() {
    try {
      const response = await axios.get(API_URL_USERS);
      return response.data;
    } catch (error) {
      console.error("Error fetching users:", error);
      throw error;
    }
  },
  async getTeams() {
    try {
      const response = await axios.get(API_URL_TEAMS);
      return response.data;
    } catch (error) {
      console.error("Error fetching teams:", error);
      throw error;
    }
  },
  async getUser(id: number) {
    try {
      const response = await axios.get(`${API_URL_USERS}/${id}`);
      return response.data;
    } catch (error) {
      console.error(`Error fetching user with id ${id}:`, error);
      throw error;
    }
  },
  async createUser(user: any) {
    try {
      const response = await axios.post(API_URL_USERS, user);
      return response.data;
    } catch (error) {
      console.error("Error creating user:", error);
      throw error;
    }
  },
  async updateUser(id: number, user: any) {
    try {
      const response = await axios.put(`${API_URL_USERS}/${id}`, user);
      return response.data;
    } catch (error) {
      console.error(`Error updating user with id ${id}:`, error);
      throw error;
    }
  },
  async deleteUser(id: number) {
    try {
      const response = await axios.delete(`${API_URL_USERS}/${id}`);
      return response.data;
    } catch (error) {
      console.error(`Error deleting user with id ${id}:`, error);
      throw error;
    }
  },
};
