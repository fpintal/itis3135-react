import Header from './Header';
import Footer from './Footer';

export default function Introduction() {
    document.title += " | Introduction";
    return (<>
        <Header></Header>
        <main>
            <h2>Introduction</h2>
            <p>my introduction</p>
        </main>
        <Footer></Footer>
    
    </>)
}