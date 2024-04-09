import {Component} from "react";
import CustomTextInput from "../../components/textInput/CustomTextInput.js";
import CustomButton from "../../components/button/CustomButton.js";
import "./LoginLayout.css"
import {allUsers, login, users} from "../../services/main.js";

/**
 * Класс визуального представления экрана для логина
 */
export class LoginLayout extends Component {
    constructor(props) {
        super(props);
        this.state = {
            loginText: '',
            passwordText: '',
        };
    }

    /**
     * Метод для соханения текста из поля логина
     * @param text введеный текст
     */
    handleLoginTextFieldChange = (text) => {
        this.setState({ loginText: text.target.value });
    }

    /**
     * Метод для соханения текста из поля пароля
     * @param text введеный текст
     */
    handlePasswordTextFieldChange = (text) => {
        this.setState({ passwordText: text.target.value });
    }

    /**
     * Метод для обработки события нажатия на кнопку для логина
     */
    handleButtonClick= async () => {
        try {
            await login(this.state.loginText.toString(), this.state.passwordText.toString());
            await users();
            console.log(allUsers)
            this.props.onLogin();
        } catch (error) {
            console.error('Ошибка при логине:', error);
        }
    }

    /**
     * Возвращает элемент вью с отображением текстовых полей и кнопки для логина
     * @returns {JSX.Element}
     */
    render() {
        return (
            <div className="login-pane">
                <CustomTextInput onChange={this.handleLoginTextFieldChange} text="Login" type="text"/>
                <CustomTextInput onChange={this.handlePasswordTextFieldChange} text="Password" type="password"/>
                <CustomButton
                    buttonText="Click me"
                    onClick={this.handleButtonClick}
                />
            </div>
        );
    }
}