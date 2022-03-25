import HomePage from '../components/HomePage';
import renderer from 'react-test-renderer';
import { render,screen } from '@testing-library/react';
  describe('<HomePage/>', () => {
    test('renders learn react link', () => {
        render(<HomePage />);
        expect(screen.getByRole('heading')).toHaveTextContent('Home');
      });
    test('snapshot', () => {
        const tree = renderer.create(<HomePage />).toJSON();
        expect(tree).toMatchSnapshot();
      });
     });

