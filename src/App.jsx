import React, { useEffect, useState, Suspense } from "react";
import { BrowserRouter } from "react-router-dom";
import { Toaster } from "@/components/ui/toaster";
import { SplashCursor } from "@/components/ui/splash-cursor";

import { About, Contact, Experience, Feedbacks, Hero, Navbar, Tech, Works, StarsCanvas } from "@/components";

// Error boundary component
class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true, error };
  }

  componentDidCatch(error, errorInfo) {
    console.error("Error caught by boundary:", error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="flex h-screen w-full items-center justify-center bg-background text-red-500">
          <div className="text-center">
            <h1 className="text-2xl font-bold mb-4">Something went wrong</h1>
            <p>{this.state.error?.message}</p>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}

const App = () => {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    try {
      // Simulate loading time for 3D assets
      const timer = setTimeout(() => {
        setLoading(false);
      }, 2000);

      return () => clearTimeout(timer);
    } catch (err) {
      console.error("Error during initialization:", err);
      setError(err);
      setLoading(false);
    }
  }, []);

  if (error) {
    return (
      <div className="flex h-screen w-full items-center justify-center bg-background text-red-500">
        <div className="text-center">
          <h1 className="text-2xl font-bold mb-4">Something went wrong</h1>
          <p>{error.message}</p>
        </div>
      </div>
    );
  }

  if (loading) {
    return (
      <div className="flex h-screen w-full items-center justify-center bg-background">
        <div className="canvas-loader"></div>
      </div>
    );
  }

  return (
    <ErrorBoundary>
      <BrowserRouter>
        <div className="relative z-0 bg-background">
          <SplashCursor 
            BACK_COLOR={{ r: 0.3, g: 0.4, b: 0.6 }}
            COLOR_UPDATE_SPEED={4}
            SPLAT_RADIUS={1.0}
            SPLAT_FORCE={10000}
          />
          <div className="bg-hero-pattern bg-cover bg-no-repeat bg-center">
            <Navbar />
            <Suspense fallback={<div className="h-screen w-full flex items-center justify-center">Loading...</div>}>
              <Hero />
            </Suspense>
          </div>
          <Suspense fallback={<div className="h-screen w-full flex items-center justify-center">Loading...</div>}>
            <About />
            <Experience />
            <Tech />
            <Works />
            <Feedbacks />
            <div className="relative z-0">
              <Contact />
              <StarsCanvas />
            </div>
          </Suspense>
          <Toaster />
        </div>
      </BrowserRouter>
    </ErrorBoundary>
  );
};

export default App;
