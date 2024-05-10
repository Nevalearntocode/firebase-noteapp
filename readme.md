# A simple note app using Firebase and Next.js

## Features: 
- User authentication
- Create, Read, Update and Delete notes
- Image upload
- Realtime updates

## Known issues:
- Image component from next/image can not find the image in the storage bucket in deployment but regular img tag works fine. (it does however work in development)

## Preqrequisites
- node.js v20.12.2 (this project was created using this version)
- Create a firebase project and enable firestore, storage and authentication (email/password, google)

### Clone the repository
```shell
git clone https://github.com/Nevalearntocode/firebase-noteapp.git
```

### Install the dependencies
```shell
npm i
```

### Environment Variables
```js
NEXT_PUBLIC_FIREBASE_API_KEY=
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=
NEXT_PUBLIC_FIREBASE_PROJECT_ID=
NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=
NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=
NEXT_PUBLIC_FIREBASE_APP_ID=
NEXT_PUBLIC_FIREBASE_MEASUREMENT_ID=
```

### Run the development server
```shell
npm run dev
```

### Firebase setup (deploy the functions and hosting)
```firebase
firebase login
firebase init
firebase deploy
```
**(For feature choose hosting with github, storage and firestore)**
