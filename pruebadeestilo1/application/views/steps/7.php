<div class="step-module">
	<p>LISTO</p>
</div>

<div class="title-module">
	<h2>!LISTO¡ ASÍ TE VERÍAS USANDO LENTES TRANSITIONS <span class="filter-style"></span>®</h2>
</div>

<div class="info-content">

	<div class="selection-steps select-image-source">
		<div id="grado-activacion">

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