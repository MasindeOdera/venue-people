import axios from "axios";

const API_URL_TEAMS = "http://localhost:3000/teams";

export default {
  async getTeams() {
    try {
      const response = await axios.get(API_URL_TEAMS);
      return response.data;
    } catch (error) {
      console.error("Error fetching teams:", error);
      throw error;
    }
  },
  async getTeam(id: number) {
    try {
      const response = await axios.get(`${API_URL_TEAMS}/${id}`);
      return response.data;
    } catch (error) {
      console.error(`Error fetching team with id ${id}:`, error);
      throw error;
    }
  },
  async createTeam(team: any) {
    try {
      const response = await axios.post(API_URL_TEAMS, team);
      return response.data;
    } catch (error) {
      console.error("Error creating team:", error);
      throw error;
    }
  },
  async updateTeam(id: number, team: any) {
    try {
      const response = await axios.put(`${API_URL_TEAMS}/${id}`, team);
      return response.data;
    } catch (error) {
      console.error(`Error updating team with id ${id}:`, error);
      throw error;
    }
  },
  async deleteTeam(id: number) {
    try {
      const response = await axios.delete(`${API_URL_TEAMS}/${id}`);
      return response.data;
    } catch (error) {
      console.error(`Error deleting team with id ${id}:`, error);
      throw error;
    }
  },
};
