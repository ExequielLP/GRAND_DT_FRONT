import React, { Suspense } from "react";
import AppRoutes from "./component/AppRoutes";
import Navbar from "./component/Navbar";

function App() {
  return (
    <Suspense fallback={<div>Cargando...</div>}>
      <Navbar />
      <main className="app-content">
        <AppRoutes />
      </main>
    </Suspense>
  );
}

export default App;
