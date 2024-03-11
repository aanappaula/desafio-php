import { useState, useEffect } from "react";
import NavBar from "../../navbar/navbar";
import Form from "react-bootstrap/Form";
import Table from "react-bootstrap/Table";
import Button from "react-bootstrap/Button";


const Product = () => {
  const [products, setProducts] = useState([]);
  const [name, setName] = useState([]);
  const [amount, setAmount] = useState([]);
  const [price, setPrice] = useState([]);
  const [categories, setCategories] = useState([]);
    
  useEffect(() => {

    const fetchData = async () => {
      try {
        const response = await fetch("http://localhost/routes/category.php");
        const data = await response.json();
        setCategories(data || []); // Use an empty array if data is undefined
      } catch (error) {
        console.log("Erro ao carregar categorias", error);
      }
    };
    fetchData();
    updateTable();
  }, []);
   
  const readProduct = async () => {
    try {
      const response = await fetch("http://localhost/routes/product.php");
      const data = await response.json();
      return data;
    } catch(error) {
      console.log("Erro ao carregar produtos", error);
    }
  };

  const saveProduct = (e)=> {
    e.preventDefault();
    let data = new Form()
    data.append("name", name)
    data.append("amount", amount)
    data.append("price", price)
    data.append("categories", categories);
    fetch("http://localhost/routes/product.php", {
      method: "POST",
      body: data
    }); window.location.reload()
    console.log(products)
  };



  const updateTable = async () => {
    const dbProduct = await readProduct();
    setProducts(dbProduct);
  };

  const deletarProduct = async (id) => {
    try {
      await fetch(`http://localhost/routes/product.php?id=${id}`, {
        method: "DELETE",
      });
      if(window.confirm('Deseja apagar esse produto?'))
      updateTable();
    } catch (error) {
      console.log("Erro ao deletar produto", error);
    }
  };
 
  return (
    <>
      <NavBar />
      <div className="teste">
        <div className="teste container  justify-content-center row d-flex">
          <div className="col-6">
          <Form onSubmit={saveProduct}>
          <Form.Select className="inputSelect m-3" value={categories} size="md">
             {categories.map((category) => 
             <option  key={category.code}>{category.name}</option>
  )}
          </Form.Select>

            <Form.Control
              className="m-3"
              id="name"

              onChange={(e) => 
              setName(e.target.value)}
              value={name}
              required
              size="md"
              type="text"
              placeholder="Produto"
            />
            <Form.Control
              className="m-3"
              id="amount"
              onChange={(e) => 
              setAmount(e.target.value)}
              value={amount}
              size="md"
              type="number"
              min="1"
              placeholder="Quantidade"
            />
            <Form.Control
              className="m-3"
              id="price"

              onChange={(e) => 
              setPrice(e.target.value)}
              value={price}
              size="md"
              type="number"
              min="1"
              placeholder="Preço"
            />
            <Button
              className="inputSalvar m-3"
              as="input"
              type="submit"
              value="Adicionar"
            />{" "}
            </Form>
          </div>

          <div className="col-6">
            <Table className="m-3" bordered hover size="lg" responsive="sm">
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
              {products.map((product) => (
                  <tr key={product.code}>
                    <td>{product.code}</td>
                    <td>{product.name}</td>
                    <td>{product.amount}</td>
                    <td> {product.price}</td>
                    <td>
                      <button
                        type="button"
                        className="btn btn-danger btn-sm"
                        size="sm"
                        onClick={() => deletarProduct(product.code)}
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
      </div>
    </>
  );
}
export default Product;
