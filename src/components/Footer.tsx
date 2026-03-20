// Arrow Function แบบ
const Footer = () => {
    const year = new Date().getFullYear();

    return (
        <footer className="footer">
            <p>© {year} Pokemon App - Made with ❤️</p>
        </footer>
    );
};

export default Footer;
