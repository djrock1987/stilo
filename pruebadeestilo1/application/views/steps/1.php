<div class="step-module">
  <p>INICIO</p>
</div>

<div class="title-module">
  <h2>ESCOGE TU ESTILO</h2>
</div>

<div class="info-content">
  <div class="option-glasses">
    <span class="alt"><img src="<?php echo $baseUrl; ?>images/alt.png" /></span>
    <span class="alb"><img src="<?php echo $baseUrl; ?>images/alb.png" /></span>
    <span class="art"><img src="<?php echo $baseUrl; ?>images/art.png" /></span>
    <span class="arb"><img src="<?php echo $baseUrl; ?>images/arb.png" /></span>
    <ul>
      <li><a href="#" class="style-selection" data-style="vintage"><img src="<?php echo $baseUrl; ?>images/vintage-thumb.jpg"></a></li>
      <li><a href="#" class="style-selection" data-style="elegantes"><img src="<?php echo $baseUrl; ?>images/elegantes-thumb.jpg"></a></li>
      <li><a href="#" class="style-selection" data-style="chic"><img src="<?php echo $baseUrl; ?>images/chic-thumb.jpg"></a></li>
      <li><a href="#" class="style-selection" data-style="casual"><img src="<?php echo $baseUrl; ?>images/casual-thumb.jpg"></a></li>
    </ul>
  </div>

  <div class="selection-steps">
    <div class="large-6 medium-7 glasses-img">
    </div>

    <div class="buttons">
      <a class="next-button"
         <?php foreach ($data as $key => $value): ?>
           <?php echo sprintf("data-%s='%s'", $key, $value); ?>
         <?php endforeach; ?>
         >CONTINUAR</a>
    </div>
  </div>
</div>