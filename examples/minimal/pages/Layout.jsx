import "./Layout.css";

export function Layout(props) {
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
      <Content>{props.children}</Content>
    </PageLayout>
  );
}

function PageLayout(props) {
  return (
    <div
      style={{
        display: "flex",
        "max-width": "900px",
        margin: "auto",
      }}
    >
      {props.children}
    </div>
  );
}

function Sidebar(props) {
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
      {props.children}
    </div>
  );
}

function Content(props) {
  return (
    <div
      style={{
        padding: "20px",
        "padding-bottom": "50px",
        "border-left": "2px solid #eee",
        "min-height": "100vh",
      }}
    >
      {props.children}
    </div>
  );
}
