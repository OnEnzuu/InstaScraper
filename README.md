# InstaScraper

Un tool progettato per estrarre (scrape) post da un profilo Instagram specifico filtrandoli per parola chiave.

## 🚀 Funzionalità

*   **Estrazione basata su parole chiave:** Cerca e restituisce il testo dei post che contengono una determinata parola chiave.
*   **Autenticazione Sicura:** Supporta l'accesso sia tramite username/password sia tramite Session ID, sfruttando l'API mobile per ridurre il rischio di blocchi (errori 429).
*   **Ripresa dell'Estrazione:** Utilizza un sistema a cursore (cursor) per riprendere lo scraping da dove si era interrotto, molto utile per profili con un gran numero di post.
*   **Interfaccia User-Friendly:** Frontend moderno, intuitivo e reattivo, costruito con React e Vite.

## 🛠️ Tecnologie Utilizzate

*   **Backend:** Python con [FastAPI](https://fastapi.tiangolo.com/).
*   **Libreria di Scraping:** [instagrapi](https://github.com/adw0rd/instagrapi) (simulazione delle chiamate client dell'App iOS/Android di Instagram).
*   **Frontend:** React (Vite) con Lucide React per la gestione delle icone.

## ⚙️ Installazione e Avvio

1.  Assicurati di avere **Python** e **Node.js** installati sul tuo sistema.
2.  Installa le dipendenze per il backend spostandoti nella cartella `backend` e configurando l'ambiente virtuale (`venv`). Le dipendenze si trovano nel file `requirements.txt`.
3.  Installa le dipendenze per il frontend spostandoti nella cartella `frontend` ed eseguendo il comando `npm install`.
4.  Per avviare rapidamente l'intera applicazione, fai doppio clic sul file batch:
    *   `avvia_app.bat`
    *   Questo script avvierà sia il server FastAPI per il backend (sulla porta 8000) sia il server di sviluppo Vite per il frontend, aprendo in automatico la pagina nel tuo browser (di default `http://localhost:5173`).
