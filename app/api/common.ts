const MOCK_USERS = {
  'cust-1': { id: 'cust-1', firstName: 'Jane', lastName: 'Customer', email: 'customer@creditjambo.com', role: 'CUSTOMER', creditScore: 680, status: 'ACTIVE', createdAt: '2023-01-15T09:30:00Z' },
  'cust-2': { id: 'cust-2', firstName: 'John', lastName: 'Doe', email: 'john.doe@email.com', role: 'CUSTOMER', creditScore: 550, status: 'PENDING', createdAt: '2023-03-10T11:00:00Z' },
  'admin-1': { id: 'admin-1', firstName: 'Admin', lastName: 'User', email: 'admin@creditjambo.com', role: 'ADMIN', status: 'ACTIVE', createdAt: '2023-01-01T08:00:00Z' },
};

const MOCK_ACCOUNTS = {
  'cust-1': { id: 'acc-1', userId: 'cust-1', accountNumber: '100000001', balance: 4250.75, accountType: 'SAVINGS', status: 'ACTIVE' },
  'cust-2': { id: 'acc-2', userId: 'cust-2', accountNumber: '100000002', balance: 300.10, accountType: 'SAVINGS', status: 'PENDING' },
};

const MOCK_TRANSACTIONS = {
  'acc-1': [
    { id: 'txn-1', type: 'DEPOSIT', amount: 5000.00, status: 'COMPLETED', createdAt: '2023-10-01T10:00:00Z', description: 'Initial Deposit' },
    { id: 'txn-2', type: 'WITHDRAWAL', amount: 1000.00, status: 'COMPLETED', createdAt: '2023-10-05T14:30:00Z', description: 'ATM Withdrawal' },
    { id: 'txn-3', type: 'LOAN_DISBURSEMENT', amount: 250.75, status: 'COMPLETED', createdAt: '2023-10-10T08:00:00Z', description: 'Micro-loan #L-1001' },
  ],
  'acc-2': [
    { id: 'txn-4', type: 'DEPOSIT', amount: 300.10, status: 'COMPLETED', createdAt: '2023-10-12T11:05:00Z', description: 'Initial Deposit' },
  ],
};

const MOCK_LOANS = {
  'cust-1': [
    { id: 'loan-1', requestedAmount: 250.75, status: 'PAID_OFF', interestRate: 10.0, termInMonths: 3, createdAt: '2023-10-10T08:00:00Z' },
    { id: 'loan-2', requestedAmount: 5000.00, status: 'PENDING', interestRate: 8.5, termInMonths: 12, createdAt: '2023-10-28T15:00:00Z' },
  ],
  'cust-2': [
    { id: 'loan-3', requestedAmount: 1000.00, status: 'REJECTED', interestRate: 12.0, termInMonths: 6, createdAt: '2023-10-15T10:00:00Z' },
  ],
};

const MOCK_NOTIFICATIONS = {
  'cust-1': [
    { id: 'notif-1', message: 'Your loan request for $5,000.00 has been submitted.', type: 'LOAN_STATUS_UPDATE', isRead: false, createdAt: '2023-10-28T15:01:00Z' },
    { id: 'notif-2', message: 'Your micro-loan (#L-1001) has been fully paid off. Congratulations!', type: 'LOAN_STATUS_UPDATE', isRead: true, createdAt: '2023-10-25T11:00:00Z' },
  ],
  'admin-1': [
    { id: 'notif-3', message: 'New loan application for $5,000.00 from Jane Customer.', type: 'LOAN_STATUS_UPDATE', isRead: false, createdAt: '2023-10-28T15:01:00Z' },
    { id: 'notif-4', message: 'New user "John Doe" is awaiting verification.', type: 'GENERAL_MESSAGE', isRead: true, createdAt: '2023-10-15T10:00:00Z' },
  ]
};

