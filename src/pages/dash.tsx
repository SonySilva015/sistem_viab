import { useEffect, useState } from "react";
import { invoke } from "@tauri-apps/api/core";

// Interface 100% idêntica à struct do Rust!
interface DashboardData {
    message: string;
    status: string;
    timestamp: string;
}

export default function Dashboard() {
    const [data, setData] = useState<DashboardData | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    const [numA, setNumA] = useState<number>(10);
    const [numB, setNumB] = useState<number>(20);
    const [soma, setSoma] = useState<number | null>(null);

    useEffect(() => {
        setLoading(true);
        invoke<DashboardData>("get_hello_message")
            .then((res) => {
                setData(res);
                setError(null);
            })
            .catch((err) => {
                console.error("Erro no invoke do Rust:", err);
                setError(String(err));
            })
            .finally(() => {
                setLoading(false);
            });
    }, []);

    const handleCalcular = async () => {
        try {
            const res = await invoke<number>("somar_valores", { a: Number(numA), b: Number(numB) });
            setSoma(res);
        } catch (err) {
            console.error("Erro ao somar:", err);
        }
    };

    return (
        <div style={styles.card}>
            <h2>🚀 Dashboard (Visão Geral)</h2>

            {loading ? (
                <p style={{ color: "#eab308" }}>⏳ A carregar dados do Rust...</p>
            ) : error ? (
                <p style={{ color: "#ef4444" }}>❌ Erro ao conectar com o Rust: {error}</p>
            ) : (
                <div>
                    <p style={{ color: "#94a3b8" }}>
                        Mensagem do Rust: <strong style={{ color: "#38bdf8" }}>"{data?.message}"</strong>
                    </p>
                    <p style={{ color: "#94a3b8", fontSize: "13px" }}>
                        Status: <span style={{ color: "#22c55e" }}>{data?.status}</span> | Data: {data?.timestamp}
                    </p>
                </div>
            )}

            <hr style={{ borderColor: "#334155", margin: "20px 0" }} />

            <h3>Calculadora Nativa (Rust)</h3>
            <div style={{ display: "flex", gap: "10px", margin: "15px 0", alignItems: "center" }}>
                <input
                    type="number"
                    value={numA}
                    onChange={(e) => setNumA(Number(e.target.value))}
                    style={styles.input}
                />
                <span style={{ fontSize: "20px" }}>+</span>
                <input
                    type="number"
                    value={numB}
                    onChange={(e) => setNumB(Number(e.target.value))}
                    style={styles.input}
                />
                <button onClick={handleCalcular} style={styles.button}>
                    Calcular no Rust
                </button>
            </div>

            {soma !== null && (
                <p style={{ fontSize: "18px", color: "#4ade80" }}>
                    Resultado: <strong>{soma}</strong>
                </p>
            )}
        </div>
    );
}

const styles = {
    card: { backgroundColor: "#1e293b", padding: "24px", borderRadius: "8px", border: "1px solid #334155" },
    input: { backgroundColor: "#0f172a", border: "1px solid #334155", color: "#fff", padding: "8px 12px", borderRadius: "6px", width: "80px" },
    button: { backgroundColor: "#0284c7", color: "#fff", border: "none", padding: "8px 16px", borderRadius: "6px", cursor: "pointer", fontWeight: "bold" }
};