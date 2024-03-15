<?php

header ('Access-Control-Allow-Origin: *');
header ('Access-Control-Allow-Methods: GET, POST, DELETE');
header ('Access-Control-Allow-Headers: X-Requested-With');
header ('Access-Control-Allow-Credentials: true');

include "../services/registrationServices.php";
 
if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    echo 'Criar user <br/>';
 
    $username = filter_var($_POST["user_name"], FILTER_SANITIZE_SPECIAL_CHARS);
    $pass = filter_var($_POST["password"]);
 
    $result = createUsers($username, $pass);
    echo $result;
}
 
if ($_SERVER['REQUEST_METHOD'] === 'GET') {
    $data = readUsers();
    echo json_encode($data);
}
 
if ($_SERVER['REQUEST_METHOD'] === 'DELETE') {
    $toBeDeleted = $_GET['id'];
    $data = deleteUsers($toBeDeleted);
    echo "apagado com sucesso, {$data}";
};
?>