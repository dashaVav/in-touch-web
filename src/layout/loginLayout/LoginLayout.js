import {Component} from "react";
import CustomTextInput from "../../components/textInput/CustomTextInput";
import CustomButton from "../../components/button/CustomButton";
import "./LoginLayout.css"

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
    handleButtonClick = () => {
        // TODO тут обрабатывать логин и паролль
        // Как получить данные из полей: this.state.loginText.toString()
        console.log(this.state.loginText.toString() + " " + this.state.passwordText.toString())
        this.props.onLogin();
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