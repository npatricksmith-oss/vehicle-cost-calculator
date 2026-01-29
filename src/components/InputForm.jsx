import React from 'react';

export default function InputForm({ values, onChange }) {
    const handleChange = (e) => {
        const { name, value } = e.target;
        // content is number, so parse it
        onChange(name, parseFloat(value) || 0);
    };

    return (
        <div className="input-form">
            <section className="input-group">
                <h3>Vehicle Details</h3>
                <div className="input-row">
                    <label>
                        Vehicle Price ($)
                        <input
                            type="number"
                            name="price"
                            value={values.price}
                            onChange={handleChange}
                        />
                    </label>
                    <label>
                        Sales Tax (%)
                        <input
                            type="number"
                            name="salesTaxRate"
                            value={values.salesTaxRate}
                            onChange={handleChange}
                        />
                    </label>
                </div>
                <div className="input-row">
                    <label>
                        Registration Fees ($)
                        <input
                            type="number"
                            name="fees"
                            value={values.fees}
                            onChange={handleChange}
                        />
                    </label>
                </div>
            </section>

            <section className="input-group">
                <h3>Financing</h3>
                <div className="input-row">
                    <label>
                        Down Payment ($)
                        <input
                            type="number"
                            name="downPayment"
                            value={values.downPayment}
                            onChange={handleChange}
                        />
                    </label>
                    <label>
                        Trade-in Value ($)
                        <input
                            type="number"
                            name="tradeIn"
                            value={values.tradeIn}
                            onChange={handleChange}
                        />
                    </label>
                </div>
                <div className="input-row">
                    <label>
                        Interest Rate (%)
                        <input
                            type="number"
                            name="interestRate"
                            step="0.1"
                            value={values.interestRate}
                            onChange={handleChange}
                        />
                    </label>
                    <label>
                        Loan Term (Months)
                        <select name="loanTermMonths" value={values.loanTermMonths} onChange={handleChange}>
                            <option value="36">36 Months</option>
                            <option value="48">48 Months</option>
                            <option value="60">60 Months</option>
                            <option value="72">72 Months</option>
                            <option value="84">84 Months</option>
                        </select>
                    </label>
                </div>
            </section>

            <section className="input-group">
                <h3>Usage & Expenses</h3>
                <div className="input-row">
                    <label>
                        Miles / Year
                        <input
                            type="number"
                            name="milesPerYear"
                            value={values.milesPerYear}
                            onChange={handleChange}
                        />
                    </label>
                    <label>
                        MPG (Est.)
                        <input
                            type="number"
                            name="mpg"
                            value={values.mpg}
                            onChange={handleChange}
                        />
                    </label>
                </div>
                <div className="input-row">
                    <label>
                        Gas Price ($/gal)
                        <input
                            type="number"
                            name="gasPrice"
                            step="0.01"
                            value={values.gasPrice}
                            onChange={handleChange}
                        />
                    </label>
                    <label>
                        Insurance ($/mo)
                        <input
                            type="number"
                            name="insuranceMonthly"
                            value={values.insuranceMonthly}
                            onChange={handleChange}
                        />
                    </label>
                </div>
                <div className="input-row">
                    <label>
                        Maintenance ($/yr)
                        <input
                            type="number"
                            name="maintenanceYearly"
                            value={values.maintenanceYearly}
                            onChange={handleChange}
                        />
                    </label>
                    <label>
                        Ownership (Years)
                        <input
                            type="number"
                            name="ownershipYears"
                            value={values.ownershipYears}
                            onChange={handleChange}
                        />
                    </label>
                </div>
            </section>
        </div>
    );
}
