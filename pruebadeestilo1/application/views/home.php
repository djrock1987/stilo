<?php $totalItems = count($tree); ?>
<?php foreach ($tree as $key => $item): ?>

  <?php if (!is_array($item)): ?>
    <?php
    $data = array(
        'data' => array(
            'step' => $key,
            'sub_step' => 0,
            'has_substep' => false,
            'is_final_step' => (($key + 1) == $totalItems) ? true : false
        )
    );
    ?>
<div class="large-12 columns app-content no-padding <?php echo ($key === 0) ? 'landing' : ''; ?> <?php echo ($key == $currentStep) ? 'active' : ''; ?>" data-step="<?php echo $key; ?>" id="step-<?php echo $key; ?>-0"
    <?php foreach ($data['data'] as $dataKey => $value): ?>
      <?php echo sprintf("data-%s='%s'", $dataKey, $value); ?>
    <?php endforeach; ?>
         >
           <?php
           $this->load->view("steps/$key", $data);
           ?>
    </div>

  <?php else: ?>

    <?php foreach ($item as $subStep): ?>
      <?php
      $data = array(
          'data' => array(
              'step' => $key,
              'sub_step' => $subStep,
              'has_substep' => true,
              'is_final_step' => (($key + 1) == $totalItems) ? true : false
          )
      );
      ?>
      <div class="large-12 columns app-content no-padding <?php echo ("{$key}-{$subStep}" == $currentStep) ? 'active' : ''; ?>" data-step="<?php echo "{$key}-{$subStep}"; ?>" id="step-<?php echo "{$key}-{$subStep}"; ?>"
           <?php foreach ($data['data'] as $dataKey => $value): ?>
             <?php echo sprintf("data-%s='%s'", $dataKey, $value); ?>
           <?php endforeach; ?>
           >
             <?php
             $this->load->view("steps/{$key}-{$subStep}", $data);
             ?>
      </div>
    <?php endforeach; ?>

  <?php endif; ?>
<?php endforeach; ?>