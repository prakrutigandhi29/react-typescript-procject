import { SyntheticEvent, useState } from 'react';
import { useDispatch } from 'react-redux';
import {Project} from './Project';
import { saveProject } from './state/ProjectAction';
interface ProjectFormProps {
      onCancel: () => void;
      project:Project
     }
    
function ProjectForm({ onCancel,project:initialProject }: ProjectFormProps) {
    const [project,setProject]=useState(initialProject);
    const [errors, setErrors] = useState({
           name: '',
           description: '',
           budget: '',
     });
     const dispatch=useDispatch();
    const handleSubmit =(event:SyntheticEvent)=>{
        event.preventDefault();
        if (!isValid()) return;
        dispatch(saveProject(project));
      }

    const changeHandler=(event:any)=>{
        const{type,name,value,checked}=event.target;
        console.log(type);
        let updatedValue = type === 'checkbox' ? checked : value;
        if (type === 'number') {
            updatedValue = Number(updatedValue);
        }
        const change = {
            [name]: updatedValue,
        };
        let updatedProject:Project;
        setProject((p)=>{
            updatedProject=new Project({...p,...change});
            return updatedProject;
        })
        setErrors(() => validate(updatedProject));
    }
    function validate(project: Project) {
             let errors: any = { name: '', description: '', budget: '' };
             if (project.name.length === 0) {
               errors.name = 'Name is required';
             }
             if (project.name.length > 0 && project.name.length < 3) {
               errors.name = 'Name needs to be at least 3 characters.';
             }
             if (project.description.length === 0) {
               errors.description = 'Description is required.';
             }
             if (project.budget === 0) {
               errors.budget = 'Budget must be more than $0.';
             }
             return errors;
           }
           function isValid() {
             return (
               errors.name.length === 0 &&
               errors.description.length === 0 &&
               errors.budget.length === 0
             );
           }
        
return (
    <form className="input-group vertical" name="projectForm" aria-label="Edit a Project" onSubmit={handleSubmit}>
      <label htmlFor="name">Project Name</label>
      <input type="text" id="name" name="name" placeholder="enter name" value={project.name} onChange={changeHandler}/>
      {errors.name.length > 0 && (
       <div role="alert" className="card error">
         <p>{errors.name}</p>
       </div>
      )}
      <label htmlFor="description">Project Description</label>
      <textarea id="description" aria-label="project description" name="description" placeholder="enter description" value={project.description} onChange={changeHandler}/>
      {errors.description.length > 0 && (
       <div role="alert" className="card error">
         <p>{errors.description}</p>
       </div>
      )}
      <label htmlFor="budget">Project Budget</label>
      <input id="budget"type="number" name="budget" placeholder="enter budget" value={project.budget} onChange={changeHandler}/>
      {errors.budget.length > 0 && (
       <div role="alert" className="card error">
         <p>{errors.budget}</p>
       </div>
      )}
      <label htmlFor="isActive">Active?</label>
      <input id="isActive" type="checkbox" name="isActive" checked={project.isActive} onChange={changeHandler} />
      <div className="input-group">
        <button className="primary bordered medium">Save</button>
        <span />
        <button type="button" className="bordered medium" onClick={onCancel}>
          cancel
        </button>
      </div>
    </form>
  );
}

export default ProjectForm;