import React, { useState } from 'react';
import Navigator from './components/Navigator';
import Explainer from './components/Explainer';
import Electives from './components/Electives';
import Dashboard from './components/Dashboard';
import TeacherDashboard from './components/TeacherDashboard';
import Login from './components/Login';
import './App.css';

function App() {
  const [activeTab, setActiveTab] = useState('login');
  const [userRole, setUserRole] = useState(null);

  const handleLogin = (role) => {
    setUserRole(role);
    setActiveTab('home');
  };

  const handleLogout = () => {
    setUserRole(null);
    setActiveTab('login');
  };

  if (activeTab === 'login') {
    return (
      <div className="app-container" style={{ justifyContent: 'center' }}>
        <Login onLogin={handleLogin} />
      </div>
    );
  }

  return (
    <div className="app-container">
      <header className="app-header">
        <h1>
            <i className="fa fa-magic" style={{ marginRight: '10px', color: userRole === 'teacher' ? '#10b981' : '#ff6600' }}></i>
            OMA AI Assistant
        </h1>
        <div style={{ position: 'absolute', top: '20px', right: '20px' }}>
          <button onClick={handleLogout} style={{ background: 'transparent', border: 'none', color: 'var(--text-muted)', cursor: 'pointer' }}>
            <i className="fa fa-sign-out"></i> Logout
          </button>
        </div>
      </header>
      
      <nav className="app-nav">
        <button 
          className={activeTab === 'home' ? 'active' : ''} 
          onClick={() => setActiveTab('home')}
          style={activeTab === 'home' && userRole === 'teacher' ? { background: '#10b981', boxShadow: '0 4px 12px rgba(16, 185, 129, 0.3)' } : {}}
        >
          <i className="fa fa-home" style={{ marginRight: '5px' }}></i> Home
        </button>
        <button 
          className={['navigator', 'explainer', 'electives'].includes(activeTab) ? 'active' : ''} 
          onClick={() => setActiveTab('navigator')}
          style={['navigator', 'explainer', 'electives'].includes(activeTab) && userRole === 'teacher' ? { background: '#10b981', boxShadow: '0 4px 12px rgba(16, 185, 129, 0.3)' } : {}}
        >
          <i className="fa fa-magic" style={{ marginRight: '5px' }}></i> AI Assistant
        </button>
      </nav>

      <main className="app-content">
          {activeTab === 'home' && userRole === 'student' && <Dashboard onNavigate={setActiveTab} />}
          {activeTab === 'home' && userRole === 'teacher' && <TeacherDashboard onNavigate={setActiveTab} />}
          
          {['navigator', 'explainer', 'electives'].includes(activeTab) && (
            <div className="ai-tools-container">
              <div className="sub-nav" style={{ display: 'flex', justifyContent: 'center', gap: '10px', marginBottom: '20px' }}>
                <button 
                  className={`action-btn ${activeTab === 'navigator' ? 'active-sub' : ''}`} 
                  style={{ width: 'auto', background: activeTab === 'navigator' ? (userRole === 'teacher' ? '#10b981' : 'var(--primary-color)') : 'transparent', border: `1px solid ${userRole === 'teacher' ? '#10b981' : 'var(--primary-color)'}` }}
                  onClick={() => setActiveTab('navigator')}
                >
                  Navigator
                </button>
                <button 
                  className={`action-btn ${activeTab === 'explainer' ? 'active-sub' : ''}`} 
                  style={{ width: 'auto', background: activeTab === 'explainer' ? (userRole === 'teacher' ? '#10b981' : 'var(--primary-color)') : 'transparent', border: `1px solid ${userRole === 'teacher' ? '#10b981' : 'var(--primary-color)'}` }}
                  onClick={() => setActiveTab('explainer')}
                >
                  Explainer
                </button>
                <button 
                  className={`action-btn ${activeTab === 'electives' ? 'active-sub' : ''}`} 
                  style={{ width: 'auto', background: activeTab === 'electives' ? (userRole === 'teacher' ? '#10b981' : 'var(--primary-color)') : 'transparent', border: `1px solid ${userRole === 'teacher' ? '#10b981' : 'var(--primary-color)'}` }}
                  onClick={() => setActiveTab('electives')}
                >
                  Electives
                </button>
              </div>

              {activeTab === 'navigator' && <Navigator />}
              {activeTab === 'explainer' && <Explainer />}
              {activeTab === 'electives' && <Electives />}
            </div>
          )}
      </main>
    </div>
  );
}

export default App;
