<?php
define("PLAYERFILE", "/tmp/players.txt");
define("NUMBEROFACCEPTEDPLAYERS", 16);

if(!file_exists(PLAYERFILE))
  saveplayers(array());

$players = readplayers();

if($_POST["subscribe"]) {
  $firstname = strip_tags($_POST["firstname"]);
  $secondname = strip_tags($_POST["secondname"]);
  $phonenumber = strip_tags($_POST["phonenumber"]);

  if($firstname != "" && $secondname != "" && $phonenumber != "") {
    
    $players = subscribe($players, $firstname, $secondname, $phonenumber);
    saveplayers($players);
    
    header("Location: /");
  }
}

function subscribe($players, $firstname, $secondname, $phonenumber) {
  $players[] = array(
     "firstname" => $firstname,
     "secondname" => $secondname,
     "phonenumber" => $phonenumber);
  return $players;
}

function readplayers() {
  return json_decode(file_get_contents(PLAYERFILE), true);
}

function saveplayers($players) {
  file_put_contents(PLAYERFILE, json_encode($players));
}

$realplayers = array_slice($players, 0, NUMBEROFACCEPTEDPLAYERS);
$waitinglistplayers = array_slice($players, NUMBEROFACCEPTEDPLAYERS);
?>
<form action="" method="POST">
  <label for="firsstname">First name</label>
  <input name="firstname" />
  <label for="secondname">Second name</label>
  <input name="secondname" />
  <label for="phonenumber">Phone number</label>
  <input name="phonenumber" />
  <input name="subscribe" type="submit" value="subscribe"/>
</form>
<h1>List</h1>
<table>
  <thead>
   <tr>
      <td>First name</td>
      <td>Second name</td>
      <td>Phone number</td>
   </tr>
  <thead>
<?php
foreach($realplayers as $player):?>
   <tr>
      <td><?php echo $player["firstname"]?></td>
      <td><?php echo $player["secondname"]?></td>
      <td><?php echo $player["phonenumber"]?></td>
   </tr>
<?php
endforeach;?>
</table>

<h1>Waiting List</h1>
<table>
  <thead>
   <tr>
      <td>First name</td>
      <td>Second name</td>
      <td>Phone number</td>
   </tr>
  <thead>
<?php
foreach($waitinglistplayers as $player):?>
   <tr>
      <td><?php echo $player["firstname"]?></td>
      <td><?php echo $player["secondname"]?></td>
      <td><?php echo $player["phonenumber"]?></td>
   </tr>
<?php
endforeach;?>
</table>