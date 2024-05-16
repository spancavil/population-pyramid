import BarChart from './components/barChart/BarChart'
import './App.css'
import YearSelector from './components/yearSelector/yearSelector'
import { useState } from 'react'

function App() {

  const [year, setYear] = useState<number>(2010)  

  return (
    <main className='main'>
      <div className='container'>
        <BarChart year={year}/>
        <YearSelector setYear={setYear}/>
      </div>
    </main>
  )
}

export default App
