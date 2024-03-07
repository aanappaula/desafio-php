// function filter(nome) {
//   return nome.replace(/</g, "&lt;").replace(/>/g, "&gt;");
// }

// const getLocalStorage = () =>
//   JSON.parse(localStorage.getItem("db_compra")) ?? [];
// const setLocalStorage = (dbCompra) =>
//   localStorage.setItem("db_compra", JSON.stringify(dbCompra));

const selectElement = document.getElementById("selectProducts");
selectElement.innerHTML = "<option disabled>Selecione um produto</option>";

async function getProducts() {
  const response = await fetch("http://localhost/routes/product.php");
  const categoriesList = await response.json();
  categoriesList.forEach((product) => {
    selectElement.innerHTML += `<option value="${product.code}">${product.name}</option>`;
  });
}

getProducts();

// function getProducts () {
//   var nome = JSON.parse(localStorage.getItem("db_product"));

//   var selectProducts = document.getElementById("selectProducts");

//   nome.forEach((product) => {
//     console.log(product);
//     selectProducts.innerHTML += `<option value="${product.code}">${filter(product.nome)}</option>`;
//   });
// };

const updateCompra = (index, compra) => {
  const dbCompra = readCompra();
  dbCompra[index] = compra;
  setLocalStorage(dbCompra);
};

// const readCompra = () => getLocalStorage();

const createCompra = (compra) => {
  const dbCompra = getLocalStorage();
  const products = JSON.parse(localStorage.getItem("db_product")) ?? [];

  const compraProductCode = compra.products;

  const product = products.find((c) => {
    return String(c.code) === String(compraProductCode);
  });

  if (product) {
    const newCompra = {
      ...compra,
      products: product.nome,
    };

    const pattern = /\<|\>/gm;

    if (!pattern.test(JSON.stringify(product))) {
      dbCompra.push(newCompra);
      setLocalStorage(dbCompra);
    }
  }
};
const isValidFields = () => {
  return document.getElementById("form").reportValidity();
};
const clearFields = () => {
  const fields = document.querySelectorAll(".grid-item-input");
  fields.forEach((field) => (field.value = ""));
};

const readProduct = async () => {
  const response = await fetch("http://localhost/routes/product.php");
  const data = await response.json();
  return data;
};

const showInput = async () => {
  const selectedProduct = document.getElementById("selectProducts").value;

  try {
    const response = await fetch("http://localhost/routes/product.php");
    const dbProduct = await response.json();

    const product = dbProduct.find((p) => String(p.code) === selectedProduct);

    if (product) {
      const amount = parseFloat(document.getElementById("amount").value);
      const tax_value = product.tax_value;
      const price = product.price;

      const totalTax = (tax_value * price * amount) / 100;
      const totalPrice = price * amount;

      document.getElementById("price").value = totalPrice.toFixed(2);
      document.getElementById("tax").value = totalTax.toFixed(2);
    }
  } catch (error) {
    console.error("Erro ao obter produtos do PHP:", error);
  }
};

document.getElementById("selectProducts").addEventListener("change", showInput);
document.getElementById("amount").addEventListener("input", showInput);

var carrinhoTemporario = [];

const saveCompra = async () => {
  if (isValidFields()) {
    const selectedProduct = document.getElementById("selectProducts").value;
    const response = await fetch("http://localhost/routes/product.php");
    const dbProduct = await response.json();
    const amount = parseFloat(document.getElementById("amount").value);
    const product = dbProduct.find((p) => String(p.code) === selectedProduct);
    const tax_value = product.tax_value;
    const price = product.price;

    const totalTax = (tax_value * price * amount) / 100;
    const totalPrice = price * amount;
    const totalValue = totalPrice + totalTax;
    const existingProduct = carrinhoTemporario.find(
      (item) => item.code === product.code
    );

    if (!existingProduct) {
      if (amount <= product.amount) {
        const compra = {
          code: product.code,
          name: product.name,
          price: totalPrice,
          tax: totalTax,
          amount: amount,
          total: totalValue,
        };

        createRow(compra, carrinhoTemporario.length);
        carrinhoTemporario.push(compra);

        let sumTax = 0;
        let sumPrice = 0;

        carrinhoTemporario.forEach((compra) => {
          sumTax += parseFloat(compra.totalTax);
          sumPrice += parseFloat(compra.total);
        });

        showTotal({ sumTax, sumPrice });
        clearFields();
      } else {
        alert(
          `Sem estoque suficiente para essa quantidade! Digite um valor menor que ${product.amount}!`
        );
      }
    } else {
      alert("Este produto foi adicionado ao carrinho anteriormente.");
    }
  }
};

