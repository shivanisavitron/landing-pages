import { Button } from "./components/Button";

function App() {
  return (
    <div className="min-h-screen bg-neutral-50 p-2xl font-sans">
      <h1 className="text-3xl font-semibold text-neutral-900 mb-lg">Allpages Design System</h1>
      <div className="flex gap-sm">
        <Button variant="primary">Primary</Button>
        <Button variant="secondary">Secondary</Button>
        <Button variant="danger">Danger</Button>
      </div>
    </div>
  );
}

export default App;
