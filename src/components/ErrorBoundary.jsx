import React from 'react';

export default class ErrorBoundary extends React.Component {
  state = { hasError: false };

  static getDerivedStateFromError() {
    return { hasError: true };
  }

  handleBack = () => window.history.back();
  handleReload = () => window.location.reload();

  render() {
    if (this.state.hasError) {
      return (
        <div className="p-10 text-center space-y-4">
          <h1 className="text-3xl font-bold">哎呀，出了點問題！</h1>
          <p className="text-gray-600">請稍後再試、回上一頁，或回首頁。</p>
          <div className="flex items-center justify-center gap-3">
            <button onClick={this.handleBack} className="btn-ghost">返回上一頁</button>
            <a href="/" className="btn-secondary">回首頁</a>
            <button onClick={this.handleReload} className="btn-primary">重新整理</button>
          </div>
        </div>
      );
    }
    return this.props.children;
  }
}