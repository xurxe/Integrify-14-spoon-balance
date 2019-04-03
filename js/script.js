/* VARIABLES *************************************************************** */

const spoonieAccount = {
    firstName: '',
    middleName: '',
    lastName: '',
    gainedTotal: 0,
    spentTotal: 0,

    gained: [
        {description: 'Good night sleep', amount: 100, added: '01/04/2019 09:00'}, 
        {description: 'Nap', amount: 10, added: '01/04/2019 15:00'},
        {description: 'Mediocre night sleep', amount: 60, added: '02/04/2019 08:00'},
    ],

    spent: [
        {description: 'Cooked dinner', amount: 30, added: '01/04/2019 20:00'}, 
        {description: 'Took shower', amount: 10, added: '01/04/2019 21:00'},
        {description: 'Went to work', amount: 60, added: '02/04/2019 17:00'},
    ],

    spoonieInfo: function() {
        return `Name: ${this.firstName} ${this.middleName} ${this.lastName}`;
    },

    displayCurrentDateTime: function() {
        var currentDate = new Date();
        day = "00" + currentDate.getDate();
        day = day.substr(-2);
        month = "00" + (currentDate.getMonth() + 1);
        month = month.substr(-2);
        year = "0000" + currentDate.getFullYear();
        year = year.substr(-4);
        hour = "00" + currentDate.getHours();
        hour = hour.substr(-2);
        minute = "00" + currentDate.getMinutes();
        minute = minute.substr(-2);
        return `${day}/${month}/${year} ${hour}:${minute}`
    },

    addEntry: function(description, amount, impact) {
        this.impact.push({description: description, amount: amount, added: this.displayCurrentDateTime()});
    },

    gainedTotalCalculate: function() {
        for (let i = 0; i < this.gained.length; i++) {
            this.gainedTotal += this.gained[i].amount;
        }
        return this.gainedTotal;
    },

    spentTotalCalculate: function() {
        for (let i = 0; i < this.spent.length; i++) {
            this.spentTotal += this.spent[i].amount;
        }
        return this.spentTotal;
    },

    calculateSpoonBalance: function() {
        let spoonBalance = this.gainedTotal - this.totalExpenses;
        return spoonBalance;
    },
};



/* SELECTORS *************************************************************** */

const inputDescription = document.querySelector('#input-description');
const inputAmount = document.querySelector('#input-amount');
const buttonSubmit = document.querySelector('button[type="submit"]');
const buttonReset = document.querySelector('button[type="reset"]');
const gainedSection = document.querySelector('.gained-section');
const spentSection = document.querySelector('.spent-section');
const balanceSection = document.querySelector('.balance-section');
const gainedTable = document.querySelector('#gained-table');
const spentTable = document.querySelector('#spent-table');



/* FUNCTIONS *************************************************************** */

function getCheckedValue() {
    const inputImpact = document.querySelector('input[name="input-impact"]:checked');
    const impact = inputImpact.value;
    return impact;
}


/* EVENT LISTENERS */

buttonSubmit.addEventListener('click', function() {
    const impact = getCheckedValue();
/*     const description = inputDescription.value;
    const amount = parseInt(inputAmount.value);
    const newEntry = spoonieAccount.addEntry(description, amount, impact);
    generateTableRow(impact, newEntry); */

    console.log(impact);

    return true;
});



/* EXECUTION ************************************************************** */

/* function generateTableData(entry) {
    tableData =
    `<td>${entry.description}</td>
    <td>${entry.amount}</td>
    <td>${entry.added}</td>`;

    return tableData;
};

function generateTableRow(impact, entry) {
    const table = document.querySelector('#' + impact + '-table');
    const tableData = generateTableRow(entry);
    const tableRow = document.createElement('tr');
    table.appendChild(tableRow);
    tableRow.innerHTML = tableData;
    return true;
}; */

/* function initialize() {
    for (i = 0; i < spoonieAccount.gained.length; i++) {
        generateTableRow("gained", spoonieAccount.gained[i]);
    };

    for (i = 0; i < spoonieAccount.spent.length; i++) {
        generateTableRow("spent", spoonieAccount.spent[i]);
    };
};

initialize(); */

