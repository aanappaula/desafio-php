import NavBar from "../../navbar/navbar";
import FormCat from "../../components/Category/form";
import TableCat from "../../components/Category/table";
import Container from "react-bootstrap/Container";

const Category = () => {
  return (
    <>
      <NavBar />
      <Container>
        <div className="teste">
          <div className="teste container  justify-content-center row d-flex">
            <div className="col-6">
              <FormCat />
            </div>
            <div className="col-6">
              <TableCat />
            </div>
          </div>
        </div>
      </Container>
    </>
  );
};
export default Category;
