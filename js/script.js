/* VARIABLES *************************************************************** */

const spoonieAccount = {
    firstName: '',
    middleName: '',
    lastName: '',
    gainedTotal: 0,
    spentTotal: 0,

    entries: [
        {description: 'Good night sleep', amount: 100, impact: 1, added: '01/04/2019 09:00'}, 
        {description: 'Nap', amount: 10, impact: 1, added: '01/04/2019 15:00'},
        {description: 'Mediocre night sleep', amount: 60, impact: 1, added: '02/04/2019 08:00'},
        {description: 'Read favorite book', amount: 15, impact: 1, added: '02/04/2019 20:00'},
        {description: 'Cooked dinner', amount: 30, impact: -1, added: '01/04/2019 20:00'}, 
        {description: 'Took shower', amount: 15, impact: -1, added: '01/04/2019 21:00'},
        {description: 'Went to work', amount: 60, impact: -1, added: '02/04/2019 17:00'},
        {description: 'Paid bills', amount: 40, impact: -1, added: '02/04/2019 19:00'},
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

    createEntry: function(description, amount) {
        entry = {description: description, amount: amount, impact: impact, added: this.displayCurrentDateTime()}
        return entry;
    },

    gainedTotalCalculate: function() {
        this.gainedTotal = 0;

        for (let i = 0; i < this.entries.length; i++) {
            if (this.entries[i].impact === 1) {
                this.gainedTotal += this.entries[i].amount;
            };
        };

        return this.gainedTotal;
    },

    spentTotalCalculate: function() {
        this.spentTotal = 0;

        for (let i = 0; i < this.entries.length; i++) {
            if (this.entries[i].impact === -1) {
                this.spentTotal += this.entries[i].amount;
            };
        };

        return this.spentTotal;
    },

    balanceCalculate: function() {
        let balance = this.gainedTotal - this.spentTotal;
        return balance;
    },
};



/* SELECTORS *************************************************************** */

const descriptionInput = document.querySelector('#description-input');
const amountInput = document.querySelector('#amount-input');
const addButton = document.querySelector('#add-button');
const resetButton = document.querySelector('#reset-button');

const gainedSection = document.querySelector('#gained-section');
const gainedTable = document.querySelector('#gained-table');

const spentSection = document.querySelector('#spent-section');
const spentTable = document.querySelector('#spent-table');

const balanceSection = document.querySelector('#balance-section');
const balanceTr = document.querySelector('#balance-tr');


/* FUNCTIONS *************************************************************** */

function getImpact() {
    const impactInput = document.querySelector('input[name="impact-input"]:checked');
    const impact = parseInt(impactInput.value);
    return impact;
}



/* EVENT LISTENERS ********************************************************* */

addButton.addEventListener('click', function() {
    const impact = getImpact();

    const description = descriptionInput.value;
    const amount = parseInt(amountInput.value);
    let newEntry = spoonieAccount.createEntry(description, amount, impact);
    spoonieAccount.addEntry(newEntry);

    generateTableRow(impact, newEntry);

    generateBalance();

    return true;
});



/* EXECUTION ************************************************************** */

function generateTableData(entry) {
    tableData =
    `<td>${entry.description}</td>
    <td>${entry.amount}</td>
    <td>${entry.added}</td>`;

    return tableData;
};



function generateTableRow(entry) {
    let table;
    let impact = entry.impact;

    if (impact === 1) {
        table = document.querySelector('#gained-table');
    }

    else if (impact === -1) {
        table = document.querySelector('#spent-table');
    };

    const tableRow = document.createElement('tr');
    table.appendChild(tableRow);
    const tableData = generateTableData(entry);
    tableRow.innerHTML = tableData;

    return true;
};



function generateBalance() {
    gainedTotal = spoonieAccount.gainedTotalCalculate();
    spentTotal = spoonieAccount.spentTotalCalculate();
    balance = spoonieAccount.balanceCalculate();
    balanceTr.innerHTML =
    `<td>${gainedTotal}</td>
    <td>-</td>
    <td>${spentTotal}</td>
    <td>=</td>
    <td>${balance}</td>`;
    return true;
};


function initialize() {
    for (i = 0; i < spoonieAccount.entries.length; i++) {
        generateTableRow(spoonieAccount.entries[i]);
    };

    generateBalance();
};

initialize();

