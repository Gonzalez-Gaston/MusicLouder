import { Link } from "react-router-dom";
import "./NavMenu.css";

export function NavMenu({ navItems= [] }: { navItems?: { text: string; url: string }[] }) {

    
    return (
        <div className="nav-items">
                {navItems.map((item, index) => (
                    <Link
                        key={index}
                        className="item-link-nav"
                        to={item.url}
                    >
                        {item.text}
                    </Link>
                ))}
        </div>
    );
}