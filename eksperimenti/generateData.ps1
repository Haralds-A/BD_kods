
$zurnaluSkaits = 10

Write-EventLog -LogName TestZurnali -Source "MyApp" -EventId 401 -Message "Meklejamais zurnals sakuma" -EntryType Information
if ($zurnaluSkaits -gt 2) {

    for ($i = 1; $i -le $zurnaluSkaits-2; $i++) {
        $notikumaId = 400
        $zinojums = "Zurnala ieraksts par notikumu $i"
        Write-EventLog -LogName TestZurnali -Source "MyApp" -EventId $notikumaId -Message $zinojums -EntryType Information
    }
}
Write-EventLog -LogName TestZurnali -Source "MyApp" -EventId 403 -Message "Meklejamais zurnals sakuma" -EntryType Information



