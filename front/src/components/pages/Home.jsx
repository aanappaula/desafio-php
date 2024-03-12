import NavBar from "../../navbar/navbar";
import { useState, useEffect } from "react";
import Form from "react-bootstrap/Form";
import Table from "react-bootstrap/Table";
import InputGroup from "react-bootstrap/InputGroup";
import Button from "react-bootstrap/Button";
import axios from "axios";

const Compra = () => {
  const [compras, setCompras] = useState([]);
  const [products, setProducts] = useState("");
  const [values, setValues] = useState([]);
  const [selectedProduct, setSelectedProduct] = useState("");
  const [amount, setAmount] = useState("");
  const [productData, setProductData] = useState({
    price: "",
    tax: "",
  });
  const [carrinhoTemporario, setCarrinhoTemporario] = useState([]);
  let sumTax = 0;
  let sumPrice = 0;

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
      const taxValue = (product.tax_value) / 100;
      const productPrice = product.price;

      const totalTax = (taxValue * amount) * 100;
      const totalPrice = productPrice * amount;
      setProductData({
        price: totalPrice,
        tax: totalTax,
      });
    }

  };

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

  useEffect(() => {
    readCompra();
    fetch("http://localhost/routes/product.php")
      .then((data) => data.json())
      .then((val) => setValues(val));
  }, []);

  function changeTax() {
    carrinhoTemporario.forEach((item) => {
      sumTax += item.tax;
    });
  }

  function changePrice() {
    carrinhoTemporario.forEach((item) => {
      sumPrice += item.total;
    });
  }

  const saveCompra = async (e) => {
    e.preventDefault();
    const response = await fetch("http://localhost/routes/product.php");
    const dbProduct = await response.json();
    const product = dbProduct.find((p) => String(p.code) === selectedProduct);
    const tax_value = (product.tax_value) / 100;
    const price = product.price;

    const totalTax = (tax_value * amount) * 100;
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

        setCarrinhoTemporario([...carrinhoTemporario, compra])
      } else {
        alert(
          `Sem estoque suficiente para essa quantidade! Digite um valor menor que ${product.amount}!`
        );
      }
    } else {
      alert("Este produto foi adicionado ao carrinho anteriormente.");
    }
  };

  const deletarCompra = (id) => {
   const newCarrinhoTemporario = carrinhoTemporario.filter((item) => item.code !==id);
   if(window.confirm('Deseja apagar esse produto?'))
   setCarrinhoTemporario(newCarrinhoTemporario);
  }
  
  changePrice();
  changeTax();

  return (
    <>
      <NavBar />
      <div className="teste">
        <div className="teste container justify-content-center row d-flex">
          <div className="col-6">
            <Form onSubmit={saveCompra}>
              <Form.Select
                className="select w-100 m-3"
                aria-label="Default select example"
                value={selectedProduct}
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
                  type="number"
                  min="1"
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
                type="submit"
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
                  <th>Tax</th>
                  <th>Total</th>
                  <th></th>
                </tr>
              </thead>
              <tbody>
                {carrinhoTemporario.map((compra) => (
                  <tr key={compra.code}>
                    <td>{compra.code}</td>
                    <td>{compra.name}</td>
                    <td>{compra.amount}</td>
                    <td> {compra.price}</td>
                    <td> {compra.tax}</td>
                    <td> {compra.total}</td>
                    <td>
                      <button
                        type="button"
                        className="btn btn-danger btn-sm"
                        size="sm"
                        onClick={() => deletarCompra(compra.code)}
                      >
                        Deletar
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </Table>
          </div>
        </div>
        <div className="totais  ms-5">
          <div className="total col-2 m-5 container justify-content-center">
          <input
                type="text"
                name=""
                value={sumTax}
                id="totaltax"
                className="form-control mb-3"
                placeholder="Total Tax"
                disabled
                readOnly
              />
              <input
                type="text"
                name=""
                value={sumPrice}
                id="totalprice"
                className="form-control mb-3"
                placeholder="Total"
                disabled
                readOnly
              />
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
