# TalkingCampus

In ambiente Windows, cio che bisogna fare per utilizzare Talking Campus è:
- inizializzare il database Mongo, lanciando lo script contenuto nella folder mongo_scripts
- lanciare il comando "npm install" all'interno della directory del progetto per installare le dipendenze
- lanciare il comando "npm run frontend-start" per lanciare il frontend dell'applicazione
- lanciarei il comando "npm run backend-start" per lanciare il backend dell'applicazione 

Qualora si scelga di lanciare l'applicazione via Docker, è necessario lanciare i seguenti comandi nella directory del progetto:
- docker-compose down -v (per eliminare qualunque versione datata, rimuovendo anche eventuali volumi)
- docker-compose up --build -d (per buildare il progetto e lanciare l'applicazione in modalità "detached")
