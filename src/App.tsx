import { NavLink, Route, BrowserRouter as Router, Routes } from 'react-router-dom';
import './App.css';
import ProjectPage from './components/ProjectPage';
import ProjectDetailPage from './components/ProjectDetailPage'
import HomePage from './components/HomePage';
import { Provider } from 'react-redux';
 import { store } from './state';
function App() {
  return (
    <Provider store={store}>
    <Router>
            <header className="sticky">
            <NavLink to="/" className="button rounded">
                Home
              </NavLink>
              <NavLink to="/projects" className="button rounded">
                Projects
              </NavLink>
            </header>
        <div className="container">
          <Routes>
            <Route path='/' element={<HomePage/>}/>
            <Route path="/projects" element={<ProjectPage  />} />
            <Route path="/projects/:id" element={<ProjectDetailPage />} />
          </Routes>
        </div>
      </Router>
      </Provider>
    
  )
}
export default App;
