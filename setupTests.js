const mockNoop = () => new Promise(() => {});
import Adapter from 'enzyme-adapter-react-16';
import { configure } from 'enzyme';
configure({ adapter: new Adapter() });
// Notice how `create` was not being mocked here...
jest.mock('axios', () => ({
  default: mockNoop,
  get: mockNoop,
  post: mockNoop,
  put: mockNoop,
  delete: mockNoop,
  patch: mockNoop,
}));
