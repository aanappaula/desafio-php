import BasicExample from "../../navbar/navbar";
import Form from "react-bootstrap/Form";
// import Col from "react-bootstrap/Col";
import Table from "react-bootstrap/Table";
import Button from "react-bootstrap/Button";

function Category() {
  return (
    <>
      <BasicExample />
      <div className="teste">
        <div className="teste container  justify-content-center row d-flex">
          <div className="col-6">
            <Form.Control
              className="m-3"
              size="md"
              type="text"
              placeholder="Categoria"
            />
            <Form.Control
              className="m-3"
              size="md"
              type="number"
              min="1"
              placeholder="Taxa"
            />
             <Button className="inputSalvar m-3"as="input" type="button" value="Adicionar" />{' '}
          </div>
          <div className="col-6">
            <Table
              className="m-3"
              mt-5
              bordered
              hover
              size="lg"
              responsive="sm"
            >
              <thead>
                <tr>
                  <th>Código</th>
                  <th>Categoria</th>
                  <th>Taxa</th>
                  <th></th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>1</td>
                  <td>Eletro</td>
                  <td>14</td>
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
                  <td>Food</td>
                  <td>3</td>
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
                  <td>Toys</td>
                  <td>10</td>
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
export default Category;
