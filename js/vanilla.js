class Form {
  constructor() {
    this.clientFirstNameInput = document.getElementById("clientFirstName");
    this.clientLastNameInput = document.getElementById("clientLastName");
    this.clientPhone = document.getElementById("clientPhone");
    this.clientEmail = document.getElementById("clientEmail");
    this.clientAddress = document.getElementById("addressInput");
    this.clientCity = document.getElementById("cityInput");
    this.clientState = document.getElementById("stateInput");
    this.clientZipcode = document.getElementById("zipcodeInput");
    this.clientArea = document.getElementById("areaInput");
    this.clientJobCategory = document.getElementById("jobCategory");
    this.clientJobSource = document.getElementById("jobSource");
    this.clientStartDateInput = document.getElementById("startDateInput");
    this.clientStartTimeInput = document.getElementById("startTimeInput");
    this.clientEndTimeInput = document.getElementById("endTimeInput");
    this.clientJobDescription = document.getElementById("jobDescription");
    this.submitButton = document.getElementById("submitButton");
    this.clientAreaError = document.getElementById("areaError");
    this.clientEmailError = document.getElementById("emailError");
    this.clientPhoneError = document.getElementById("phoneError");

    this.setupEventListeners();
  }

  setupEventListeners() {
    this.submitButton.addEventListener("click", (event) => {
      event.preventDefault();
      if (this.validateForm()) {
        this.submitForm();
      } else {
        console.log("Form validation failed.");
      }
    });

    this.clientStartDateInput.addEventListener("input", () => {
      this.validateJobDateInput(this.clientStartDateInput);
    });

    this.clientStartTimeInput.addEventListener("input", () => {
      this.validateJobTimeInput(this.clientStartTimeInput);
    });

    this.clientEndTimeInput.addEventListener("input", () => {
      this.validateJobTimeInput(this.clientEndTimeInput);
    });

    this.clientArea.addEventListener("input", () => {
      this.validateAreaInput(this.clientArea, this.clientAreaError);
    });

    this.clientEmail.addEventListener("input", () => {
      this.validateEmailInput(this.clientEmail, this.clientEmailError);
    });

    this.clientPhone.addEventListener("input", () => {
      this.validatePhoneInput(this.clientPhone, this.clientPhoneError);
    });
  }

  validateForm() {
    let isValid = true;
    const inputs = document.querySelectorAll(".validate");
    inputs.forEach((input) => {
      const errorElement = input.parentNode.querySelector(".error-message");
      if (input.checkValidity()) {
        input.setCustomValidity("");
        if (errorElement) {
          errorElement.textContent = "";
        }
        if (
          input === this.clientStartDateInput ||
          input === this.clientStartTimeInput ||
          input === this.clientEndTimeInput
        ) {
          if (input.value === "") {
            input.setCustomValidity("This field is required.");
            isValid = false;
          } else {
            input.setCustomValidity("");
          }
        }
      } else {
        const errorMessage = input.validationMessage;
        input.setCustomValidity(errorMessage);
        if (errorElement) {
          errorElement.textContent = errorMessage;
        }
        console.error(
          `Validation failed for input: ${input.name}. Error message: ${errorMessage}`
        );
        isValid = false;
      }
    });
    return isValid;
  }
  validateAreaInput(input, errorElement) {
    const regex = /^[a-zA-Zа-яА-ЯёЁ\s]+$/;
    const isValid = regex.test(input.value);
    if (!isValid) {
      input.setCustomValidity("Please enter a valid numeric area.");
      errorElement.textContent = "Please enter a valid numeric area.";
    } else {
      input.setCustomValidity("");
      errorElement.textContent = "";
    }
    return isValid;
  }

  validateEmailInput(input, errorElement = null) {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const isValid = regex.test(input.value);
    if (!isValid) {
      input.setCustomValidity("Please enter a valid email address.");
      if (errorElement) {
        errorElement.textContent = "Please enter a valid email address.";
      }
      console.log("Email validation failed");
    } else {
      input.setCustomValidity("");
      if (errorElement) {
        errorElement.textContent = "";
      }
    }
    return isValid;
  }

  validatePhoneInput(input, errorElement) {
    const regex = /^\+?\d{10,}$/;
    const isValid = regex.test(input.value);
    if (!isValid) {
      input.setCustomValidity("Please enter a valid phone number.");
      errorElement.textContent = "Please enter a valid phone number.";
    } else {
      input.setCustomValidity("");
      errorElement.textContent = "";
    }
    return isValid;
  }
  validateJobDateInput(input) {
    // Проверяем, что значение поля ввода не пустое
    if (input.value === "") {
      input.setCustomValidity("Please enter a valid date.");
      return false;
    }

    const dateRegex = /^(\d{2})\/(\d{2})\/(\d{4})$/;
    const matches = input.value.match(dateRegex);
    if (matches == null) {
      input.setCustomValidity(
        "Please enter a valid date in the format DD/MM/YYYY."
      );
      return false;
    } else {
      const day = parseInt(matches[1], 10);
      const month = parseInt(matches[2], 10) - 1; // Month is zero-based in Date object
      const year = parseInt(matches[3], 10);
      const date = new Date(year, month, day);
      if (isNaN(date.getTime())) {
        input.setCustomValidity(
          "Please enter a valid date in the format DD/MM/YYYY."
        );
        return false;
      } else {
        input.setCustomValidity("");
        return true;
      }
    }
  }

  validateJobTimeInput(input) {
    const timeRegex = /^([01]\d|2[0-3]):([0-5]\d)$/;
    const startTime = this.clientStartTimeInput.value;
    const endTime = this.clientEndTimeInput.value;
    const isValid =
      timeRegex.test(startTime) &&
      timeRegex.test(endTime) &&
      startTime < endTime;
    if (!isValid) {
      input.setCustomValidity("Please enter a valid time range.");
    } else {
      input.setCustomValidity("");
    }
    return isValid;
  }

  async submitForm() {
    const formData = new URLSearchParams();
    formData.append("address", this.clientAddress.value);
    formData.append("jobType", this.clientJobCategory.value);
    formData.append("phone", this.clientPhone.value);
    formData.append("email", this.clientEmail.value);
    formData.append("city", this.clientCity.value);
    formData.append("state", this.clientState.value);
    formData.append("zipCode", this.clientZipcode.value);
    formData.append("startDate", this.clientStartDateInput.value);
    formData.append("startTime", this.clientStartTimeInput.value);
    formData.append("endTime", this.clientEndTimeInput.value);
    formData.append("jobDescription", this.clientJobDescription.value);
    formData.append("jobSource", this.clientJobSource.value);
    formData.append("firstName", this.clientFirstNameInput.value);
    formData.append("lastName", this.clientLastNameInput.value);

    try {
      // Имитация отправки данных на сервер
      await new Promise((resolve) => setTimeout(resolve, 2000)); // Имитируем задержку в 2 секунды

      // Имитация ответа от сервера
      const response = { ok: true }; // Имитируем успешный ответ от сервера

      if (response.ok) {
        alert("Data has been updated successfully!");
        const resultContainer = document.getElementById("resultContainer");
        resultContainer.innerHTML = `
  <ul class="list-group">
  <li class="list-group-item"><b>First name</b>: ${this.clientFirstNameInput.value}</li>
  <li class="list-group-item"><b>Last name</b>: ${this.clientLastNameInput.value}</li>
  <li class="list-group-item"><b>Addres</b>: ${this.clientAddress.value}</li>
  <li class="list-group-item"><b>City</b>: ${this.clientCity.value}</li>
  <li class="list-group-item"><b>State</b>: ${this.clientState.value}</li>
  <li class="list-group-item"><b>Zipcode</b>: ${this.clientZipcode.value}</li>
  <li class="list-group-item"><b>Email</b>: ${this.clientEmail.value}</li>
  <li class="list-group-item"><b>Phone</b>: ${this.clientPhone.value}</li>
  <li class="list-group-item"><b>Job type</b>: ${this.clientJobCategory.value}</li>
  <li class="list-group-item"><b>Job source</b>: ${this.clientJobSource.value}</li>
  <li class="list-group-item"><b>Job description</b>: ${this.clientJobDescription.value}</li>
  <li class="list-group-item"><b>Start date</b>: ${this.clientStartDateInput.value}</li>
  <li class="list-group-item"><b>Start time</b>: ${this.clientStartTimeInput.value}</li>
  <li class="list-group-item"><b>End time</b>: ${this.clientEndTimeInput.value}</li>
 </ul>

        `;
      } else {
        alert("Form submission failed.");
      }
    } catch (e) {
      alert("Form submission failed.");
    }
  }
}
const form = new Form();
