import profilePic from './assets/franze-profilepic.png'
import { Link } from 'react-router'
import './App.css'
import Header from './Header'
import Footer from './Footer'

export default function Introduction() {
    return (
      <>
        <Header></Header>

        <nav>        
            <Link to="/">Home</Link> |{' '}
            <Link to="/introduction">Introduction</Link> |{' '}
            <Link to="/contract">Contract</Link>
        </nav>


        <main>
        <h2>Introduction</h2>

        <img src={profilePic} alt="Picture of me" class="profile-pic"/>
        <figcaption>Franze Pintal</figcaption>
  
        <ul>
            <li><strong>Personal Background:</strong>
                <ul>
                    <li>Durham, NC</li>
                    <li>Filipino American</li>
                    <li>20 years old</li>
                </ul>
            </li>
            <li><strong>Professional Background:</strong>
                <ul>
                    <li>Coding since high school</li>
                    <li>Computer Science major</li>
                    <li>Server at a restaurant</li>
                </ul>
            </li>
            <li><strong>Academic Background:</strong>
                <ul>
                    <li>Computer Science, Junior</li>
                </ul>
            </li>
            <li><strong>Primary Computer:</strong>
                <ul>
                    <li>Apple, macOS Sequoia 15.4.1</li>
                    <li>School/Home use</li>
                </ul>
            </li>
            <li><strong>Courses & Why:</strong>
                <ul>
                    <li>ITIS 3130 - Human-Centered Computing: UI interest</li>
                    <li>ITIS 3135 - Front-End Web App Development: Web dev interest</li>
                    <li>ITSC 3155 - Introduction to Software Engineering - Required Course</li>
                </ul>
            </li>
        </ul>
        
        </main>

        <Footer></Footer>
      </>
    );
  }
  