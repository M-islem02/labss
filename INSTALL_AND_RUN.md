# Install And Run Instructions

This guide is for cloning, installing, and running the full lab project on another Windows PC.

The repository contains two parts:

- `Laboratory-Simulator-sparse` - Unity 3D / WebGL laboratory simulator.
- `venerable-sprite-294b65-local` - local website with lab pages and JavaScript simulations.

## 1. Install Required Programs

Open PowerShell as Administrator and run:

```powershell
winget install --id Git.Git -e
winget install --id GitHub.GitLFS -e
winget install --id Python.Python.3.12 -e
winget install --id Unity.UnityHub -e
```

Close PowerShell, open a new PowerShell window, then check the installations:

```powershell
git --version
git lfs version
python --version
```

Install Unity Editor from Unity Hub:

```text
Unity version: 2017.4.14f1 LTS
```

In Unity Hub:

```text
Installs -> Install Editor -> Archive -> Download Archive -> Unity 2017.4.14f1
```

If Unity Hub cannot find that exact version, install the closest `2017.4.x LTS` version.

## 2. Clone The Project

Go to Desktop:

```powershell
cd "$env:USERPROFILE\Desktop"
```

Clone the full repo with submodules:

```powershell
git clone --recurse-submodules https://github.com/M-islem02/labss.git LAB
cd LAB
```

Make sure submodules are downloaded:

```powershell
git submodule update --init --recursive
```

Install Git LFS for this PC:

```powershell
git lfs install
```

Download Unity large files:

```powershell
cd .\Laboratory-Simulator-sparse
git lfs pull
cd ..
```

## 3. If Unity Source Folders Are Missing

The Unity source should contain:

```text
Laboratory-Simulator-sparse\Assets\Scripts
Laboratory-Simulator-sparse\Assets\Scenes
Laboratory-Simulator-sparse\Assets\Prefabs
```

Check with:

```powershell
Test-Path .\Laboratory-Simulator-sparse\Assets\Scripts
Test-Path .\Laboratory-Simulator-sparse\Assets\Scenes
Test-Path .\Laboratory-Simulator-sparse\Assets\Prefabs
```

If any command returns `False`, run:

```powershell
cd .\Laboratory-Simulator-sparse
git sparse-checkout disable
git lfs pull
cd ..
```

Check again:

```powershell
Test-Path .\Laboratory-Simulator-sparse\Assets\Scripts
Test-Path .\Laboratory-Simulator-sparse\Assets\Scenes
Test-Path .\Laboratory-Simulator-sparse\Assets\Prefabs
```

## 4. Open The Unity 3D Lab Project

Open Unity Hub:

```powershell
Start-Process "unityhub://"
```

Then in Unity Hub:

```text
Projects -> Add -> Add project from disk
Select: Desktop\LAB\Laboratory-Simulator-sparse
Open with Unity 2017.4.14f1 LTS
```

Or open from PowerShell if Unity is installed in the default Hub folder:

```powershell
& "C:\Program Files\Unity\Hub\Editor\2017.4.14f1\Editor\Unity.exe" -projectPath "$env:USERPROFILE\Desktop\LAB\Laboratory-Simulator-sparse"
```

Main Unity scenes:

```text
Assets\Scenes\LaboratoryApparatusScene.unity
Assets\Scenes\Selection.unity
Assets\Scenes\BiologyExperimentOne.unity
Assets\Scenes\ChemistryExperimentOne.unity
Assets\Scenes\PhysicsExperimentOne.unity
Assets\Scenes\PhysicsExperimentTwo.unity
Assets\Scenes\PhysicsExperimentThree.unity
Assets\Scenes\BiologyExperimentTwo.unity
Assets\Scenes\BiologyExperimentThree.unity
Assets\Scenes\ChemistryExperimentTwo.unity
Assets\Scenes\ChemistryExperimentThree.unity
```

Main Unity code:

