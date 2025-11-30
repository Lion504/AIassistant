import { useState } from 'react'

export default function Electives() {
  const [interests, setInterests] = useState('')
  const [result, setResult] = useState(null)
  const [loading, setLoading] = useState(false)

  const handleSuggest = async (e) => {
    e.preventDefault()
    if (!interests.trim()) return

    setLoading(true)
    try {
      const response = await fetch('http://localhost:5000/api/electives', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ interests })
      })
      const data = await response.json()
      setResult(data)
    } catch (error) {
      console.error('Error:', error)
    }
    setLoading(false)
  }

  return (
    <div className="card">
      <h2>Elective Suggestions</h2>
      <p style={{ color: 'var(--text-dim)', marginBottom: '1rem' }}>
        Describe your interests (e.g., "artificial intelligence", "web design") to get course recommendations.
      </p>
      
      <form onSubmit={handleSuggest}>
        <div className="input-group">
          <input
            type="text"
            value={interests}
            onChange={(e) => setInterests(e.target.value)}
            placeholder="What are you interested in?"
          />
          <button type="submit" className="action-btn" disabled={loading}>
            {loading ? 'Suggest' : 'Get Suggestions'}
          </button>
        </div>
      </form>

      {result && (
        <div className="response-area">
          <p>{result.explanation}</p>
          
          <div style={{ marginTop: '1.5rem' }}>
            {result.courses.map((course, i) => (
              <div key={i} style={{ 
                background: '#333', 
                padding: '1rem', 
                marginBottom: '0.5rem', 
                borderRadius: '6px' 
              }}>
                <div style={{ fontWeight: 'bold', color: 'var(--accent)' }}>{course.name}</div>
                <div style={{ fontSize: '0.9rem', color: '#ccc' }}>{course.description}</div>
                <div style={{ marginTop: '0.5rem' }}>
                  {course.tags.map(tag => (
                    <span key={tag} style={{ 
                      fontSize: '0.8rem', 
                      background: '#444', 
                      padding: '2px 8px', 
                      borderRadius: '10px', 
                      marginRight: '5px' 
                    }}>
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}
