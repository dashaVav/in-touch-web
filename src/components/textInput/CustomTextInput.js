import {Component} from "react";
import "./CustomTextInput.css"

/**
 * Класс кастомного тесктового поля
 */
export default class CustomTextInput extends Component {

    render() {
        const { onChange, text, type, value, maxLength } = this.props;

        return (
            <div className="text-input-container">
                <input className="text-input" type={type} onChange={onChange} placeholder={text} value={value} maxLength={maxLength}/>
            </div>);
    }
}