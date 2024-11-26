import React, { useEffect, useState } from 'react';
import { getEnrolledCourses } from '../api'; // API to fetch enrolled courses
import { Card } from 'react-bootstrap';

const CourseProfile = () => {
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchEnrolledCourses = async () => {
      const token = localStorage.getItem('token');
      if (!token) {
        alert('Please log in first.');
        return;
      }

      try {
        const res = await getEnrolledCourses(token); // Fetch enrolled courses
        setCourses(res.data.courses);
      } catch (err) {
        setError('Failed to fetch enrolled courses: ' + (err.response?.data?.message || err.message));
      } finally {
        setLoading(false);
      }
    };

    fetchEnrolledCourses();
  }, []);

  if (loading) return <div>Loading enrolled courses...</div>;
  if (error) return <div style={{ color: 'red' }}>{error}</div>;

  return (
    <div className="container mt-4">
      <h2>Your Enrolled Courses</h2>
      <div className="row">
        {courses.length === 0 ? (
          <p>You are not enrolled in any courses yet.</p>
        ) : (
          courses.map((course) => (
            <div key={course.id} className="col-md-4 mb-4">
              <Card>
                <Card.Body>
                  <Card.Title>{course.course_name}</Card.Title>
                  <Card.Text>{course.description}</Card.Text>
                  <Card.Text><strong>Duration:</strong> {course.duration}</Card.Text>
                </Card.Body>
              </Card>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default CourseProfile;
