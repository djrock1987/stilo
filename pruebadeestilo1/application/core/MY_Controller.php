<?php

/**
 * MY_Controller controller
 *
 * @author Alexander Baron <alexbaron50@gmail.com>
 * @since 1/04/2014
 */
class MY_Controller extends CI_Controller {

  /**
   * Class constructor.
   * 
   * @param bool $checkLogin
   */
  function __construct($checkLogin = true) {
    parent::__construct();
    if ($checkLogin) {
      if ($this->isLoggedIn()) {
        die(redirect($this->getSessionData('userType')));
      }
    }
  }

  /**
   * Load template view.
   * 
   * @param string $view
   * @param string $title
   * @param array $data
   */
  protected function loadView($view, $title, $data = array(), $jsData = array()) {

    $view = ($this->isLoggedIn()) ? $this->getSessionData('userType') . '/' . $view : $view;

    $defaultsJsData = array(
        'baseUrl' => base_url(),
        'controller' => $this->router->fetch_class(),
        'method' => $this->router->fetch_method(),
        'ajaxUrl' => base_url($this->router->fetch_class() . '/ajaxResponder'),
        'siteTitle' => SITE_TITLE,
        'facebook_app_id' => FACEBOOK_APP_ID,
        'facebook_namespace' => FACEBOOK_NAMESPACE
    );
    $jsData = array_merge($defaultsJsData, $jsData);
    $defaults = array(
        'mainContent' => $view,
        'controller' => $this->router->fetch_class(),
        'controllerUrl' => base_url($this->router->fetch_class()),
        'logOutUrl' => base_url($this->router->fetch_class() . '/logOut'),
        'method' => $this->router->fetch_method(),
        'baseUrl' => base_url(),
        'isAjax' => $this->isAjax(),
        'jsObject' => $jsData,
        'isLoggedIn' => $this->isLoggedIn(),
        'userType' => $this->getSessionData('userType'),
        'sessionData' => $this->session->all_userdata(),
        'siteTitle' => ($title) ? SITE_TITLE . " | " . $title : SITE_TITLE
    );

    $data = array_merge($defaults, $data);

    $this->load->view('template', $data);
  }

  /**
   * Check if user is logged in.
   */
  protected function isLoggedIn() {
    return $this->getSessionData('isLoggedIn');
  }

  /**
   * Public function ajaxResponder action.
   */
  public function ajaxResponder() {
    if (!$this->isAjax()) {
      show_404();
    }
    call_user_func(array($this, $_POST['action']));
  }

  /**
   * Check wether or not is an ajax request.
   * 
   * @return boolean
   */
  protected function isAjax() {
    return ( isset($_SERVER['HTTP_X_REQUESTED_WITH']) && mb_strtoupper($_SERVER['HTTP_X_REQUESTED_WITH']) === 'XMLHTTPREQUEST' );
  }

  /**
   * Die with an json response.
   * 
   * @param type $params
   */
  protected function dieAjaxJson($params) {
    die(json_encode($params));
  }

  /**
   * Set session data.
   * 
   * @param array $data
   */
  protected function setSessionData($data) {
    $this->session->set_userdata($data);
  }

  protected function getSessionData($key) {
    return $this->session->userdata($key);
  }

  protected function createContactoOnInfusion($infusionData) {
    $infusionsoft = $this->getInfusionApi();

    $infusionsoft->contacts()->add($infusionData);
  }

  /**
   * Check if user type equals to session stored.
   * 
   * @param string $userType
   * @return bool
   */
  protected function checkUserType($userType) {
    return $this->getSessionData('userType') === $userType;
  }

  /**
   * Destroy current session data.
   */
  public function logOut() {
    $this->session->sess_destroy();
    die(redirect('login'));
  }

  protected function bufferLoadView($view, $title, $data = array()) {
    ob_start();
    $this->loadView($view, $title, $data);
    return ob_get_clean();
  }

}

/**
 * User controller
 *
 * @author Alexander Baron <alexbaron50@gmail.com>
 * @since 12/08/2015
 */
class Usuario_Controller extends MY_Controller {

  public $usuarioId;

  /**
   * Class constructor.
   */
  public function __construct() {
    parent::__construct(false);

    if (!$this->isLoggedIn() || !$this->checkUserType('user')) {
      die(redirect('login'));
    }

    $this->usuarioId = $this->getSessionData('id');
  }

}

/**
 * Administrador controller
 *
 * @author Alexander Baron <alexbaron50@gmail.com>
 * @since 1/04/2014
 */
class Admin_Controller extends MY_Controller {

  /**
   * Class constructor.
   */
  public function __construct() {
    parent::__construct(false);

    if (!$this->isLoggedIn() || !$this->checkUserType('administrator')) {
      die(redirect('login'));
    }
  }

}
