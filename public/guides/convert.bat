@echo off
echo ========================================
echo Tastecert Certification Guide Converter
echo ========================================
echo.

REM Check if Node.js is installed
where node >nul 2>nul
if %ERRORLEVEL% NEQ 0 (
    echo ERROR: Node.js is not installed!
    echo.
    echo Please install Node.js from: https://nodejs.org
    echo Then run this script again.
    pause
    exit /b 1
)

echo [1/3] Checking Node.js... OK
echo.

REM Check if puppeteer is installed locally
if not exist "node_modules\puppeteer" (
    echo [2/3] Installing Puppeteer...
    echo This may take a few minutes on first run...
    echo.
    call npm install puppeteer
    echo.
) else (
    echo [2/3] Puppeteer already installed... OK
    echo.
)

REM Run the conversion
echo [3/3] Converting HTML to PDF...
echo.
node convert-to-pdf.js

if %ERRORLEVEL% EQU 0 (
    echo.
    echo ========================================
    echo SUCCESS! PDF is ready to use.
    echo ========================================
) else (
    echo.
    echo ========================================
    echo ERROR: Conversion failed!
    echo ========================================
)

echo.
pause

