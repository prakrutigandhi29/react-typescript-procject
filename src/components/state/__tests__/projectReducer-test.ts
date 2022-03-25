import { projectReducer, initialProjectState } from '../ProjectReducer';
import { SAVE_PROJECT_SUCCESS } from '../ProjectTypes';
import { Project } from '../../Project';
import { MOCK_PROJECTS } from '../../MockProjects';
describe('ProjectReducer',()=>{
    test('should update project',()=>{
        const project=MOCK_PROJECTS[0];
        const updatedProject=Object.assign(new Project(),project)    
        const currentState={...initialProjectState,projects:[project]}
        const updatedState={...initialProjectState,projects:[updatedProject]}

        expect(projectReducer(currentState,{
            type:SAVE_PROJECT_SUCCESS,payload:updatedProject})).toEqual(updatedState);
    })
})