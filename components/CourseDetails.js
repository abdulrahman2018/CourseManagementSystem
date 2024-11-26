import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';

const CourseDetails = () => {
  const { courseId } = useParams();
  const [course, setCourse] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchCourseDetails = async () => {
      const token = localStorage.getItem('token');
      if (!token) {
        alert('Please log in first.');
        return;
      }

      try {
        const res = await axios.get(`http://localhost:5001/courses/${courseId}`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        setCourse(res.data); // Set course details (name, description, duration)
      } catch (err) {
        setError('Failed to fetch course details.');
      } finally {
        setLoading(false);
      }
    };

    fetchCourseDetails();
  }, [courseId]);

  if (loading) return <div>Loading course details...</div>;
  if (error) return <div style={{ color: 'red' }}>{error}</div>;

  return (
    <div className="container mt-4">
      <h2>{course.course_name}</h2>
      <p><strong>Description:</strong> {course.description}</p>
      <p><strong>Duration:</strong> {course.duration}</p>
    </div>
  );
};

export default CourseDetails;
