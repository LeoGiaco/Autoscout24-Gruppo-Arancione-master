<?php
    class Pair
    {
        public $table;
        public $columns;
        function __construct($tb,$col)
        {
            $this->table = $tb;
            $this->columns = $col;
        }
    }

    try         // Connessione al databse.
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

    $sql = "SELECT TABLE_NAME, COLUMN_NAME from INFORMATION_SCHEMA.COLUMNS
                where SUBSTRING(TABLE_NAME,0,2) = 't' ORDER BY TABLE_NAME"; // Seleziona i nomi delle tabelle e delle colonne.
    $stmt = $db->prepare($sql);
    $stmt->execute();

    $rows = $stmt->fetchAll(PDO::FETCH_ASSOC);

    foreach($rows as $row)
    {
        $index = checkExistence($row['TABLE_NAME']);    // Controlla se la tabella è già presente.
        if($index != -1)
        {
            if(count($tables[$index]->columns) < 5)
                array_push($tables[$index]->columns,$row['COLUMN_NAME']);   // Aggiunge una colonna a una tabella esistente.
        }
        else
            array_push($tables, new Pair($row['TABLE_NAME'], array($row['COLUMN_NAME'])));  // Aggiunge una nuova tabella.
    }

    if(isset($_POST['num']))
    {
        if(isset($_POST['action']))
        {
            switch($_POST['action'])
            {
                case "modify-show":
                    getTable($tables[$_POST['num']]->table, $_POST['row-index']);
                    break;
                case "modify":
                    modify($tables[$_POST['num']]->table, $_POST['row-index']);
                    display();
                    break;
                case "delete":
                    delete($tables[$_POST['num']]->table, $_POST['row-index']);
                    display();
                    break;
                case "getall":
                    getTable($tables[$_POST['num']]->table);
                    break;
                case "create":
                    create($tables[$_POST['num']]->table);
                    display();
                    break;
            }
        }
        else
            display();
    }

    function display()
    {
        global $tables;

        $table = $tables[$_POST['num']]->table;
        $columns = $tables[$_POST['num']]->columns;

        $rows = getValues($_POST['num']);

        $part1 = "<table class='table table-striped'><thead><tr>";
        foreach($columns as $colname)
            $part1 .= "<th scope='col'>".$colname."</th>";
        $part1 .="<th scope='col'>edit</th></tr></thead>";

        echo $part1;

        $part2 = "<tbody>";
        foreach($rows as $rowValues)
        {
            $part2 .= "<tr>";

            $i = 0;
            foreach($rowValues as $colValue)
            {
                if($i++ < 5)
                    $part2 .= "<td>".$colValue."</td>";
                else
                    break;
            }
            
            $part2 .= "<td><button type='button' class='btnvisibilita btn btn-warning modify-show' data-toggle='modal'
                    data-target='#modify'><i class='fas fa-cogs'></i></button>
                  <button type='button 'class='btnvisibilita btn btn-warning delete-click 'data-toggle='modal'
                    data-target='#delete'><i class='far fa-trash-alt'></i></button></td></tr>";
        }
        echo $part2;
    }

    function checkExistence($tableName)
    {
        global $tables;
        $index = 0;
        if(count($tables) > 0)
        {
            foreach($tables as $pair)
            {
                if($pair->table == $tableName)
                    return $index;
                $index++;
            }
        }
        return -1;
    }

    function create($tbl)
    {
        $sql = "INSERT INTO $tbl (colonna) VALUES (valori)";
        $stmt = $db->prepare($sql);
        $stmt->execute();
    }

    function modify($tbl, $rowindex)
    {
        global $db;

        $sql = "EXECUTE sp".substr($tbl,3)."Update SET ".$_POST['values']." WHERE ".getPrimaryKey($tbl)."='".getPrimaryKeyValues($tbl)[$rowindex][getPrimaryKey($tbl)]."'";
        $stmt = $db->prepare($sql);
        $stmt->execute();
    }

    function delete($tbl, $rowindex)
    {       
        global $db;

        $sql = "EXECUTE sp".substr($tbl,3)."Delete ".getPrimaryKeyValues($tbl)[$rowindex][getPrimaryKey($tbl)];
        $stmt = $db->prepare($sql);
        $stmt->execute();
    }

    function getTable($name, $rowindex = null)
    {
        $rows = getTableAndColumnsNames($name);

        $values;
        if(isset($rowindex))
            $values = getValues($_POST['num']);

        foreach($rows as $row)
        {
            $textVal = '';
            if(isset($rowindex))
                $textVal = $values[$rowindex][$row['COLUMN_NAME']];

            echo "<div class='modal-body row'>
            <label for='exampleFormControlInput1' class='col-sm-3 '>".$row['COLUMN_NAME'].":</label>
            <input type='text' value='". $textVal ."' class='form-control offset-sm-1 col-sm-8'></div>";
        }
    }

    function getTableAndColumnsNames($tableName)
    {
        global $tables;
        global $db;

        $sql = "SELECT TABLE_NAME, COLUMN_NAME from INFORMATION_SCHEMA.COLUMNS
                where TABLE_NAME = '$tableName'"; // Seleziona il nome della tabella e delle sue colonne.
        $stmt = $db->prepare($sql);
        $stmt->execute();

        return $stmt->fetchAll(PDO::FETCH_ASSOC);
    }

    function getValues($tableIndex)
    {
        global $tables;
        global $db;

        $table = $tables[$tableIndex]->table;
        $columns = $tables[$tableIndex]->columns;

        $sql = "SELECT * FROM $table";
        $stmt = $db->prepare($sql);
        $stmt->execute();

        return $stmt->fetchAll(PDO::FETCH_ASSOC);
    }

    function getPrimaryKey($tableName)
    {
        global $db;

        $sql = "SELECT COLUMN_NAME FROM INFORMATION_SCHEMA.KEY_COLUMN_USAGE
        WHERE OBJECTPROPERTY(OBJECT_ID(CONSTRAINT_SCHEMA + '.' + QUOTENAME(CONSTRAINT_NAME)), 'IsPrimaryKey') = 1
        AND TABLE_NAME = '$tableName'";
        $stmt = $db->prepare($sql);
        $stmt->execute();

        return $stmt->fetchAll(PDO::FETCH_ASSOC)[0]['COLUMN_NAME'];
    }

    function getPrimaryKeyValues($tableName)
    {
        global $db;

        $primaryKeyName = getPrimaryKey($tableName);

        $sql = "SELECT $primaryKeyName FROM $tableName";
        $stmt = $db->prepare($sql);
        $stmt->execute();

        return $stmt->fetchAll(PDO::FETCH_ASSOC);
    }
?>


