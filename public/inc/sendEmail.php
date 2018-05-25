<?php

require "PHPMailer.php";
require "Exception.php";
require "SMTP.php";

if ($_POST) {
try{
    $name = trim(stripslashes($_POST['name']));
    $email = trim(stripslashes($_POST['email']));
    $subject = trim(stripslashes($_POST['subject']));
    $contact_message = trim(stripslashes($_POST['message']));

    // Check Name
	if (strlen($name) < 2) {
		$error['name'] = "Please enter your name.";
	}
	// Check Email
	if (!preg_match('/^[a-z0-9&\'\.\-_\+]+@[a-z0-9\-]+\.([a-z0-9\-]+\.)*+[a-z]{2}/is', $email)) {
		$error['email'] = "Please enter a valid email address.";
	}
	// Check Message
	if (strlen($contact_message) < 10) {
		$error['message'] = "Please enter your message. It should have at least 10 characters.";
	}
   // Subject
    if ($subject == '') { $subject = "Contact Form Submission"; }
    
    $mail = new PHPMailer\PHPMailer\PHPMailer();

    $mail->isSMTP();
    $mail->Host = 'localhost';
    $mail->Port = 25;

    $mail->setFrom($email, $name);
    $mail->addAddress('agustin.gregorieu@gmail.com', 'Agustín Gregorieu');
    $mail->isHTML(false);
    $mail->Subject = $subject;
    $mail->Body = $contact_message;

    if (!$error) {

        if (!$mail->send()) {
            echo 'Message could not be sent.';
            echo 'Mailer Error: ' . $mail->ErrorInfo;
        } else {
            echo 'OK';
        }
          
    } else {
  
          $response = (isset($error['name'])) ? $error['name'] . "<br /> \n" : null;
          $response .= (isset($error['email'])) ? $error['email'] . "<br /> \n" : null;
          $response .= (isset($error['message'])) ? $error['message'] . "<br />" : null;
          
          echo $response;
  
    } # end if - there was a validation error

} catch (Exception $e) {
    header('HTTP/1.1 500 Internal Server Booboo');
    header('Content-Type: application/json; charset=UTF-8');
    die(json_encode(array('message' => getMessage(), 'code' => 1337)));
}

}
?>