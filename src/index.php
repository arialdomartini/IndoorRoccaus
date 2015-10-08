<?php
define("PLAYERFILE", "/tmp/players.txt");
if(!file_exists(PLAYERFILE))
  saveplayers(array());

$players = readplayers();


if($_POST["subscribe"]) {
  $firstname = strip_tags($_POST["firstname"]);
  $secondname = strip_tags($_POST["secondname"]);
  $phonenumber = strip_tags($_POST["phonenumber"]);
  
  $players = subscribe($players, $firstname, $secondname, $phonenumber);

  saveplayers($players);
  header("Location: /");
}

function subscribe($players, $firstname, $secondname, $phonenumber) {
  $player = array(
     "firstname" => $firstname,
     "secondname" => $secondname,
     "phonenumber" => $phonenumber);
  $players[] = $player;
  return $players;
}

function readplayers() {
  $content = file_get_contents(PLAYERFILE);
  $decoded = json_decode($content, true);
  return $decoded;
}


function saveplayers($players) {
  file_put_contents(PLAYERFILE, json_encode($players));
}





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
<table>
  <thead>
   <tr>
      <td>First name</td>
      <td>Second name</td>
      <td>Phone number</td>
   </tr>

  <thead>

<?php
foreach($players as $player):?>
   <tr>
      <td><?php echo $player["firstname"]?></td>
      <td><?php echo $player["secondname"]?></td>
      <td><?php echo $player["phonenumber"]?></td>
   </tr>
<?php
endforeach;?>

</table>
<?php

