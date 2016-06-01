<div class="step-module">
  <p>PASO 2</p>
</div>

<div class="title-module">
  <h2>SELECCIONA UNA FOTO</h2>
</div>

<div class="info-content">

  <div class="selection-steps select-image-source">
    <!--<div class="large-5 medium-5 upload-photo">
      <a href="#" class="photo-selection" data-type="facebook">
        <img src="<?php// echo $baseUrl; ?>static/images/profile.png" />
        <p>USAR TU FOTO DE PERFIL DE FACEBOOK.</p>
      </a>
    </div>-->

    <div class="large-12 medium-12 upload-photo right-panel">

      <div class="info-photo">
        <div class="facebook-pic">
          <h4>Prueba tu montura en la foto. Recuerda que tu rostro debe estar de frente.
            <span></span>
          </h4>
          <ul class="photo-album-slider" id='facebook-photos'>
            
          </ul>
          
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