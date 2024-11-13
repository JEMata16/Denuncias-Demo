document
  .getElementById("denunciaForm")
  .addEventListener("submit", function (event) {
    event.preventDefault();
    validateSelection();
    alert("Formulario enviado");
  });

// Lista de categorías para el dropdown
const categories = ["Fraude", "Corrupción", "Abuso de Poder", "Discriminación"];

// Función para renderizar las opciones de categorías
function renderCategories() {
  const categoryOptionsContainer = document.getElementById("category-options");

  categories.forEach((category) => {
    const label = document.createElement("label");
    label.innerHTML = `<input type="checkbox" class="category-checkbox" value="${category}"><span> ${category}</span>`;
    categoryOptionsContainer.appendChild(label);
  });
}

// Llamamos a la función para llenar las opciones cuando la página carga
renderCategories();

// Función para validar la selección de categorías
function validateSelection() {
  const selectedCategories = document.querySelectorAll(
    ".category-checkbox:checked"
  );
  const errorMessage = document.getElementById("error-message");

  if (selectedCategories.length === 0) {
    errorMessage.style.display = "block";
  } else {
    errorMessage.style.display = "none";
    alert(
      "Categorías seleccionadas: " +
        Array.from(selectedCategories)
          .map((option) => option.value)
          .join(", ")
    );
    // Aquí podrías enviar los datos o continuar con el flujo de tu aplicación
  }
}

// Drag and drop events
const dropContainer = document.getElementById("dropcontainer");
const fileInput = document.getElementById("images");

dropContainer.addEventListener(
  "dragover",
  (e) => {
    // prevent default to allow drop
    e.preventDefault();
  },
  false
);

dropContainer.addEventListener("dragenter", () => {
  dropContainer.classList.add("drag-active");
});

dropContainer.addEventListener("dragleave", () => {
  dropContainer.classList.remove("drag-active");
});

dropContainer.addEventListener("drop", (e) => {
  e.preventDefault();
  dropContainer.classList.remove("drag-active");
  fileInput.files = e.dataTransfer.files;
});

// Validación de teléfono
const telefonoInput = document.getElementById("telefono");

telefonoInput.addEventListener("input", () => {
  telefonoInput.value = telefonoInput.value.replace(/[a-zA-Z]/g, "");
  const value = telefonoInput.value;
  if (value.length > 8 || !/^[0-9]+$/.test(value)) {
    telefonoInput.setCustomValidity(
      "Ingrese un número de teléfono de 8 dígitos"
    );
  } else {
    telefonoInput.setCustomValidity("");
  }
});

// Validación de cedula
function formatCedula(input) {
  const value = input.value.replace(/[a-zA-Z]/g, "");
  const formattedValue = value.replace(/(\d)(\d{4})(\d{4})/, "$1-$2-$3");
  input.value = formattedValue;
}
