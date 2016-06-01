<div class="step-module">
  <p>PASO 3</p>
</div>

<div class="title-module">
  <h2>UBICA TU FOTO EN LA POSICIÓN CORRECTA</h2>
</div>

<div class="info-content">

  <div class="selection-steps select-image-source">
    <div class="large-5 medium-7 small-12 upload-photo canvas-container">
      <div class="image-selected" id="image-selected">
        <canvas id="face-canvas"></canvas>
		<div class="border-canvas border-top"></div>
		<div class="border-canvas border-right"></div>
		<div class="border-canvas border-bottom"></div>
		<div class="border-canvas border-left"></div>
      </div>
      <p>ACERCA, GIRA O ARRASTRA LA FOTO</p>
    </div>

    <div class="large-7 medium-7 small-12 upload-photo">

      <div class="info-photo">
        <div class="interac-elememnts">


          <div class="shape-face">
            <p>FORMA DE LA CARA</p>
            <a href="#" class="guideSelection" data-guide="rectangular"><img src="<?php echo $baseUrl; ?>images/form-a.png" ></a>
            <a href="#" class="guideSelection" data-guide="circular"><img src="<?php echo $baseUrl; ?>images/form-b.png" ></a>
            <a href="#" class="guideSelection" data-guide="triangular"><img src="<?php echo $baseUrl; ?>images/form-c.png" ></a>
          </div>

          <div class="control-element">
            <p>ZOOM</p>
            <div class="bar-element" data-type="zoom">
              <div class="minus controllers"><img src="<?php echo $baseUrl; ?>images/minus-zoom.png" ></div>
              <div class='container'></div>
              <div class="plus controllers"><img src="<?php echo $baseUrl; ?>images/plus-zoom.png" ></div>
            </div>
          </div>
          <div class="control-element">
            <p>ROTAR</p>
            <div class="bar-element" data-type="rotate">
              <div class="minus controllers"><img src="<?php echo $baseUrl; ?>images/left-rotate.png" ></div>
              <div class='container'></div>
              <div class="plus controllers"><img src="<?php echo $baseUrl; ?>images/right-rotate.png" ></div>
            </div>
          </div>
        </div>                
      </div>

    </div>

    <div class="buttons prev-next">
      <a class="prev-button" href="#"
      <?php foreach ($data as $key => $value): ?>
        <?php echo sprintf("data-%s='%s'", $key, $value); ?>
      <?php endforeach; ?>
         >VOLVER</a>
      <a class="next-button" href="#"
         <?php foreach ($data as $key => $value): ?>
           <?php echo sprintf("data-%s='%s'", $key, $value); ?>
         <?php endforeach; ?>
         >APLICAR</a>
    </div>
  </div>
</div>