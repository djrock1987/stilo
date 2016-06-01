<?php if (!$isAjax): ?>
  <?php $this->load->view('partials/header') ?>
<?php endif; ?>

<?php $this->load->view($mainContent) ?>

<?php if (!$isAjax): ?>
  <?php $this->load->view('partials/footer') ?>
<?php endif; ?>