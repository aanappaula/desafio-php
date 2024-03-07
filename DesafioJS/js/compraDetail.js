const readItem = async () => {
  const response = await fetch("http://localhost/routes/orderItem.php");
  const data = await response.json();
  return data;
};


const createRow = (element) => {
  const tableBody = document.querySelector(".table tbody");
  const newRow = document.createElement("tr");
  newRow.innerHTML = `
     
        <td>${element.product_code}</td>
        <td>${element.amount}</td>
        <td>$${element.price}</td>
        <td>${element.tax}</td>
    `;
  tableBody.appendChild(newRow);
};
 
const updateTable = async () => {
  const orderItem = await readItem();
  const queryString = window.location.search;
  const urlParams = new URLSearchParams(queryString);
  console.log(urlParams.get("code"));
  console.log(orderItem);
 
  orderItem.forEach((element) => {
    if (element.order_code == urlParams.get("code")) {
      createRow(element);
      return;
    }
  });
};
 
updateTable();