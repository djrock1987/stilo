<div class="step-module">
  <p>COMPARTE</p>
</div>

<div class="title-module">
  <h2>COMPARTE LA PRUEBA DE<br/> ESTILO TRANSITIONS®</h2>
</div>

<div class="info-content">

  <div class="selection-steps select-image-source">

    <div class="large-4 upload-photo">
      <a href="#" class="share-selection" data-method="facebook">
        <img src="<?php echo $baseUrl; ?>images/profile.png" />
        <p>COMPARTE CON<br/> UN AMIGO EN<br/> FACEBOOK.</p>
      </a>
    </div>
    
    <div class="large-4 upload-photo">
      <a href="#" class="share-selection" data-method="email">
        <img src="<?php echo $baseUrl; ?>images/email.png" />
        <p>COMPARTE<br/> POR CORREO<br/> ELECTRÓNICO.</p>
      </a>
    </div>

    <div class="large-4 upload-photo">
      <a href="#" class="share-selection" data-method="download">
        <img src="<?php echo $baseUrl; ?>images/download.png" />
        <p>GUARDA TU IMAGEN.</p>
      </a>
    </div>

    <div class="buttons">
      <a class="next-button" href="#"
         <?php foreach ($data as $key => $value): ?>
           <?php echo sprintf("data-%s='%s'", $key, $value); ?>
         <?php endforeach; ?>
         >CONTINUAR</a>
    </div>
  </div>
</div>