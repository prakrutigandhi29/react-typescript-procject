import { render, screen, waitForElementToBeRemoved } from '@testing-library/react';
import { Provider } from "react-redux"
import { MemoryRouter } from "react-router-dom"
import {store} from '../../state'
import ProjectPage from '../ProjectPage';
import {rest} from 'msw';
import {setupServer} from 'msw/node';
import {url} from '../ProjectAPI';
import { MOCK_PROJECTS } from '../MockProjects';
const server=setupServer(rest.get(url,(req,res,ctx)=>{
    return res(ctx.json(MOCK_PROJECTS));
}))
describe('<ProjectsPage />', () => {

     function renderComponent() {
      render(
        <Provider store={store}>
          <MemoryRouter>
            <ProjectPage />
          </MemoryRouter>
        </Provider>
      );
    }
  beforeAll(()=>server.listen())
  afterEach(()=>server.resetHandlers())
  afterAll(()=>server.close())
    test('should render without crashing', () => {
      renderComponent();
      expect(screen).toBeDefined();
    });
    test('should display loading', () => {
            renderComponent();
            expect(screen.getByText(/loading/i)).toBeInTheDocument();
  }); 

  test('project should display',async()=>{
      renderComponent();
      expect(await screen.findAllByRole('img')).toHaveLength(MOCK_PROJECTS.length);
  })

  test('more button should display',async () => {
      renderComponent();
      expect(await screen.findByRole('button',{name:/more/i})).toBeInTheDocument();
  })

  //same as above but to check that more button 
  //display after loading bar is removed

  test('more button after loading is removed',async()=>{
      renderComponent();

      await waitForElementToBeRemoved(()=>screen.getByText(/loading/i))
      expect(screen.getByRole('button',{name:/more/i})).toBeInTheDocument();

  })

  test('should display custom error on server error', async () => {
        server.use(
          rest.get(url, (req, res, ctx) => {
            return res(ctx.status(500, 'Server error'));
          })
        );
        renderComponent();
    
        expect(
          await screen.findByText(/There was an error retrieving the project(s)./i)
        ).toBeInTheDocument();
      });

});