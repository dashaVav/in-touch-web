import {Component} from "react";
import {Button} from "react-bootstrap";
import "./SimpleButton.css"

/**
 * Класс упрощенной кнопки с иконкой
 */
export default class SimpleButton extends Component {
    render() {
        const { buttonText, onClick, logoUrl } = this.props;
        return (
            <div className="button-data-container" onClick={onClick}>
                <img className="button-image" alt="logo" src={logoUrl}/>
                <Button className="simple-button">
                    <text>{buttonText}</text>
                </Button>
            </div>
        );
    }
}