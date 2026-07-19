# volt-cierre-check.ps1 — Stop hook: exige el cierre de sesion contra la Boveda central de V.O.L.T.
# Adaptado al sitio web de oito: proyecto INTERNO con ficha UNICA (no bitacora+tracker de cliente).
# Bloquea el fin de la sesion si hoy hubo cambios de estado/documentacion en el proyecto
# pero la ficha central en la Boveda no fue actualizada.
$ErrorActionPreference = 'SilentlyContinue'

# --- Config por proyecto ---
# Ficha central unica del sitio web (proyecto interno)
$fichaCentral = 'C:\Users\sebastian.castro\Documents\oito\V.O.L.T\vault\interno\proyectos\oitoweb.md'
# Superficies que, si cambian hoy, exigen sincronizar la ficha central.
# Solo estado/documentacion — el codigo (src/) es detalle tecnico y NO obliga a cierre.
$indicadores = @('docs', 'CLAUDE.md', 'agents.md')
# ---------------------------

$stdin = [Console]::In.ReadToEnd()
if ($stdin -match '"stop_hook_active"\s*:\s*true') { exit 0 }

$proj = Split-Path -Parent (Split-Path -Parent $PSScriptRoot)
$hoy = (Get-Date).Date

# 1) Hubo trabajo de estado/documentacion hoy en el proyecto local?
$huboTrabajo = $false
foreach ($i in $indicadores) {
    $ruta = Join-Path $proj $i
    if (-not (Test-Path $ruta)) { continue }
    if (Test-Path $ruta -PathType Leaf) {
        if ((Get-Item $ruta).LastWriteTime -ge $hoy) { $huboTrabajo = $true; break }
    }
    else {
        $tocado = Get-ChildItem $ruta -Recurse -Filter *.md -File -ErrorAction SilentlyContinue |
            Where-Object { $_.LastWriteTime -ge $hoy } | Select-Object -First 1
        if ($tocado) { $huboTrabajo = $true; break }
    }
}
if (-not $huboTrabajo) { exit 0 }

# 2) Se hizo el cierre? (la ficha central del sitio tocada hoy)
if ((Test-Path $fichaCentral) -and ((Get-Item $fichaCentral).LastWriteTime -ge $hoy)) { exit 0 }

$msg = 'CIERRE DE SESION PENDIENTE (V.O.L.T.): hoy hubo cambios de estado o documentacion en el sitio web de oito pero la ficha central de la Boveda (vault\interno\proyectos\oitoweb.md) no se actualizo. Antes de terminar, sincroniza SOLO estado (fase, alcance, decisiones, bloqueos; NUNCA detalle tecnico) en esa ficha. Si esta sesion fue SOLO de lectura/consulta, o solo toco codigo sin cambiar el estado del proyecto, puedes terminar sin cierre.'
@{ decision = 'block'; reason = $msg } | ConvertTo-Json -Compress
exit 0
