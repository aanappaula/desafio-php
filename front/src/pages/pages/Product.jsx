import NavBar from "../../navbar/navbar";
import FormProd from "../../components/Product/form";
import TableProd from "../../components/Product/table";
import Container from 'react-bootstrap/Container';

const Product = () => {
  return (
    <>
      <NavBar />
      <Container>
      <div className="teste">
        <div className="teste container  justify-content-center row d-flex">
          <div className="col-6">
            <FormProd/>
          </div>
          <div className="col-6">
          <TableProd/>
          </div>
        </div>
      </div>
      </Container>
    </>
  );
}
export default Product;