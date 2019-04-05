/* VARIABLES *************************************************************** */

const spoonieAccount = {
    name: '',
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

    createEntry: function(description, amount, impact) {
        entry = {description: description, amount: amount, impact: impact, added: this.displayCurrentDateTime()}
        return entry;
    },

    addEntry: function(entry) {
        this.entries.push(entry);
        return true;
    },

    calculateGainedTotal: function() {
        this.gainedTotal = 0;

        for (let i = 0; i < this.entries.length; i++) {
            if (this.entries[i].impact === 1) {
                this.gainedTotal += this.entries[i].amount;
            };
        };

        return this.gainedTotal;
    },

    calculateSpentTotal: function() {
        this.spentTotal = 0;

        for (let i = 0; i < this.entries.length; i++) {
            if (this.entries[i].impact === -1) {
                this.spentTotal += this.entries[i].amount;
            };
        };

        return this.spentTotal;
    },

    calculateBalance: function() {
        let balance = this.gainedTotal - this.spentTotal;
        return balance;
    },
};



/* SELECTORS *************************************************************** */

const nameDiv = document.querySelector('#name-div');
const nameInput = document.querySelector('#name-input');
const nameInputLabel = document.querySelector('#name-input-label');
const saveButton = document.querySelector('#save-button');
const welcomeP = document.querySelector('#welcome-p');
const forgetButton = document.querySelector('#forget-button');

const descriptionInput = document.querySelector('#description-input');
const amountInput = document.querySelector('#amount-input');
const addButton = document.querySelector('#add-button');
const clearButton = document.querySelector('#clear-button');

const gainedSection = document.querySelector('#gained-section');
const gainedTable = document.querySelector('#gained-table');

const spentSection = document.querySelector('#spent-section');
const spentTable = document.querySelector('#spent-table');

const balanceSection = document.querySelector('#balance-section');
const balanceTable = document.querySelector('#balance-table');
const balanceTr = document.querySelector('#balance-tr');


/* FUNCTIONS *************************************************************** */

function getImpact() {
    const impactInput = document.querySelector('input[name="impact-input"]:checked');
    const impact = parseInt(impactInput.value);
    return impact;
};



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
    gainedTotal = spoonieAccount.calculateGainedTotal();
    spentTotal = spoonieAccount.calculateSpentTotal();
    balance = spoonieAccount.calculateBalance();
    balanceTr.innerHTML =
    `<td>${gainedTotal}</td>
    <td>-</td>
    <td>${spentTotal}</td>
    <td>=</td>
    <td>${balance}</td>`;
    return true;
};



/* EVENT LISTENERS ********************************************************* */
saveButton.addEventListener('click', function() {
    if (nameInput.value == '') {
        nameInput.placeholder = "Please enter your name"
        return false;
    }

    else {
        spoonieAccount.name = nameInput.value;
        localStorage.setItem('name', spoonieAccount.name);

        nameInput.style.display = 'none';
        nameInputLabel.style.display = 'none';
        saveButton.style.display = 'none';

        welcomeP.innerHTML = `Welcome, ${spoonieAccount.name}!`
        welcomeP.style.display = 'inline-block';
        forgetButton.style.display = 'inline-block';

        stringifiedEntries = JSON.stringify(spoonieAccount.entries, undefined, 4);
        localStorage.setItem('entries', stringifiedEntries);
        return spoonieAccount.name;
    };

});



