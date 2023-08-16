import { Suspense } from "react";
import "./App.css";
import Layout from "./Layout/Layout";

function App() {
  return (
    <div>
      <Suspense fallback={<div>Loading...</div>}>
        <Layout />
      </Suspense>
    </div>
  );
}

export default App;
