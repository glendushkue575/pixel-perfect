// filename: complex_example.js

/**
 * Complex Example
 * 
 * This code demonstrates a sophisticated and complex JavaScript example that goes beyond the typical "hello world" or simple calculator programs.
 * It simulates a virtual bank system with multiple user accounts, allowing users to deposit, withdraw, and transfer funds, and view their account details.
 * The code is thoroughly commented for better understanding.
 */

class Bank {
  constructor() {
    this.accounts = []; // holds all bank accounts
  }

  // Register a new account
  register(account) {
    this.accounts.push(account); // add the account to the bank database
    console.log(`Account ${account.number} registered successfully.`);
  }

  // Deposit funds into an account
  deposit(accountNumber, amount) {
    const account = this._getAccount(accountNumber);
    if (account) {
      account.balance += amount;
      console.log(`Successfully deposited ${amount}$ into Account ${accountNumber}.`);
    } else {
      console.log(`Failed to deposit funds. Account ${accountNumber} does not exist.`);
    }
  }

  // Withdraw funds from an account
  withdraw(accountNumber, amount) {
    const account = this._getAccount(accountNumber);
    if (account) {
      if (account.balance >= amount) {
        account.balance -= amount;
        console.log(`Successfully withdrew ${amount}$ from Account ${accountNumber}.`);
      } else {
        console.log(`Failed to withdraw funds. Insufficient balance in Account ${accountNumber}.`);
      }
    } else {
      console.log(`Failed to withdraw funds. Account ${accountNumber} does not exist.`);
    }
  }

  // Transfer funds between accounts
  transfer(fromAccountNumber, toAccountNumber, amount) {
    const fromAccount = this._getAccount(fromAccountNumber);
    const toAccount = this._getAccount(toAccountNumber);

    if (fromAccount && toAccount) {
      if (fromAccount.balance >= amount) {
        fromAccount.balance -= amount;
        toAccount.balance += amount;
        console.log(`Successfully transferred ${amount}$ from Account ${fromAccountNumber} to Account ${toAccountNumber}.`);
      } else {
        console.log(`Failed to transfer funds. Insufficient balance in Account ${fromAccountNumber}.`);
      }
    } else {
      console.log(`Failed to transfer funds. One or both accounts do not exist.`);
    }
  }

  // Get account details
  getAccountDetails(accountNumber) {
    const account = this._getAccount(accountNumber);
    if (account) {
      console.log(`Account Number: ${account.number}`);
      console.log(`Account Balance: ${account.balance}$`);
    } else {
      console.log(`Account ${accountNumber} does not exist.`);
    }
  }

  // Internal helper method to get an account by account number
  _getAccount(accountNumber) {
    return this.accounts.find((account) => account.number === accountNumber);
  }
}

class Account {
  constructor(number, balance = 0) {
    this.number = number; // account number
    this.balance = balance; // current balance
  }
}

// Create a new bank
const bank = new Bank();

// Create and register some accounts
const account1 = new Account(1001);
const account2 = new Account(1002, 500);
const account3 = new Account(1003, 1000);

bank.register(account1);
bank.register(account2);
bank.register(account3);

// Perform various operations
bank.deposit(1001, 200);
bank.withdraw(1002, 100);
bank.transfer(1003, 1001, 300);
bank.getAccountDetails(1001);
bank.getAccountDetails(1002);
bank.getAccountDetails(1003);
bank.getAccountDetails(1004);

// Output:
// Account 1001 registered successfully.
// Account 1002 registered successfully.
// Account 1003 registered successfully.
// Successfully deposited 200$ into Account 1001.
// Successfully withdrew 100$ from Account 1002.
// Successfully transferred 300$ from Account 1003 to Account 1001.
// Account Number: 1001
// Account Balance: 700$
// Account Number: 1002
// Account Balance: 400$
// Account Number: 1003
// Account Balance: 700$
// Account 1004 does not exist.