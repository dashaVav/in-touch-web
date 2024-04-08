import {Component} from "react";
import Button from "react-bootstrap/Button";
import "./SimpleButton.css"

/**
 * Класс упрощенной кнопки с иконкой
 */
export default class SimpleButton extends Component {
    render() {
        const { buttonText, onClick, logoUrl } = this.props;
        return (
            <div className="button-data-container">
                <img className="button-image" alt="logo" src={logoUrl}/>
                <Button className="simple-button" onClick={onClick}>
                    <text>{buttonText}</text>
                </Button>
            </div>
        );
    }
}