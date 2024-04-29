import './IconButton.css'
import {Component} from "react";

export default class IconButton extends Component {
    render() {
        const { onClick, logoUrl } = this.props;
        return (
            <div className="icon-button-container" onClick={onClick}>
                <img className="icon-button-image" alt="info" src={logoUrl}/>
            </div>
        );
    }
}