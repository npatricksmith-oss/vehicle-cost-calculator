import React from 'react';

export default function ResultsDisplay({ results }) {
    if (!results) return null;

    const formatCurrency = (val) =>
        new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(val);

    return (
        <div className="results-container">
            <div className="primary-result">
                <h2>{results.isComparison ? 'Monthly Cost' : 'Estimated Monthly Cost'}</h2>
                <div className="big-number">{formatCurrency(results.totalMonthly)}</div>
                <p className="sub-text">Total 5-Year: {formatCurrency(results.total5Year)}</p>
            </div>

            <div className="breakdown">
                <h3>Monthly Breakdown</h3>
                <div className="breakdown-item">
                    <span>Loan Payment</span>
                    <span>{formatCurrency(results.loan.monthlyPayment)}</span>
                </div>
                <div className="breakdown-item">
                    <span>Fuel</span>
                    <span>{formatCurrency(results.costs.fuelMonthly)}</span>
                </div>
                <div className="breakdown-item">
                    <span>Insurance</span>
                    <span>{formatCurrency(results.costs.insuranceMonthly)}</span>
                </div>
                <div className="breakdown-item">
                    <span>Maintenance</span>
                    <span>{formatCurrency(results.costs.maintenanceMonthly)}</span>
                </div>
            </div>

            <div className="loan-details">
                <h3>Loan Details</h3>
                <div className="breakdown-item">
                    <span>Amount Financed</span>
                    <span>{formatCurrency(results.loan.loanAmount)}</span>
                </div>
                <div className="breakdown-item">
                    <span>Total Interest</span>
                    <span>{formatCurrency(results.loan.totalInterest)}</span>
                </div>
            </div>
        </div>
    );
}
