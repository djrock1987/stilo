<div class="step-module">
  <p>PASO 2</p>
</div>

<div class="title-module">
  <h2>SELECCIONA UNA FOTO</h2>
</div>

<div class="info-content">

  <div class="selection-steps select-image-source">
    <!--<div class="large-5 medium-7 upload-photo">
      <a href="#" class="photo-selection" data-type="camera">
        <img src="<?php// echo $baseUrl; ?>static/images/selfie.png" />
        <p>TÓMATE UNA SELFIE CON TU WEBCAM</p>
      </a>
    </div>-->

    <div class="large-12 medium-12 upload-photo right-panel">

      <div class="info-photo">
        <div class="machine">
          <h4>Prueba tu montura en la foto. Recuerda que tu rostro debe estar de frente.
            <span></span>
          </h4>
          <div class="picture photo-selection selfie-container" data-type="camera">
            <video autoplay id="selfie-video"></video>
            <canvas autoplay id="selfie-canvas"></canvas>
            <div id="output"></div>
          </div>
          <div class="selfie-buttons">  
            <a class="cancel" href="#">
              <img src="<?php echo $baseUrl; ?>images/cancel.jpg" />
            </a>
            <a class="accept" href="#">
              <img src="<?php echo $baseUrl; ?>images/accept.jpg" />
            </a>
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
         >CONTINUAR</a>
    </div>
  </div>
</div>