import React from 'react';

const Login = ({ onLogin }) => {
  return (
    <div style={{ 
      display: 'flex', 
      flexDirection: 'column', 
      alignItems: 'center', 
      justifyContent: 'center', 
      height: '100%', 
      textAlign: 'center' 
    }}>
      <h1 style={{ 
        fontSize: '3rem', 
        marginBottom: '2rem',
        background: 'linear-gradient(to right, #fff, #94a3b8)',
        WebkitBackgroundClip: 'text',
        WebkitTextFillColor: 'transparent'
      }}>
        Welcome to OMA
      </h1>
      
      <p style={{ fontSize: '1.2rem', color: 'var(--text-muted)', marginBottom: '3rem' }}>
        Please select your role to continue
      </p>

      <div style={{ display: 'flex', gap: '30px', flexWrap: 'wrap', justifyContent: 'center' }}>
        {/* Student Card */}
        <div 
          className="widget-card" 
          onClick={() => onLogin('student')}
          style={{ 
            cursor: 'pointer', 
            width: '250px', 
            padding: '40px 20px',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            gap: '20px',
            transition: 'transform 0.2s, border-color 0.2s'
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.transform = 'translateY(-5px)';
            e.currentTarget.style.borderColor = 'var(--primary-color)';
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.transform = 'translateY(0)';
            e.currentTarget.style.borderColor = 'var(--glass-border)';
          }}
        >
          <div style={{ 
            width: '80px', 
            height: '80px', 
            borderRadius: '50%', 
            background: 'rgba(59, 130, 246, 0.2)', 
            display: 'flex', 
            alignItems: 'center', 
            justifyContent: 'center',
            fontSize: '2.5rem',
            color: '#60a5fa'
          }}>
            <i className="fa fa-graduation-cap"></i>
          </div>
          <h2 style={{ margin: 0 }}>Student</h2>
          <p style={{ color: 'var(--text-muted)', margin: 0 }}>Access your studies, workspaces, and AI assistant.</p>
        </div>

        {/* Teacher Card */}
        <div 
          className="widget-card" 
          onClick={() => onLogin('teacher')}
          style={{ 
            cursor: 'pointer', 
            width: '250px', 
            padding: '40px 20px',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            gap: '20px',
            transition: 'transform 0.2s, border-color 0.2s'
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.transform = 'translateY(-5px)';
            e.currentTarget.style.borderColor = '#10b981';
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.transform = 'translateY(0)';
            e.currentTarget.style.borderColor = 'var(--glass-border)';
          }}
        >
          <div style={{ 
            width: '80px', 
            height: '80px', 
            borderRadius: '50%', 
            background: 'rgba(16, 185, 129, 0.2)', 
            display: 'flex', 
            alignItems: 'center', 
            justifyContent: 'center',
            fontSize: '2.5rem',
            color: '#34d399'
          }}>
            <i className="fa fa-user-circle-o"></i>
          </div>
          <h2 style={{ margin: 0 }}>Teacher</h2>
          <p style={{ color: 'var(--text-muted)', margin: 0 }}>Manage courses and view student insights.</p>
        </div>
      </div>
    </div>
  );
};

export default Login;
