document.addEventListener("DOMContentLoaded", function () {
  const modal = document.getElementById("booking-modal");
  const buttons = document.querySelectorAll(".section-button");
  const closeBtn = document.querySelector(".close");
  const form = document.getElementById("booking-form");
  const appointmentList = document.getElementById("appointments-list");
  const confirmationPopup = document.getElementById("confirmation-popup");
  const confirmationMessage = document.getElementById("confirmation-message");
  const confirmationClose = document.getElementById("confirmation-close");

  // Open Booking Modal
  buttons.forEach((button) => {
    button.addEventListener("click", function () {
      modal.style.display = "flex";
    });
  });

  // Close Modal
  closeBtn.addEventListener("click", function () {
    modal.style.display = "none";
  });

  // Close Modal on outside click
  window.addEventListener("click", function (event) {
    if (event.target === modal) {
      modal.style.display = "none";
    }
  });

  // Real-time Validation
  function validateInput(input, errorId, validationFn, errorMessage) {
    const errorElement = document.getElementById(errorId);
    if (!validationFn(input.value.trim())) {
      errorElement.textContent = errorMessage;
      return false;
    } else {
      errorElement.textContent = "";
      return true;
    }
  }

  function isValidEmail(email) {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  }

  function isValidPhone(phone) {
    return /^\d{10}$/.test(phone);
  }

  function isFutureDate(date) {
    return new Date(date) > new Date();
  }

  // Form Validation & Submission
  form.addEventListener("submit", function (event) {
    event.preventDefault();

    const name = document.getElementById("full-name");
    const email = document.getElementById("email");
    const phone = document.getElementById("phone");
    const service = document.getElementById("service");
    const datetime = document.getElementById("datetime");
    const terms = document.getElementById("terms");

    let valid = true;
    valid &= validateInput(
      name,
      "name-error",
      (val) => val !== "",
      "Name is required."
    );
    valid &= validateInput(
      email,
      "email-error",
      isValidEmail,
      "Enter a valid email."
    );
    valid &= validateInput(
      phone,
      "phone-error",
      isValidPhone,
      "Enter a 10-digit phone number."
    );
    valid &= validateInput(
      service,
      "service-error",
      (val) => val !== "",
      "Select a service."
    );
    valid &= validateInput(
      datetime,
      "datetime-error",
      isFutureDate,
      "Select a future date/time."
    );

    // Fix: Proper Terms Checkbox Validation
    const termsError = document.getElementById("terms-error");
    if (!terms.checked) {
      termsError.textContent = "You must agree to terms.";
      valid = false;
    } else {
      termsError.textContent = "";
    }

    if (!valid) return;

    // Add new appointment to the list
    const row = document.createElement("tr");
    row.innerHTML = `
            <td>${name.value}</td>
            <td>${service.value}</td>
            <td>${datetime.value}</td>
            <td>Pending</td>
        `;
    appointmentList.appendChild(row);

    // Show Confirmation Popup
    confirmationMessage.textContent = `Thank you, ${name.value}! Your appointment for ${service.value} on ${datetime.value} is confirmed.`;
    confirmationPopup.style.display = "flex";

    // Close Confirmation Popup
    confirmationClose.addEventListener("click", function () {
      confirmationPopup.style.display = "none";
    });

    // Reset Form & Close Modal
    form.reset();
    modal.style.display = "none";
  });
});
