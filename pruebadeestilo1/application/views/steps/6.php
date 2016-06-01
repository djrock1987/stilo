<div class="step-module">
  <p>PASO 6</p>
</div>

<div class="title-module">
  <h2>ESCOGE UN COLOR PARA TUS LENTES TRANSITIONS <span class="filter-style"></span>®</h2>
</div>

<div class="info-content">

  <div class="selection-steps select-image-source">
    <div class="large-5 medium-5 upload-photo canvas-container">

    </div>

    <div class="large-7 medium-7 upload-photo right-panel">

      <div class="info-photo">
        <div class="facebook-pic">
          <h4>Escoge un color
            <span></span>
          </h4>
          <ul class="color-selector" id="color-selector"></ul>
        </div>                
      </div>

    </div>

    <div class="buttons prev-next more-options">
      <a class="prev-button" href="#"
      <?php foreach ($data as $key => $value): ?>
        <?php echo sprintf("data-%s='%s'", $key, $value); ?>
      <?php endforeach; ?>
         >VOLVER</a>

      <a class="next-button" href="#"
         <?php foreach ($data as $key => $value): ?>
           <?php echo sprintf("data-%s='%s'", $key, $value); ?>
         <?php endforeach; ?>
         >LISTO</a>
    </div>
  </div>
</div>