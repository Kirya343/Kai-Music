# Kai Music — Technical Documentation

**Project:** Kai Music  
**Production URL:** https://kaimusic.app/  
**API:** https://api.kaimusic.app/  
**Status:** Production / Beta  
**Documentation version:** 1.0  
**Last updated:** November 10, 2026

---

# 1. Project Overview

## 1.1. Introduction

Kai Music is a web-based music streaming platform designed for personal music libraries and synchronized listening experiences.

The platform allows users to upload audio files, organize music into playlists, control playback and listen to music together in shared listening rooms.

Unlike conventional music streaming services, Kai Music focuses on user-managed audio content and synchronized playback between room participants.

## 1.2. Main Features

- Audio file uploading and management.
- Personal music library.
- Music playback.
- Playlist creation and management.
- Shared listening rooms.
- Synchronized playback between participants.
- Real-time playback state synchronization.
- User authentication and authorization.
- Online user presence.
- Telegram bot integration for uploading audio.
- Progressive Web App support.

## 1.3. Project Goals

The primary goals are:

1. Provide a convenient platform for managing personal music.
2. Support real-time synchronized listening.
3. Maintain low-latency audio delivery.
4. Separate application responsibilities into independent backend modules.
5. Provide an extensible architecture for future functionality.

---

# 2. Technology Stack

## 2.1. Backend

| Technology | Purpose |
|---|---|
| Java 21 | Main programming language |
| Spring Boot 3.5.x | Application framework |
| Spring Security | Authentication and authorization |
| Spring Data JPA | Database access |
| Hibernate | ORM |
| Maven | Build and dependency management |
| WebSocket | Real-time communication |
| STOMP | WebSocket messaging protocol |
| MariaDB 11.4 | Relational database |
| FFmpeg | Audio processing |
| Lombok | Boilerplate reduction |

## 2.2. Frontend

| Technology | Purpose |
|---|---|
| React 19 | UI framework |
| TypeScript | Static typing |
| Vite 8 | Build system and development server |
| SCSS | Styling |
| React Router | Client-side routing |
| WebSocket / STOMP | Real-time communication |
| Media Source Extensions | Audio playback from fragmented media |

## 2.3. Infrastructure

- Docker and Docker Compose.
- Nginx reverse proxy.
- Linux server environment.
- MariaDB containers.
- Cloudflare and DNS management.
- SSL/TLS.
- PWA deployment.

---

# 3. System Architecture

## 3.1. High-Level Architecture

The application follows a client-server architecture.

The frontend communicates with the backend using two primary mechanisms:

- HTTP REST API for conventional application operations.
- WebSocket with STOMP for real-time communication.

The backend manages application logic, persistence, authentication, audio processing and playback synchronization.

## 3.2. Architecture Diagram

```text
                  USER
                    |
                    v
              NGINX / HTTPS
                    |
          +---------+---------+
          |                   |
          v                   v
     FRONTEND              BACKEND
      React               Spring Boot
          |                   |
          |             +-----+------+
          |             |            |
          |             v            v
          |          REST API     WebSocket
          |             |            |
          +-------------+------------+
                        |
                 APPLICATION LAYER
                        |
         +--------------+--------------+
         |              |              |
         v              v              v
    AUTHENTICATION   PLAYBACK        AUDIO
         |              |              |
         +--------------+--------------+
                        |
                        v
                   MARIADB
                        |
                        v
                 AUDIO STORAGE
```

---

# 4. Backend Architecture

## 4.1. Modular Structure

The backend is organized as a Maven multi-module project.

The modules are:

| Module | Responsibility |
|---|---|
| audio | Audio metadata and audio management |
| authentication | User authentication |
| permission | Authorization and access management |
| playback | Playback state and streaming coordination |
| playlist | Playlist management |
| presence | Online users and presence tracking |
| room | Listening rooms |
| storage | File storage abstraction |
| user | User management |
| common | Shared application functionality |
| diagnostics | Application diagnostics |
| security | Security configuration and integration |

Each module is responsible for its own domain and application logic.

The goal is to minimize unnecessary dependencies between modules and maintain clear boundaries.

## 4.2. Architectural Layers

The newer module structure follows a layered architecture.

### Domain Layer

Contains business concepts and domain models.

Examples from the playback module:

- PlaybackState
- UserPlayback
- RoomPlaybackContext

The domain layer should not depend on HTTP controllers or presentation-specific implementations.

### Application Layer

Contains application use cases and orchestration.

Examples:

- Commands.
- Command handlers.
- Application services.

The application layer coordinates domain operations and infrastructure through defined dependencies.

### Presentation Layer

Contains external communication interfaces.

Examples:

- REST controllers.
- WebSocket services.
- Message handlers.

