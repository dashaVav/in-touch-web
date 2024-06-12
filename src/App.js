import MainLayout from "./layout/mainLayout/MainLayout.js";
import './assets/App.css';
import {LoginLayout} from "./layout/loginLayout/LoginLayout.js";
import {useEffect, useState} from "react";
import {MessengerLayout} from "./layout/messengerLayout/MessengerLayout.js";
import {logout} from "./services/Model.js";

function App() {
    const [loggedIn, setLoggedIn] = useState(false);

    const handleLogin = () => {
        setLoggedIn(true);
    };

    const handleLogout = () => {
        setLoggedIn(false);
    }

    useEffect(() => {
        const handleBeforeUnload = (event) => {
            console.log('Пользователь покидает страницу');
            event.returnValue = '';
            logout();
        };

        window.addEventListener('beforeunload', handleBeforeUnload);

        return () => {
            window.removeEventListener('beforeunload', handleBeforeUnload);
        };
    }, []);

    return (
        <div className="app-main-pane">
            <MainLayout>
                {loggedIn ? <MessengerLayout onLogout={handleLogout} /> : <LoginLayout onLogin={handleLogin} />}
            </MainLayout>
        </div>
  );
}

export default App;
