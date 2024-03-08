import BasicExample from "../../navbar/navbar";
import Form from "react-bootstrap/Form";
import Table from "react-bootstrap/Table";
import Button from "react-bootstrap/Button";

function Product() {
  return (
    <>
      <BasicExample />
      <div className="teste">
      <div className="teste container  justify-content-center row d-flex">
        <div  className="col-6">
          <Form.Select className="inputSelect m-3" size="md">
            <option>Food</option>
            <option>Eletro</option>
            <option>Toys</option>
          </Form.Select>
          <Form.Control
            className="m-3"
            size="md"
            type="text"
            placeholder="Produto"
          />
          
          <Form.Control
            className="m-3"
            size="md"
            type="number"
            min="1"
            placeholder="Preço"
          />
          <Form.Control
            className="m-3"
            size="md"
            type="number"
            min="1"
            placeholder="Quantidade"
          />

<Button className="inputSalvar m-3"as="input" type="button" value="Adicionar" />{' '}
        </div>
        <div  className="col-6">
          <Table className="m-3" bordered hover size="lg"  >
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
      </div>
    </>
  );
}
export default Product;
