<link href="//netdna.bootstrapcdn.com/bootstrap/3.0.0/css/bootstrap.min.css" rel="stylesheet" id="bootstrap-css">
<script src="//netdna.bootstrapcdn.com/bootstrap/3.0.0/js/bootstrap.min.js"></script>
<script src="//code.jquery.com/jquery-1.11.1.min.js"></script>
<!------ Include the above in your HEAD tag ---------->
<style>
   body{
   margin: 0;
   padding: 0;
   font-family: sans-serif;
   background:#f5dbce;
   }
   .formBox{
   margin-top: 90px;
   padding: 50px;
   }
   .formBox  h1{
   margin: 0;
   padding: 0;
   text-align: center;
   margin-bottom: 50px;
   text-transform: uppercase;
   font-size: 48px;
   }
   .inputBox{
   position: relative;
   box-sizing: border-box;
   margin-bottom: 50px;
   }
   .inputBox .inputText{
   position: absolute;
   font-size: 24px;
   line-height: 50px;
   transition: .5s;
   opacity: .5;
   }
   .inputBox .input{
   position: relative;
   width: 100%;
   height: 50px;
   background: transparent;
   border: none;
   outline: none;
   font-size: 24px;
   border-bottom: 1px solid rgba(0,0,0,.5);
   }
   .focus .inputText{
   transform: translateY(-30px);
   font-size: 18px;
   opacity: 1;
   color: #00bcd4;
   }
   textarea{
   height: 100px !important;
   }
   .button{
   width: 100%;
   height: 50px;
   border: none;
   outline: none;
   background: green;
   color: #fff;
   }
</style>
<?php
$d=date('Ymd');
$id=$_GET['id'];
$mode=$_GET['mode'];
$r=file_get_contents("https://api.yext.com/v2/accounts/427914/reviews/".$id."?api_key=e43665c5ce07927a3ae5c2bf2e826afa&v=".$d);
$resp=json_decode($r,true);
$nm=explode(" ",$resp['response']['authorName']);
$email=$resp['response']['authorEmail'];
//$action =  'http://'.$_SERVER['HTTP_HOST'].'/api/response/response_save';
$action =  'http://'.$_SERVER['HTTP_HOST'].'/api/response/response_save';

?>
<div class="container-fluid">
   <div class="container">
      <div class="formBox">
         <form method="POST" action="<?php echo $action ?> ">
            <!-- <div class="row">
               <div class="col-sm-12">
               	<h1>Contact form</h1>
               </div>
               </div> -->
            <div class="row">
               <div class="col-sm-3">
               </div>
               <div class="col-sm-6">
                  <div class="inputBox focus ">
                     <div class="inputText">First Name</div>
                     <input type="text" name="first_name" class="input" value="<?php echo $nm[0] ?>">
                     <input type="hidden" name="review_id" class="input" value="<?php echo $id ?>">
                     <input type="hidden" name="mode" class="input" value="<?php echo $mode ?>">
                     <input type="hidden" name="review" class="input" value="<?php echo htmlspecialchars( json_encode($resp), ENT_COMPAT ); ?>">
                  </div>
               </div>
            </div>
            <div class="row">
               <div class="col-sm-3">
               </div>
               <div class="col-sm-6">
                  <div class="inputBox focus">
                     <div class="inputText">Last Name</div>
                     <input type="text" name="last_name" class="input" value="<?php echo $nm[1] ?>">
                  </div>
               </div>
            </div>
            <div class="row">
               <div class="col-sm-3">
               </div>
               <div class="col-sm-6">
                  <div class="inputBox">
                     <div class="inputText focus">Telephone Number</div>
                     <input type="text" name="phone_number" class="input">
                  </div>
               </div>
            </div>
            <div class="row">
               <div class="col-sm-3">
               </div>
               <div class="col-sm-6">
                  <div class="inputBox focus">
                     <div class="inputText">Email</div>
                     <input type="text" name="email" class="input" value="<?php echo $email ?>">
                  </div>
               </div>
            </div>
            <div class="row">
               <div class="col-sm-3">
               </div>
               <div class="col-sm-3">
                  <input type="submit" name="submit" class="button btn btn-success" value="Submit">
               </div>
            </div>
         </form>
      </div>
   </div>
</div>
<script type="text/javascript">
   $(".input").focus(function() {
   	$(this).parent().addClass("focus");
   })
</script>