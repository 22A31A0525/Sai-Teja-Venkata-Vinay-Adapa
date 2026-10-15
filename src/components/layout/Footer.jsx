import MotionPreferences from "../../motion/MotionPreferences";
import ThemeToggle from "../../theme/ThemeToggle";

const Footer=()=>{
    return(
        <footer className="site-footer">
            <p>&copy; {new Date().getFullYear()} Sai Teja Venkata Vinay Adapa</p>
            <div className="footer-actions">
                <ThemeToggle />
                <MotionPreferences />
                <a className="text-link" href="#home">Back to top ↑</a>
            </div>
        </footer>
    )
}

export default Footer