The presentation layer translates incoming requests into application operations.

## 4.3. Dependency Direction

The architecture aims to maintain the following dependency direction:

```text
Presentation
     |
     v
Application
     |
     v
Domain
```

Infrastructure integrations are kept outside the domain model.

---

# 5. Authentication and Authorization

## 5.1. Authentication

The authentication module is responsible for establishing user identity.

The application uses Spring Security for security integration.

Authentication and authorization are separate responsibilities.

Authentication answers:

"Who is the current user?"

Authorization answers:

"Is this user allowed to perform this operation?"

## 5.2. Authorization

The permission module manages access rights.

Permission checks should be performed at the backend level.

Frontend route protection is intended to improve navigation and user experience, not replace backend authorization.

## 5.3. Private Routes

Protected frontend routes use authentication state.

Unauthenticated users are redirected to the login page.

Authentication loading must be considered before redirecting to avoid incorrect navigation during initialization.

---

# 6. Audio Management

## 6.1. Audio Files

The audio module manages audio-related application data.

Responsibilities include:

- Audio metadata.
- Audio file access.
- Audio file processing.
- Audio storage integration.
- Audio identification and related metadata.

Audio files are stored separately from relational application data.

The database maintains references and metadata rather than serving as the primary binary storage mechanism.

## 6.2. Audio Processing

FFmpeg is used for audio processing and conversion.

The streaming pipeline uses AAC audio encoded into fragmented MP4.

Current encoding configuration:

- Codec: AAC.
- Bitrate: 192 kbit/s.
- Container: fragmented MP4.
- MIME type: audio/mp4.
- Codec identifier: mp4a.40.2.

---

# 7. Audio Streaming Architecture

## 7.1. Overview

Kai Music uses server-controlled fragmented MP4 streaming.

The backend generates media fragments and delivers them to connected clients through WebSocket.

The frontend uses Media Source Extensions (MSE) to append received fragments to a SourceBuffer.

This architecture allows playback to begin from an arbitrary position without requiring the browser to download the complete audio file.

## 7.2. Streaming Pipeline

```text
             AUDIO FILE
                  |
                  v
             AUDIO STORAGE
                  |
                  v
             FFmpeg / AAC
                  |
                  v
          FRAGMENTED MP4
                  |
                  v
            CHUNK WORKER
                  |
                  v
             WEBSOCKET
                  |
                  v
             FRONTEND
                  |
                  v
          MEDIA SOURCE API
                  |
                  v
             SOURCE BUFFER
                  |
                  v
             AUDIO OUTPUT
```

## 7.3. Chunk Delivery

The backend generates and delivers audio chunks periodically.

Known implementation parameters:

| Parameter | Value |
|---|---|
| Chunk interval | 3 seconds |
| Paused buffer target | 15 seconds |
| Audio codec | AAC |
| Bitrate | 192 kbit/s |
| Container | Fragmented MP4 |

These are implementation parameters, not guarantees about actual network latency.

## 7.4. Per-User Streaming State

Each listener can maintain an individual streaming context.

The backend tracks:

- User-specific chunkers.
- Initialization state.
- Buffered position.
- Chunk sequence.
- Listener connection state.

This is important because users can join a room at different playback positions.

## 7.5. Initialization Segment

Fragmented MP4 requires an initialization segment before media fragments can be appended.

The frontend must correctly distinguish initialization chunks from regular media chunks.

Chunk ordering must be preserved using sequence information.

## 7.6. Frontend Playback

The frontend streaming implementation is divided into separate responsibilities:

- `useMediaSource` — MediaSource lifecycle.
- `useAudioBuffer` — SourceBuffer and chunk queue management.
- `usePlayback` — playback state and controls.
- `useAudioPlayer` — integration of playback and media streaming.

The frontend receives chunks through the user-specific WebSocket destination:

`/user/queue/audio`

The implementation must account for:

- SourceBuffer update lifecycle.
- Append queue synchronization.
- Initialization segments.
- Seek operations.
- Playback interruption.
- SourceBuffer cleanup.
- Asynchronous buffer errors.

---

# 8. Playback Module

## 8.1. Responsibility

The playback module coordinates playback state and audio delivery.

It is responsible for:

- Playback state management.
- Playback commands.
- Current playback target.
- Room playback coordination.
- Streaming worker lifecycle.
- Playback synchronization.

## 8.2. Domain Models

### PlaybackState

Represents playback state associated with a target.

The target is identified by:

- targetId
- targetType

### UserPlayback

Represents a user's current playback target.

The model uses:

- userSub
- targetId
- targetType

A user has an individual playback context.

The database enforces uniqueness for the user playback relationship.

### RoomPlaybackContext

