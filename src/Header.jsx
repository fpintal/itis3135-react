import { Link } from 'react-router'

export default function Header() {
    return (<>
      <header>
        <h1>Franze Pintal's Freaky Panda | ITIS 3135</h1>
        <nav>
            
        <Link to="/">Home</Link> |{' '}
        <Link to="/introduction">Introduction</Link> |{' '}
        <Link to="/contract">Contract</Link>

        </nav>
      </header>
      </>);
  }
  