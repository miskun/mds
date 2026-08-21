import React from "react";
import ReactDOM from "react-dom/client";
import { ArrowUpRight, Command, Download, Search } from "lucide-react";
import { Badge, Button, Card, Input, Switch, Tab, Tabs } from "./components";
import "./styles/mds.css";
import "./showcase.css";

function App() {
  return (
    <main className="showcase">
      <section className="showcase__hero">
        <div className="mds-stack">
          <p className="mds-kicker">Miskun Design System</p>
          <h1 className="mds-title">Black interface components for focused creative tools.</h1>
          <p className="mds-subtitle">
            MDS starts as a React component library with Storybook documentation, Inter typography, sharp dark surfaces,
            and a signal-bright accent.
          </p>
          <div className="mds-cluster">
            <Button icon={<Command size={16} />}>Open Storybook</Button>
            <Button variant="secondary" icon={<Download size={16} />}>Install Package</Button>
            <Button variant="ghost" icon={<ArrowUpRight size={16} />}>View Tokens</Button>
          </div>
        </div>
      </section>

      <section className="showcase__grid">
        <Card eyebrow="Foundation" title="Interface Tokens">
          <div className="token-grid">
            {["#050505", "#111113", "#2a2a2e", "#f5f5f4", "#d7ff3f"].map((color) => (
              <div className="token" key={color}>
                <span className="token__swatch" style={{ background: color }} />
                <span>{color}</span>
              </div>
            ))}
          </div>
        </Card>

        <Card eyebrow="Controls" title="Component Set">
          <div className="mds-stack">
            <Tabs>
              <Tab active>Overview</Tab>
              <Tab>Usage</Tab>
              <Tab>Specs</Tab>
            </Tabs>
            <Input label="Command" placeholder="Search components" hint="Inter, 14px, focused accent ring" />
            <div className="mds-cluster">
              <Badge tone="accent">Alpha</Badge>
              <Badge>React</Badge>
              <Badge tone="success">Ready</Badge>
              <Badge tone="danger">Breaking</Badge>
            </div>
            <Switch label="Show command hints" defaultChecked />
          </div>
        </Card>

        <Card
          eyebrow="Pattern"
          title="Command Surface"
          action={<Button size="sm" variant="secondary" icon={<Search size={14} />}>Find</Button>}
        >
          <div className="command-list">
            {["Button", "Input", "Card", "Tabs"].map((item) => (
              <div className="command-list__row" key={item}>
                <span>{item}</span>
                <Badge tone="neutral">Component</Badge>
              </div>
            ))}
          </div>
        </Card>
      </section>
    </main>
  );
}

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
);
