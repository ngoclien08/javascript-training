document.getElementById('userForm').addEventListener('submit', function(e) {
    e.preventDefault();
    
    const name = document.getElementById('name').value;
    const age = document.getElementById('age').value;
    const email = document.getElementById('email').value;
    const submitBtn = document.getElementById('submitBtn');
    const updateBtn = document.getElementById('updateBtn');

    // Validation
    if (!name || !age || !email || age < 0) {
        alert('Vui lòng điền đầy đủ thông tin hợp lệ!');
        return;
    }

    // Add new row (submitBtn is visible by default)
    addRow(name, age, email);

    // Reset form
    this.reset();
    submitBtn.style.display = 'inline';
    updateBtn.style.display = 'none';
    delete submitBtn.dataset.editIndex;

    // Lưu dữ liệu sau khi thêm
    saveData();
});

// Gắn sự kiện cho nút Update
document.getElementById('updateBtn').addEventListener('click', function(e) {
    e.preventDefault();

    const name = document.getElementById('name').value;
    const age = document.getElementById('age').value;
    const email = document.getElementById('email').value;
    const submitBtn = document.getElementById('submitBtn');
    const updateBtn = document.getElementById('updateBtn');
    const rowIndex = submitBtn.dataset.editIndex;

    if (!name || !age || !email || age < 0) {
        alert('Vui lòng điền đầy đủ thông tin hợp lệ!');
        return;
    }

    if (rowIndex) {
        // Update existing row
        updateRow(rowIndex, name, age, email);
    }

    // Reset form and buttons
    document.getElementById('userForm').reset();
    submitBtn.style.display = 'inline';
    updateBtn.style.display = 'none';
    delete submitBtn.dataset.editIndex;

    // Lưu dữ liệu sau khi cập nhật
    saveData();
});

function addRow(name, age, email) {
    const tableBody = document.getElementById('tableBody');
    const row = document.createElement('tr');

    row.innerHTML = `
        <td>${name}</td>
        <td>${age}</td>
        <td>${email}</td>
        <td>
            <button class="edit-btn">Edit</button>
            <button class="delete-btn">Delete</button>
        </td>
    `;

    // Add event listeners for edit and delete buttons
    row.querySelector('.edit-btn').addEventListener('click', () => editRow(row));
    row.querySelector('.delete-btn').addEventListener('click', () => deleteRow(row));

    tableBody.appendChild(row);
}

function editRow(row) {
    const cells = row.querySelectorAll('td');
    const name = cells[0].textContent;
    const age = cells[1].textContent;
    const email = cells[2].textContent;

    // Populate form with row data
    document.getElementById('name').value = name;
    document.getElementById('age').value = age;
    document.getElementById('email').value = email;

    // Show update button, hide submit button
    const submitBtn = document.getElementById('submitBtn');
    const updateBtn = document.getElementById('updateBtn');
    submitBtn.style.display = 'none';
    updateBtn.style.display = 'inline';

    // Store the row index to update
    submitBtn.dataset.editIndex = Array.from(document.querySelectorAll('#tableBody tr')).indexOf(row);
}

function updateRow(index, name, age, email) {
    const tableBody = document.getElementById('tableBody');
    const row = tableBody.children[index];

    row.innerHTML = `
        <td>${name}</td>
        <td>${age}</td>
        <td>${email}</td>
        <td>
            <button class="edit-btn">Edit</button>
            <button class="delete-btn">Delete</button>
        </td>
    `;

    // Reattach event listeners
    row.querySelector('.edit-btn').addEventListener('click', () => editRow(row));
    row.querySelector('.delete-btn').addEventListener('click', () => deleteRow(row));
}

function deleteRow(row) {
    row.remove();
    saveData(); // Lưu dữ liệu sau khi xóa
}

// Lưu dữ liệu vào localStorage
function saveData() {
    const tableData = [];
    document.querySelectorAll('#tableBody tr').forEach(row => {
        const cells = row.querySelectorAll('td');
        tableData.push({
            name: cells[0].textContent,
            age: cells[1].textContent,
            email: cells[2].textContent
        });
    });
    localStorage.setItem('tableData', JSON.stringify(tableData));
}

// Tải dữ liệu từ localStorage
function loadData() {
    const tableData = JSON.parse(localStorage.getItem('tableData')) || [];
    tableData.forEach(data => addRow(data.name, data.age, data.email));
}

// Gọi loadData khi tải trang
document.addEventListener('DOMContentLoaded', loadData);