<?php
// Import PHPMailer classes into the global namespace
// These must be at the top of your script, not inside a function
use PHPMailer;
use Exception;

//Load Composer's autoloader
require 'vendor/autoload.php';

if($_POST) {

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
 
 
    // Set Message
    $message .= "Email from: " . $name . "<br />";
      $message .= "Email address: " . $email . "<br />";
    $message .= "Message: <br />";
    $message .= $contact_message;
    $message .= "<br /> ----- <br /> This email was sent from your site's contact form. <br />";
 

    // Email Headers
     $headers = "From: " . $siteOwnersEmail . "\r\n";
     $headers .= "Reply-To: ". $email . "\r\n";
     $headers .= "Mime-Version: 1.0\n";
     $headers .= "Content-Type: text/html";
 
 
    if (!$error) {
 
        $mail = new PHPMailer(true);                              // Passing `true` enables exceptions
        try {
            //Server settings
            $mail->SMTPDebug = 2;                                 // Enable verbose debug output
            $mail->isSMTP();                                      // Set mailer to use SMTP
            $mail->Host = 'smtp1.example.com;smtp2.example.com';  // Specify main and backup SMTP servers
            $mail->SMTPAuth = true;                               // Enable SMTP authentication
            $mail->Username = 'user@example.com';                 // SMTP username
            $mail->Password = 'secret';                           // SMTP password
            $mail->SMTPSecure = 'tls';                            // Enable TLS encryption, `ssl` also accepted
            $mail->Port = 587;                                    // TCP port to connect to
        
            //Recipients
            $mail->setFrom('from@example.com', $name);
            $mail->addAddress('joe@example.net', 'Joe User');     // Add a recipient
            $mail->addAddress('ellen@example.com');               // Name is optional
            $mail->addReplyTo('info@example.com', 'Information');
            $mail->addCC('cc@example.com');
            $mail->addBCC('bcc@example.com');
        
            //Content
            $mail->isHTML(true);                                  // Set email format to HTML
            $mail->Subject = 'Here is the subject';
            $mail->Body    = 'This is the HTML message body <b>in bold!</b>';
            $mail->AltBody = 'This is the body in plain text for non-HTML mail clients';
        
            $mail->send();
            echo 'Message has been sent';
        } catch (Exception $e) {
            echo 'Message could not be sent. Mailer Error: ', $mail->ErrorInfo;
        }
         
     } # end if - no validation error
 
     else {
 
         $response = (isset($error['name'])) ? $error['name'] . "<br /> \n" : null;
         $response .= (isset($error['email'])) ? $error['email'] . "<br /> \n" : null;
         $response .= (isset($error['message'])) ? $error['message'] . "<br />" : null;
         
         echo $response;
 
     } # end if - there was a validation error
 
 }


