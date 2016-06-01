</div>

<div class="row full-width footer">
  <div class="footer-content">
    <p><strong>Copyright ©2015</strong> Transitions. Todos los derechos reservados.</p>
  </div>
</div>

<?php $this->load->view('lightboxes/email'); ?>

<script src="<?php echo $baseUrl; ?>static/bower_components/jquery/dist/jquery.min.js"></script>
<script src="<?php echo $baseUrl; ?>static/bower_components/foundation/js/foundation.min.js"></script>
<script src="<?php echo $baseUrl; ?>static/bower_components/fabricjs/dist/fabric.min.js"></script>
<script src="<?php echo $baseUrl; ?>static/bower_components/bxslider/dist/jquery.bxslider.min.js"></script>
<script src="<?php echo $baseUrl; ?>static/bower_components/fancybox/source/jquery.fancybox.pack.js"></script>
<script src="<?php echo $baseUrl; ?>static/bower_components/jquery-validation/dist/jquery.validate.min.js"></script>
<script src="<?php echo $baseUrl; ?>static/bower_components/jquery-validation/src/localization/messages_es.js"></script>
<script src="//code.jquery.com/ui/1.10.0/jquery-ui.js"></script>
<script>
  var jsObject = <?php echo json_encode($jsObject); ?>;
</script>

<script src="<?php echo $baseUrl; ?>js/app.js"></script>
</body>
</html>
