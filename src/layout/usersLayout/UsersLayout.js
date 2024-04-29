import {Component} from "react";
import './UsersLayout.css'
import {UserCell} from "../../components/userCell/UserCell.js";

export class UsersLayout extends Component {
    render() {
        const {userList} = this.props;
        const usersCells = [];

        console.log("UsersPage")

        for (let i = 0; i < userList.length; i++) {
            const user = userList[i];
            usersCells.push(
                <UserCell key={user.id} user={user} onClicked={() => this.props.onUserClicked(user)} onGoToClicked={() => this.props.onGoTOChatClicked(user)}/>
            );
        }

        return (
            <div className="users-container">
                {usersCells}
            </div>
        );
    }
}