
import { render, screen } from '@testing-library/react'
import '@testing-library/jest-dom'
import Login from 'pages/login'
import { Provider } from 'react-redux';
import configureStore from 'redux-mock-store';

describe('Login page', () => {
  const initialState = {
    app: {
      appBarHeight: 0,
      notes: [],
      selectedNote: 0
    }
  };
  const mockStore = configureStore();
  let store;

  it('There should be Login/Singup button"', () => {
    store = mockStore(initialState);
    const { getByText } = render(
      <Provider store={store}>
        <Login />
      </Provider>
    );

    expect(getByText('Login/Signup')).not.toBeNull();
  });
})