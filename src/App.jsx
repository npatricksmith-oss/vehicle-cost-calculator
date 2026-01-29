import { useState, useEffect } from 'react'
import './App.css'
import InputForm from './components/InputForm';
import ResultsDisplay from './components/ResultsDisplay';
import { calculateLoanDetails, calculateOwnershipCosts } from './utils/calculateCost';

const INITIAL_CAR = {
  name: 'Vehicle 1',
  price: 30000,
  salesTaxRate: 7,
  fees: 500,
  downPayment: 5000,
  tradeIn: 0,
  interestRate: 6.5,
  loanTermMonths: 60,
  milesPerYear: 12000,
  mpg: 25,
  gasPrice: 3.50,
  insuranceMonthly: 120,
  maintenanceYearly: 800,
  ownershipYears: 5
};

function App() {
  // State for 2 Cars
  const [cars, setCars] = useState([
    { ...INITIAL_CAR, id: 0 },
    { ...INITIAL_CAR, id: 1, name: 'Vehicle 2', price: 35000 } // Default 2nd car slightly different
  ]);

  const [activeTab, setActiveTab] = useState(0); // For mobile: 0 or 1
  const [results, setResults] = useState([null, null]);

  // Handle Input Change for a specific car
  const handleInputChange = (carIndex, field, value) => {
    setCars(prevCars => {
      const newCars = [...prevCars];
      newCars[carIndex] = { ...newCars[carIndex], [field]: value };
      return newCars;
    });
  };

  // Recalculate whenever cars change
  useEffect(() => {
    const newResults = cars.map(car => {
      const loan = calculateLoanDetails(car);
      const costs = calculateOwnershipCosts({
        ...car,
        monthlyPayment: loan.monthlyPayment,
        loanTermMonths: car.loanTermMonths
      });
      return {
        loan,
        costs,
        totalMonthly: costs.totalMonthly,
        totalMonthly: costs.totalMonthly,
        totalOwnershipCost: costs.totalOwnershipCost,
        ownershipYears: costs.ownershipYears
      };
    });
    setResults(newResults);
  }, [cars]);

  return (
    <div className="app-container">
      <header className="app-header">
        <h1>Vehicle Cost Calculator</h1>
        <p>Compare total ownership costs side-by-side.</p>
      </header>

      {/* Mobile Tab Switcher */}
      <div className="mobile-tabs">
        {cars.map((car, index) => (
          <button
            key={index}
            className={`tab-button ${activeTab === index ? 'active' : ''}`}
            onClick={() => setActiveTab(index)}
          >
            {car.name || `Vehicle ${index + 1}`}
          </button>
        ))}
      </div>

      <main className="app-main comparison-layout">
        {cars.map((car, index) => (
          <div
            key={index}
            className={`car-column ${activeTab === index ? 'active-column' : 'hidden-mobile'}`}
          >
            <div className="check-name-container">
              <input
                type="text"
                className="car-name-input"
                value={car.name}
                onChange={(e) => handleInputChange(index, 'name', e.target.value)}
                placeholder="Vehicle Name"
              />
              <svg className="edit-icon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"></path>
                <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"></path>
              </svg>
            </div>

            <div className="card results-card-mini">
              <ResultsDisplay results={results[index]} carName={car.name} isComparison={true} />
            </div>

            <div className="card input-card">
              <InputForm
                values={car}
                onChange={(field, val) => handleInputChange(index, field, val)}
              />
            </div>
          </div>
        ))}
      </main>

      <footer className="app-footer">
        <div className="footer-content">
          <h3>How it Works</h3>
          <p>
            The <strong>Total Ownership Cost</strong> is smarter than a simple monthly multiplier.
            It calculates your <em>Loan Payments</em> only for the specific term of the loan (e.g. 5 years),
            while adding your <em>Operating Costs</em> (Gas, Insurance, Maintenance) for the full
            <strong> Ownership Duration</strong> you select.
          </p>
          <p className="footer-note">
            This gives you a realistic view of long-term savings when you keep a car after it is paid off.
          </p>
        </div>
      </footer>
    </div>
  )
}

export default App
