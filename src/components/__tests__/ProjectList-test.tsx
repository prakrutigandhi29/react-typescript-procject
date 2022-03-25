import { render, screen } from '@testing-library/react';
import { Provider } from "react-redux"
import { MemoryRouter } from "react-router-dom"
import {store} from '../../state'
import ProjectList from "../ProjectList"
import {MOCK_PROJECTS} from '../MockProjects'
import userEvent from '@testing-library/user-event';
import React from 'react';
describe('<ProjectList/>',()=>{
    beforeEach(()=>{
        render(
            <Provider store={store}>
                <MemoryRouter>
                    <ProjectList projects={MOCK_PROJECTS}/>
                </MemoryRouter>
            </Provider>
        )
    })
    test('should run without crashing',()=>{
        expect(screen).toBeDefined;
    })
    test('all projects should display',()=>{
        expect(screen.getAllByRole('heading')).toHaveLength(MOCK_PROJECTS.length);
        expect(screen.getAllByRole('img')).toHaveLength(MOCK_PROJECTS.length);
        expect(screen.getAllByRole('link')).toHaveLength(MOCK_PROJECTS.length);
        expect(screen.getAllByRole('button')).toHaveLength(MOCK_PROJECTS.length);
        
    })
    test('form should display on click',()=>{ 
        userEvent.click(screen.getByRole('button',{name:/edit Wisozk Group/i}));
        expect(
            screen.getByRole('form',{name:/edit a project/i})
        ).toBeInTheDocument();
        })
    test('form should disappear on clicking cancel and project details should be displayed',()=>{
        userEvent.click(screen.getByRole('button',{name:/edit Wisozk Group/i}));
        userEvent.click(screen.getByRole('button',{name:'cancel'}));
        expect(screen.getByRole('img',{name:'Wisozk Group'}))
        .toBeInTheDocument();
        expect(
            screen.queryByRole('form',{name:/edit a project/i})
        ).not.toBeInTheDocument();
    })

})