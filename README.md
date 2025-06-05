[![Review Assignment Due Date](https://classroom.github.com/assets/deadline-readme-button-22041afd0340ce965d47ae6ef1cefeee28c7c493a6346c4f15d667ab976d596c.svg)](https://classroom.github.com/a/N68_urbh)

# 🌐 Fullstackapplikation med React, Express, MongoDB och Google OAuth

## 📌 Sammanfattning

Detta projekt är en fullstackwebbapplikation där användare kan logga in via **Google OAuth 2.0** och spara sina favoritländer samt länder de har rest till.  
Applikationen är byggd med **React**, **Express (Node.js)**, **MongoDB** samt **Passport.js** för autentisering. API-kommunikation sker via **Axios**.  
Projektet är skrivet i **TypeScript** för både frontend och backend.

---

## 🎯 Projektmål

- Skapa en fullstackapplikation med inloggning via Google  
- Säker autentisering med OAuth och Passport  
- Möjlighet att spara och hantera två listor: **favoriter** & **reseplaner**  
- Följa kodstandarder och strukturerad mappstruktur  
- Dokumentera projektet samt skapa en UX-prototyp  

---

## 🧰 Teknisk översikt

### 🔹 Frontend (React + TypeScript)

- React med Vite  
- React Router för navigering  
- Axios för API-anrop  
- Autentisering via React Context  
- Skyddade sidor (kräver inloggning)  

### 🔹 Backend (Node.js + Express + TypeScript)

- Express-server med REST API  
- Passport.js med `passport-google-oauth20`  
- Miljövariabler via `.env`  
- Mongoose-modeller och MongoDB Atlas  
- CRUD-hantering för listor och användardata  

### 🔹 Databas (MongoDB)

- MongoDB Atlas (databasen heter **Wunderlust**)  
- Mongoose-modeller: Användare och Listor 
- CRUD-operationer för användarspecifika listor  

### 🔐 Autentisering

- Google OAuth 2.0  
- Sessionsbaserad autentisering via cookies  
- Passport.js middleware för att skydda API-routes  

---

## 🧪 UX & Design

- UX-prototyp skapad i Figma  
- 🔗 [Figma Wireframe](https://www.figma.com/design/9FqkTAcUZK2xbBiO8F70RC/wireframe?node-id=0-1&p=f&t=sNglw9Haxdf0pFNK-0)  

### Användarflöde

#### Inloggad användare

- Ser startsidan där hen kan se alla länder samt söka efter land via namn.  
- Kan klicka på fliken **Jämför länder** där hen kan jämföra två olika länder mot varandra.  
- Kan navigera till profilsidan efter inloggning.  
- Kan se, lägga till eller ta bort länder i sina listor (**favoriter** & **reseplaner**).

#### Icke inloggad användare

- Ser startsidan där hen kan se alla länder samt söka efter land via namn.  
- Kan klicka på fliken **Jämför länder** för att jämföra två olika länder mot varandra.  
- Har ej tillgång till att skapa eller hantera personliga listor då inloggning krävs.

---
## 📡 Externa API:n

- [REST Countries API](https://restcountries.com) används för att hämta data om världens länder, t.ex. namn, flagga, region, befolkning och annat.

## ▶️ Kom igång

### 🔧 Installation

```bash
git clone https://github.com/chas-academy/u09-business-project-team-wanderlust
```

#### Gå till backend och installera beroenden
cd backend

```bash
npm install
```

#### Gå till frontend och installera beroenden
cd frontend

```bash
npm install
```

### ⚙️ Starta projektet
Se till att .env-filer är korrekt ifyllda för både backend och frontend.

Starta backend och frontend genom att köra följande kommando i respektive mapp:
```bash
npm run dev
```