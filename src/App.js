import MainLayout from "./layout/mainLayout/MainLayout.js";
import './assets/App.css';
import {LoginLayout} from "./layout/loginLayout/LoginLayout.js";
import {useEffect, useState} from "react";
import {MessengerLayout} from "./layout/messengerLayout/MessengerLayout.js";

function App() {
    // State для хранения состояния вошел ли пользователь в систему или нет
    const [loggedIn, setLoggedIn] = useState(false);

    // Обработчик события входа в систему
    const handleLogin = () => {
        setLoggedIn(true);
    };

    // Обработчик события выхода в систему
    const handleLogout = () => {
        setLoggedIn(false);
    }
    const handleBeforeUnload = (event) => {
        if (event) {
            event.returnValue = '';
        }
        handleLogout();
    };

    useEffect(() => {
        window.addEventListener('beforeunload', handleBeforeUnload);
        const timeoutId = setTimeout(handleBeforeUnload, 600000);
        const resetTimer = () => {
            clearTimeout(timeoutId);
            setTimeout(handleBeforeUnload, 100000);
        };

        document.addEventListener('mousemove', resetTimer);
        document.addEventListener('keypress', resetTimer);
        document.addEventListener('scroll', resetTimer);
        document.addEventListener('click', resetTimer);

        return () => {
            window.removeEventListener('beforeunload', handleBeforeUnload);
            clearTimeout(timeoutId);
            document.removeEventListener('mousemove', resetTimer);
            document.removeEventListener('keypress', resetTimer);
            document.removeEventListener('scroll', resetTimer);
            document.removeEventListener('click', resetTimer);
        };
    }, []);

    return (
        <div className="app-main-pane">
            <MainLayout>
                {loggedIn ? <MessengerLayout onLogout={handleLogout}/> : <LoginLayout onLogin={handleLogin}/>}
            </MainLayout>
        </div>
    );
}

export default App;
