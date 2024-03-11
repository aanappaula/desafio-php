import BasicExample from "../../navbar/navbar";
import Form from "react-bootstrap/Form";
import Table from "react-bootstrap/Table";
import InputGroup from "react-bootstrap/InputGroup";
import Button from "react-bootstrap/Button";

function Home() {
  return (
    <>
      <BasicExample />
      <div className="teste">
        <div className="teste container justify-content-center row d-flex">
          <div className="col-6">
            <Form.Select className="inputSelect m-3" size="md">
              <option>Polly</option>
              <option>Uva</option>
              <option>Tv</option>
            </Form.Select>
            <InputGroup className="mb-3">
              <Form.Control
                className="m-3"
                size="md"
                type="text"
                placeholder="Amount"
              />

              <Form.Control
                className="m-3"
                size="md"
                type="number"
                readOnly
                placeholder="Preço"
              />
              <Form.Control
              
                className="m-3"
                size="md"
                type="number"
                readOnly
                placeholder="Taxa"
              />
            </InputGroup>
            <Button
              className="inputSalvar m-3"
              as="input"
              type="button"
              value="Adicionar"
            />{" "}
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
        <div className="total col-6 m-5 container justify-content-center" >
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
}
export default Home;
