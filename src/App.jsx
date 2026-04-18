import React, { Suspense } from "react";
import AppRoutes from "./component/AppRoutes";
import Navbar from "./component/Navbar";
import Footer from "./component/Footer";

function App() {
  return (
    <Suspense fallback={<div>Cargando...</div>}>
      <Navbar />
      <main className="app-content">
        <AppRoutes />
      </main>
      <Footer />
    </Suspense>
  );
}

export default App;
