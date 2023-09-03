<?php

use PHPMailer\PHPMailer\PHPMailer;
use PHPMailer\PHPMailer\SMTP;
use PHPMailer\PHPMailer\Exception;

require '../assets/vendor/phpmailer/phpmailer/src/Exception.php';
require '../assets/vendor/phpmailer/phpmailer/src/PHPMailer.php';
require '../assets/vendor/phpmailer/phpmailer/src/SMTP.php';

// Replace contact@example.com with your real receiving email address
$receiving_email_address = 'contact@example.com';

if (!empty($_POST['name']) && !empty($_POST['email']) && !empty($_POST['subject']) && !empty($_POST['message'])) {
  $name = $_POST['name'];
  $email = $_POST['email'];
  $subject = $_POST['subject'];
  $message = $_POST['message'];

  $mail = new PHPMailer(true);
  try {
    //Server settings
    $mail->SMTPDebug = SMTP::DEBUG_OFF;                      // Enable verbose debug output
    $mail->isSMTP();                                            // Send using SMTP
    $mail->Host       = 'smtp.example.com';                     // Set the SMTP server to send through
    $mail->SMTPAuth   = true;                                   // Enable SMTP authentication
    $mail->Username   = 'your-email@example.com';                // SMTP username
    $mail->Password   = 'your-email-password';                   // SMTP password
    $mail->SMTPSecure = PHPMailer::ENCRYPTION_STARTTLS;          // Enable TLS encryption; `PHPMailer::ENCRYPTION_SMTPS` also accepted
    $mail->Port       = 587;                                    // TCP port to connect to

    //Recipients
    $mail->setFrom($email, $name);
    $mail->addAddress($receiving_email_address);     // Add a recipient

    // Content
    $mail->isHTML(false);                                  // Set email format to plain text
    $mail->Subject = $subject;
    $mail->Body    = "Name: $name\nEmail: $email\n\n$message";

    $mail->send();
    echo 'success';
  } catch (Exception $e) {
    echo 'error';
  }
} else {
  echo 'error';
}
