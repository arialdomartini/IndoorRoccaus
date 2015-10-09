<?php
require_once("service.php");
header('Content-Type: application/json');
$request = json_decode(file_get_contents('php://input'), true);

$now = date("Y-m-d H:i:s", time());
$player = array(
                "id" => $request["id"],
                "registeredat" => $now,
                "firstname" => $request["firstname"],
                "secondname" => $request["secondname"],
                "phonenumber" => $request["phonenumber"]);

$tournment = read_tournament();

$result = array("result" => "");

if(count($tournment["players"]) < NUMBEROFACCEPTEDPLAYERS) {
  $tournment["players"][] = $player;
  $result["result"] = "player";
}
else {
  $tournment["waiters"][] = $player;
  $result["result"] = "waiter";
}


file_put_contents(TOURNAMENT_FILE, json_encode($tournment));

echo json_encode($result);