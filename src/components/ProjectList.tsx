import { Project } from './Project';
import ProjectCard from './ProjectCard'
import ProjectForm from './ProjectForm';
import { useState } from 'react';

interface ProjectListProps {
  projects: Project[];
}

function ProjectList({ projects}:ProjectListProps) {
    const [projectBeingEdited, setProjectBeingEdited] = useState({});
    const handleEditClick = (projectBeingEdited: Project) => {
        setProjectBeingEdited(projectBeingEdited);  };
    
    const cancelEditing = () => {
        setProjectBeingEdited({});
    };
    
            
 
    const items = projects.map(project => (
        <div key={project.id} className="cols-sm">
             {project === projectBeingEdited ? (
            <ProjectForm onCancel={cancelEditing} project={project}/>
          ) : (
           <ProjectCard project={project} onEdit={handleEditClick} />
         )}
      </div>
    ));
    return <div className="row">{items}</div>;
 }

export default ProjectList;