forgetButton.addEventListener('click', function() {
    localStorage.clear();
    spoonieAccount.name = '',
    spoonieAccount.entries = [
        {description: 'Good night sleep', amount: 100, impact: 1, added: '01/04/2019 09:00'}, 
        {description: 'Nap', amount: 10, impact: 1, added: '01/04/2019 15:00'},
        {description: 'Mediocre night sleep', amount: 60, impact: 1, added: '02/04/2019 08:00'},
        {description: 'Read favorite book', amount: 15, impact: 1, added: '02/04/2019 20:00'},
        {description: 'Cooked dinner', amount: 30, impact: -1, added: '01/04/2019 20:00'}, 
        {description: 'Took shower', amount: 15, impact: -1, added: '01/04/2019 21:00'},
        {description: 'Went to work', amount: 60, impact: -1, added: '02/04/2019 17:00'},
        {description: 'Paid bills', amount: 40, impact: -1, added: '02/04/2019 19:00'},
    ];

    nameInput.style.display = 'inline-block';
    nameInputLabel.style.display = 'inline-block';
    saveButton.style.display = 'inline-block';

    nameInput.value = '';
    descriptionInput.value = '';
    amountInput.value = '';

    welcomeP.innerHTML = `Welcome, ${spoonieAccount.name}!`
    welcomeP.style.display = 'none';
    forgetButton.style.display = 'none';


    gainedTable.innerHTML =                         
    `<tr>
        <th class="activity-column">Activity</th>
        <th class="spoons-column">Spoons</th>
        <th class="recorded-column">Recorded on</th>
    </tr>`

    spentTable.innerHTML =                         
    `<tr>
        <th class="activity-column">Activity</th>
        <th class="spoons-column">Spoons</th>
        <th class="recorded-column">Recorded on</th>
    </tr>`

    balanceTr.innerHTML =
    `<td>0</td>
    <td>-</td>
    <td>0</td>
    <td>=</td>
    <td>0</td>`;

    initialize();

});




addButton.addEventListener('click', function() {
    const description = descriptionInput.value;
    const amount = parseInt(amountInput.value);
    const impact = getImpact();

    let newEntry = spoonieAccount.createEntry(description, amount, impact);
    spoonieAccount.addEntry(newEntry);

    generateTableRow(newEntry);

    generateBalance();

    if (localStorage.getItem('name') !== null) {
        stringifiedEntries = JSON.stringify(spoonieAccount.entries, undefined, 2);
        localStorage.setItem('entries', stringifiedEntries);
    };

    nameInput.value = '';
    descriptionInput.value = '';
    amountInput.value = '';

    return true;
});



clearButton.addEventListener('click', function() {
    spoonieAccount.entries = [];
    stringifiedEntries = JSON.stringify(spoonieAccount.entries, undefined, 2);
    localStorage.setItem('entries', stringifiedEntries);

    gainedTable.innerHTML =                         
    `<tr>
        <th class="activity-column">Activity</th>
        <th class="spoons-column">Spoons</th>
        <th class="recorded-column">Recorded on</th>
    </tr>`

    spentTable.innerHTML =                         
    `<tr>
        <th class="activity-column">Activity</th>
        <th class="spoons-column">Spoons</th>
        <th class="recorded-column">Recorded on</th>
    </tr>`

    balanceTr.innerHTML =
    `<td>0</td>
    <td>-</td>
    <td>0</td>
    <td>=</td>
    <td>0</td>`;

    return true;

});




/* EXECUTION ************************************************************** */

function initialize() {
    if (localStorage.getItem('name') != null) {
        spoonieAccount.name = localStorage.getItem('name');

        nameInput.style.display = 'none';
        nameInputLabel.style.display = 'none';
        saveButton.style.display = 'none';

        welcomeP.innerHTML = `Welcome, ${spoonieAccount.name}!`
        welcomeP.style.display = 'inline-block';
        forgetButton.style.display = 'inline-block';
        
        localStorage.setItem('name', spoonieAccount.name)
        spoonieAccount.entries = JSON.parse(localStorage.getItem('entries'));
    }

    else if (localStorage.getItem('name') == null) {
        stringifiedEntries = JSON.stringify(spoonieAccount.entries, undefined, 2);
        localStorage.setItem('entries', stringifiedEntries);
    }

    for (i = 0; i < spoonieAccount.entries.length; i++) {
        generateTableRow(spoonieAccount.entries[i]);
    };

    generateBalance();
};

initialize();