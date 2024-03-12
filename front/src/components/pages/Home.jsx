import NavBar from "../../navbar/navbar";
import { useState, useEffect } from "react";
import Form from "react-bootstrap/Form";
import Table from "react-bootstrap/Table";
import InputGroup from "react-bootstrap/InputGroup";
import Button from "react-bootstrap/Button";
import axios from "axios";

const Compra = () => {
  const [compras, setCompras] = useState("");
  const [products, setProducts] = useState("");
  const [values, setValues] = useState([]);
  const [selectedProduct, setSelectedProduct] = useState("");
  const [amount, setAmount] = useState("");
  const [productData, setProductData] = useState({
    price: "",
    tax: "",
  });

  const readCompra = async () => {
    try {
      const response = await axios.get("http://localhost/routes/orders.php");
      const data = response.data;
      setCompras(data);
    } catch (error) {
      console.error(error);
    }
  };


  const showInput = async () => {
    const response = await fetch("http://localhost/routes/product.php");
    const dbProduct = await response.json();
    const product = dbProduct.find((p) => String(p.code) === selectedProduct);

    if (product) {
      const taxValue = product.tax_value;
      const productPrice = product.price;

      const totalTax = (taxValue * productPrice * amount) / 100;
      const totalPrice = productPrice * amount;
      setProductData({
        price: totalPrice.toFixed(2),
        tax: totalTax.toFixed(2),
      });
  } 
}


  useEffect(() => {
    readCompra();
    fetch("http://localhost/routes/product.php")
      .then((data) => data.json())
      .then((val) => setValues(val));
    showInput();
  }, [selectedProduct, amount]);


  const changeAmount = (event) => {
    setAmount(parseFloat(event.target.value));
  };

  const changeProduct = (event) => {
    setSelectedProduct(event.target.value);
  };



  // const saveCompra = (e) => {
  //   e.preventDefault();
  //   let data = new FormData();
  //   data.append("total", total);
  //   data.append("tax", tax);
  //   fetch("http://localhost/routes/product.php", {
  //     method: "POST",
  //     body: data,
  //   }).then(readCompra());
  //   window.location.reload();
  // };

  useEffect(() => {
    readCompra();
    fetch("http://localhost/routes/product.php")
      .then((data) => data.json())
      .then((val) => setValues(val));
  }, []);

  return (
    <>
      <NavBar />
      <div className="teste">
        <div className="teste container justify-content-center row d-flex">
          <div className="col-6">
            <Form>
              <Form.Select
                className="select w-100 m-3"
                aria-label="Default select example"
                value={products}
                onChange={changeProduct}
               
              >
                <option>Selecione um produto</option>
                {values.map((opts, i) => (
                  <option key={i} value={opts.code}>
                    {opts.name}
                  </option>
                ))}
              </Form.Select>
              <InputGroup className="mb-3">
                <Form.Control
                  className="m-3"
                  id="amount"
                  size="md"
                  type="text"
                  placeholder="Amount"
                  value={amount}
                  onChange={changeAmount}
                />

                <Form.Control
                  className="m-3"
                  id="price"
                  size="md"
                  type="number"
                  readOnly
                  value={productData.price}
                  placeholder="Preço"
                />
                <Form.Control
                  className="m-3"
                  id="tax"
                  size="md"
                  type="number"
                  readOnly
                  value={productData.tax}
                  placeholder="Taxa"
                />
              </InputGroup>
              <Button
                className="inputSalvar m-3"
                as="input"
                type="button"
                value="Adicionar"
              />{" "}
            </Form>
          </div>
          <div className="col-6">
            <Table className="m-3" responsive="sm" bordered hover size="lg">
              <thead>
                <tr>
                  <th>Código</th>
                  <th>Produto</th>
                  <th>Quantidade</th>
                  <th>Preço</th>
                  <th></th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>1</td>
                  <td>Maça</td>
                  <td>100</td>
                  <td>2</td>
                  <td>
                    {" "}
                    <button
                      type="button "
                      className="btn btn-danger btn-sm"
                      size="sm"
                    >
                      Deletar
                    </button>
                  </td>
                </tr>
                <tr>
                  <td>2</td>
                  <td>Tv</td>
                  <td>50</td>
                  <td>300</td>
                  <td>
                    {" "}
                    <button
                      type="button "
                      className="btn btn-danger btn-sm"
                      size="sm"
                    >
                      Deletar
                    </button>
                  </td>
                </tr>
                <tr>
                  <td>3</td>
                  <td>Polly</td>
                  <td>70</td>
                  <td>29</td>
                  <td>
                    {" "}
                    <button
                      type="button "
                      className="btn btn-danger btn-sm"
                      size="sm"
                    >
                      Deletar
                    </button>
                  </td>
                </tr>
              </tbody>
            </Table>
          </div>
        </div>
        <div className="teste ms-4">
          <div className="total col-6 m-5 container justify-content-center">
            <p className="ms-5">Taxa total:</p>
            <p className="ms-5">Total do carrinho:</p>

            <div className="buttonCarrinho col-8 m-5 mt-5">
              <Button
                className="inputCancel btn-secondary"
                as="input"
                type="button"
                value="Cancel"
              />{" "}
              <Button
                className="inputSalvar ms-3"
                as="input"
                type="button"
                value="Finish"
              />{" "}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Compra;
