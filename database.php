<?php
    try     
    {
        $dbHostname = "192.168.245.8\\SQLEXPRESS2017";
        $dbName = "AlitaliaCicognani";
        $dbLogin = "sa";
        $dbPassword = "vittorio";
        
        $db = new PDO("sqlsrv:server=$dbHostname;Database=$dbName;ConnectionPooling=0", $dbLogin, $dbPassword);
        $db->setAttribute( PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION );
    } catch (PDOException $e) {
        die("Errore: " . $e->getMessage());  // Termina lo script.
    }

    $tables = ["tblCambio","tblCarburanti","tblCarrozzerie","tblClasseEmissioni",
                "tblColori","tblInterni","tblOptional","tblRegioni","tblStato",
                "tblTipoProprietario","tblTrazione","tblVernici"];

    $type = $tables[$_POST['num']];

    $sql = "SELECT * FROM :tabella WHERE AnnoNascita > :anno";
    $stmt = $db->prepare($sql);
    $stmt->bindValue(':tabella', $type, PDO::PARAM_STR);
    $stmt->bindValue(':anno', 0, PDO::PARAM_INT);
    $stmt->execute();

    $rows = $stmt->fetchAll(PDO::FETCH_ASSOC);
    usort($rows, "cmp");

    foreach($rows as $row)
    {
        echo $row['Nome'] . ' - ' . $row['Cognome'] . ' - ' . $row['AnnoNascita'] . '<br />';
    }


?>