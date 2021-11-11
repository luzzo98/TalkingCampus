# TalkingCampus

In ambiente Windows, i task da eseguire per lanciare correttamente Talking Campus sono:
- inizializzare il database Mongo, lanciando lo script contenuto nella folder mongo_scripts
- lanciare il comando "npm install" all'interno della directory del progetto per installare le dipendenze
- all'interno della sotto-directory "frontend", lanciare il comando "npm run frontend-start" per lanciare il frontend dell'applicazione
- nella sotto-directory "backend", lanciare il comando "npm run backend-start" per lanciare il backend dell'applicazione 

In ambiente Linux, qualora si scelga di lanciare l'applicazione via Docker, è necessario lanciare i seguenti comandi nella directory del progetto:
- docker-compose down -v (per eliminare qualunque versione datata, rimuovendo anche eventuali volumi)
- docker-compose up --build -d (per buildare il progetto e lanciare l'applicazione in modalità "detached")
