import MainLayout from "./layout/mainLayout/MainLayout";
import './assets/App.css';
import {LoginLayout} from "./layout/loginLayout/LoginLayout";
import {useState} from "react";
import {MessengerLayout} from "./layout/messengerLayout/MessengerLayout";

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

    return (
        <div className="app-main-pane">
            <MainLayout>
                {loggedIn ? <MessengerLayout onLogout={handleLogout} /> : <LoginLayout onLogin={handleLogin} />}
            </MainLayout>
        </div>
  );
}

export default App;
