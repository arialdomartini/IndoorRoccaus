<form action="" method="POST">
  <label for="firsstname">First name</label>
  <input name="firstname" />
  <label for="secondname">Second name</label>
  <input name="secondname" />
  <label for="phonenumber">Phone number</label>
  <input name="phonenumber" />
  <input name="subscribe" type="submit" value="subscribe"/>
</form>
<?php
   if($_POST["subscribe"]) {
     $firstname = strip_tags($_POST["firstname"]);
     $secondname = strip_tags($_POST["secondname"]);
     $phonenumber = strip_tags($_POST["phonenumber"]);

     subscribe($firstname, $secondname, $phonenumber);
   }

   function subscribe($firstname, $secondname, $phonenumber) {
     echo "Subscribing $firstname";
   }