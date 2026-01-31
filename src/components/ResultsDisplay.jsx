import React from 'react';

export default function ResultsDisplay({ results, carName }) {
    if (!results) return null;

    const formatCurrency = (val) =>
        new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(val);

    return (
        <div className="results-container">
            <div className="primary-result">
                <h2>{carName ? carName : 'Monthly Cost'}</h2>

                <div className="key-metrics-grid">
                    <div className="key-metric-item">
                        <span className="key-metric-label">Monthly Pmt</span>
                        <div className="key-metric-value highlight">{formatCurrency(results.loan.monthlyPayment)}</div>
                    </div>
                    <div className="key-metric-item">
                        <span className="key-metric-label">Vehicle Price</span>
                        <div className="key-metric-value">{formatCurrency(results.loan.price)}</div>
                    </div>
                    <div className="key-metric-item">
                        <span className="key-metric-label">APR</span>
                        <div className="key-metric-value">{results.loan.interestRate}%</div>
                    </div>
                </div>

                <div className="result-row-primary">
                    <div className="result-metric">
                        <span className="metric-label">{results.costs.ownershipYears}-Year Cost</span>
                        <div className="big-number">{formatCurrency(results.totalOwnershipCost)}</div>
                    </div>
                </div>

                <div className="tco-breakdown">
                    <h4>Cost Components</h4>
                    <div className="breakdown-item">
                        <span>Down Payment</span>
                        <span>{formatCurrency(results.breakdown.downPayment)}</span>
                    </div>
                    <div className="breakdown-item">
                        <span>Loan Payments</span>
                        <span>{formatCurrency(results.breakdown.loanCost)}</span>
                    </div>
                    <div className="breakdown-item">
                        <span>Fuel</span>
                        <span>{formatCurrency(results.breakdown.fuel)}</span>
                    </div>
                    <div className="breakdown-item">
                        <span>Insurance</span>
                        <span>{formatCurrency(results.breakdown.insurance)}</span>
                    </div>
                    <div className="breakdown-item">
                        <span>Maintenance</span>
                        <span>{formatCurrency(results.breakdown.maintenance)}</span>
                    </div>
                    <div className="breakdown-divider"></div>
                    <div className="breakdown-item total-row">
                        <span><strong>Total</strong></span>
                        <span><strong>{formatCurrency(results.totalOwnershipCost)}</strong></span>
                    </div>
                </div>
            </div>

            <div className="breakdown">
                <h3>Monthly Estimates</h3>
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
