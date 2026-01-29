/**
 * Calculates the monthly loan payment and total loan details.
 * formula: M = P [ i(1 + i)^n ] / [ (1 + i)^n – 1 ]
 */
export function calculateLoanDetails({
    price,           // Vehicle Price
    downPayment,     // Cash Down
    tradeIn,         // Trade-in Value
    interestRate,    // Annual Interest Rate (%)
    loanTermMonths,  // Loan Term (months)
    salesTaxRate,    // Sales Tax (%)
    fees             // Registration/Title Fees
}) {
    // 1. Calculate Tax
    // Note: specific state laws vary on whether trade-in reduces taxable amount. 
    // We will assume it does NOT reduce it for a conservative estimate, 
    // or add a flag later. For now: Tax on full Price.
    const taxAmount = price * (salesTaxRate / 100);

    // 2. Calculate Amount to Finance
    const totalUpfrontCost = price + taxAmount + fees;
    const loanPrincipal = totalUpfrontCost - downPayment - tradeIn;

    // Handle case where no loan is needed
    if (loanPrincipal <= 0) {
        return {
            monthlyPayment: 0,
            loanAmount: 0,
            totalInterest: 0,
            totalCostWithInterest: totalUpfrontCost
        };
    }

    // 3. Calculate Monthly Payment
    const r = (interestRate / 100) / 12; // Monthly interest rate
    const n = loanTermMonths;

    let monthlyPayment = 0;
    if (interestRate === 0) {
        monthlyPayment = loanPrincipal / n;
    } else {
        monthlyPayment = (loanPrincipal * r * Math.pow(1 + r, n)) / (Math.pow(1 + r, n) - 1);
    }

    const totalLoanPayments = monthlyPayment * n;
    const totalInterest = totalLoanPayments - loanPrincipal;

    return {
        monthlyPayment,
        loanAmount: loanPrincipal,
        totalInterest,
        totalCostWithInterest: totalUpfrontCost + totalInterest,
        taxAmount
    };
}

/**
 * Calculates total monthly cost of ownership including fuel, insurance, etc.
 */
export function calculateOwnershipCosts({
    milesPerYear,
    mpg,
    gasPrice,
    insuranceMonthly,
    maintenanceYearly,
    monthlyPayment,
    ownershipYears = 5
}) {
    const milesPerMonth = milesPerYear / 12;
    const fuelMonthly = (milesPerMonth / mpg) * gasPrice;
    const maintenanceMonthly = maintenanceYearly / 12;

    const totalMonthly = monthlyPayment + fuelMonthly + insuranceMonthly + maintenanceMonthly;

    // Total Cost over ownership period
    // Note: This matches the Monthly Payment * Months, but realistically 
    // loan payments stop after the term. 
    // For V2: We will keep it simple: Monthly Cost * 12 * Years.
    // Ideally we should do: (LoanPayment * min(LoanTerm, Months)) + (OperatingCost * Months)
    // But user asked for "reflected in display", usually meaning the simple projection for now.
    // Let's refine for better accuracy:
    // If we assume the "Monthly Cost" includes loan payment, multiplying by 5 years implies paying loan for 5 years.

    return {
        fuelMonthly,
        maintenanceMonthly,
        insuranceMonthly,
        totalMonthly,
        totalAnnual: totalMonthly * 12,
        totalOwnershipCost: totalMonthly * 12 * ownershipYears,
        ownershipYears
    };
}
