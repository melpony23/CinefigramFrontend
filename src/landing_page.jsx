import './landing_page.css'
import { Navbar } from './components/Navbar/Navbar'

function App() {
  // const [count, setCount] = useState(0)
  {/* <div className="card">
      <button onClick={() => setCount((count) => count + 1)}>
        count is {count}
      </button>
      <p>
        Edit <code>src/App.jsx</code> and save to test HMR
      </p>
    </div> */}

  return (
    <>
      <div className='Navbar'>
        <Navbar />
      </div>
    </>
  )
}

export default App