Represents runtime playback information associated with a listening room.

It provides the context needed to coordinate room playback and connected listeners.

## 8.3. Playback Modes

The supported playback modes are:

1. NORMAL
2. REPEAT_ALL
3. SHUFFLE
4. REPEAT_ONE

These modes control how the next queue entry is selected.

## 8.4. Playback Commands

The application uses command-oriented operations.

Known operations include:

- Next track.
- Previous track.
- Update playback state.
- Start or resume playback.
- Pause playback.
- Seek to a position.

The exact command payloads and validation rules must be documented from the current command classes.

---

# 9. Listening Rooms

## 9.1. Overview

Listening rooms allow multiple users to listen to the same music session.

The room provides a shared playback context.

Participants receive synchronized playback updates and audio data.

## 9.2. Room Responsibilities

The room module manages room-related application functionality.

The playback module manages playback behavior associated with rooms.

The presence module tracks connected users.

These responsibilities should remain separate.

## 9.3. Room Queue

The room queue is represented by a playlist owned by the room.

This is distinct from a user's personal playlists.

The room queue determines which audio entries are available for room playback.

## 9.4. Listener Management

The runtime listening context tracks connected listeners.

When a user connects:

- Their playback state can be synchronized.
- Their streaming context can be initialized.
- They can receive room updates.

When a user disconnects:

- Their listener state is removed.
- User-specific streaming resources can be cleaned up.

---

# 10. Playlist Module

The playlist module manages playlists and their entries.

Two important use cases exist:

**Personal playlists**

Playlists owned and managed by individual users.

**Room playlists**

Playlists associated with listening rooms and used as shared playback queues.

The distinction between playlist ownership and playback context is important.

A room queue should not be treated as a user's personal playlist.

Detailed CRUD contracts, ordering rules and validation requirements must be documented from the current implementation.

---

# 11. Presence Module

The presence module tracks online users and their connection state.

Presence is a runtime concern and should not be used as a replacement for persistent user or playback data.

Its responsibilities include:

- Tracking online users.
- Tracking connection lifecycle.
- Supporting listener information.
- Providing runtime presence information to other application modules.

---

# 12. WebSocket Communication

## 12.1. Overview

The application uses STOMP over WebSocket for real-time communication.

WebSocket is used for:

- Playback state synchronization.
- Audio chunk delivery.
- Room updates.
- Real-time participant information.

## 12.2. Known Destinations

The following destinations have appeared in the application implementation:

| Destination | Purpose |
|---|---|
| `/user/queue/audio` | Private audio chunk delivery |
| `/topic/room/{id}/audio` | Room audio topic |
| `/topic/room/playback/{id}` | Room playback updates |
| `/app/room/load` | Room loading command |
| `/app/room/next` | Next track command |
| `/app/room/prev` | Previous track command |
| `/app/room/update-playback-state` | Playback state update |

These destinations should be verified against the current WebSocket configuration and message handlers before being treated as the complete public contract.

## 12.3. Message Delivery

Private user destinations are used for user-specific audio delivery.

Room topics are used for shared room events.

The distinction allows the server to deliver personalized streaming data while maintaining shared playback state.

---

# 13. Frontend Architecture

## 13.1. Overview

The frontend is a React application written in TypeScript.

Vite is used for development and production builds.

React Router manages client-side navigation.

## 13.2. Main Responsibilities

The frontend is responsible for:

- User interface rendering.
- Authentication state.
- Music library presentation.
- Playlist management.
- Room interfaces.
- Playback controls.
- Audio buffering.
- Real-time communication.
- Responsive layouts.
- PWA functionality.

## 13.3. Audio Player

The player is separated into multiple hooks to avoid mixing media lifecycle management with playback business logic.

The main integration point is:

`useAudioPlayer(roomId)`

It combines media source management and playback behavior.

## 13.4. Virtualization

Large music libraries require efficient rendering.

Virtualized lists are used to avoid rendering every track simultaneously.

This is particularly important for libraries containing hundreds of audio entries.

## 13.5. Styling

The application uses SCSS.

The visual system includes shared glass-style mixins and responsive breakpoints.

Known breakpoints:

- 1350px
- 1150px
- 900px
- 600px

---

# 14. Database Architecture

## 14.1. Database Engine

MariaDB 11.4 is used for persistent application data.

## 14.2. Persistence Responsibilities

The database stores structured application information, including:

- Users.
- Audio metadata.
- Playlists.
- Playlist entries.
- Rooms.
- Playback state.
- User playback relationships.
- Permission-related data.

The exact table names, foreign keys, indexes and column definitions must be generated from the current migrations or entity mappings.

## 14.3. Persistence Principles

Important architectural principles:

