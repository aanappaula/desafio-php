const productForm = document.getElementById("form")

const readProduct = async () => {
  const response = await fetch("http://localhost/routes/product.php");
  const data = await response.json();
  return data;
};


const selectElement = document.getElementById("selectCategories");
selectElement.innerHTML = "<option disabled>Selecione uma categoria</option>";


async function getCategories() {
  const response = await fetch("http://localhost/routes/category.php");
  const categoriesList = await response.json();
  categoriesList.forEach((category) => {
    selectElement.innerHTML += `<option value="${category.code}">${category.name}</option>`;
  });
}
 
getCategories();

// const getLocalStorage = () =>
//   JSON.parse(localStorage.getItem("db_product")) ?? [];
// const setLocalStorage = (dbProduct) =>
//   localStorage.setItem("db_product", JSON.stringify(dbProduct));

// const deleteProduct = (index) => {
//   const dbProduct = readProduct();
//   dbProduct.splice(index, 1);
//   setLocalStorage(dbProduct);
// };

// const updateProduct = (index, product) => {
//   const dbProduct = readProduct();
//   dbProduct[index] = product;
//   setLocalStorage(dbProduct);
// };


function createProduct() {
  productForm.addEventListener("submit", async (event) => {
    event.preventDefault();
    const data = new FormData(productForm);
    try {
      const res = await fetch(
        "http://localhost/routes/product.php",
        {
          method: "POST",
          body: data,
        },
        window.location.reload()
      );
    } catch (error) {
      console.log("não foi possível adicionar");
    }

    // if (category) {
    //   const newProduct = {
    //     ...product,
    //     tax: category.tax,
    //     categories: category.name,
    //   };

    //   dbProduct.push(newProduct);
    //   setLocalStorage(dbProduct);
    // }
  });
}

// const dbProduct = getLocalStorage();
// const categories = JSON.parse(localStorage.getItem("db_category")) ?? [];

// const productCategoryCode = product.categories;

// const category = categories.find((c) => {
//   return String(c.code) === String(productCategoryCode);
// });

const isValidFields = () => {
  return document.getElementById("form").reportValidity();
};

const clearFields = () => {
  const fields = document.querySelectorAll(".grid-item-input");
  fields.forEach((field) => (field.value = ""));
};

// const saveProduct = () => {
//   if (isValidFields() && checkChar()) {
//     const code = Math.floor(Math.random() * 1000) + 1;
//     const product = {
//       code: code,
//       nome: document.getElementById("nome").value,
//       amount: document.getElementById("amount").value,
//       unitPrice: document.getElementById("unitPrice").value,
//       categories: document.getElementById("selectCategories").value,
//     };
//     createProduct(product);
//     updateTable();
//     clearFields();
//   }
// };

// function checkChar() {
//   const inputElement = document.getElementById("nome");
//   const char = inputElement.value.trim();

//   const pattern = /^[a-zA-Z0-9\s]*$/; // Apenas letras, números e espaços

//   if (!pattern.test(char)) {
//     alert("O nome do produto não pode conter caracteres especiais.");
//     return false;
//   }

//   return true;
// }

// window.onload = function () {
//   document
//     .getElementById("amount")
//     .addEventListener("keydown", function (event) {
//       if (!Math.sign(event.key)) {
//         event.preventDefault();
//       }
//     });
//   document
//     .getElementById("unitPrice")
//     .addEventListener("keydown", function (event) {
//       if (!Math.sign(event.key)) {
//         event.preventDefault();
//       }
//     });
// };

// function filter(nome) {
//   return nome.replace(/</g, "&lt;").replace(/>/g, "&gt;");
// }

const createRow = (product, index) => {
  const newRow = document.createElement("tr");
  newRow.innerHTML = `
          <td>${product.code}</td>
          <td>${product.name}</td>
          <td>${product.amount}</td>
          <td>${product.price}</td>
          <td>${product.category_name}</td>
          <td><button onclick="deletarProduct(${product.code})" type="button" style="word-break: keep-all">Delete</button></td>
`;
  document.querySelector("#tableProduct>tbody").appendChild(newRow);
};

const clearTable = () => {
  const rows = document.querySelectorAll("#tableProduct>tbody tr");
  rows.forEach((row) => row.parentNode.removeChild(row));
};

const updateTable = async () => {
  clearTable();

  const dbProduct = await readProduct();

  dbProduct.forEach((product, index) => {
    createRow(product, index);
  });
};

const deletarProduct = async (id) => {
  await fetch(`http://localhost/routes/product.php?id=${id}`, {
    method: "DELETE",
  });
  window.location.reload();
};


updateTable();

// document.getElementById("salvar").addEventListener("click", saveProduct);
// document
//   .querySelector("#tableProduct>tbody")
//   .addEventListener("click", deletarProduct);
