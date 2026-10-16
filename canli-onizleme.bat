@echo off
chcp 65001 >nul
title aytacbingol.com - Canli Onizleme
cd /d "%~dp0"

echo.
echo  aytacbingol.com canli onizleme
echo  --------------------------------
echo.

rem Yeni kurulan Node.js ve Git'i Windows henuz tanimiyorsa standart klasorlerden ekle
if exist "%ProgramFiles%\nodejs\node.exe" set "PATH=%ProgramFiles%\nodejs;%PATH%"
if exist "%ProgramFiles%\Git\cmd\git.exe" set "PATH=%ProgramFiles%\Git\cmd;%PATH%"
if exist "%LocalAppData%\Programs\Git\cmd\git.exe" set "PATH=%LocalAppData%\Programs\Git\cmd;%PATH%"
if exist "%ProgramFiles(x86)%\Git\cmd\git.exe" set "PATH=%ProgramFiles(x86)%\Git\cmd;%PATH%"

where node >nul 2>nul
if errorlevel 1 (
  echo  Node.js bulunamadi. https://nodejs.org adresinden LTS surumunu kurup bu dosyayi tekrar calistir.
  pause
  exit /b 1
)
where git >nul 2>nul
if errorlevel 1 (
  echo  Git bulunamadi. https://git-scm.com adresinden kurup bu dosyayi tekrar calistir.
  pause
  exit /b 1
)

rem Dosya tek basina indirildiyse projeyi yanindaki klasore indir
if not exist ".git" (
  if not exist "AytacbingolPortfolio\.git" (
    echo  Proje GitHub'dan indiriliyor...
    git clone https://github.com/aytacbingol-source/AytacbingolPortfolio
    if errorlevel 1 (
      echo  Indirme basarisiz. Internet baglantini ve GitHub erisimini kontrol et.
      pause
      exit /b 1
    )
  )
  cd /d "%~dp0AytacbingolPortfolio"
)

echo  dev dali aliniyor...
git fetch origin dev
git checkout dev
git pull --ff-only origin dev

echo  Paketler kuruluyor (ilk seferde birkac dakika surebilir)...
call npm install

echo  Site baslatiliyor: http://localhost:3000
start "aytacbingol.com - Sunucu" cmd /k "npm run dev"

timeout /t 8 /nobreak >nul
start "" http://localhost:3000

echo.
echo  Bu pencere acik kaldikca GitHub'daki yeni degisiklikler her 5 saniyede bir otomatik cekilir.
echo  Kapatmak icin bu pencereyi ve "Sunucu" penceresini kapat.
echo.

:dongu
git fetch -q origin dev
for /f %%i in ('git rev-parse HEAD') do set YEREL=%%i
for /f %%i in ('git rev-parse origin/dev') do set UZAK=%%i
if not "%YEREL%"=="%UZAK%" (
  echo  [%time:~0,8%] Yeni degisiklik geldi, guncelleniyor...
  git pull -q --ff-only origin dev
  git diff --name-only %YEREL% %UZAK% | findstr /i "package.json package-lock.json" >nul && call npm install
)
timeout /t 5 /nobreak >nul
goto dongu
