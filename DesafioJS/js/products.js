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
  });
}

const isValidFields = () => {
  return document.getElementById("form").reportValidity();
};

const clearFields = () => {
  const fields = document.querySelectorAll(".grid-item-input");
  fields.forEach((field) => (field.value = ""));
};


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
