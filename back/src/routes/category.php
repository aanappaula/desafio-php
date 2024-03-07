<?php

header ('Access-Control-Allow-Origin: *');
header ('Access-Control-Allow-Methods: GET, POST, DELETE');
header ('Access-Control-Allow-Headers: X-Requested-With');
header ('Access-Control-Allow-Credentials: true');

include "../services/categoryServices.php";
 
if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    echo 'Criar categoria <br/>';
 
    $name = filter_var($_POST["name"], FILTER_SANITIZE_SPECIAL_CHARS);
    $tax = filter_var($_POST["tax"]);
 
    $result = createCategory($name, $tax);
    echo $result;
}
 
if ($_SERVER['REQUEST_METHOD'] === 'GET') {
    $data = readCategories();
    echo json_encode($data);
}
 
if ($_SERVER['REQUEST_METHOD'] === 'DELETE') {
    $toBeDeleted = $_GET['id'];
    $data = deleteCategory($toBeDeleted);
    echo "apagado com sucesso, {$data}";
};
?>