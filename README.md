# TalkingCampus

Qualora si scelga di lanciare l'applicazione via Docker, è necessario, dopo avere predisposto l'occorrente (Docker & Docker-Compose), lanciare i seguenti comandi nella directory del progetto:
- docker-compose down -v (per eliminare qualunque versione datata, rimuovendo anche eventuali volumi)
- docker-compose up --build -d (per buildare il progetto e lanciare l'applicazione in modalità "detached")
