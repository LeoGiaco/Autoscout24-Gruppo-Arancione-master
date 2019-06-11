<?php
    class Pair
    {
        public $table;
        public $column;
        function __construct($tb,$col)
        {
            $this->table = $tb;
            $this->column = $col;
        }
    }

    try     
    {
        $dbHostname = "192.168.245.8\\SQLEXPRESS2017";
        $dbName = "AutoScout24GruppoArancione";
        $dbLogin = "sa";
        $dbPassword = "vittorio";
        
        $db = new PDO("sqlsrv:server=$dbHostname;Database=$dbName;ConnectionPooling=0", $dbLogin, $dbPassword);
        $db->setAttribute( PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION );
    } catch (PDOException $e) {
        die("Errore: " . $e->getMessage());  // Termina lo script.
    }

    $tables = array();

    $sql = "SELECT TABLE_NAME, COLUMN_NAME from INFORMATION_SCHEMA.KEY_COLUMN_USAGE
                where SUBSTRING(TABLE_NAME,0,2) = 't' and 
                OBJECTPROPERTY(OBJECT_ID(constraint_schema+'.'+QUOTENAME(CONSTRAINT_NAME)),'IsPrimaryKey')=1";
    $stmt = $db->prepare($sql);
    $stmt->execute();

    $rows = $stmt->fetchAll(PDO::FETCH_ASSOC);

    foreach($rows as $row)
    {
        array_push($tables, new Pair($row['TABLE_NAME'], $row['COLUMN_NAME']));
    }

    // $tables = [
    //     new Pair("tblCambio", "TipoDiCambio"),
    //     new Pair("tblCarburanti", "Carburante"),
    //     new Pair("tblCarrozzerie", "TipoCarrozzeria"),
    //     new Pair("tblClasseEmissioni", "Classe"),
    //     new Pair("tblColori", "Colore"),
    //     new Pair("tblInterni", "Interni"),
    //     new Pair("tblOptional", "NomeOptional"),
    //     new Pair("tblRegioni", "Regione"),
    //     new Pair("tblStato", "Stato"),
    //     new Pair("tblTipoProprietario", "TipoProprietario"),
    //     new Pair("tblTrazione", "TipoDiTrazione"),
    //     new Pair("tblVernici", "Vernice")
    // ];

    if(isset($_POST['num']))
        display();

    function display()
    {
        global $tables;
        global $db;

        $table = $tables[$_POST['num']]->table;
        $column = $tables[$_POST['num']]->column;

        $sql = "SELECT * FROM $table";
        $stmt = $db->prepare($sql);
        $stmt->execute();

        $rows = $stmt->fetchAll(PDO::FETCH_ASSOC);

        foreach($rows as $row)
        {
            // echo "<p class='display'>.$row[$column].</p>";
            echo "<li class='item row'><div class='col-sm-8'>".$row[$column]."</div>
            <button type='button' class='btnvisibilita btn btn-outline-primary modifica col-sm-2' data-toggle='modal'
              data-target='#Modalmodifica'><i class='fas fa-cogs'></i></button>
            <button type='button 'class='btnvisibilita btn btn-outline-primary delete col-sm-2 'data-toggle='modal'
              data-target='#ModlaDelete'><i class='far fa-trash-alt'></i></button>
          </li>";
        }
    }

?>


