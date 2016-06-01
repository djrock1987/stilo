<div class="step-module">
  <p>PASO 2</p>
</div>

<div class="title-module">
  <h2>SELECCIONA UNA FOTO</h2>
</div>

<div class="info-content">

  <div class="selection-steps select-image-source">
    <div class="large-4 medium-4 small-12 upload-photo">
      <a href="#" class="method-selection" data-method="1">
        <img src="<?php echo $baseUrl; ?>images/pc.png" />
        <p>CARGA UNA IMAGEN DE TU EQUIPO.</p>
      </a>
    </div>

    <div class="large-4 medium-4 small-12 upload-photo">
      <a href="#" class="method-selection" data-method="2">
        <img src="<?php echo $baseUrl; ?>images/profile.png" />
        <p>USAR TU FOTO DE PERFIL DE FACEBOOK.</p>
      </a>
    </div>

    <div class="large-4 medium-4 small-12 upload-photo">
      <a href="#" class="method-selection" data-method="3">
        <img src="<?php echo $baseUrl; ?>images/selfie.png" />
        <p>TÓMATE UNA SELFIE CON TU WEBCAM</p>
      </a>
    </div>

    <div class="buttons">
      <a class="prev-button" href="#"
         <?php foreach ($data as $key => $value): ?>
           <?php echo sprintf("data-%s='%s'", $key, $value); ?>
         <?php endforeach; ?>
         >VOLVER</a>
    </div>
  </div>
</div>