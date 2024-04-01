import MyNavbar from '../../components/navbar/MyNavbar';

export default function SimpleLayout({ children }) {
    return (
        <>
            <MyNavbar/>
            <main>{children}</main>
        </>
    );
}