import { useState } from "react";

export default function Settings() {
    const [temaEscuro, setTemaEscuro] = useState(true);

    return (
        <div style={{ backgroundColor: "#1e293b", padding: "24px", borderRadius: "8px", border: "1px solid #334155" }}>
            <h2>⚙️ Configurações</h2>
            <p style={{ color: "#94a3b8" }}>Esta tela confirma que a navegação por rotas do React Router em janela única está a funcionar!</p>

            <div style={{ marginTop: "20px", display: "flex", alignItems: "center", gap: "10px" }}>
                <input
                    type="checkbox"
                    checked={temaEscuro}
                    onChange={() => setTemaEscuro(!temaEscuro)}
                    id="darkmode"
                />
                <label htmlFor="darkmode" style={{ cursor: "pointer" }}>Ativar Tema Escuro (Simulado)</label>
            </div>
        </div>
    );
}