import React, { useEffect, useState } from 'react';
import { getEnrolledCourses } from '../api'; // API to fetch enrolled courses
import { Card, Row, Col, Alert } from 'react-bootstrap';  // Bootstrap components

const Profile = () => {
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
        const res = await getEnrolledCourses(token);
        setCourses(res.data.courses);
      } catch (err) {
        setError('Failed to fetch enrolled courses: ' + (err.response?.data?.message || err.message));
      } finally {
        setLoading(false);
      }
    };

    fetchEnrolledCourses();
  }, []);

  if (loading) return <div>Loading your enrolled courses...</div>;
  if (error) return <Alert variant="danger">{error}</Alert>;

  return (
    <div className="container mt-4">
      <h2>Your Enrolled Courses</h2>
      <Row>
        {courses.length === 0 ? (
          <p>You are not enrolled in any courses yet.</p>
        ) : (
          courses.map((course) => (
            <Col key={course.id} md={4} className="mb-4">
              <Card className="shadow-sm">
                <Card.Body>
                  <Card.Title>{course.course_name}</Card.Title>
                  <Card.Text>{course.description}</Card.Text>
                  <Card.Text><strong>Duration:</strong> {course.duration}</Card.Text>
                </Card.Body>
              </Card>
            </Col>
          ))
        )}
      </Row>
    </div>
  );
};

export default Profile;
