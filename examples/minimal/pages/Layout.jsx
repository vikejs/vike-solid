import "./Layout.css";

export function Layout({ children }) {
  return (
    <PageLayout>
      <Sidebar>
        <a class="navitem" href="/">
          Home
        </a>
        <a class="navitem" href="/about">
          About
        </a>
      </Sidebar>
      <Content>{children}</Content>
    </PageLayout>
  );
}

function PageLayout({ children }) {
  return (
    <div
      style={{
        display: "flex",
        "max-width": "900px",
        margin: "auto",
      }}
    >
      {children}
    </div>
  );
}

function Sidebar({ children }) {
  return (
    <div
      style={{
        padding: "20px",
        "padding-top": "42px",
        "flex-shrink": 0,
        display: "flex",
        "flex-direction": "column",
        "align-items": "center",
        "line-height": "1.8em",
      }}
    >
      {children}
    </div>
  );
}

function Content({ children }) {
  return (
    <div
      style={{
        padding: "20px",
        "padding-bottom": "50px",
        "border-left": "2px solid #eee",
        "min-height": "100vh",
      }}
    >
      {children}
    </div>
  );
}
