import { useState } from 'react'
import { Download, Search, Loader2, AlertCircle } from 'lucide-react'
import './index.css'

function App() {
  const [formData, setFormData] = useState({
    targetProfile: '',
    keyword: '',
    loginUsername: '',
    loginPassword: '',
    sessionId: ''
  })
  
  const [loading, setLoading] = useState(false)
  const [results, setResults] = useState(null)
  const [error, setError] = useState(null)
  const [nextCursor, setNextCursor] = useState(null)

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    })
  }

  const handleSubmit = async (e, resume = false) => {
    if (e && e.preventDefault) e.preventDefault()
    setLoading(true)
    setError(null)
    if (!resume) {
      setResults(null)
      setNextCursor(null)
    }

    let targetUsername = formData.targetProfile.trim().replace(/\/$/, '');
    if (targetUsername.includes('instagram.com/')) {
      const parts = targetUsername.split('instagram.com/');
      targetUsername = parts[1].split('/')[0];
    }
    
    try {
      const response = await fetch('http://localhost:8000/api/scrape', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          target_username: targetUsername,
          keyword: formData.keyword,
          login_username: formData.loginUsername,
          login_password: formData.loginPassword,
          session_id: formData.sessionId,
          resume_cursor: resume ? nextCursor : ""
        })
      })

      const data = await response.json()

      if (!response.ok) {
        throw new Error(data.detail || 'Si è verificato un errore durante lo scraping')
      }

      if (resume && results) {
        setResults([...results, ...data.results])
      } else {
        setResults(data.results)
      }
      setNextCursor(data.next_cursor || null)
      
    } catch (err) {
      setError(err.message)
    } finally {
      setLoading(false)
    }
  }

  const handleDownload = () => {
    if (!results || results.length === 0) return;
    
    const element = document.createElement("a");
    const file = new Blob([results.join('\n')], {type: 'text/plain'});
    element.href = URL.createObjectURL(file);
    element.download = `titoli_estratti_${formData.targetProfile}.txt`;
    document.body.appendChild(element); // Required for this to work in FireFox
    element.click();
  }

  return (
    <div className="app-container">
      <div className="glass-panel">
        <div className="header">
          <div style={{ display: 'flex', justifyContent: 'center', marginBottom: '10px', fontSize: '48px' }}>
            📸
          </div>
          <h1 className="title">InstaScraper</h1>
          <p className="subtitle">Estrai automaticamente i titoli dai post Instagram</p>
        </div>

        <form onSubmit={handleSubmit}>
          <div className="input-group">
            <label className="input-label">Profilo Target (es. thebeatles)</label>
            <input 
              type="text" 
              name="targetProfile"
              className="input-field" 
              placeholder="Username o URL Instagram" 
              value={formData.targetProfile}
              onChange={handleChange}
              required 
            />
          </div>

          <div className="input-group">
            <label className="input-label">Parola Chiave (es. Album del giorno)</label>
            <input 
              type="text" 
              name="keyword"
              className="input-field" 
              placeholder="Inserisci la frase/parola chiave iniziale" 
              value={formData.keyword}
              onChange={handleChange}
              required 
            />
          </div>

          <div className="row">
            <div className="input-group">
              <label className="input-label">Username Account (Appoggio)</label>
              <input 
                type="text" 
                name="loginUsername"
                className="input-field" 
                placeholder="(Opzionale) Il tuo username" 
                value={formData.loginUsername}
                onChange={handleChange}
              />
            </div>
            
            <div className="input-group">
              <label className="input-label">Password Account</label>
              <input 
                type="password" 
                name="loginPassword"
                className="input-field" 
                placeholder="(Opzionale) La tua password" 
                value={formData.loginPassword}
                onChange={handleChange}
              />
            </div>
          </div>
          
          <div className="input-group" style={{marginTop: '1rem', borderTop: '1px solid rgba(255,255,255,0.1)', paddingTop: '1rem'}}>
            <label className="input-label" style={{color: '#ffb347'}}>⚠️ Metodo Infallibile (Se il login normale è bloccato)</label>
            <input 
              type="text" 
              name="sessionId"
              className="input-field" 
              placeholder="Incolla qui il tuo 'sessionid' del browser" 
              value={formData.sessionId}
              onChange={handleChange}
            />
            <p style={{fontSize: '0.75rem', color: '#a0a0a0', marginTop: '5px'}}>
              Apri Instagram, premi F12, vai in Rete/Archiviazione -&gt; Cookie, copia il valore di <code>sessionid</code> e incollalo qua. Questo aggira ogni blocco!
            </p>
          </div>

          <button type="submit" className="btn-submit" disabled={loading}>
            {loading ? (
              <>
                <Loader2 className="loader" />
                Scraping in corso... (potrebbe richiedere minuti)
              </>
            ) : (
              <>
                <Search size={20} />
                Avvia Estrazione
              </>
            )}
          </button>
        </form>

        {error && (
          <div className="error-message">
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '4px' }}>
              <AlertCircle size={18} />
              <strong>Errore</strong>
            </div>
            {error}
          </div>
        )}

        {results !== null && (
          <div className="results-panel">
            <div className="results-header">
              <span className="results-title">
                Risultati Trovati: {results.length}
              </span>
              {results.length > 0 && (
                <button onClick={handleDownload} className="btn-download">
                  <Download size={16} /> Salva .TXT
                </button>
              )}
            </div>
            
            {results.length > 0 ? (
              <>
                <ul className="results-list">
                  {results.map((item, index) => (
                    <li key={index} className="result-item">{item}</li>
                  ))}
                </ul>
                {nextCursor && (
                  <button 
                    onClick={() => handleSubmit(null, true)} 
                    className="btn-submit" 
                    style={{marginTop: '1.5rem', background: 'rgba(255, 255, 255, 0.1)', border: '1px solid rgba(255,255,255,0.2)'}}
                    disabled={loading}
                  >
                    {loading ? <Loader2 className="loader" /> : `Continua a scansionare i post più vecchi...`}
                  </button>
                )}
              </>
            ) : (
              <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem', textAlign: 'center', padding: '1rem' }}>
                Nessun titolo trovato con questa parola chiave sui post analizzati.
              </p>
            )}
          </div>
        )}
      </div>
    </div>
  )
}

export default App