// Simulates API calls with latency
const mockApi = {
  login: ({ email, password }) => new Promise((resolve, reject) => {
    setTimeout(() => {
      const user = Object.values(MOCK_USERS).find(u => u.email === email);
      if (user && password === 'password123') {
        const token = `fake-jwt-token-for-${user.id}`;
        resolve({ user, token });
      } else {
        reject(new Error('Invalid email or password.'));
      }
    }, 1000);
  }),

  // --- Customer API Mocks ---
  getCustomerDashboard: (userId) => new Promise((resolve) => {
    setTimeout(() => {
      const user = MOCK_USERS[userId];
      const account = MOCK_ACCOUNTS[userId];
      const loans = MOCK_LOANS[userId] || [];
      const transactions = MOCK_TRANSACTIONS[account?.id] || [];
      resolve({
        user: { firstName: user.firstName, creditScore: user.creditScore },
        account: { balance: account.balance, accountNumber: account.accountNumber },
        recentTransactions: transactions.slice(0, 3),
        activeLoan: loans.find(l => l.status === 'ACTIVE'),
        pendingLoans: loans.filter(l => l.status === 'PENDING').length,
      });
    }, 800);
  }),
  
  getCustomerSavings: (userId) => new Promise((resolve) => {
     setTimeout(() => {
      const account = MOCK_ACCOUNTS[userId];
      const transactions = MOCK_TRANSACTIONS[account.id] || [];
      resolve({
        account,
        transactions,
      });
    }, 800);
  }),
  
  getCustomerLoans: (userId) => new Promise((resolve) => {
     setTimeout(() => {
      resolve(MOCK_LOANS[userId] || []);
    }, 800);
  }),
  
  getCustomerNotifications: (userId) => new Promise((resolve) => {
    setTimeout(() => {
      resolve(MOCK_NOTIFICATIONS[userId] || []);
    }, 500);
  }),
  
  applyForLoan: (userId, amount, term) => new Promise((resolve) => {
    setTimeout(() => {
      const newLoan = {
        id: `loan-${Math.floor(Math.random() * 1000)}`,
        requestedAmount: parseFloat(amount),
        status: 'PENDING',
        interestRate: 8.5,
        termInMonths: parseInt(term),
        createdAt: new Date().toISOString(),
      };
      if (!MOCK_LOANS[userId]) MOCK_LOANS[userId] = [];
      MOCK_LOANS[userId].push(newLoan);
      resolve(newLoan);
    }, 1500);
  }),

  // --- Admin API Mocks ---
  getAdminDashboard: () => new Promise((resolve) => {
    setTimeout(() => {
      const allLoans = Object.values(MOCK_LOANS).flat();
      resolve({
        totalUsers: Object.values(MOCK_USERS).filter(u => u.role === 'CUSTOMER').length,
        totalActiveLoans: allLoans.filter(l => l.status === 'ACTIVE').length,
        totalPendingApprovals: allLoans.filter(l => l.status === 'PENDING').length,
        totalDisbursed: allLoans
          .filter(l => l.status === 'ACTIVE' || l.status === 'PAID_OFF')
          .reduce((sum, l) => sum + l.requestedAmount, 0),
      });
    }, 800);
  }),
  
  getAdminUsers: () => new Promise((resolve) => {
    setTimeout(() => {
      resolve(Object.values(MOCK_USERS).filter(u => u.role === 'CUSTOMER'));
    }, 800);
  }),
  
  getAdminLoans: () => new Promise((resolve) => {
    setTimeout(() => {
      const allLoans = Object.values(MOCK_LOANS).flat();
      const loansWithUserDetails = allLoans.map(loan => {
        const userId = Object.keys(MOCK_LOANS).find(key => MOCK_LOANS[key].includes(loan));
        const user = MOCK_USERS[userId];
        return {
          ...loan,
          user: {
            name: `${user.firstName} ${user.lastName}`,
            email: user.email,
            creditScore: user.creditScore,
          },
        };
      });
      resolve(loansWithUserDetails);
    }, 800);
  }),
  
  approveLoan: (loanId) => new Promise((resolve) => {
    setTimeout(() => {
      for (const userId in MOCK_LOANS) {
        const loan = MOCK_LOANS[userId].find(l => l.id === loanId);
        if (loan) {
          loan.status = 'APPROVED'; // In a real app, this would be 'ACTIVE' after disbursement
          resolve(loan);
          break;
        }
      }
    }, 1000);
  }),
  
  rejectLoan: (loanId) => new Promise((resolve) => {
    setTimeout(() => {
      for (const userId in MOCK_LOANS) {
        const loan = MOCK_LOANS[userId].find(l => l.id === loanId);
        if (loan) {
          loan.status = 'REJECTED';
          resolve(loan);
          break;
        }
      }
    }, 1000);
  }),
};