1. Persistent domain state should be separated from runtime state.
2. User playback context should not be conflated with room playback state.
3. Room queues should be represented independently of personal playlists.
4. Binary audio storage should be separated from relational metadata.

---

# 15. Storage Architecture

The storage module provides an abstraction for file storage.

Its purpose is to prevent application modules from depending directly on a particular storage implementation.

The audio module uses storage functionality to retrieve and manage audio files.

The exact storage provider, path layout, file naming strategy and access restrictions must be documented from the implementation.

---

# 16. Telegram Integration

Kai Music includes a Telegram bot integration for uploading audio.

The bot provides an alternative upload entry point.

The bot and main web application are separate integration components.

The bot interacts with the backend's audio functionality rather than requiring users to upload files exclusively through the browser.

The exact bot commands, authorization flow and supported file types require verification from the bot source code.

---

# 17. Deployment Architecture

## 17.1. Infrastructure

The production environment uses Docker Compose.

Known services:

| Service | Responsibility |
|---|---|
| kai-backend | Spring Boot backend |
| kai-backend-db | Main application database |
| kai-bot-db | Bot database |
| kai-frontend | Frontend service |
| kai-nginx | Reverse proxy |

## 17.2. Network Architecture

Nginx acts as the public-facing reverse proxy.

The backend is not intended to expose its internal application port directly to the public internet.

Known internal Nginx binding:

`127.0.0.1:18081:80`

Public access is handled through the configured domain and proxy infrastructure.

## 17.3. Deployment Process

The general deployment process:

1. Build the frontend.
2. Build the backend using Maven.
3. Build Docker images.
4. Start or update containers.
5. Verify database connectivity.
6. Verify backend health.
7. Verify frontend availability.
8. Verify WebSocket connectivity.
9. Verify audio upload and playback.

Exact commands should be maintained alongside the production Compose configuration.

## 17.4. Database Management

Database backups and migrations should be handled independently of container lifecycle.

A database dump has previously been used for migration.

Production database names and credentials must be taken from the actual deployment configuration rather than assumed.

---

# 18. Development Environment

## 18.1. Backend Requirements

- Java 21.
- Maven.
- MariaDB.
- FFmpeg.
- IDE with Java support.

## 18.2. Frontend Requirements

- Node.js.
- Yarn 4.
- Vite.
- TypeScript-compatible IDE.

The project uses Yarn 4.16.0.

## 18.3. Local Development

Backend and frontend can be developed independently.

The frontend communicates with the backend through configured HTTP and WebSocket addresses.

CORS and WebSocket origin configuration must match the actual frontend development address.

---

# 19. Security Considerations

The following security requirements apply:

- Authentication must be validated by the backend.
- Authorization must not rely on frontend route protection.
- Private audio destinations must be user-specific.
- Room operations must validate membership and permissions.
- File uploads must validate file type and size.
- Storage paths must not allow arbitrary filesystem access.
- Secrets must not be committed to source control.
- Database services should not be publicly exposed without a specific requirement.
- Production communication should use HTTPS and secure WebSocket connections.

---

# 20. Error Handling and Diagnostics

The application includes a diagnostics module.

The developer has also created a separate Java Control Terminal library.

The terminal is designed to run independently of Spring Boot and can integrate with Spring through an adapter.

Known diagnostic functionality includes:

- Application logs.
- Room information.
- Room worker information.
- Playback room diagnostics.

The terminal is an operational tool and should not become a dependency of the core business domain.

---

# 21. Known Limitations and Future Development

The project is continuously developed.

Known development priorities include:

- Administration panel.
- Further testing of streaming lifecycle management.
- More complete operational diagnostics.
- Continued frontend and backend integration testing.
- Improvements to user and room management.
- Additional documentation of public API contracts.

These items should be updated as functionality is completed.

---

# 22. Architectural Principles

The following principles guide the development of Kai Music:

1. Separation of business responsibilities.
2. Modular backend architecture.
3. Separation of domain logic from presentation.
4. Explicit application commands and handlers.
5. Separation of persistent state and runtime state.
6. Independent user and room playback contexts.
7. Real-time communication through WebSocket.
8. User-specific streaming contexts.
9. Storage abstraction.
10. Backend-enforced security.

---

# 23. Documentation Maintenance

This document describes the architectural and technical overview of Kai Music.

It should be supplemented with the following implementation-level documentation:

- Complete REST API reference.
- WebSocket message contracts.
- Database schema.
- Entity relationships.
- Environment variables.
- Docker deployment instructions.
- Authentication flow.
- Permission model.
- Audio streaming protocol.
- Telegram bot commands.
- Troubleshooting guide.

Implementation-specific documentation should always reflect the current source code rather than historical design decisions.