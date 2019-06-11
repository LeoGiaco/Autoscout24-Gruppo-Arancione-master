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
                case "modify":
                    
                    break;
                case "delete":

                    break;
                case "create":

                    break;
            }
        }
        display();
    }

    function display()
    {
        global $tables;
        global $db;

        $table = $tables[$_POST['num']]->table;
        $columns = $tables[$_POST['num']]->columns;

        $sql = "SELECT * FROM $table";
        $stmt = $db->prepare($sql);
        $stmt->execute();

        $rows = $stmt->fetchAll(PDO::FETCH_ASSOC);

        $part1 = "<table class='table table-striped'><thead><tr>";
        foreach($columns as $col)
            $part1 .= "<th scope='col'>".$col."</th>";
        $part1 .="<th scope='col'>edit</th></tr></thead>";

        echo $part1;

        $part2 = "<tbody>";
        foreach($rows as $row)
        {
            $part2 .= "<tr>";

            $i = 0;
            foreach($row as $col)
            {
                if($i++ < 5)
                    $part2 .= "<td>".$col."</td>";
                else
                    break;
            }
            
            $part2 .= "<td><button type='button' class='btnvisibilita btn btn-outline-primary modifica ' data-toggle='modal'
                    data-target='#modify'><i class='fas fa-cogs'></i></button>
                  <button type='button 'class='btnvisibilita btn btn-outline-primary delete 'data-toggle='modal'
                    data-target='#delete'><i class='far fa-trash-alt'></i></button></td></tr>";
        }
        echo $part2;

        // foreach($rows as $row)
        // {   
        //     $total = implode(' - ', array_slice($row,0,5));

        //     echo "<li class='item row'><div class='col-sm-8'>".$total."</div>
        //     <button type='button' class='btnvisibilita btn btn-outline-primary modifica col-sm-2' data-toggle='modal'
        //       data-target='#Modalmodifica'><i class='fas fa-cogs'></i></button>
        //     <button type='button 'class='btnvisibilita btn btn-outline-primary delete col-sm-2 'data-toggle='modal'
        //       data-target='#ModalDelete'><i class='far fa-trash-alt'></i></button>
        //     </li>";
        // }
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

    function create()
    {
        
    }
?>


