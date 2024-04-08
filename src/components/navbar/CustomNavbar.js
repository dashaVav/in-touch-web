import { Component } from 'react';
import logo from '../../assets/icon.svg';
import './CustomNavbar.css';
import {Container, Navbar} from "react-bootstrap";


/**
 * Класс кастомного навигационного бара
 */
export default class CustomNavbar extends Component {
    render() {
        return <Navbar className="nav-bar">
                    <Container className="nav-bar-container">
                        <img className="nav-bar-image" alt="logo" src={logo}/>{' '}
                        <text className="nav-bar-text">In Touch</text>
                    </Container>
               </Navbar>;
    }
}