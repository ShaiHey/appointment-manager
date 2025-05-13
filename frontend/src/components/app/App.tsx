import { BrowserRouter } from 'react-router-dom';
import Layout from '../layout/layout/Layout';
import './App.css'
import { Provider } from 'react-redux';
import store from '../../redux/store';
import Auth from '../auth/auth/Auth';
import { useEffect } from 'react';
import { useTranslation } from 'react-i18next';

function App(): JSX.Element {

  const { i18n } = useTranslation();

  useEffect(() => {
    const isRTL = i18n.language === 'he';
    document.body.dir = isRTL ? 'rtl' : 'ltr'; // définit la direction HTML
    document.body.classList.toggle('rtl', isRTL); // classe CSS optionnelle
  }, [i18n.language]);

  return (
    <div className='App'>
      <BrowserRouter>
        <Provider store={store}>
          <Auth>
            <Layout />
          </Auth>
        </Provider>
      </BrowserRouter>
    </div>
  )
}

export default App;