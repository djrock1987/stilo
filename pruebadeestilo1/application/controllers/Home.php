<?php

use Facebook\Facebook;

defined('BASEPATH') OR exit('No direct script access allowed');

class Home extends MY_Controller {

	private $fb;

	public function index($step = 0, $substep = 0) {

		$tree = array(
			'0',
			'1',
			'2' => array(
				'0',
				'1',
				'2',
				'3',
			),
			'3',
			'4',
			'5',
			'6',
			'7',
			'8',
			'9'
		);
		$colors = array(
			'cafe',
			'negro',
			'verde',
		);
		$tonalidades = array(
			'alto' => array(
				'opacidad' => 100
			),
			'medio' => array(
				'opacidad' => 50
			),
			'bajo' => array(
				'opacidad' => 10
			)
		);
		$styles = array(
			'casual' => array(
				'total' => 10,
				'colors' => $colors,
				'filters' => $tonalidades
			),
			'chic' => array(
				'total' => 15,
				'colors' => $colors,
				'filters' => $tonalidades
			),
			'elegantes' => array(
				'total' => 11,
				'colors' => $colors,
				'filters' => $tonalidades
			),
			'vintage' => array(
				'total' => 13,
				'colors' => $colors,
				'filters' => $tonalidades
			)
		);

		$filters = array(
			'Signature' => array(
				'negro' => array(
					'name' => 'GRIS',
					'code' => '#666666'
				),
				'cafe' => array(
					'name' => 'CAFÉ',
					'code' => '#613f3e'
				),
				'verde' => array(
					'name' => 'VERDE',
					'code' => '#47613d'
				),
			),
			'XTRActive' => array(
				'negro' => array(
					'name' => 'GRIS',
					'code' => '#666666'
				)
			)
		);
		$currentStep = (is_array($tree["{$step}"])) ? "{$step}-{$substep}" : $step;
		$this->loadView('home', 'Escoge tu estilo', array(
			'currentStep' => "$currentStep",
			'tree' => $tree), array(
			'currentStep' => $step,
			'currentSubStep' => $substep,
			'styles' => $styles,
			'filters' => $filters
		));
	}

	public function step($step = 0, $substep = 0) {
		$this->index($step, $substep);
	}

	protected function saveImage() {
		extract($_POST);

		$fileName = md5(microtime()) . '.png';
		$imagePath = FCPATH . 'static/uploads/' . $fileName;

		$file = $this->base64ToJpeg($imageData, $imagePath);

		$this->dieAjaxJson(array(
			'success' => true,
			'image_url' => base_url("/static/uploads/{$fileName}")
		));
	}

	private function base64ToJpeg($base64_string, $output_file) {
		$ifp = fopen($output_file, "w+");

		$data = explode(',', $base64_string);

		fwrite($ifp, base64_decode($data[1]));
		fclose($ifp);

		return $output_file;
	}

	protected function emailForm() {
		if (!ini_get('date.timezone')) {
			date_default_timezone_set('GMT');
		}
		extract($_POST);
		$message = $this->bufferLoadView('mails/email', '', $_POST);

		$this->load->library('email');
		$config['mailtype'] = 'html';

		$this->email->initialize($config);

		$this->email->from($email, $nombre);
		$this->email->to($email_amigo);

		$this->email->subject('Transitions Lentes Adaptables');
		$this->email->message($message);

		$this->email->send();

		$this->dieAjaxJson(
				array(
					'actions' => array(
						array(
							'name' => 'formLabelInfo',
							'vars' => array(
								'object_id' => $_POST['object_id'],
								'type' => 'info',
								'text' => "Hemos enviado un e-mail a tu amigo"
							)
						),
						array(
							'name' => 'resetForm',
							'vars' => array(
								'object_id' => $_POST['object_id']
							)
						),
						array(
							'name' => 'fadeOutAndRemove',
							'vars' => array(
								'object_id' => $_POST['object_id'] . ' #label-info',
								'timeOut' => 5000
							)
						),
						array(
							'name' => 'waitAndCloseFancybox',
							'vars' => array(
								'object_id' => $_POST['object_id'] . ' #label-info',
								'timeOut' => 5000
							)
						)
					)
				)
		);
	}

}
