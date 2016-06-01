<div class="step-module">
  <p>PASO 4</p>
</div>

<div class="title-module">
  <h2>ELIGE LA MONTURA QUE TE QUIERAS PROBAR</h2>
</div>

<div class="info-content">

  <div class="selection-steps select-image-source">
    <div class="large-5 medium-5 upload-photo canvas-container">
      
    <p>SELECCIONA LA MONTURA Y MUEVELA  SOBRE LA FOTO</p>    
    </div>
      
    <div class="large-7 medium-7 upload-photo right-panel">

      <div class="info-photo">
        <div class="facebook-pic">
          <h4>Te recomendamos las <br> siguientes monturas.
            <span></span>
          </h4>
          <ul class="photo-album-slider" id='monturas-photos'>
          </ul>
        </div>                
      </div>

    </div>

    <div class="buttons prev-next more-options">
      <a class="prev-button" data-reset="false" href="#"
      <?php foreach ($data as $key => $value): ?>
        <?php echo sprintf("data-%s='%s'", $key, $value); ?>
      <?php endforeach; ?>
         >VOLVER</a>
      <a class="more toggle-monturas" href="#">MÁS MONTURAS</a>
      <a class="next-button" href="#"
         <?php foreach ($data as $key => $value): ?>
           <?php echo sprintf("data-%s='%s'", $key, $value); ?>
         <?php endforeach; ?>
         >CONTINUAR</a>
    </div>
  </div>
</div>