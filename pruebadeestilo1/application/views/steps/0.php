<div class="title-module">
  <p>En solo dos minutos y sin moverte de tu pantalla<br/> <b>podrás probarte tus diseños de gafas favoritas.</b></p>
</div>

<div class="landing-image"><img src="<?php echo $baseUrl; ?>images/landing.png" alt="" /></div>


<div class="buttons">
  <a class="next-button" href="#"
     <?php foreach ($data as $key => $value): ?>
       <?php echo sprintf("data-%s='%s'", $key, $value); ?>
     <?php endforeach; ?>
     >INICIAR</a>
</div>