import "./CustomTag.css"

export const CustomTag = ({ icon, text }) => {
    return (
        <div className="tag">
            <img className="tag-image" alt="icon" src={icon}/>
            <text className="tag-text">{text}</text>
        </div>
    );
};