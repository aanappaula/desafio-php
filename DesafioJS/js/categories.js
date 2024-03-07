// const getLocalStorage = () =>
//   JSON.parse(localStorage.getItem("db_category")) ?? [];
// const setLocalStorage = (dbCategory) =>
//   localStorage.setItem("db_category", JSON.stringify(dbCategory));

// const deleteCategory = (index) => {
//   const dbCategory = readCategory();
//   dbCategory.splice(index, 1);
//   setLocalStorage(dbCategory);
// };

// const updateCategory = (index, category) => {
//   const dbCategory = readCategory();
//   dbCategory[index] = category;
//   setLocalStorage(dbCategory);
// };

const categoryForm = document.getElementById("form");

const readCategory = async () => {
  const response = await fetch("http://localhost/routes/category.php");
  const data = await response.json();
  return data;
};

function createCategory() {
  categoryForm.addEventListener("submit", async (event) => {
    event.preventDefault();
    const data = new FormData(categoryForm);
    try {
      const res = await fetch(
        "http://localhost/routes/category.php",
        {
          method: "POST",
          body: data,
        },
        window.location.reload()
      );
    } catch (error) {
      console.log("não foi possível adicionar");
    }
  });
}

const isValidFields = () => {
  return document.getElementById("form").reportValidity();
};

const clearFields = () => {
  const fields = document.querySelectorAll(".grid-item-input");
  fields.forEach((field) => (field.value = ""));
};

const saveCategory = () => {
  if (isValidFields() && checkChar()) {
    const code = Math.floor(Math.random() * 1000) + 1;
    const category = {
      code: code,
      nome: document
        .getElementById("nome")
        .value.replace(/</g, "&lt;")
        .replace(/>/g, "&gt;"),
      tax: document
        .getElementById("tax")
        .value.replace(/</g, "&lt;")
        .replace(/>/g, "&gt;"),
    };

    createCategory(category);
    updateTable();
    clearFields();
  }
};

function checkChar() {
  const inputElement = document.getElementById("nome");
  const char = inputElement.value.trim();

  const pattern = /^[a-zA-Z0-9\s]*$/; // Apenas letras, números e espaços

  if (!pattern.test(char)) {
    alert("O nome da categoria não pode conter caracteres especiais.");
    return false;
  }

  return true;
}

// function filter(nome) {
//   return nome.replace(/</g, "&lt;").replace(/>/g, "&gt;");
// }

const createRow = (category, index) => {
  const newRow = document.createElement("tr");
  newRow.innerHTML = `
          <td>${category.code}</td>
          <td>${category.name}</td>
          <td>${category.tax}</td>
          <td><button  onclick="deletarCategory(${category.code})" type="button" style="word-break: keep-all">Delete</button></td>
`;
  document.querySelector("#tableCategory>tbody").appendChild(newRow);
};

const clearTable = () => {
  const rows = document.querySelectorAll("#tableCategory>tbody tr");
  rows.forEach((row) => row.parentNode.removeChild(row));
};

const updateTable = async () => {
  clearTable();

  const dbCategory = await readCategory();

  dbCategory.forEach((category, index) => {
    createRow(category, index);
  });
};

const deletarCategory = async (id) => {
  await fetch(`http://localhost/routes/category.php?id=${id}`, {
    method: "DELETE",
  });
  window.location.reload();
};

updateTable();

document
  .querySelector("#tableCategory>tbody")
  .addEventListener("click", deletarCategory);
