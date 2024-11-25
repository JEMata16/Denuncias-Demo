document
  .getElementById("denunciaForm")
  .addEventListener("submit", function (event) {
    event.preventDefault();
    //validateSelection();
    mostrarDatosEnTabla();
    mostrarModal();
  });

// Lista de categorías para el dropdown
const categories = ["Actos terroristas", "Circulación de moneda falsa", "Cohecho", "Contrabando", "Corrupción", 
  "Conflicto de intereses","Fraude", "Corrupción", "Abuso de Poder", "Lavado de dinero", "Otros"];

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

// Función para mostrar los datos enviados en una tabla
function mostrarDatosEnTabla() {
  const tablaContainer = document.getElementById("tabla-container");

  // Verifica si el contenedor existe en el DOM
  if (!tablaContainer) {
    console.error("El contenedor para la tabla no existe en el DOM.");
    return;
  }

  // Crear la tabla solo si no existe
  let tabla = document.getElementById("tablaDenuncias");
  if (!tabla) {
    tabla = document.createElement("table");
    tabla.id = "tablaDenuncias";
    tabla.innerHTML = `
      <thead>
        <tr>
          <th>Nombre</th>
          <th>Apellidos</th>
          <th>Cédula</th>
          <th>Teléfono</th>
          <th>Correo Electrónico</th>
          <th>Descripción</th>
          <th>Categorías</th>
          <th>Evidencia</th>
        </tr>
      </thead>
      <tbody></tbody>
    `;
    tablaContainer.appendChild(tabla); // Agregar la tabla al contenedor
  }

  const form = document.getElementById("denunciaForm");
  const formData = new FormData(form);

  // Obtener valores del formulario
  const nombre = formData.get("nombre");
  const apellidos = formData.get("apellidos");
  const cedula = formData.get("cedula");
  const telefono = formData.get("telefono");
  const correo = formData.get("correo");
  const descripcion = formData.get("descripcion");

  // Obtener categorías seleccionadas
  const categoriasSeleccionadas = Array.from(
    document.querySelectorAll(".category-checkbox:checked")
  )
    .map((checkbox) => checkbox.value)
    .join(", ");

  // Obtener imágenes cargadas
  const fileInput = document.getElementById("images");
  const files = fileInput.files; // Obtén los archivos directamente del input
  let imagenesHTML = "";

  if (files.length > 0) {
    for (const file of files) {
      const url = URL.createObjectURL(file);
      imagenesHTML += `<img src="${url}" alt="Imagen" width="100" style="margin: 5px;">`;
    }
  } else {
    imagenesHTML = "Sin imágenes";
  }

  // Crear una fila con los datos
  const fila = document.createElement("tr");
  fila.innerHTML = `
    <td>${nombre}</td>
    <td>${apellidos}</td>
    <td>${cedula}</td>
    <td>${telefono}</td>
    <td>${correo}</td>
    <td>${descripcion}</td>
    <td>${categoriasSeleccionadas}</td>
    <td>${imagenesHTML}</td>
  `;

  // Agregar la fila a la tabla
  tabla.querySelector("tbody").appendChild(fila);

  // Limpiar el formulario
  form.reset();
}




// Función para mostrar el modal
function mostrarModal() {
  const modal = document.getElementById("modal");
  modal.style.display = "block";
}

document.getElementById("cerrar-modal").addEventListener("click", () => {
  modal.style.display = "none";
});