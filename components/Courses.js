import React, { useEffect, useState } from 'react';
import { getCourses, enrollCourse } from '../api'; // API functions
import { Card, Button, Row, Col, Alert } from 'react-bootstrap';  // Bootstrap components
import { useNavigate } from 'react-router-dom';

const Courses = () => {
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchCourses = async () => {
      const token = localStorage.getItem('token');
      if (!token) {
        alert('Please log in first.');
        navigate('/login');
        return;
      }

      try {
        const res = await getCourses(token);
        setCourses(res.data.courses);
      } catch (err) {
        setError('Failed to fetch courses: ' + (err.response?.data?.message || err.message));
      } finally {
        setLoading(false);
      }
    };

    fetchCourses();
  }, [navigate]);

  const handleEnroll = async (courseId) => {
    const token = localStorage.getItem('token');
    if (!token) {
      alert('Please log in first.');
      navigate('/login');
      return;
    }

    try {
      await enrollCourse(courseId, token); // Enroll in the course
      alert('Successfully enrolled in the course!');
    } catch (err) {
      alert('Failed to enroll: ' + (err.response?.data?.message || err.message));
    }
  };

  if (loading) return <div>Loading courses...</div>;
  if (error) return <Alert variant="danger">{error}</Alert>;

  return (
    <div className="container mt-4">
      <h2>Available Courses</h2>
      <Row>
        {courses.length === 0 ? (
          <p>No courses available. Add some courses!</p>
        ) : (
          courses.map((course) => (
            <Col key={course.id} md={4} className="mb-4">
              <Card className="shadow-sm">
                <Card.Body>
                  <Card.Title>{course.course_name}</Card.Title>
                  <Card.Text>{course.description}</Card.Text>
                  <Card.Text><strong>Duration:</strong> {course.duration}</Card.Text>
                  <Button variant="primary" onClick={() => handleEnroll(course.id)}>
                    Enroll
                  </Button>
                </Card.Body>
              </Card>
            </Col>
          ))
        )}
      </Row>
    </div>
  );
};

export default Courses;
