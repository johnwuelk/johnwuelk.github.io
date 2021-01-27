<html>
<head>
	<meta http-equiv="content-type" content="text/html; charset=utf-8">
	
	<link href="https://fonts.googleapis.com/css?family=Space+Mono" rel="stylesheet">
	<link href="https://fonts.googleapis.com/css?family=Kaushan+Script" rel="stylesheet">
	
	<!-- Animate.css -->
	<link rel="stylesheet" href="css/animate.css">
	<!-- Icomoon Icon Fonts-->
	<link rel="stylesheet" href="css/icomoon.css">
	<!-- Bootstrap  -->
	<link rel="stylesheet" href="css/bootstrap.css">

	<!-- Theme style  -->
	<link rel="stylesheet" href="css/style.css">

	<!-- Modernizr JS -->
	<script src="js/modernizr-2.6.2.min.js"></script>
	<!-- FOR IE9 below -->
	<!--[if lt IE 9]>
	<script src="js/respond.min.js"></script>
	<![endif]-->
	<style type="text/css">
			#contactform {
					position: absolute;
					top: 25%;
					left: 25%;
					font-size: large;
				}
				
				/*auf allen gängigen mobilgeräten außer ipad...*/
			@media (min-device-width: 340px) and (max-device-width: 420px) {
				#contactform
				{
					font-size: xx-large;
					padding: 0% 25% 0% 10%
				}
			}	
	</style>
</head>
<body>
<div id="contactform">
<? 
// This is the begiinning of the PHP code 

#####################################################################
#                                                                   #
#              Contact Form Generator                               #
#              by Robert Packer                                     #
#              rob_packer@yahoo.com                                 #
#              Don't forget to vote at hotscripts.com               #
#              http://www.hotscripts.com/Detailed/30983.html        #
#              I also subcontract larger projects                   #
#                                                                   #
#####################################################################

$name     = $_POST['name'];
$address  = $_POST['address'];
$state    = $_POST['state'];
$city     = $_POST['city'];
$zip      = $_POST['zip'];
$country  = $_POST['country'];
$phone    = $_POST['phone'];
$email    = $_POST['email'];
$message = $_POST['message'];
$fax      = $_POST['fax'];
$error_msg = "";
$msg = "";

if(!$name){
	$error_msg .= "Your name \n";
}
if($name){
	$msg .= "Name: \t $name \n";
}

if(!$email){
	$error_msg .= "Your email \n";
}
if($email){
	if(!eregi("^[a-zA-Z0-9_\.\-]+@[a-zA-Z0-9\._\-]+\.[a-zA-Z]{2,4}", $email)){
		echo "\n<br>That is not a valid email address.  <br>Please <a href=\"javascript:history.back()\"><b><u>return</u></b></a> and try again.\n<br>";
		exit;
	}			
	$msg .= "Email: \t $email \n";
}
 
if(!trim($message)){
	$error_msg .= "Your message \n";
}
if($message){
	$msg .= "Message: \t $message \n";
}
$sender_email="";

if(!isset($name)){
	if($name == ""){
		$sender_name="Web Customer";
	}
}else{
	$sender_name=$name;
}
if(!isset($email)){
	if($email == ""){
		$sender_email="Customer@website.com";
	}
}else{
	$sender_email=$email;
}
if($error_msg != ""){
	echo "You didn't fill in these required fields:<br>"
	.nl2br($error_msg) .'<br>Please <a href="javascript:history.back()"><b><u>return</u></b></a> and try again.';
	exit;
}
$mailheaders  = "MIME-Version: 1.0\r\n";
$mailheaders .= "Content-type: text/plain; charset=utf-8\r\n";
$mailheaders .= "From: $sender_name <$sender_email>\r\n";
$mailheaders .= "Reply-To: $sender_email <$sender_email>\r\n"; 
mail("johnwuelk@yahoo.de","JohnWulk Business",stripslashes($msg), $mailheaders);
echo "<html>\n<head>\n<title>Thanks For Your Submission</title>\n</head>\n<body>\n<h2>Thank you for your feedback $name</h2>\n";echo '<b>This is the information you submitted</b>'."<br>\n";
echo nl2br(stripslashes($msg));
echo '<br><br></body></html>';
//This is the end of the PHP code
?>
</div>
</body>