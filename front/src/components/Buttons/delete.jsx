// import { useState, useEffect } from "react";
// import axios from "axios";

// function ButtonDelete() {
//     const [categories, setCategories] = useState([]);

//     useEffect(() => {
//       readCategory();
//     }, []);
  
//     const readCategory = async () => {
//       try {
//         const response = await axios.get("http://localhost/routes/category.php");
//         const data = response.data;
//         setCategories(data);
//       } catch (error) {
//         console.log("Erro ao carregar categorias", error);
//       }
//     };
//     const deletarCategory = async (id) => {
//       try {
//         await fetch(`http://localhost/routes/category.php?id=${id}`, {
//           method: "DELETE",
//         });
//         if (window.confirm("Deseja apagar esse produto?"))
//           window.location.reload();
//       } catch (error) {
//         console.log("Erro ao excluir categoria", error);
//       }
//     };


//   return (
//     <button
//       type="button"
//       className="btn btn-danger btn-sm"
//       size="sm"
//       onClick={() => deletarCategory(category.code)}
      
//     >
//       Deletar
//     </button>
//   );
// }

// export default ButtonDelete;