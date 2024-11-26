import axios from 'axios';

const API_URL = 'http://localhost:5001'; // Backend URL

// Get list of courses
export const getCourses = async (token) => {
  return await axios.get(`${API_URL}/courses`, {
    headers: { Authorization: `Bearer ${token}` },
  });
};

// Enroll in a course
export const enrollCourse = async (courseId, token) => {
  return await axios.post(
    `${API_URL}/enroll`,
    { courseId },
    {
      headers: { Authorization: `Bearer ${token}` },
    }
  );
};

// Get enrolled courses for a user
export const getEnrolledCourses = async (token) => {
  return await axios.get(`${API_URL}/enrolled-courses`, {
    headers: { Authorization: `Bearer ${token}` },
  });
};

// User login API
export const loginUser = async (username, password) => {
  return await axios.post(`${API_URL}/login`, { username, password });
};

// User registration API
export const registerUser = async (username, password) => {
  return await axios.post(`${API_URL}/register`, { username, password });
};
