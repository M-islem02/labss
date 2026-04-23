$ErrorActionPreference = 'Stop'

$projectRoot = Split-Path -Parent $MyInvocation.MyCommand.Path
$port = 4173

Set-Location -LiteralPath $projectRoot
Write-Host "Serving recovered site at http://localhost:$port"
python .\serve-local.py --port $port --root $projectRoot
