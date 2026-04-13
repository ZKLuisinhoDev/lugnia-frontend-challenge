import React, { Component } from 'react';
import { Button } from 'primereact/button';

class ErrorBoundary extends Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true, error };
  }

  componentDidCatch(error, errorInfo) {
    // Here you could log the error to an external service
    console.error("ErrorBoundary caught an error", error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="min-h-screen flex items-center justify-center bg-gray-50 p-6">
          <div className="bg-white p-10 rounded-[2.5rem] shadow-xl border border-red-50 text-center max-w-lg">
            <div className="w-20 h-20 bg-red-50 rounded-full flex items-center justify-center mx-auto mb-6">
              <i className="pi pi-exclamation-circle text-red-500 text-4xl"></i>
            </div>
            <h2 className="text-2xl font-black text-gray-900 mb-4">Algo salió mal</h2>
            <p className="text-gray-500 mb-8 leading-relaxed">
              La aplicación encontró un error inesperado. Por favor, intenta recargar la página.
            </p>
            <Button 
              label="Recargar aplicación" 
              icon="pi pi-refresh" 
              className="bg-cyan-600 border-none rounded-2xl py-3 px-8 font-bold"
              onClick={() => window.location.reload()} 
            />
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;
