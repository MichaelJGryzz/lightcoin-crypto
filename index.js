class Account {

  constructor(username) {
    this.username = username;
    // Have the account balance start at $0 since that makes more sense.
    this.transactions = [];
  }

  get balance() {
    // Calculate the balance using the transaction objects.
    let balance = 0;
    for (let t of this.transactions) {
      balance += t.value;
    }
    return balance;
  }

  addTransaction(transaction) {
    this.transactions.push(transaction);
  }
}

// Super class
class Transaction {

  constructor(amount, account) {
    this.amount = amount;
    this.account = account;
  }

  commit() {
    // Return false if transaction is not allowed, otherwise keep track of transaction time, add transaction and return true.
    if (!this.isAllowed()) return false;
    // Keep track of the time of the transaction
    this.time = new Date();
    // Add the transaction to the account
    this.account.addTransaction(this);
    return true;
  }
}

// Sub class
class Deposit extends Transaction {

  // Update the balance in the account
  get value() {
    return this.amount;
  }

  isAllowed() {
    // deposts are always allowed regardless of balance, just return true.
    return true;
  }
}

// Sub class
class Withdrawal extends Transaction {

  // Update the balance in the account
  get value() {
    return -this.amount;
  }

  isAllowed() {
    // it has access to this.account because of parent
    return (this.account.balance - this.amount >= 0);
  }
}


// DRIVER CODE BELOW
// We use the code below to "drive" the application logic above and make sure it's working as expected

// Account creation code
const myAccount = new Account("MJG");

console.log('Starting Balance: ', myAccount.balance);

console.log('Attempting to withdraw just $1 should fail...');
const t1 = new Withdrawal(1, myAccount);
console.log('Commit result:', t1.commit());
console.log('Account Balance: ', myAccount.balance);

console.log('A deposit will always succeed...');
const t2 = new Deposit(120.00, myAccount);
console.log('Commit result:', t2.commit());
console.log('Account Balance: ', myAccount.balance);

console.log('Withdrawal of 115 should be allowed now...');
const t3 = new Withdrawal(115.00, myAccount);
console.log('Commit result:', t3.commit());
console.log('Current Account Balance: ', myAccount.balance);
console.log("I need more money 😟");

console.log('Account Transaction History: ', myAccount.transactions);
