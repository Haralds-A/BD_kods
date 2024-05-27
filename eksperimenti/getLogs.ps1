


# Izgūst notikumus TestZurnali notikumu skatā
$zurnali = Get-WinEvent -LogName TestZurnali | Select-Object Id, ProviderName, @{Name='TimeCreated'; Expression={$_.TimeCreated.ToUniversalTime().ToString('yyyy-MM-ddTHH:mm:ssZ')}}, LevelDisplayName, Message
# Pārveido žurnālus par JSON formāta ierakstiem
$jsonString = $zurnali | ConvertTo-Json
# Ieraksta šo JSON pagaidu failā
$pagFailaVieta = [System.IO.Path]::GetTempFileName()
$jsonString | Set-Content -Path $pagFailaVieta
# Izsauc attiecīgo Javascript skriptu un padod tam pagaidu faila atrašanās vietu
& "node" "blockCopy.js" $pagFailaVieta
# tiek dzēsts šis pagaidu fails
Remove-Item -Path $pagFailaVieta



    




    
    