```text
Assets\Scripts
```

## 5. Run The Existing Unity WebGL Build Locally

From the repo root:

```powershell
cd "$env:USERPROFILE\Desktop\LAB"
python .\venerable-sprite-294b65-local\serve-local.py --port 4174 --root .\Laboratory-Simulator-sparse\WebBuild\index.html
```

Open in your browser:

```text
http://localhost:4174
```

Stop the server with:

```powershell
Ctrl + C
```

## 6. Run The Website Locally

From the repo root:

```powershell
cd "$env:USERPROFILE\Desktop\LAB\venerable-sprite-294b65-local"
.\start-local.ps1
```

Open in your browser:

```text
http://localhost:4173
```

Direct lab pages:

```text
http://localhost:4173/lab-physique.html
http://localhost:4173/lab-electrique.html
http://localhost:4173/lab-science-cem.html
http://localhost:4173/lab-chimie-lycee.html
```

Stop the server with:

```powershell
Ctrl + C
```

## 7. If PowerShell Blocks Scripts

If `.\start-local.ps1` is blocked, run:

```powershell
Set-ExecutionPolicy -Scope CurrentUser RemoteSigned
```

Then run again:

```powershell
.\start-local.ps1
```

## 8. Build Unity WebGL Again

Open the Unity project first.

Then in Unity:

```text
File -> Build Settings
Platform -> WebGL -> Switch Platform
Build
```

Recommended output folder:

```text
Laboratory-Simulator-sparse\WebBuild
```

There is also an editor build script:

```text
Assets\Editor\WebGLBuild.cs
```

If Unity command line is available, run:

```powershell
& "C:\Program Files\Unity\Hub\Editor\2017.4.14f1\Editor\Unity.exe" -batchmode -quit -projectPath "$env:USERPROFILE\Desktop\LAB\Laboratory-Simulator-sparse" -executeMethod WebGLBuild.BuildForWeb -logFile "$env:USERPROFILE\Desktop\LAB\unity-webgl-build.log"
```

After building, run the WebGL build:

```powershell
cd "$env:USERPROFILE\Desktop\LAB"
python .\venerable-sprite-294b65-local\serve-local.py --port 4174 --root .\Laboratory-Simulator-sparse\WebBuild\index.html
```

Open:

```text
http://localhost:4174
```

## 9. Useful Check Commands

Check repo status:

```powershell
cd "$env:USERPROFILE\Desktop\LAB"
git status
git submodule status
```

Check Unity project status:

```powershell
cd "$env:USERPROFILE\Desktop\LAB\Laboratory-Simulator-sparse"
git status
git remote -v
git lfs ls-files
```

List Unity C# scripts:

```powershell
cd "$env:USERPROFILE\Desktop\LAB\Laboratory-Simulator-sparse"
Get-ChildItem -Recurse -Filter *.cs .\Assets
```

List Unity scenes:

```powershell
cd "$env:USERPROFILE\Desktop\LAB\Laboratory-Simulator-sparse"
Get-ChildItem -Recurse -Filter *.unity .\Assets
```

## 10. Common Problems

If Git is not recognized:

```powershell
winget install --id Git.Git -e
```

Then close and reopen PowerShell.

If Python is not recognized:

```powershell
winget install --id Python.Python.3.12 -e
```

Then close and reopen PowerShell.

If Unity opens but scripts are missing:

```powershell
cd "$env:USERPROFILE\Desktop\LAB\Laboratory-Simulator-sparse"
git sparse-checkout disable
git lfs pull
```

If the WebGL page is blank, do not open `index.html` by double-clicking it. Run it through the Python server:

```powershell
cd "$env:USERPROFILE\Desktop\LAB"
python .\venerable-sprite-294b65-local\serve-local.py --port 4174 --root .\Laboratory-Simulator-sparse\WebBuild\index.html
```

If the browser blocks the page, try:

```text
http://127.0.0.1:4174
```

