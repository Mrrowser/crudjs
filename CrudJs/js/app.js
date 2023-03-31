// Define array to hold registrations
let registrations = [];

// Get form and table elements
const registrationForm = document.querySelector('#registration-form');
const registrationTable = document.querySelector('#registration-table tbody');

// Get modal elements
const editModal = document.querySelector('#edit-modal');
const editForm = document.querySelector('#edit-form');
const editId = document.querySelector('#edit-id');
const editName = document.querySelector('#edit-name');
const editEmail = document.querySelector('#edit-email');
const editPhone = document.querySelector('#edit-phone');
const editBtn = document.querySelector('#edit-btn');
const cancelBtn = document.querySelector('#cancel-btn');
var closeBtn = document.querySelector('#close-btn');

// Add event listener for form submit
registrationForm.addEventListener('submit', (e) => {
  e.preventDefault();
  // Get form data
  const name = document.querySelector('#name').value;
  const email = document.querySelector('#email').value;
  const phone = document.querySelector('#phone').value;

  // Add new registration to array

  const newRegistration = {
    id: registrations.length + 1,
    name,
    email,
    phone
  };
      
  registrations.push(newRegistration);
      
  // Reset form
  registrationForm.reset();

  // Update table
  updateTable();
});

// Function to update table
function updateTable() {
    
  // Clear table
      
  registrationTable.innerHTML = '';
  
  // Add rows to table
  for (let i = 0; i < registrations.length; i++) {
    const registration = registrations[i];
    const row = document.createElement('tr');
    
    row.innerHTML += ` 
      <td>${registration.name}</td> 
      <td>${registration.email}</td> 
      <td>${registration.phone}</td> 
      <td> 
          <button class="edit-btn" data-id="${registration.id}">Edit</button> 
          <button class="delete-btn" data-id="${registration.id}">Delete</button> 
      </td>` ;
      registrationTable.appendChild(row);
  }

  // Add event listeners for edit and delete buttons
  const editBtns = document.querySelectorAll('.edit-btn');
  editBtns.forEach(editBtn => {
    editBtn.addEventListener('click', (e) => {
      const id = e.target.dataset.id;
      const registration = registrations.find(registration => registration.id == id);
        editId.value = registration.id;
        editName.value = registration.name;
        editEmail.value = registration.email;
        editPhone.value = registration.phone;
        editModal.style.display = 'flex';
    });
  });

  const deleteBtns = document.querySelectorAll('.delete-btn');
  deleteBtns.forEach(deleteBtn => {
    deleteBtn.addEventListener('click', (e) => {
      const id = e.target.dataset.id;
      const index = registrations.findIndex(registration => registration.id == id);
      registrations.splice(index, 1);

      updateTable();
    });
  });
}

// Add event listener for edit form submit
editForm.addEventListener('submit', (e) => {
  e.preventDefault();
  // Get form data
  const id = editId.value;
  const name = editName.value;
  const email = editEmail.value;
  const phone = editPhone.value;
  // Update registration in array
  const index = registrations.findIndex(registration => registration.id == id);
  registrations[index].name = name;
  registrations[index].email = email;
  registrations[index].phone = phone;
  // Reset form
  editForm.reset();
  // Hide modal
  editModal.style.display = 'none';
  // Update table
  updateTable();
});

// Add event listener for cancel button
cancelBtn.addEventListener('click', () => {
  // Reset form
  editForm.reset();
  // Hide modal
  editModal.style.display = 'none';
});

closeBtn.addEventListener('click', () => {
  // Reset form
  editForm.reset();
  // Hide modal
  editModal.style.display = 'none';
});

// Update table on page load
updateTable();