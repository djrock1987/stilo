<?php

/**
 * MY_Model, used only to load my abstract class.
 *
 * @author Alexander Baron <alexbaron50@gmail.com>
 * @since 2/04/2014
 */
class MY_Model extends CI_Model {

  /**
   * Class constructor.
   */
  public function __construct() {
    parent::__construct();
  }

}

/**
 * Abstract Model class
 *
 * @author Alexander Baron <alexbaron50@gmail.com>
 * @since 2/04/2014
 */
abstract class Abstract_Model extends CI_Model {

  /**
   * Table name.
   * 
   * @var string 
   */
  protected $tableName;

  /**
   * Table Primary Key.
   * 
   * @var string 
   */
  public $tableId;

  /**
   * Table Columns.
   * 
   * @var array 
   */
  public $tableColumns;

  /**
   * Current controller instance.
   * 
   * @var CI_Controller 
   */
  protected $controllerInstance;

  /**
   * Set table name.
   */
  abstract public function setTableName();

  /**
   * Set table columns.
   */
  abstract public function setTableColumns();

  /**
   * Class constructor.
   */
  public function __construct() {
    parent::__construct();
    $this->controllerInstance = & get_instance();
    $this->setTableName();
    $this->setTableColumns();
    $this->tableId = 'id';
  }

  /**
   * Set table primary key.
   * 
   * @param string $tableId
   */
  public function setTableId($tableId) {
    $this->tableId = $tableId;
  }

  /**
   * Find all rows.
   * 
   * @return CI_DB_result
   */
  public function findAll() {
    $this->db->order_by('id', 'DESC');
    $query = $this->db->get($this->tableName);
    return $query;
  }

  /**
   * Find row by primary key.
   * 
   * @param int $id
   * @return array
   */
  public function findById($id) {
    $this->db->where($this->tableId, $id);
    $query = $this->db->get($this->tableName);
    return $query->row();
  }

  /**
   * Find rows find list of array key and values.
   * 
   * @param array $arrayKeys
   * @return CI_DB_result Database result
   */
  public function findByArrayKey($arrayKeys) {

    $query = $this->db->get_where($this->tableName, $arrayKeys);
    return $query;
  }

  /**
   * Insert or update row.
   * 
   * @param array $data
   */
  public function save($data) {
    if (isset($data[$this->tableId])) {
      $id = $data[$this->tableId];
      unset($data[$this->tableId]);
      return $this->updateById($id, $data);
    } else {
      return $this->insert($data);
    }
  }

  public function insert($data) {
    $dataValidated = $this->validateDate($data);
    $this->db->insert($this->tableName, $dataValidated);
    return $this->db->insert_id();
  }

  public function updateById($id, $data) {
    $dataValidated = $this->validateDate($data);
    $this->db->where($this->tableId, $id);
    $this->db->update($this->tableName, $dataValidated);
    return $this->db->affected_rows();
  }

  public function deleteById($id) {
    $this->db->delete($this->tableName, array($this->tableId => $id));
    return $this->db->affected_rows();
  }

  private function validateDate($data) {
    $dataValidated = array();
    foreach ($this->tableColumns as $column) {
      if (isset($data[$column])) {
        if ($column != 'password') {
          $dataValidated[$column] = $data[$column];
        } else {
          if (!empty($data[$column])) {
            $dataValidated[$column] = sha1($data[$column]);
          }
        }
      }
    }

    return $dataValidated;
  }

}
