import { useEffect, useState } from "react";
import NavBar from "../../navbar/navbar";
import Table from "react-bootstrap/Table";
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";


function History() {
  const [compras, setCompras] = useState([]);
  const [orderItems, setOrderItems] = useState([]);
  const [show, setShow] = useState(false);
  const [details, setDetails] = useState([]);
  const handleClose = () => setShow(false);
  
  const showDetails = (id) => {
    setShow(true);
    let data = orderItems.filter((item) => item.order_code == id);
    setDetails(data)

  }

  
  useEffect(() => {
    const fetchCompras = async () => {
      try {
        const response = await fetch("http://localhost/routes/orders.php");
        const data = await response.json();
        setCompras(data);
      } catch (error) {
        console.error("Erro ao buscar compras:", error);
      }
    };

    fetchCompras();
  }, []);

  useEffect(() => {
    const readItem = async () => {
      try {
        const response = await fetch("http://localhost/routes/orderItem.php");
        const data = await response.json();
        setOrderItems( await data);
      } catch (error) {
        console.error(error);
      }
      console.log(orderItems)
    };
    readItem();
  }, []);

  return (
    <>
      <NavBar />
      <div className="teste container justify-content-center row d-flex">
        <div className="col-6">
          <Table className="m-3" bordered hover size="lg" responsive="sm">
            <thead>
              <tr>
                <th>Código</th>
                <th>Total</th>
                <th>Tax</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {compras?.map((item) => (
                <tr key={item.code}>
                  <td>{item.code}</td>
                  <td>{item.total}</td>
                  <td>{item.tax}</td>
                  <td>
                    <Button
                      variant="success"
                      onClick={() => showDetails(item.code)}
                    >
                      View
                    </Button>
                  </td>
                </tr>
              ))}
              <Modal
                show={show}
                onHide={handleClose}
                dialogClassName="modal-90w"
                aria-labelledby="example-custom-modal-styling-title"
              >
                <Modal.Header closeButton>
                  <Modal.Title id="example-custom-modal-styling-title">
                    Detalhe da Compra
                  </Modal.Title>
                </Modal.Header>
                <Modal.Body>
                  <Table className="" bordered hover size="lg" responsive="sm">
                    <thead>
                      <tr>
                        <th>Código</th>
                        <th>Código do Produto</th>
                        <th>Quantidade</th>
                        <th>Preço</th>
                        <th>Taxa</th>
                      </tr>
                    </thead>
                    <tbody>
                      {details?.map((element) => (
                            <tr key={element.code}>
                              <td>{element.code}</td>
                              <td>{element.product_code}</td>
                              <td>{element.amount}</td>
                              <td> {element.price}</td>
                              <td> {element.tax}</td>
                            </tr>
                          ))}
                    </tbody>
                  </Table>
                </Modal.Body>
              </Modal>
            </tbody>
          </Table>
        </div>
      </div>
    </>
  );
}
export default History;
