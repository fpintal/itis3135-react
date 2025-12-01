import React, { useEffect, useState } from 'react'
import './App.css'
import Header from './Header'
import Footer from './Footer'

const API_URL = 'https://dvonb.xyz/api/2025-fall/itis-3135/students?full=1'

function StudentCard({ student }) {
  // Build readable full name
  const nameObj = student.name || {}
  const name =
    `${nameObj.first || ''} ${nameObj.middleInitial || ''} ${nameObj.last || ''}`
      .replace(/\s+/g, ' ')
      .trim() || 'Unnamed'

  // Handle image
  const hasImage = student.media?.hasImage && student.media?.src
  const rawImg = hasImage ? student.media.src : null
  const imgUrl =
    rawImg && (rawImg.startsWith('http') ? rawImg : `https://dvonb.xyz${rawImg}`)
  const caption = student.media?.caption || name

  // Intro text fallback priority
  const intro =
    student.personalStatement ||
    student.backgrounds?.personal ||
    student.backgrounds?.academic ||
    ''

  return (
    <article className="student-card">
      {imgUrl ? (
        <img src={imgUrl} alt={caption} className="student-pic" />
      ) : (
        <div className="student-pic placeholder">No image</div>
      )}

      <div className="student-body">
        <h3>{name}</h3>

        {student.email && <p className="muted">{student.email}</p>}

        {intro ? (
          <p>{intro}</p>
        ) : (
          <pre className="raw-json">{JSON.stringify(student, null, 2)}</pre>
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
