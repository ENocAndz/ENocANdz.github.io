<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Form</title>
    <link rel="stylesheet" href="style.css">
</head>

<body>
    <header>
        <Nav><a href="index.html">Home</a></Nav>
    </header>

    <div class="containerFormView">
        <?php
        $name = $_POST['name'];
        $email = $_POST['email'];
        $phone = $_POST['phone'];
        $message = $_POST['message'];

        echo " hello .$name.br .$email.";
        /*
        if (!empty($email) && !empty($message)) {
            if (filter_var($email, FILTER_VALIDATE_EMAIL)) {
                $receiver = "21e.andrade7@gmail.com";
                $subject = "From: $name <$email>";
                $body = "Name: $name\nEMail: $email\nPhone: $phone\n\nMessage: $message\n\nRegards, \n$name";
                $sender = "From $email";
                if (mail($receiver, $subject, $body, $sender)) {
                    echo "Your message was succesfully sent";
                } else {
                    echo "Failed to send your message";
                }
            } else {
                echo "Enter a valid Email";
            }
        } else {
            echo "Email and Message field is required!";
        }
            */
        ?> 
    </div>

</body>

</html>