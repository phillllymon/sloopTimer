<?php

header('Content-Type: application/json; charset=utf-8');
header("Access-Control-Allow-Origin: *");

$hostname = "localhost";
$username = "u906128965_boater";
$password = "BoatyMcBoatFace2500!";
$database = "u906128965_boats";

$answer = new stdClass();

$answer->message = null;
$answer->value = null;

// *** NOTE: use this when you start dividing into multiple databases of boats ***
// $inputs = evaluateInput(json_decode(file_get_contents('php://input')));

try {
    $connection = new PDO("mysql:host=$hostname;dbname=$database", $username, $password);
} catch (PDOException $pe) {
    $answer->message = "database error";
}

$getStatement = "SELECT * FROM boats";

try {
    $queryObj = $connection->prepare($getStatement);
    $queryObj->execute([]);
    $existingValues = $queryObj->fetchAll();
} catch (PDOException $pe) {
    $answer->message = "database error";
}

$answer->message = "successfully retrieved boats";
$answer->boats = $existingValues;

// ---- end ----
echo json_encode($answer);

// ---- helpers below ----
function evaluateInput($data) {
    // make sure mode is POST
    if ($_SERVER["REQUEST_METHOD"] == "POST") {
        // SUCCESS
        $usefulInput = new stdClass();
        $usefulInput->boatName = $data->boatName;
        $usefulInput->info = $data->info;
        $usefulInput->photo = $data->photo;

        return $usefulInput;
    } else {
        echo "request mode must be POST";
        die();
    }
}

function checkTypes($valueTypePair) {
    foreach($valueTypePair as $pair) {
        if (!gettype($pair[0] !== $pair[1])) {
            return false;
        }
    }
    return true;
}

?>