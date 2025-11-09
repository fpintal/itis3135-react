import profilePic from './assets/franze-profilepic.png'

export default function Introduction() {
    return (
      <>
        <Header></Header>
        <h2>Introduction</h2>

        <img src="{profilePic}" alt="Picture of Franze Pintal"></img>
  
        <section>
          <h3>Personal Background</h3>
          <ul>
            <li>Durham, NC</li>
            <li>Filipino American</li>
            <li>20 years old</li>
          </ul>
        </section>
  
        <section>
          <h3>Professional Background</h3>
          <ul>
            <li>Coding since high school</li>
            <li>Computer Science major</li>
            <li>Server at a restaurant</li>
          </ul>
        </section>
  
        <section>
          <h3>Academic Background</h3>
          <ul>
            <li>Computer Science, Junior</li>
          </ul>
        </section>
  
        <section>
          <h3>Primary Computer</h3>
          <ul>
            <li>Apple, macOS Sequoia 15.4.1</li>
            <li>Used for school and at home</li>
          </ul>
        </section>
  
        <section>
          <h3>Courses &amp; Why</h3>
          <ul>
            <li>ITIS 3130 — Human-Centered Computing: UI interest</li>
            <li>ITIS 3135 — Front-End Web App Development: Web dev interest</li>
            <li>ITSC 3155 — Introduction to Software Engineering — Required course</li>
          </ul>
        </section>
      </>
    );
  }
  