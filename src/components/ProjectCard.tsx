import { Project } from './Project';
import { Link } from 'react-router-dom';

function formatDescription(description: string): string {
  return description.substring(0, 60) + '...';
}

interface ProjectCardProps {
  project: Project;
  onEdit: (project: Project) => void;
}


function ProjectCard(props: ProjectCardProps) {
    const handleEditClick = (projectBeingEdited: Project) => {
        props.onEdit(projectBeingEdited);
          };
        
  const { project } = props;
  return (
    <div className="card">
      <img src={project.imageUrl} alt={project.name} />
      <section className="section dark">
      <Link to={'/projects/' + project.id}>

        <h5 className="strong">
          <strong>{project.name}</strong>
        </h5>
        <p>{formatDescription(project.description)}</p>
        <p>Budget : {project.budget.toLocaleString()}</p>
        </Link>
        <button className=" bordered" aria-label={`edit ${project.name}`} onClick={()=>{handleEditClick(project)}}>
            <span className="icon-edit "></span>
            Edit
        </button>
      </section>
    </div>
  );
}

export default ProjectCard;