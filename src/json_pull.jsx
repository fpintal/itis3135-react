import React, { useEffect, useState } from 'react';
import './App.css';
import Header from './Header';
import Footer from './Footer';

const API_URL = 'https://dvonb.xyz/api/2025-fall/itis-3135/students?full=1';

function StudentCard({ student, filters }) {
  // Build readable full name
  const nameObj = student.name || {};
  const fullName =
    `${nameObj.first || ''} ${nameObj.middleInitial || ''} ${nameObj.last || ''}`
      .replace(/\s+/g, ' ')
      .trim() || student.fullname || student.displayName || student.title || 'Unnamed';

  // Mascot
  const mascot = student.mascot || student.teamMascot || student.nickname || '';

  // Image (optional)
  const rawImg = student.media?.src || student.image || student.photo || null;
  const imgUrl = rawImg ? (rawImg.startsWith('http') ? rawImg : `https://dvonb.xyz${rawImg}`) : null;

  // Personal statement
  const personal = student.personalStatement || student.statement || student.introduction || student.bio || '';

  // Quick facts: prefix, platform/device+os, funFact
  const prefix = student.prefix || student.title || '';
  let platformText = '';
  if (student.platform) {
    if (typeof student.platform === 'string') platformText = student.platform;
    else platformText = `${student.platform.device || student.platform.name || ''} ${student.platform.os || student.platform.version || ''}`.trim();
  } else {
    platformText = `${student.device || ''} ${student.os || ''}`.trim();
  }
  const funFact = student.funFact || student.fun_fact || student.interestingFact || '';

  // Courses (array)
  const courses = student.courses || student.courseList || student.classes || [];

  // Quote
  const quoteText = student.quote?.text || student.quoteText || student.quote || '';
  const quoteAuthor = student.quote?.author || student.quoteAuthor || student.quoteBy || '';

  // Links
  const links = Array.isArray(student.links) ? student.links : [];
  const renderLink = (l, i) => {
    if (!l) return null;
    if (typeof l === 'string') return <a key={i} href={l} target="_blank" rel="noreferrer">Link</a>;
    const href = l.url || l.href || l.link || l.address || l.path;
    const label = l.label || l.title || l.name || l.text || href;
    if (!href) return null;
    return <a key={i} href={href} target="_blank" rel="noreferrer">{label}</a>;
  };

  return (
    <article className="student-card">
      {filters.image && (imgUrl ? (
        <img src={imgUrl} alt={fullName} className="student-pic" />
      ) : (
        <div className="student-pic placeholder">No image</div>
      ))}

      <div className="student-body">
        <div className="student-header">
          {filters.name && <h3>{fullName}</h3>}
          {filters.mascot && mascot && <span className="mascot">{mascot}</span>}
        </div>

        {filters.personalStatement && personal && <p className="personal-statement">{personal}</p>}

        <div className="quick-facts">
          <h4>Quick Facts</h4>
          <ul>
            {filters.extraInfo && prefix && <li><strong>Prefix:</strong> {prefix}</li>}
            {filters.extraInfo && platformText && <li><strong>Platform:</strong> {platformText}</li>}
            {filters.extraInfo && funFact && <li><strong>Fun Fact:</strong> {funFact}</li>}
          </ul>
        </div>

        {filters.classes && courses && courses.length > 0 && (
          <div className="courses">
            <h4>Courses</h4>
            <ul>
              {courses.map((c, idx) => <li key={idx}>{typeof c === 'string' ? c : c.name || JSON.stringify(c)}</li>)}
            </ul>
          </div>
        )}

        {filters.quote && quoteText && (
          <blockquote>
            <p>{quoteText}</p>
            {quoteAuthor && <cite>— {quoteAuthor}</cite>}
          </blockquote>
        )}

        {filters.links && links && links.length > 0 && (
          <div className="links-row">
            {links.map((l, i) => (
              <span key={i} className="link-item">{renderLink(l, i)}</span>
            ))}
          </div>
        )}
      </div>
    </article>
  );
}

export default function JsonPull() {
  const [students, setStudents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [filters, setFilters] = useState({
    name: true,
    mascot: true,
    image: true,
    personalStatement: true,
    backgrounds: true,
    classes: true,
    extraInfo: true,
    quote: true,
    links: true,
  });
  const [currentSlide, setCurrentSlide] = useState(0);

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

  const filteredStudents = students.filter((student) => {
    const nameObj = student.name || {};
    const fullName = `${nameObj.first || ''} ${nameObj.middleInitial || ''} ${nameObj.last || ''}`
      .replace(/\s+/g, ' ')
      .trim()
      .toLowerCase();
    return fullName.includes(searchTerm.toLowerCase());
  });

  const handleFilterChange = (field) => {
    setFilters((prevFilters) => ({
      ...prevFilters,
      [field]: !prevFilters[field],
    }));
  };

  const handleNextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % filteredStudents.length);
  };

  const handlePrevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + filteredStudents.length) % filteredStudents.length);
  };

  return (
    <main>
      <Header />

      <h2>Students — JSON Pull</h2>

      <div className="controls">
        <input
          type="text"
          placeholder="Search by name"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />

        <div className="filters">
          {Object.keys(filters).map((filter) => (
            <label key={filter}>
              <input
                type="checkbox"
                checked={filters[filter]}
                onChange={() => handleFilterChange(filter)}
              />
              {filter.charAt(0).toUpperCase() + filter.slice(1)}
            </label>
          ))}
        </div>
      </div>

      {loading && <p>Loading students…</p>}
      {error && <p className="error">Error: {error}</p>}

      {!loading && !error && (
        <section>
          <p>{filteredStudents.length} students found</p>

          {filteredStudents.length > 0 && (
            <div className="slideshow">
              <button onClick={handlePrevSlide}>Previous</button>
              <StudentCard student={filteredStudents[currentSlide]} filters={filters} />
              <button onClick={handleNextSlide}>Next</button>
            </div>
          )}

          <div className="students-grid">
            {filteredStudents.map((s, i) => (
              <StudentCard key={s.prefix || s.email || i} student={s} filters={filters} />
            ))}
          </div>
        </section>
      )}

      <Footer />
    </main>
  );
}
