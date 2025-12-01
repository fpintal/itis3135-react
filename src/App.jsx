import profilePic from './assets/franze-profilepic.png'
import { Link } from 'react-router'
import './App.css'
import Header from './Header'
import Footer from './Footer'

export default function App() {
  return (
    <>
    <Header></Header>
    
    <nav>        
            <Link to="/">Home</Link> |{' '}
            <Link to="/introduction">Introduction</Link> |{' '}
            <Link to="/contract">Contract</Link> |{' '}
            <Link to="/students">Students (JSON)</Link>
    </nav>

    <main>
      
      
        <h2>Home</h2>
        <h3> Franze Pintal | Freaky Palace</h3>
        <p>Welcome! This page will hold all my course work for ITIS3135.</p>
        <figure>
            <img src={profilePic} alt="Picture of me" class="profile-pic"/>
            <figcaption><em>“Chop wood, carry water.”</em>
            </figcaption>
        </figure>
        <p class="quote">
            <em>-P'ang Yun</em>
        </p>
    </main>

    <Footer></Footer>
    
    </>);
}