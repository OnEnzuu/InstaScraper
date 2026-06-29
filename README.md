# InstaScraper

[Italiano](#italiano) | [English](#english)

---

## Italiano

Un tool progettato per estrarre (scrape) post da un profilo Instagram specifico filtrandoli per parola chiave.

### 🚀 Funzionalità

*   **Estrazione basata su parole chiave:** Cerca e restituisce il testo dei post che contengono una determinata parola chiave.
*   **Autenticazione Sicura:** Supporta l'accesso sia tramite username/password sia tramite Session ID, sfruttando l'API mobile per ridurre il rischio di blocchi (errori 429).
*   **Ripresa dell'Estrazione:** Utilizza un sistema a cursore (cursor) per riprendere lo scraping da dove si era interrotto, molto utile per profili con un gran numero di post.
*   **Interfaccia User-Friendly:** Frontend moderno, intuitivo e reattivo, costruito con React e Vite.

### 🛠️ Tecnologie Utilizzate

*   **Backend:** Python con [FastAPI](https://fastapi.tiangolo.com/).
*   **Libreria di Scraping:** [instagrapi](https://github.com/adw0rd/instagrapi) (simulazione delle chiamate client dell'App iOS/Android di Instagram).
*   **Frontend:** React (Vite) con Lucide React per la gestione delle icone.

### ⚙️ Installazione e Avvio

1.  Assicurati di avere **Python** e **Node.js** installati sul tuo sistema.
2.  Installa le dipendenze per il backend spostandoti nella cartella `backend` e configurando l'ambiente virtuale (`venv`). Le dipendenze si trovano nel file `requirements.txt`.
3.  Installa le dipendenze per il frontend spostandoti nella cartella `frontend` ed eseguendo il comando `npm install`.
4.  Per avviare rapidamente l'intera applicazione, fai doppio clic sul file batch:
    *   `avvia_app.bat`
    *   Questo script avvierà sia il server FastAPI per il backend (sulla porta 8000) sia il server di sviluppo Vite per il frontend, aprendo in automatico la pagina nel tuo browser (di default `http://localhost:5173`).

---

## English

A tool designed to scrape posts from a specific Instagram profile, filtering them by keyword.

### 🚀 Features

*   **Keyword-based Scraping:** Searches and returns the text of posts containing a specific keyword.
*   **Secure Authentication:** Supports login via both username/password and Session ID, leveraging the mobile API to reduce the risk of blocks (429 errors).
*   **Resume Scraping:** Uses a cursor system to resume scraping from where it was paused, very useful for profiles with a large number of posts.
*   **User-Friendly Interface:** Modern, intuitive, and responsive frontend built with React and Vite.

### 🛠️ Technologies Used

*   **Backend:** Python with [FastAPI](https://fastapi.tiangolo.com/).
*   **Scraping Library:** [instagrapi](https://github.com/adw0rd/instagrapi) (simulates client calls from the Instagram iOS/Android App).
*   **Frontend:** React (Vite) with Lucide React for icon management.

### ⚙️ Installation and Setup

1.  Make sure you have **Python** and **Node.js** installed on your system.
2.  Install backend dependencies by navigating to the `backend` folder and setting up the virtual environment (`venv`). Dependencies are listed in `requirements.txt`.
3.  Install frontend dependencies by navigating to the `frontend` folder and running `npm install`.
4.  To quickly start the entire application, double-click the batch file:
    *   `avvia_app.bat`
    *   This script will launch both the FastAPI backend server (on port 8000) and the Vite frontend dev server, automatically opening the application in your browser (defaulting to `http://localhost:5173`).
