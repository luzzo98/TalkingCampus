# TalkingCampus

In ambiente Windows, i task da eseguire per lanciare correttamente Talking Campus sono:
- inizializzare il database Mongo, lanciando lo script contenuto nella folder "mongo_scripts"
- lanciare il comando "npm install" all'interno della main directory del progetto per installare le dipendenze
- dopo essersi posizionati all'interno della sotto-directory "frontend", lanciare in una shell il comando "npm run frontend-start" per eseguire il frontend dell'applicazione
- dalla sotto-directory "backend" lanciare invece in un'altra shell il comando "npm run backend-start" per lanciare il backend dell'applicazione 

In ambiente Linux, qualora si scelga di lanciare l'applicazione via Docker, è necessario lanciare i seguenti comandi nella directory del progetto:
- docker-compose down -v (per eliminare qualunque versione datata, rimuovendo anche eventuali volumi)
- docker-compose up --build -d (per buildare il progetto e lanciare l'applicazione in modalità "detached")
