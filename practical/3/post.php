<h1>With Ajax</h1>
<?php
$array = $_POST['data'];
for ($i = 0; $i < count($array); $i++)
{
    echo "<hr></hr>";
    $info = $array[$i];
    $name = $info['name'];
    $email = $info['email'];
    $username = $info['username'];
    echo "<div> Hi,".$name."</div>";
    echo "<div>Your email is: ".$email."</div>";
    echo "<div>Your username is: ".$username."</div>";
}
?>
