/* VARIABLES *************************************************************** */

const spoonieAccount = {
    name: '',
    gainedTotal: 0,
    spentTotal: 0,

    // this array will contain all the IDs (integers in increments of 1), even of elements that had been deleted, to ensure they're all unique
    ids: [1, 2, 3, 4, 5, 6, 7, 8],
    
    // this array will contain all the entries (each including an impact multiplier of either 1 or -1)
    entries: [
        {
            id: 1, 
            impact: 1, 
            description: 'Good night sleep', 
            amount: 100, 
            added: '01/04/2019 09:00', 
        }, 
        {
            id: 2, 
            impact: 1, 
            description: 'Nap', 
            amount: 10, 
            added: '01/04/2019 15:00', 
        },
        {
            id: 3, 
            impact: 1, 
            description: 'Mediocre night sleep', 
            amount: 60, 
            added: '02/04/2019 08:00', 
        },
        {
            id: 4, 
            impact: 1, 
            description: 'Read favorite book', 
            amount: 15, 
            added: '02/04/2019 20:00', 
        },
        {
            id: 5, 
            impact: -1, 
            description: 'Cooked dinner', 
            amount: 30, 
            added: '01/04/2019 20:00', 
        }, 
        {
            id: 6, 
            impact: -1, 
            description: 'Took shower', 
            amount: 15, 
            added: '01/04/2019 21:00', 
        },
        {
            id: 7, 
            impact: -1, 
            description: 'Went to work', 
            amount: 60, 
            added: '02/04/2019 17:00', 
        },
        {
            id: 8, 
            impact: -1, 
            description: 'Paid bills', 
            amount: 40, 
            added: '02/04/2019 19:00', 
        },
    ],

    // this function generates and formats the date at which an entry was created
    displayCurrentDateTime: function() {
        var currentDate = new Date();
        day = ("00" + currentDate.getDate()).substr(-2);
        month = ("00" + (currentDate.getMonth() + 1)).substr(-2);
        year = ("0000" + currentDate.getFullYear()).substr(-4);
        hour = ("00" + currentDate.getHours()).substr(-2);
        minute = ("00" + currentDate.getMinutes()).substr(-2);

        return `${day}/${month}/${year} ${hour}:${minute}`
    },

    // this function generates entry from given parameters
    createEntry: function(id, impact, description, amount) {

        entry = {
            id: id,
            impact: impact,
            description: description,
            amount: amount,
            added: this.displayCurrentDateTime(),
        }

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

// this function gets the impact multiplier (1 or -1) from the checked radio button
function getImpact() {
    const impactInput = document.querySelector('input[name="impact-input"]:checked');
    const impact = parseInt(impactInput.value);
    return impact;
};



function generateTableData(entry) {
    // generate data cells from an entry
    // note that the delete button gets the entry's ID as a value
    tableData =
    `<td>${entry.description}</td>
    <td>${entry.amount}</td>
    <td class="time-td">${entry.added}</td>
    <td><button class="delete-button" value=${entry.id}onclick="deleteRowAndEntry()">&times;</button></td>`;

    // update the list of deleteButtons, since a new one was just created
    deleteButtons = document.querySelectorAll('.delete-button');

    return tableData;
};



function generateTableRow(entry) {

    // declare table variable
    let table;

    // if impact is 1, select gained table
    if (entry.impact === 1) {
        table = document.querySelector('#gained-table');
    }

    // if impact is -1, select spent table
    else if (entry.impact === -1) {
        table = document.querySelector('#spent-table');
    };

    // create row
    const tableRow = document.createElement('tr');

    // append to table
    table.appendChild(tableRow);

    // generate table data and pass as inner HTML of the row
    const tableData = generateTableData(entry);
    tableRow.innerHTML = tableData;

    return true;
};



function deleteRowAndEntry() {

    // when you click a delete button, its value corresponds to the ID of the associated entry
    const ID = event.target.value;

    // select the button's row
    const row = event.target.parentNode.parentNode;

    // select the button's table
    const table = row.parentNode;

    // remove row from table
    table.removeChild(row);

    // loop through entries array until you find 
    for (let i = 0; i < spoonieAccount.entries.length; i++) {
        if (spoonieAccount.entries[i].id == ID) {
            spoonieAccount.entries.splice(i, 1);
        };
    };

    stringifiedEntries = JSON.stringify(spoonieAccount.entries, undefined, 4);
    localStorage.setItem('entries', stringifiedEntries);

    return true;
};



function generateBalanceRow() {
    // calculate totals and balance
    gainedTotal = spoonieAccount.calculateGainedTotal();
    spentTotal = spoonieAccount.calculateSpentTotal();
    balance = spoonieAccount.calculateBalance();

    // generate innerHTML for corresponding row in balance table
    balanceTr.innerHTML =
    `<td>${gainedTotal}</td>
    <td>-</td>
    <td>${spentTotal}</td>
    <td>=</td>
    <td>${balance}</td>`;
    return true;
};



function displayUnsavedName() {
    nameInput.style.display = 'inline-block';
    nameInputLabel.style.display = 'inline-block';
    saveButton.style.display = 'inline-block';

    welcomeP.style.display = 'none'
    welcomeP.style.display = 'none';
    forgetButton.style.display = 'none';

    return true;
};



function displaySavedName() {
    nameInput.style.display = 'none';
    nameInputLabel.style.display = 'none';
    saveButton.style.display = 'none';

    welcomeP.innerHTML = `Hi&nbsp;there,&nbsp;${spoonieAccount.name}! Here&nbsp;are&nbsp;some&nbsp;free&nbsp;spoons:&nbsp;🥄&#xfeff;🥄&#xfeff;🥄`
    welcomeP.style.display = 'inline-block';
    forgetButton.style.display = 'inline-block'; 

    return true;
};



function clearTables() {
    gainedTable.innerHTML =                         
    `<tr>
        <th class="activity-column">Activity</th>
        <th class="spoons-column">Spoons</th>
        <th class="recorded-column">Recorded</th>
    </tr>`

    spentTable.innerHTML =                         
    `<tr>
        <th class="activity-column">Activity</th>
        <th class="spoons-column">Spoons</th>
        <th class="recorded-column">Recorded</th>
    </tr>`

    balanceTr.innerHTML =
    `<td>0</td>
    <td>-</td>
    <td>0</td>
    <td>=</td>
    <td>0</td>`;

    return true;
}



/* EVENT LISTENERS ********************************************************* */

saveButton.addEventListener('click', function() {
    // if name field empty...
    if (nameInput.value == '') {
        // give feedback in placeholder
        nameInput.placeholder = "Please enter your name";

        // switch focus to name input
        nameInput.focus();

        // terminate without saving
        return false;
    }

    // otherwise...
    else {
        // save name
        spoonieAccount.name = nameInput.value;
        localStorage.setItem('name', spoonieAccount.name);

        displaySavedName();

        // save entries in local storage
        stringifiedEntries = JSON.stringify(spoonieAccount.entries, undefined, 4);
        localStorage.setItem('entries', stringifiedEntries);

        return spoonieAccount.name;
    };

});



forgetButton.addEventListener('click', function() {
    // clear local storage
    localStorage.clear();

    displayUnsavedName();

    // reset input fields
    nameInput.value = '';
    descriptionInput.value = '';
    amountInput.value = '';

    // reset name, ids, and entries
    spoonieAccount.name = '',
    spoonieAccount.ids = [1, 2, 3, 4, 5, 6, 7, 8],
    spoonieAccount.entries = [
        {
            id: 1, 
            impact: 1, 
            description: 'Good night sleep', 
            amount: 100, 
            added: '01/04/2019 09:00', 
        }, 
        {
            id: 2, 
            impact: 1, 
            description: 'Nap', 
            amount: 10, 
            added: '01/04/2019 15:00', 
        },
        {
            id: 3, 
            impact: 1, 
            description: 'Mediocre night sleep', 
            amount: 60, 
            added: '02/04/2019 08:00', 
        },
        {
            id: 4, 
            impact: 1, 
            description: 'Read favorite book', 
            amount: 15, 
            added: '02/04/2019 20:00', 
        },
        {
            id: 5, 
            impact: -1, 
            description: 'Cooked dinner', 
            amount: 30, 
            added: '01/04/2019 20:00', 
        }, 
        {
            id: 6, 
            impact: -1, 
            description: 'Took shower', 
            amount: 15, 
            added: '01/04/2019 21:00', 
        },
        {
            id: 7, 
            impact: -1, 
            description: 'Went to work', 
            amount: 60, 
            added: '02/04/2019 17:00', 
        },
        {
            id: 8, 
            impact: -1, 
            description: 'Paid bills', 
            amount: 40, 
            added: '02/04/2019 19:00', 
        },
    ];

    clearTables();

    // initialize
    initialize();

    return true;
});



addButton.addEventListener('click', function() {

    const description = descriptionInput.value;

    // if description is empty...
    if (description === "") {
        // give feedback with the placeholder
        descriptionInput.placeholder = 'Hint: description!';

        // switch focus to field
        descriptionInput.focus();

        return false;
    };

    const amount = parseInt(amountInput.value);

    // if amount is NaN after parsing it...
    if (isNaN(amount) === true || amount < 0) {
        // give feedback with the placeholder
        amountInput.value = '';
        amountInput.placeholder = 'Hint: positive number!';

        // switch focus to field
        amountInput.focus();
        return false;
    };

    // generate next unique id
    const id = spoonieAccount.ids[spoonieAccount.ids.length - 1] + 1;
    
    // push id to ids array
    spoonieAccount.ids.push(id);

    // get impact
    const impact = getImpact();

    // generate new entry
    let newEntry = spoonieAccount.createEntry(id, impact, description, amount);
    
    // add new entry to entries array
    spoonieAccount.addEntry(newEntry);

    // generate new table row
    generateTableRow(newEntry);

    // update balance
    generateBalanceRow();

    // if the user has saved their name locally, save the updated entry array locally
    if (localStorage.getItem('name') !== null) {
        stringifiedEntries = JSON.stringify(spoonieAccount.entries, undefined, 2);
        localStorage.setItem('entries', stringifiedEntries);
    };

    // clear input fields
    descriptionInput.value = '';
    amountInput.value = '';

    return true;
});



clearButton.addEventListener('click', function() {

    // clear entries 
    spoonieAccount.entries = [];
    stringifiedEntries = JSON.stringify(spoonieAccount.entries, undefined, 2);
    localStorage.setItem('entries', stringifiedEntries);

    clearTables();

    return true;
});
 


/* EXECUTION ************************************************************** */

function initialize() {

    // if the user has saved their name locally
    if (localStorage.getItem('name') != null) {

        // get name and entries from local storage
        spoonieAccount.name = localStorage.getItem('name');
        spoonieAccount.entries = JSON.parse(localStorage.getItem('entries'));

        displaySavedName();
    }

    // otherwise, save default entries to local storage
    else if (localStorage.getItem('name') == null) {
        stringifiedEntries = JSON.stringify(spoonieAccount.entries, undefined, 2);
        localStorage.setItem('entries', stringifiedEntries);
    }

    // generate tables
    for (i = 0; i < spoonieAccount.entries.length; i++) {
        generateTableRow(spoonieAccount.entries[i]);
    };

    // select delete buttons
    deleteButtons = document.querySelectorAll('.delete-button');

    // generate balance table
    generateBalanceRow();
};

initialize();