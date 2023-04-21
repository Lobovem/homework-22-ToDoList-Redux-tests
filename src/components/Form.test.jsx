import { fireEvent, render, screen } from '@testing-library/react';
import { useDispatch } from 'react-redux';
import { Provider } from 'react-redux';
import { Form } from './Form';
import { store } from '../store';

jest.mock('react-redux', () => ({
  ...jest.requireActual('react-redux'),
  useDispatch: jest.fn(),
  useSelector: jest.fn(),
}));

const dispatch = jest.fn();

describe('Form', () => {
  //snapshot component
  it('should be maked snapshot Form', () => {
    // eslint-disable-next-line testing-library/render-result-naming-convention
    const component = render(
      <Provider store={store}>
        <Form />
      </Provider>
    );

    expect(component).toMatchSnapshot();
  });

  //search input
  it('should search input', () => {
    render(
      <Provider store={store}>
        <Form />
      </Provider>
    );
    const input = screen.getByPlaceholderText('Please enter new task...');
    expect(input).toBeInTheDocument();
  });

  //empty input
  it('should be empty data in input', () => {
    render(
      <Provider store={store}>
        <Form />
      </Provider>
    );

    const input = screen.getByPlaceholderText('Please enter new task...');
    expect(input.value).toBe('');
  });

  //fill input
  it('should be filled text of "todo one" in input', () => {
    useDispatch.mockReturnValue(dispatch);

    render(
      <Provider store={store}>
        <Form />
      </Provider>
    );

    const input = screen.getByPlaceholderText('Please enter new task...');
    fireEvent.change(input, { target: { value: 'todo one' } });
    expect(input.value).toBe('todo one');
  });

  //search button add
  it('should search button of add todo', () => {
    render(
      <Provider store={store}>
        <Form />
      </Provider>
    );

    const btn = screen.getByRole('button', { name: '+' });
    expect(btn).toBeInTheDocument();
  });

  //onclick onsubmit
  it('should be click onSubmit', () => {
    useDispatch.mockReturnValue(dispatch);
    const handleSubmit = jest.fn();

    render(
      <Provider store={store}>
        <Form />
      </Provider>
    );

    const input = screen.getByPlaceholderText('Please enter new task...');
    fireEvent.change(input, { target: { value: 'todo one' } });

    const btn = screen.getByRole('button', { name: '+' });
    expect(btn).toBeInTheDocument();
    expect(handleSubmit).toHaveBeenCalledTimes(0);

    handleSubmit(btn);
    expect(handleSubmit).toHaveBeenCalledTimes(1);
  });

  it('should search button of Remove checked', () => {
    render(
      <Provider store={store}>
        <Form />
      </Provider>
    );

    const btn = screen.getByRole('button', { name: 'Remove checked' });
    expect(btn).toBeInTheDocument();
  });

  //onclick remove checked
  it('should be one click button of Remove checked', () => {
    const handleClick = jest.fn();

    render(
      <Provider store={store}>
        <Form onClick={handleClick} />
      </Provider>
    );

    const btn = screen.getByRole('button', { name: 'Remove checked' });
    handleClick(btn);
    expect(handleClick).toHaveBeenCalledTimes(1);
  });

  // check (click) submit
  it('should be called dispatch with ADD_TODO', () => {
    useDispatch.mockReturnValue(dispatch);

    render(
      <Provider store={store}>
        <Form />
      </Provider>
    );

    const input = screen.getByPlaceholderText('Please enter new task...');
    fireEvent.change(input, { target: { value: 'todo two' } });

    expect(input.value).toBe('todo two');

    const btn = screen.getByRole('button', { name: '+' });
    dispatch(btn);

    expect(dispatch).toHaveBeenCalledTimes(2);
  });
});
