import React, { useEffect, useState } from 'react'
import './App.css'
import Header from './Header'
import Footer from './Footer'

const API_URL = 'https://dvonb.xyz/api/2025-fall/itis-3135/students?full=1'

function StudentCard({ student }) {

  // Build readable full name
  const nameObj = student.name || {}
  const fullName =
    `${nameObj.first || ''} ${nameObj.middleInitial || ''} ${nameObj.last || ''}`
      .replace(/\s+/g, ' ')
      .trim() || student.fullname || student.displayName || student.title || 'Unnamed'

  // Mascot
  const mascot = student.mascot || student.teamMascot || student.nickname || ''

  // Image (optional)
  const rawImg = student.media?.src || student.image || student.photo || null
  const imgUrl = rawImg ? (rawImg.startsWith('http') ? rawImg : `https://dvonb.xyz${rawImg}`) : null

  // Personal statement
  const personal = student.personalStatement || student.statement || student.introduction || student.bio || ''

  // Quick facts: prefix, platform/device+os, funFact
  const prefix = student.prefix || student.title || ''
  let platformText = ''
  if (student.platform) {
    if (typeof student.platform === 'string') platformText = student.platform
    else platformText = `${student.platform.device || student.platform.name || ''} ${student.platform.os || student.platform.version || ''}`.trim()
  } else {
    platformText = `${student.device || ''} ${student.os || ''}`.trim()
  }
  const funFact = student.funFact || student.fun_fact || student.interestingFact || ''

  // Courses (array)
  const courses = student.courses || student.courseList || student.classes || []

  // Quote
  const quoteText = student.quote?.text || student.quoteText || student.quote || ''
  const quoteAuthor = student.quote?.author || student.quoteAuthor || student.quoteBy || ''

  // Links
  const links = Array.isArray(student.links) ? student.links : []
  const renderLink = (l, i) => {
    if (!l) return null
    if (typeof l === 'string') return <a key={i} href={l} target="_blank" rel="noreferrer">Link</a>
    const href = l.url || l.href || l.link || l.address || l.path
    const label = l.label || l.title || l.name || l.text || href
    if (!href) return null
    return <a key={i} href={href} target="_blank" rel="noreferrer">{label}</a>
  }

  return (
    <article className="student-card">
      {imgUrl ? (
        <img src={imgUrl} alt={fullName} className="student-pic" />
      ) : (
        <div className="student-pic placeholder">No image</div>
      )}

      <div className="student-body">
        <div className="student-header">
          <h3>{fullName}</h3>
          {mascot && <span className="mascot">{mascot}</span>}
        </div>

        {personal && <p className="personal-statement">{personal}</p>}

        <div className="quick-facts">
          <h4>Quick Facts</h4>
          <ul>
            {prefix && <li><strong>Prefix:</strong> {prefix}</li>}
            {platformText && <li><strong>Platform:</strong> {platformText}</li>}
            {funFact && <li><strong>Fun Fact:</strong> {funFact}</li>}
          </ul>
        </div>

        {courses && courses.length > 0 && (
          <div className="courses">
            <h4>Courses</h4>
            <ul>
              {courses.map((c, idx) => <li key={idx}>{typeof c === 'string' ? c : c.name || JSON.stringify(c)}</li>)}
            </ul>
          </div>
        )}

        {quoteText && (
          <blockquote>
            <p>{quoteText}</p>
            {quoteAuthor && <cite>— {quoteAuthor}</cite>}
          </blockquote>
        )}

        {links && links.length > 0 && (
          <div className="links-row">
            {links.map((l, i) => (
              <span key={i} className="link-item">{renderLink(l, i)}</span>
            ))}
          </div>
        )}
      </div>
    </article>
  )
}

export default function JsonPull() {
  const [students, setStudents] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    let cancelled = false
    setLoading(true)

    fetch(API_URL)
      .then((res) => {
        if (!res.ok) throw new Error(`HTTP ${res.status}`)
        return res.json()
      })
      .then((data) => {
        if (cancelled) return
        const list = Array.isArray(data) ? data : data.students || data.data || []
        setStudents(list)
        setError(null)
      })
      .catch((err) => {
        if (cancelled) return
        setError(err.message)
      })
      .finally(() => {
        if (!cancelled) setLoading(false)
      })

    return () => {
      cancelled = true
    }
  }, [])

  return (
    <main>
      <Header />

      <h2>Students — JSON Pull</h2>

      {loading && <p>Loading students…</p>}
      {error && <p className="error">Error: {error}</p>}

      {!loading && !error && (
        <section className="students-grid">
          <p>{students.length} students returned</p>

          {students.map((s, i) => (
            <StudentCard key={s.prefix || s.email || i} student={s} />
          ))}
        </section>
      )}

      <Footer />
    </main>
  )
}
