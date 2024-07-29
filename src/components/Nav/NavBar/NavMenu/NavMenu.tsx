import "./NavMenu.css";

export function NavMenu({ navItems= [] }: { navItems?: { text: string; url: string }[] }) {

    
    return (
        <div className="nav-items">
                {navItems.map((item, index) => (
                    <a // cambiar los anchor por Link
                        key={index}
                        className="item-link"
                        itemRef={item.url}
                    >
                        {item.text}
                    </a>
                ))}
        </div>
    );
}