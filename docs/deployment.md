# Deployment

## Server Commands

### Deploy Applications

Pull the latest changes from GitHub and rebuild/restart Docker services:

```bash
./deploy.sh
```

### Backend Diagnostics

Attach to the running backend container to access the diagnostic console:

```bash
docker attach kai-backend
```

Detach without stopping the application: press `Ctrl + P`, then `Ctrl + Q`.

### Docker Management

Check the status of all services:

```bash
docker compose ps
```

View backend logs:

```bash
docker logs -f kai-backend
```

Restart the backend:

```bash
docker compose restart backend
```

### Client Commands

#### Connect to the Server

Connect to the server via SSH:

```bash
ssh kai@185.176.94.192
```