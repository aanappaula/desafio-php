const readCompra = async () => {
  const response = await fetch("http://localhost/routes/orders.php");
  const data = await response.json();
  return data;
};

const createRow = (item) => {
  const tableBody = document.querySelector(".table tbody");
  const newRow = document.createElement("tr");

  newRow.innerHTML = `
        <td>${item.code}</td>
        <td>${item.tax}</td>
        <td>$${item.total}</td>
        <td><button type="button"> <a href="compraDetail.html?code=${item.code}"">View</a></button></td>
    `;

  tableBody.appendChild(newRow);
};

const updateTable = async () => {
  const order = await readCompra();
  order.forEach((order, index) => {
    createRow(order, index);
  });
};

updateTable();
