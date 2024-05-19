import React, { useEffect, useState } from 'react';
import { Button } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import projectsData from '../assets/projects.json';
import '../styles/AssignedProjects.css';

const RandomProjects = () => {
  const [randomProjects, setRandomProjects] = useState([]);

  useEffect(() => {
    const savedProjects = localStorage.getItem("assignedProjects");
    if (savedProjects) {
      setRandomProjects(JSON.parse(savedProjects));
    } else {
      const newProjects = getRandomProjects(projectsData);
      setRandomProjects(newProjects);
      localStorage.setItem("assignedProjects", JSON.stringify(newProjects));
    }
  }, []);

  const getRandomProjects = (projects) => {
    const keys = Object.keys(projects);
    const shuffled = keys.sort(() => 0.5 - Math.random());
    return shuffled.slice(0, 5).map(key => ({ name: key, link: projects[key] }));
  };

  const handleProjectClick = (link) => {
    window.open(link, '_blank');
  };

  return (
    <div>
      {randomProjects.length > 0 ? (
        <div>
          {randomProjects.map((project, index) => (
            <Button
              key={index}
              variant="primary"
              className="project-buttons mb-2 mr-2"
              onClick={() => handleProjectClick(project.link)}
            >
              {project.name}
            </Button>
          ))}
        </div>
      ) : (
        <p>Loading projects...</p>
      )}
    </div>
  );
};

export default RandomProjects;
