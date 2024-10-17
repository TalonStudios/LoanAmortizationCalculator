function calculateDebt() {
  
/* Automatically calculate borrowing years 2, 3, and 4 based on borrowing year 1 then
Automatically calculate borrowing years 2, 3, and 4 based on borrowing year 1*/
  const borrowingYear1 = parseInt(document.getElementById('borrowingYear1').value);
  const loanAmt1 = parseFloat(document.getElementById('loanAmt1').value);
  
  const borrowingYear2 = borrowingYear1 + 1;
  document.getElementById('borrowingYear2').value = borrowingYear2;
  const loanAmt2 = parseFloat(document.getElementById('loanAmt2').value);
  
  const borrowingYear3 = borrowingYear1 + 2;
  document.getElementById('borrowingYear3').value = borrowingYear3;
  const loanAmt3 = parseFloat(document.getElementById('loanAmt3').value);
  
  const borrowingYear4 = borrowingYear1 + 3;
  document.getElementById('borrowingYear4').value = borrowingYear4;
  const loanAmt4 = parseFloat(document.getElementById('loanAmt4').value);
  
  // Fixed interest rate
  const interestRate = 0.05; // 5% interest
  
  // Calculate the number of years between borrowing year 1 and borrowing year 4
  const yearsBetween1and4 = borrowingYear4 - borrowingYear1;
  
  // Calculate the total debt considering interest
  let totalDebt = loanAmt1 * Math.pow(1 + interestRate, yearsBetween1and4) +
                  loanAmt2 * Math.pow(1 + interestRate, yearsBetween1and4 - 1) +
                  loanAmt3 * Math.pow(1 + interestRate, yearsBetween1and4 - 2) +
                  loanAmt4; // Last loan has no interest yet
  
  // Amortization calculation for a repayment period of 10 years
  const repaymentYears = 10;
  const amortization = (totalDebt * interestRate) / (1 - Math.pow(1 + interestRate, -repaymentYears));
  
  // Clear the table content if it already exists
  //const paymentTableBody = document.getElementById('paymentTableBody');
  //paymentTableBody.innerHTML = '';
 
  // Calculate and display the payment schedule for each year
  let remainingDebt = totalDebt;
  for (let year = 1; year <= repaymentYears; year++) {
    const interestAmount = remainingDebt * interestRate;
    const principalAmount = amortization - interestAmount;
    remainingDebt -= principalAmount;
    
     // Create a new row in the table for the current year
    const row = paymentTableBody.insertRow();
    row.insertCell(0).textContent = "Year " + year;
    row.insertCell(1).textContent = `$${amortization.toFixed(2)}`;
    row.insertCell(2).textContent = `$${interestAmount.toFixed(2)}`;
    row.insertCell(3).textContent = `$${principalAmount.toFixed(2)}`;
    row.insertCell(4).textContent = `$${Math.max(0, remainingDebt).toFixed(2)}`; // Remaining balance cannot be negative
  }
}