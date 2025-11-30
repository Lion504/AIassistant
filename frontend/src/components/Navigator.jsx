import { useState } from 'react'
import ReactMarkdown from 'react-markdown'

export default function Navigator() {
  const [query, setQuery] = useState('')
  const [result, setResult] = useState(null)
  const [loading, setLoading] = useState(false)

  const handleSearch = async (e) => {
    e.preventDefault()
    if (!query.trim()) return

    setLoading(true)
    try {
      const response = await fetch('http://localhost:5000/api/navigate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ question: query })
      })
      const data = await response.json()
      setResult(data)
    } catch (error) {
      console.error('Error:', error)
      setResult({ answer: "Sorry, something went wrong connecting to the server." })
    }
    setLoading(false)
  }

  return (
    <div className="card">
      <h2>Where do I find...?</h2>
      <p style={{ color: 'var(--text-dim)', marginBottom: '1rem' }}>
        Ask about workspaces, assignments, lunch, or IT services.
      </p>
      
      <form onSubmit={handleSearch}>
        <div className="input-group">
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="e.g., Where can I find internship assignments?"
          />
          <button type="submit" className="action-btn" disabled={loading}>
            {loading ? 'Asking...' : 'Ask'}
          </button>
        </div>
      </form>

      {result && (
        <div className="response-area">
          <div className="response-content" style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
            
            {/* Check for JSON content (List View) */}
            {(() => {
              const jsonMatch = result.answer.match(/```json\n([\s\S]*?)\n```/);
              if (jsonMatch) {
                try {
                  const items = JSON.parse(jsonMatch[1]);
                  return (
                    <div className="cards-container" style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
                      {items.map((item, idx) => (
                        <div key={idx} className="info-card" style={{ 
                          display: 'flex', 
                          alignItems: 'center', 
                          gap: '20px', 
                          background: 'rgba(255,255,255,0.05)', 
                          padding: '15px', 
                          borderRadius: '12px',
                          border: '1px solid rgba(255,255,255,0.1)'
                        }}>
                          {item.image && (
                            <img 
                              src={item.image} 
                              alt={item.title} 
                              style={{ 
                                width: '100px', 
                                height: '100px', 
                                borderRadius: '8px', 
                                objectFit: 'cover',
                                flexShrink: 0
                              }} 
                            />
                          )}
                          <div style={{ flex: 1 }}>
                            <h3 style={{ margin: '0 0 5px 0', fontSize: '1.1rem', color: '#fff' }}>{item.title}</h3>
                            {item.subtitle && <div style={{ color: '#34d399', fontSize: '0.9rem', marginBottom: '5px', fontWeight: '500' }}>{item.subtitle}</div>}
                            {item.details && <div style={{ color: 'var(--text-muted)', fontSize: '0.85rem' }}>{item.details}</div>}
                          </div>
                        </div>
                      ))}
                    </div>
                  );
                } catch (e) {
                  console.error("Failed to parse JSON response", e);
                }
              }
              
              // Fallback to Markdown
              return (
                <div className="markdown-body" style={{ fontSize: '1.1rem', lineHeight: '1.6' }}>
                  <ReactMarkdown 
                    components={{
                      ul: ({node, ...props}) => <ul style={{ paddingLeft: '20px', margin: '10px 0' }} {...props} />,
                      li: ({node, ...props}) => <li style={{ marginBottom: '5px' }} {...props} />,
                      a: ({node, ...props}) => <a style={{ color: '#ff6b00', textDecoration: 'underline' }} {...props} />,
                      img: ({node, ...props}) => <img style={{ maxWidth: '100%', maxHeight: '200px', borderRadius: '8px', objectFit: 'cover', marginTop: '10px', display: 'block' }} {...props} />
                    }}
                  >
                    {result.answer}
                  </ReactMarkdown>
                </div>
              );
            })()}
            
            {/* Show main image only if NOT in list view (to avoid duplication) */}
            {result.image && !result.answer.includes("```json") && (
              <div className="image-container" style={{ 
                position: 'relative',
                borderRadius: '12px',
                overflow: 'hidden',
                boxShadow: '0 4px 15px rgba(0,0,0,0.2)',
                border: '1px solid rgba(255, 255, 255, 0.1)'
              }}>
                <img 
                  src={result.image} 
                  alt="Related visual" 
                  style={{ 
                    width: '100%', 
                    height: '250px', 
                    objectFit: 'cover',
                    display: 'block',
                    transition: 'transform 0.3s ease'
                  }} 
                  onMouseOver={(e) => e.currentTarget.style.transform = 'scale(1.02)'}
                  onMouseOut={(e) => e.currentTarget.style.transform = 'scale(1)'}
                />
              </div>
            )}

            {result.link && (
              <a href={result.link} target="_blank" rel="noopener noreferrer" className="link-card" style={{ marginTop: '0.5rem' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                  <span style={{ fontSize: '1.2rem' }}>🔗</span>
                  <span>
                    <strong>Open Resource</strong><br/>
                    <span style={{ fontSize: '0.85rem', opacity: 0.8 }}>{result.link}</span>
                  </span>
                </div>
                <span style={{ marginLeft: 'auto' }}>↗</span>
              </a>
            )}
          </div>
        </div>
      )}
    </div>
  )
}
