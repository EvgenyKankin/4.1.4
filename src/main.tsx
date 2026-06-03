import ReactDOM from 'react-dom/client';
import App from './App/App.tsx';
import { Provider } from 'react-redux';
import { store } from './App/store';


ReactDOM.createRoot(document.getElementById('root')!).render(
  <Provider store={store}>
    <App />
  </Provider>
);
