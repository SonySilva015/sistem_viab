import { Link, Outlet, useLocation } from "react-router-dom";

export default function Layout() {
    const location = useLocation();

    const isSelected = (path: string) => location.pathname === path;

    return (
        <div style={{ display: "flex", height: "100vh", backgroundColor: "#0f172a", color: "#f8fafc", fontFamily: "sans-serif" }}>
            {/* Sidebar Fixa */}
            <aside style={{ width: "220px", backgroundColor: "#1e293b", padding: "24px 16px", borderRight: "1px solid #334155" }}>
                <h3 style={{ color: "#38bdf8", margin: "0 0 24px 8px" }}>Tauri Desktop</h3>

                <nav style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
                    <Link
                        to="/"
                        style={{
                            ...styles.navItem,
                            backgroundColor: isSelected("/") ? "#334155" : "transparent"
                        }}
                    >
                        📊 Dashboard
                    </Link>
                    <Link
                        to="/configuracoes"
                        style={{
                            ...styles.navItem,
                            backgroundColor: isSelected("/configuracoes") ? "#334155" : "transparent"
                        }}
                    >
                        ⚙️ Configurações
                    </Link>
                </nav>
            </aside>

            {/* Conteúdo Dinâmico */}
            <main style={{ flex: 1, padding: "32px", overflowY: "auto" }}>
                <Outlet />
            </main>
        </div>
    );
}

const styles = {
    navItem: {
        padding: "10px 14px",
        borderRadius: "6px",
        color: "#f8fafc",
        textDecoration: "none",
        fontSize: "14px",
        fontWeight: "500",
        transition: "background 0.2s"
    }
};