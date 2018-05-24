<?php

require "PHPMailer.php";
require "Exception.php";

if ($_POST) {
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
	if (strlen($contact_message) < 15) {
		$error['message'] = "Please enter your message. It should have at least 15 characters.";
	}
   // Subject
    if ($subject == '') { $subject = "Contact Form Submission"; }
    
    $mail = new PHPMailer\PHPMailer\PHPMailer();

    $mail->From = 'agustin@gregorieu.com';
    $mail->FromName = 'Mailer';
    $mail->addAddress('name@domain.com', 'User'); // Add a recipient
    $mail->addAddress('ellen@example.com'); // Name is optional
    $mail->addReplyTo('info@example.com', 'Information');
    $mail->addCC('cc@example.com');
    $mail->addBCC('bcc@example.com');

    $mail->addAttachment(''); // Add attachments
    $mail->addAttachment('/tmp/image.jpg', 'new.jpg'); // Optional name
    $mail->isHTML(true); // Set email format to HTML

    $mail->Subject = 'Here is the subject';
    $mail->Body = 'This is the HTML message body <b>in bold!</b>';
    $mail->AltBody = 'This is the body in plain text for non-HTML mail clients';

    if (!$error) {

        if (!$mail->send()) {
            echo 'Message could not be sent.';
            echo 'Mailer Error: ' . $mail->ErrorInfo;
        } else {
            echo 'Message has been sent';
        }
          
    } else {
  
          $response = (isset($error['name'])) ? $error['name'] . "<br /> \n" : null;
          $response .= (isset($error['email'])) ? $error['email'] . "<br /> \n" : null;
          $response .= (isset($error['message'])) ? $error['message'] . "<br />" : null;
          
          echo $response;
  
    } # end if - there was a validation error
      
}
?>