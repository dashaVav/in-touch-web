import './IconButton.css'
import {Component} from "react";

export default class IconButton extends Component {
    render() {
        const { onClick, logoUrl, blue } = this.props;

        return (
            <div className="icon-button-container" onClick={onClick} style={(blue) ? {backgroundColor: "#3E46FF"} : null}>
                <img className="icon-button-image" alt="info" src={logoUrl}/>
            </div>
        );
    }
}