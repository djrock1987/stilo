<div class="step-module">
  <p>GRACIAS</p>
</div>

<div class="title-module">
  <h2>LENTES TRANSITIONS®</h2>
</div>

<div class="ending-image hide-for-small-down"><a href="http://www.transitions.com/en-us/virtual-viewer/#tagnum=9/1126980"><img src="<?php echo $baseUrl; ?>images/ending.png" alt="" /></a></div>
<div class="ending-image show-for-small-only"<a> href="http://www.transitions.com/en-us/virtual-viewer/#tagnum=9/1126980"><img src="<?php echo $baseUrl; ?>images/ending-mobile.png" alt="" /></a></div>

<div class="buttons prev-next">
  <a class="prev-button" href="<?php echo site_url(); ?>"
  <?php foreach ($data as $key => $value): ?>
	  <?php echo sprintf("data-%s='%s'", $key, $value); ?>
  <?php endforeach; ?>
     >PROBAR OTRO ESTILO</a>
  <a class="next-button" href="<?php echo site_url(); ?>"
	 <?php foreach ($data as $key => $value): ?>
		 <?php echo sprintf("data-%s='%s'", $key, $value); ?>
	 <?php endforeach; ?>
     >FINALIZAR</a>
</div>