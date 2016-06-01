<div class="step-module">
  <p>PASO 2</p>
</div>

<div class="title-module">
  <h2>SELECCIONA UNA FOTO</h2>
</div>

<div class="info-content">

  <div class="selection-steps select-image-source">
    <!--<div class="large-5 medium-7 upload-photo">
      <a href="#" class="photo-selection" data-type="pc">
        <img src="<?php// echo $baseUrl; ?>static/images/pc.png" />
        <p>CARGA UNA IMAGEN DE TU COMPUTADOR.</p>
      </a>
    </div>-->

    <div class="large-12 medium-12 upload-photo right-panel">

      <div class="info-photo">
        <div class="machine">
          <h4>Prueba tu montura en la foto. Recuerda que tu rostro debe estar de frente.
            <span></span>
          </h4>
          <a class="picture photo-selection" data-type="pc" id="photo-container"></a>
          <form action="#" class="ajaxForm hidden-form" id="uploadImage"><input type="hidden" name="action" value="upload_image" /><input type="file" name="photo" accept="image/*;capture=camera" /></form>
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