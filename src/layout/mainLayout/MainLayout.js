import CustomNavbar from '../../components/navbar/CustomNavbar';
import "./MainLayout.css"

/**
 * Основной класс для представления на экране всех ui-элементов для взаимодействия с мессенджером
 * @param children Layout соответствующий контенту, который необходимо отобразить
 * @returns {JSX.Element}
 * @constructor
 */
export default function MainLayout({ children }) {
    return (
        <div className="main-pane">
            <CustomNavbar/>
            <main className="main-content">{children}</main>
        </div>
    );
}