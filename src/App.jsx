import React, { Suspense, useEffect } from "react";
import AppRoutes from "./routes/AppRoutes";
import Navbar from "./component/Navbar";
import Footer from "./component/Footer";
import useAuthStore from "./hooks/useAuthStore";

function App() {
  const isAuthenticated = useAuthStore((state) => state.isAuthenticated);
  const checkAuth = useAuthStore((state) => state.checkAuth);

  useEffect(() => {
    if (isAuthenticated) checkAuth();
  }, []);

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
