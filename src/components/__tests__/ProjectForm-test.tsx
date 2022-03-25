import { render, screen } from '@testing-library/react';
import { Provider } from 'react-redux';
import { MemoryRouter } from 'react-router-dom';
import { Project } from "../Project"
import ProjectForm from '../ProjectForm';
import { store } from '../../state';
import userEvent from '@testing-library/user-event';

describe('<ProjectForm/>', () => {
  let project:Project
  let updatedProject:Project
  let handleCancel:jest.Mock;
  let nameText:any;
  let descTextBox:HTMLElement
  let budgetText:HTMLElement

  beforeEach(()=>{
      project=new Project({
        id: 1,
        name: 'Mission Impossible',
        description: 'This is really difficult',
        budget: 100,
      })
      updatedProject=new Project({
          name:'Hello world',
          description:'Mission over'
      })
      handleCancel=jest.fn();
      render(
        <Provider store={store}>
        <MemoryRouter>
          <ProjectForm project={project} onCancel={handleCancel} />
        </MemoryRouter>
      </Provider>
      )
      nameText=screen.getByRole('textbox',{name:/project name/i})
      descTextBox=screen.getByRole('textbox',{name:/project description/i})
      budgetText=screen.getByRole('spinbutton',{name:/project budget/i})
      })

      test('form should have project data',()=>{
          expect(screen.getByRole('form',
          {name:/Edit a Project/i})).toHaveFormValues({
            name: project.name,
            description: project.description,
            budget: project.budget,
            isActive: project.isActive,
          })
      })
      test('form should update values of project',()=>{
          userEvent.clear(nameText);
          userEvent.type(nameText,updatedProject.name);
          expect(nameText).toHaveValue(updatedProject.name);

          userEvent.clear(descTextBox);
          userEvent.type(descTextBox,updatedProject.description);
          expect(descTextBox).toHaveValue(updatedProject.description);

          userEvent.clear(budgetText);
          userEvent.type(budgetText, updatedProject.budget.toString());
          expect(budgetText).toHaveValue(updatedProject.budget);
     })
     test('project name validation',async()=>{
         userEvent.clear(nameText);
         expect(screen.getByRole('alert')).toBeInTheDocument();
     })
     test('name should display minlength validation', async () => {
            userEvent.clear(nameText);
            userEvent.type(nameText, 'ab');
            expect(screen.getByRole('alert')).toBeInTheDocument();
            userEvent.type(nameText, 'c');
            expect(screen.queryByRole('alert')).not.toBeInTheDocument();
          });
     test('budget validation',async()=>{
         userEvent.clear(budgetText)
         userEvent.type(budgetText,'0')
         expect(screen.getByRole('alert')).toBeInTheDocument();
         userEvent.type(budgetText,'1');
         expect(screen.queryByRole('alert')).not.toBeInTheDocument();
     })

})
