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

    $sql = "SELECT table_name, column_name FROM information_schema.columns WHERE table_type = 'base table'";
    $stmt = $db->prepare($sql);
    $stmt->execute();

    $rows = $stmt->fetchAll(PDO::FETCH_ASSOC);

    foreach($rows as $row)
    {
        array_push($tables, new Pair($row['table_name']);
    }

    $tables = [
        new Pair("tblCambio", "TipoDiCambio"),
        new Pair("tblCarburanti", "Carburante"),
        new Pair("tblCarrozzerie", "TipoCarrozzeria"),
        new Pair("tblClasseEmissioni", "Classe"),
        new Pair("tblColori", "Colore"),
        new Pair("tblInterni", "Interni"),
        new Pair("tblOptional", "NomeOptional"),
        new Pair("tblRegioni", "Regione"),
        new Pair("tblStato", "Stato"),
        new Pair("tblTipoProprietario", "TipoProprietario"),
        new Pair("tblTrazione", "TipoDiTrazione"),
        new Pair("tblVernici", "Vernice")
    ];

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
            echo "<p class='display'>".$row[$column]."</p>";
        }
    }

?>

<!DOCTYPE html>
    <head>
        <meta charset="utf-8">
        <meta http-equiv="X-UA-Compatible" content="IE=edge">
        <title></title>
        <meta name="description" content="">
        <meta name="viewport" content="width=device-width, initial-scale=1">
        <script src="https://code.jquery.com/jquery-3.4.1.min.js"
            integrity="sha256-CSXorXvZcTkaix6Yvo6HppcZGetbYMGWSFlBw8HfCJo=" crossorigin="anonymous"></script>
        <link rel="stylesheet" href="">
        <script src="temp.js"></script>
    </head>
    <body>
        <button value="0">Ciao</button>        
    </body>
</html>

