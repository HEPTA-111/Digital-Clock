

function Footer() { 
    const Year = new Date().getFullYear();
    return (
        <footer className="footer">
            <p>Copyright &copy; {Year}</p>
        </footer>
    )


}
export default Footer;