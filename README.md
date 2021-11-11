# TalkingCampus

In ambiente Windows, i task da eseguire per lanciare correttamente Talking Campus sono:
- inizializzare il database Mongo, lanciando lo script contenuto nella folder "mongo_scripts"
- Dopo aver aperto una prima shell e essersi posizionati all'interno della sotto-directory "frontend" lanciare:
  -  "npm install" per installare le dipendenze
  -  "npm run frontend-start" per eseguire il frontend dell'applicazione
- dalla sotto-directory "backend" lanciare, invece, in un'altra shell:
  - "npm install" per installare le dipendenze
  - "npm run backend-start" per eseguire il frontend dell'applicazione
In ambiente Linux, qualora si scelga di lanciare l'applicazione via Docker, è necessario lanciare i seguenti comandi nella directory del progetto:
- docker-compose down -v (per eliminare qualunque versione datata, rimuovendo anche eventuali volumi)
- docker-compose up --build -d (per buildare il progetto e lanciare l'applicazione in modalità "detached")
