import Button from "react-bootstrap/Button"
import "./CustomButton.css"
import {Component} from "react";


/**
 * Класс кастомной кнопки без картинки
 */
export default class CustomButton extends Component {
    render() {
        const { buttonText, onClick } = this.props;
        return <Button className="button" onClick={onClick}>
            <text>{buttonText}</text>
        </Button>;
    }
}