import React, {Component} from "react";
import './UsersLayout.css'
import {UserCell} from "../../components/userCell/UserCell.js";
import icon from "../../assets/search-icon.svg";
import {allUsers, searchUsersAtViewAllUsers} from "../../services/Model.js";

export class UsersLayout extends Component {
    constructor(props) {
        super(props);
        this.state = {
            searchValue: ""
        };
        this.handleSearchChange = this.handleSearchChange.bind(this);
    }

    async handleSearchChange(event) {
        this.setState({searchValue: event.target.value}, () => {
            searchUsersAtViewAllUsers(this.state.searchValue.toString());
        });
    }

    componentDidMount() {
        window.addEventListener('updateUserList', this.handleUserListChanged);
    }

    componentWillUnmount() {
        window.removeEventListener('updateUserList', this.handleUserListChanged);
    }

    handleUserListChanged = () => {
        console.log("UPDATE USER LIST")
        this.setState({chatList: allUsers})
        this.forceUpdate()
    }

    render() {
        const userList = allUsers;
        const usersCells = [];

        for (let i = 0; i < userList.length; i++) {
            const user = userList[i];
            usersCells.push(
                <UserCell key={user.id} user={user} onClicked={() => this.props.onUserClicked(user)}
                          onGoToClicked={() => this.props.onGoTOChatClicked(user)}/>
            );
        }

        return (
            <div className="main-users-container">
                <text className="layoutName">Users</text>
                <div className="search-container">
                    <img className="search-image" alt="search" src={icon}/>
                    <input
                        className="search-input"
                        type="text"
                        value={this.state.searchValue}
                        onChange={this.handleSearchChange}
                        placeholder="Find users..."
                    />
                </div>
                <div className="users-container">
                    {usersCells}
                </div>
            </div>
        );
    }
}