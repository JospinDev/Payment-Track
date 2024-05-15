document.addEventListener('DOMContentLoaded', () => {
    const addPersonForm = document.getElementById('add-person-form');
    const personTable = document.getElementById('person-table');
    const persons = JSON.parse(localStorage.getItem('persons')) || [];

    // Display saved persons
    persons.forEach(person => {
        addPersonToTable(person);
    });

    // Add person
    addPersonForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const name = document.getElementById('name').value;
        const date = document.getElementById('date').value;
        const paymentStatus = document.getElementById('payment-status').value;
        const person = { name, date, paymentStatus };
        addPersonToTable(person);
        persons.push(person);
        localStorage.setItem('persons', JSON.stringify(persons));
        addPersonForm.reset();
    });

    // Add person to table
    function addPersonToTable(person) {
        const row = document.createElement('tr');
        row.innerHTML = `
            <td>${person.name}</td>
            <td>${person.date}</td>
            <td>${person.paymentStatus}</td>
            <td class="actions">
                <button class="edit-btn"><i class="fas fa-edit"></i></button>
                <button class="delete-btn"><i class="fas fa-trash"></i></button>
            </td>
        `;
        personTable.querySelector('tbody').appendChild(row);

        // Edit person
        row.querySelector('.edit-btn').addEventListener('click', () => {
            document.getElementById('name').value = person.name;
            document.getElementById('date').value = person.date;
            document.getElementById('payment-status').value = person.paymentStatus;
            persons.splice(persons.indexOf(person), 1);
            row.remove();
            localStorage.setItem('persons', JSON.stringify(persons));
        });

        // Delete person
        row.querySelector('.delete-btn').addEventListener('click', () => {
            persons.splice(persons.indexOf(person), 1);
            row.remove();
            localStorage.setItem('persons', JSON.stringify(persons));
        });
    }
});