import { NavLink } from 'react-router-dom';
import './Header.css'
import { useContext } from 'react';
import { AuthContext } from '../../auth/auth/Auth';
import useUserInfo from '../../../hooks/useUserInfo';
import { useTranslation } from 'react-i18next';

function Header(): JSX.Element {

    const { t, i18n } = useTranslation();
    const { firstName, lastName } = useUserInfo()
    const { logout } = useContext(AuthContext)!

    function logoutMe() {
        if (confirm("Are you sure to logout ?")) {
            logout()
        }
    }

    const changeLanguage = (lang: string) => {
        i18n.changeLanguage(lang);
    };

    const currentLanguage = i18n.language;

    return (
        <div className="Header">
            <nav className="main-nav">
                <NavLink to="/">{t('home')}</NavLink>
                <NavLink to="/all">{t('appointments')}</NavLink>
            </nav>

            <div className="user-nav">
                <span>
                    {t('hello')} {firstName} {lastName}
                </span>
                <button onClick={logoutMe}>{t('logout')}</button>

                <div className="language-switcher">
                    <button
                        onClick={() => changeLanguage('fr')}
                        title="Français"
                        className={currentLanguage === 'fr' ? 'active' : ''}
                    >
                        🇫🇷
                    </button>
                    <button
                        onClick={() => changeLanguage('en')}
                        title="English"
                        className={currentLanguage === 'en' ? 'active' : ''}
                    >
                        🇺🇸
                    </button>
                    <button
                        onClick={() => changeLanguage('he')}
                        title="עברית"
                        className={currentLanguage === 'he' ? 'active' : ''}
                    >
                        🇮🇱
                    </button>
                </div>
            </div>
        </div>
    );
}

export default Header;