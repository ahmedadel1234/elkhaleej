<?php
    $resultMsg = [
    "message"=>"",
    "color"=>""
  ];
   if($_SERVER['REQUEST_METHOD'] == "POST"){
     $to = "ahmedadelelghiati@gmail.com"; // Put ur own mail here....
     $subject = "صفحة تواصل بنا";
    
     $message = "<h1 style='text-align:right;direction:rtl'>رسالة جديدة من صفحة تواصل بنا.</h1>";
     $message .= "<h4 style='text-align:right;direction:rtl;font-size:20px''>الاسم: ".$_POST['name']."</h4>";
     $message .= "<h4 style='text-align:right;direction:rtl;font-size:20px''>البريد: ".$_POST['email']."</h4>";
     $message .= "<p style='text-align:right;direction:rtl;font-size:20px'>الرسالة: ".nl2br($_POST['message'])."</p>";

     $header = "From:".$_POST['email']." \r\n";
     $header .= "Cc:".$_POST['email']." \r\n";
     $header .= "MIME-Version: 1.0\r\n";
     $header .= "Content-type: text/html\r\n";

     $retval = mail ($to,$subject,$message,$header);
     if( $retval == true ) {
       $resultMsg['message'] = "تم إرسال الرسالة بنجاح.";
       $resultMsg['color'] = "green";
     }else {
       $resultMsg['message'] = "حدث خطأ.. يرجى المحاولة لاحقاً.";
       $resultMsg['color'] = "red";
     }
   }
?>

<!DOCTYPE html>
<!-- Created By CodingLab - www.codinglabweb.com -->
<html lang="en" dir="ltr">
  <head>
    <meta charset="UTF-8" />
    <title>contact us</title>
    <!-- <link rel="stylesheet" href="css/main.css" /> -->
    <link rel="stylesheet" href="css/co.css" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  </head>
  <body>
    <div class="container">
      <div class="content">
        <div class="left-side">
          <div class="address details">
            <i class="fas fa-map-marker-alt"></i>
            <div class="topic">Address</div>
            <div class="text-one">Egypt - Elgharbeia</div>
            <div class="text-two">Tanta - Manshiyat Janjour</div>
          </div>
          <div class="phone details">
            <i class="fas fa-phone-alt"></i>
            <div class="topic">Mobile</div>
            <div class="text-one">+0098 9893 5647</div>
            <div class="text-two">+0096 3434 5678</div>
          </div>
          <div class="email details">
            <i class="fas fa-envelope"></i>
            <div class="topic">Email</div>
            <div class="text-one">test@gmail.com</div>
            <div class="text-two">testb@gmail.com</div>
          </div>
        </div>
        <div class="right-side">
          <div class="topic-text">Contact us</div>
          <p>We always be happy to serve you , don't hesitate to contact us</p>
          <form method="POST" action="<?php echo htmlspecialchars($_SERVER["PHP_SELF"]); ?>">
            <div class="input-box">
              <input required name="name" type="text" placeholder="Your Name" />
            </div>
            <div class="input-box">
              <input required name="email" type="text" placeholder="Your Email" />
            </div>
            <textarea required
              name="message"
              id=""
              class="input-box message-box"
              placeholder="Your message"
            ></textarea>
            <div style="color:<?= $resultMsg['color'] ?>;font-weight:bold"><?= $resultMsg['message'] ?></div>
            <div class="button">
              <input type="submit" value="Send" />
            </div>
          </form>
        </div>
      </div>
    </div>
  </body>
</html>
