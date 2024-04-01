import CustomNavbar from '../../components/navbar/CustomNavbar';

export default function SimpleLayout({ children }) {
    return (
        <>
            <CustomNavbar/>
            <main>{children}</main>
        </>
    );
}