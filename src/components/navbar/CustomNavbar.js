import { Component } from 'react';
import Container from 'react-bootstrap/Container';
import Navbar from 'react-bootstrap/Navbar';
import logo from '../../assets/icon.png';
import './CustomNavbar.css';


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