// const atualizaEstoque = (productName, purschasedAmount) => {
//   const products = JSON.parse(localStorage.getItem("db_product"));
//   const productIndex = products.findIndex((p) => p.nome === productName);

//   if (productIndex !== -1) {
//     products[productIndex].amount -= purschasedAmount;
//     localStorage.setItem("db_product", JSON.stringify(products));
//   }
// };

document.getElementById("finish").addEventListener("click", async (e) => {
  e.preventDefault();
  sumPrice = 0;
  sumTax = 0;
  if (carrinhoTemporario.length > 0) {
    carrinhoTemporario.forEach((product) => {
      sumTax += parseFloat(product.tax);
      sumPrice += parseFloat(product.price);
    });
    const response = confirm("Deseja finalizar sua compra?");
    if (response) {
      try {
        const response = await fetch("http://localhost/routes/orders.php", {
          method: "POST",
          headers: {
            "Content-Type": "application/x-www-form-urlencoded",
          },
          body: new URLSearchParams({
            total: sumPrice,
            tax: sumTax,
          }),
        });

        const { code } = await response.json();

        carrinhoTemporario.forEach(async (product) => {
          let produto = new FormData();
          produto.append("order_code", parseInt(code));
          produto.append("product_code", product.code);
          produto.append("amount", product.amount);
          produto.append("tax", product.tax);
          produto.append("price", product.price);

          await fetch("http://localhost/routes/orderItem.php", {
            method: "POST",
            body: produto,
          });
        });

        carrinhoTemporario = [];
        updateTable();
      } catch (error) {
        console.error(error);
        alert("Deu erro");
      }
    }
  }
});

const showTotal = () => {
  let sumTax = 0;
  let sumPrice = 0;

  carrinhoTemporario.forEach((compra) => {
    sumTax += parseFloat(compra.tax);
    sumPrice += parseFloat(compra.total);
  });

  document.getElementById("totalTax").textContent =
    "Valor total da taxa: " + sumTax.toFixed(2);
  document.getElementById("totalPrice").textContent =
    "Valor total do carrinho: " + sumPrice.toFixed(2);
};

const createRow = (compra, index) => {
  const newRow = document.createElement("tr");
  // const unitPrice = getProductUitPrice(compra.products);
  // const productTax = getProductTax(compra.products);
  // const totalTax = (productTax * unitPrice * compra.amount) / 100;

  // const totalPrice = unitPrice * compra.amount;
  // const totalValue = totalPrice + totalTax;
  // console.log(totalPrice, totalTax);

  newRow.innerHTML = `
          <td>${compra.name}</td>         
          <td>${compra.price}</td>
          <td>${compra.tax}</td>
          <td>${compra.amount}</td>
          <td>${compra.total}</td> 
          
          <td><button id="excluir-${index}" type="button" style="word-break: keep-all">Delete</button></td>
`;
  document.querySelector("#tableCompra>tbody").appendChild(newRow);
  newRow.addEventListener("click", () => removeRow(newRow));
};

const getProductUitPrice = (productCode) => {
  const products = JSON.parse(localStorage.getItem("db_product")) ?? [];
  const product = products.find((p) => p.code == productCode);
  return product ? product.unitPrice : "N/A";
};

const getProductTax = (productCode) => {
  const products = JSON.parse(localStorage.getItem("db_product")) ?? [];
  const product = products.find((p) => p.code == productCode);
  return product ? product.tax : 0;
};

const clearTable = () => {
  const rows = document.querySelectorAll("#tableCompra>tbody tr");
  rows.forEach((row) => row.parentNode.removeChild(row));
};

const updateTable = () => {
  // const dbCompra = readCompra();
  clearTable();
  showTotal();
};

const removeRow = (row) => {
  const response = confirm(
    "Deseja realmente excluir esse produto do carrinho?"
  );
  if (response) {
    row.remove();
    updateCompra();
    showTotal();
  }
};

const cancelCompra = () => {
  const response = confirm("Deseja realmente cancelar o seu carrinho?");
  if (response);
  carrinhoTemporario = [];
  updateTable();
};

updateTable();

document.getElementById("salvar").addEventListener("click", saveCompra);
document.getElementById("cancel").addEventListener("click", cancelCompra);
