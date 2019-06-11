<?php
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

    class Pair
    {
        public $table;
        public $column;
        function __construct($tb,$col)
        {
            $table = $tb;
            $column = $col;
        }
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

    

    $table = $tables[$_POST['num']]->$table;
    $column = $tables[$_POST['num']]->$column;

    $sql = "SELECT * FROM :tabella WHERE AnnoNascita > :anno";
    $stmt = $db->prepare($sql);
    $stmt->bindValue(':tabella', $table, PDO::PARAM_STR);
    $stmt->bindValue(':anno', 0, PDO::PARAM_INT);
    $stmt->execute();

    $rows = $stmt->fetchAll(PDO::FETCH_ASSOC);

    foreach($rows as $row)
    {
        echo $row[$column] . '<br />';
    }
    

?>