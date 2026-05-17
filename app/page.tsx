export default function HomePage() {
  return (
    <main
      style={{
        maxWidth: 700,
        margin: "40px auto",
        padding: 24,
        fontFamily: "Arial"
      }}
    >
      <h1>Studio Cardiologico Valente</h1>

      <p>
        Cardiologia clinica e diagnostica cardiovascolare.
      </p>

      <a
        href="/prenota"
        style={{
          display: "inline-block",
          marginTop: 24,
          padding: "14px 24px",
          background: "#0f766e",
          color: "white",
          borderRadius: 12,
          textDecoration: "none",
          fontWeight: "bold"
        }}
      >
        Prenota appuntamento
      </a>
    </main>
  );
}
