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
// $connection = null;

$inputs = evaluateInput(json_decode(file_get_contents('php://input')));

try {
    $connection = new PDO("mysql:host=$hostname;dbname=$database", $username, $password);
} catch (PDOException $pe) {
    $answer->message = "database error";
}

$insertStatement = "INSERT INTO boats (boatName, info, photo) VALUES (?, ?, ?)";
try {
    $connection->prepare($insertStatement)->execute([$inputs->boatName, $inputs->info, $inputs->photo]);
} catch (PDOException $pe) {
    $answer->message = "database error";
}

$answer->message = "successfully set new boat";
$newBoat = new stdClass();
$newBoat->boatName = $inputs->boatName;
$answer->boat = $newBoat;

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