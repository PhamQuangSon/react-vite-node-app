const express = require('express');
const cors = require('cors');
const app = express();
const port = process.env.PORT || 3001; // Important for Vercel

app.use(cors());
app.use(express.json());

app.get('/api/hello', (req, res) => {
  res.json({ message: 'Hello from the server!' });
});

app.post('/api/data', (req, res) => {
  const data = req.body;
  res.json({ message: 'Data received!', data });
});

app.post('/api/login', async (req, res) => {
  const { email, password } = req.body;
  try {
    // Replace this with your actual authentication logic
    if (email === 'user@example.com' && password === 'password123') {
      res.json({
        uid: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6InVzZXJAZXhhbXBsZS5jb20iLCJpYXQiOjE2MTg3MDk3MTh9.1O3E5cPcJ2Oq9JW6tIv8mF2XNz9-4MYS2RjHeNzj7fU",
        displayName: "Pham Quang Son",
        email: "user@example.com",
        photoURL: "/1.png",
        bio: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s."
      });
    } else {
      res.status(401).json({ message: 'Invalid email or password' });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

app.get('/api/posts', (req, res) => {
  const posts =
    {
      articles: [
        {
          "id": 1,
          "title": "Peacekeeper, The",
          "author": "Pet",
          "email": "pschlagtmans0@51.la",
          "createdAt": "4/9/2023",
          "updatedAt": "12/6/2023",
          "description": "Open bite of left ring finger w/o damage to nail, init",
          "tags": [
            "Turquoise"
          ],
          "image": "/1.png",
          "comments": [
            {
              "id": 111,
              "text": "comment.text",
              "user": {
                "name": "ABC",
                "avatar": "avatar"
              }
            }
          ],
          "clapCount": 222,
          "action": true,
          "content": "But I must explain to you how all this mistaken idea of denouncing pleasure and praising pain was born and I will give you a complete account of the system, and expound the actual teachings of the great explorer of the truth, the master-builder of human happiness. No one rejects, dislikes, or avoids pleasure itself, because it is pleasure, but because those who do not know how to pursue pleasure rationally encounter consequences that are extremely painful. Nor again is there anyone who loves or pursues or desires to obtain pain of itself, because it is pain, but because occasionally circumstances occur in which toil and pain can procure him some great pleasure. To take a trivial example, which of us ever undertakes laborious physical exercise, except to obtain some advantage from it? But who has any right to find fault with a man who chooses to enjoy a pleasure that has no annoying consequences, or one who avoids a pain that produces no resultant pleasure?<figure class='mb-4 block animate animate-fade-down animate-duration-1000 animate-delay-300'><img src='/3.png' class='mb-4 h-auto w-full rounded-lg align-middle leading-none shadow-lg' alt='Taking up Water with a Spoon'><figcaption className='text-sm text-neutral-600 dark:text-neutral-400'>A caption for the above image.</figcaption></figure>My first emoji was the engagement ring, and I chose it because it had challenging textures like metal and a faceted gem, tricky to render for a beginner. The metal ring alone took me an entire day. Pretty soon, however, I could do two a day, then three, and so forth. Regardless of how fast I could crank one out, I constantly checked the details: the direction of the woodgrain, how freckles appeared on apples and eggplants, how leaf veins ran on a hibiscus, how leather was stitched on a football, the details were neverending. I tried really hard to capture all this in every pixel, zooming in and zooming out, because every detail mattered. And for three months I stared at hundreds of emoji on my screen. Somewhere in there we also had our first Steve Jobs review, which had created a shared experience of suspense and success when they were approved for launch. And if Steve said it was good to go, I’d say lesson in craftsmanship, check."
        },
        {
          "id": 2,
          "title": "Boston Strangler, The",
          "author": "Fan",
          "email": "fpennock1@behance.net",
          "createdAt": "9/2/2023",
          "updatedAt": "2/21/2023",
          "description": "Cystic fibrosis, unspecified",
          "tags": [
            "Green"
          ],
          "image": "/2.png",
          "comments": [
            {
              "id": 111,
              "text": "comment.text",
              "user": {
                "name": "ABC",
                "avatar": "avatar"
              }
            }
          ],
          "clapCount": 222,
          "action": true,
          "content": "But I must explain to you how all this mistaken idea of denouncing pleasure and praising pain was born and I will give you a complete account of the system, and expound the actual teachings of the great explorer of the truth, the master-builder of human happiness. No one rejects, dislikes, or avoids pleasure itself, because it is pleasure, but because those who do not know how to pursue pleasure rationally encounter consequences that are extremely painful. Nor again is there anyone who loves or pursues or desires to obtain pain of itself, because it is pain, but because occasionally circumstances occur in which toil and pain can procure him some great pleasure. To take a trivial example, which of us ever undertakes laborious physical exercise, except to obtain some advantage from it? But who has any right to find fault with a man who chooses to enjoy a pleasure that has no annoying consequences, or one who avoids a pain that produces no resultant pleasure?<figure class='mb-4 block animate animate-fade-down animate-duration-1000 animate-delay-300'><img src='/3.png' class='mb-4 h-auto w-full rounded-lg align-middle leading-none shadow-lg' alt='Taking up Water with a Spoon'><figcaption className='text-sm text-neutral-600 dark:text-neutral-400'>A caption for the above image.</figcaption></figure>My first emoji was the engagement ring, and I chose it because it had challenging textures like metal and a faceted gem, tricky to render for a beginner. The metal ring alone took me an entire day. Pretty soon, however, I could do two a day, then three, and so forth. Regardless of how fast I could crank one out, I constantly checked the details: the direction of the woodgrain, how freckles appeared on apples and eggplants, how leaf veins ran on a hibiscus, how leather was stitched on a football, the details were neverending. I tried really hard to capture all this in every pixel, zooming in and zooming out, because every detail mattered. And for three months I stared at hundreds of emoji on my screen. Somewhere in there we also had our first Steve Jobs review, which had created a shared experience of suspense and success when they were approved for launch. And if Steve said it was good to go, I’d say lesson in craftsmanship, check."
        },
        {
          "id": 3,
          "title": "Cord (Hide and Seek)",
          "author": "Ashlan",
          "email": "aoxenham2@wired.com",
          "createdAt": "9/15/2023",
          "updatedAt": "10/8/2023",
          "description": "Abrasion of unspecified finger, sequela",
          "tags": [
            "Purple"
          ],
          "image": "/3.png",
          "comments": [
            {
              "id": 111,
              "text": "comment.text",
              "user": {
                "name": "ABC",
                "avatar": "avatar"
              }
            }
          ],
          "clapCount": 222,
          "action": true,
          "content": "But I must explain to you how all this mistaken idea of denouncing pleasure and praising pain was born and I will give you a complete account of the system, and expound the actual teachings of the great explorer of the truth, the master-builder of human happiness. No one rejects, dislikes, or avoids pleasure itself, because it is pleasure, but because those who do not know how to pursue pleasure rationally encounter consequences that are extremely painful. Nor again is there anyone who loves or pursues or desires to obtain pain of itself, because it is pain, but because occasionally circumstances occur in which toil and pain can procure him some great pleasure. To take a trivial example, which of us ever undertakes laborious physical exercise, except to obtain some advantage from it? But who has any right to find fault with a man who chooses to enjoy a pleasure that has no annoying consequences, or one who avoids a pain that produces no resultant pleasure?<figure class='mb-4 block animate animate-fade-down animate-duration-1000 animate-delay-300'><img src='/3.png' class='mb-4 h-auto w-full rounded-lg align-middle leading-none shadow-lg' alt='Taking up Water with a Spoon'><figcaption className='text-sm text-neutral-600 dark:text-neutral-400'>A caption for the above image.</figcaption></figure>My first emoji was the engagement ring, and I chose it because it had challenging textures like metal and a faceted gem, tricky to render for a beginner. The metal ring alone took me an entire day. Pretty soon, however, I could do two a day, then three, and so forth. Regardless of how fast I could crank one out, I constantly checked the details: the direction of the woodgrain, how freckles appeared on apples and eggplants, how leaf veins ran on a hibiscus, how leather was stitched on a football, the details were neverending. I tried really hard to capture all this in every pixel, zooming in and zooming out, because every detail mattered. And for three months I stared at hundreds of emoji on my screen. Somewhere in there we also had our first Steve Jobs review, which had created a shared experience of suspense and success when they were approved for launch. And if Steve said it was good to go, I’d say lesson in craftsmanship, check."
        },
        {
          "id": 4,
          "title": "Herbie Goes to Monte Carlo",
          "author": "Margit",
          "email": "mmarzele3@thetimes.co.uk",
          "createdAt": "8/8/2023",
          "updatedAt": "11/25/2023",
          "description": "Struck by pig, sequela",
          "tags": [
            "Crimson"
          ],
          "image": "/5.png",
          "comments": [
            {
              "id": 111,
              "text": "comment.text",
              "user": {
                "name": "ABC",
                "avatar": "avatar"
              }
            }
          ],
          "clapCount": 222,
          "action": true,
          "content": "But I must explain to you how all this mistaken idea of denouncing pleasure and praising pain was born and I will give you a complete account of the system, and expound the actual teachings of the great explorer of the truth, the master-builder of human happiness. No one rejects, dislikes, or avoids pleasure itself, because it is pleasure, but because those who do not know how to pursue pleasure rationally encounter consequences that are extremely painful. Nor again is there anyone who loves or pursues or desires to obtain pain of itself, because it is pain, but because occasionally circumstances occur in which toil and pain can procure him some great pleasure. To take a trivial example, which of us ever undertakes laborious physical exercise, except to obtain some advantage from it? But who has any right to find fault with a man who chooses to enjoy a pleasure that has no annoying consequences, or one who avoids a pain that produces no resultant pleasure?<figure class='mb-4 block animate animate-fade-down animate-duration-1000 animate-delay-300'><img src='/3.png' class='mb-4 h-auto w-full rounded-lg align-middle leading-none shadow-lg' alt='Taking up Water with a Spoon'><figcaption className='text-sm text-neutral-600 dark:text-neutral-400'>A caption for the above image.</figcaption></figure>My first emoji was the engagement ring, and I chose it because it had challenging textures like metal and a faceted gem, tricky to render for a beginner. The metal ring alone took me an entire day. Pretty soon, however, I could do two a day, then three, and so forth. Regardless of how fast I could crank one out, I constantly checked the details: the direction of the woodgrain, how freckles appeared on apples and eggplants, how leaf veins ran on a hibiscus, how leather was stitched on a football, the details were neverending. I tried really hard to capture all this in every pixel, zooming in and zooming out, because every detail mattered. And for three months I stared at hundreds of emoji on my screen. Somewhere in there we also had our first Steve Jobs review, which had created a shared experience of suspense and success when they were approved for launch. And if Steve said it was good to go, I’d say lesson in craftsmanship, check."
        },
        {
          "id": 5,
          "title": "Last Will of Dr. Mabuse, The (Testament du Dr. Mabuse, Le)",
          "author": "Gunther",
          "email": "gbanham4@woothemes.com",
          "createdAt": "10/12/2023",
          "updatedAt": "11/11/2023",
          "description": "Abscess of bursa, left shoulder",
          "tags": [
            "Pink"
          ],
          "image": "/6.png",
          "comments": [
            {
              "id": 111,
              "text": "comment.text",
              "user": {
                "name": "ABC",
                "avatar": "avatar"
              }
            }
          ],
          "clapCount": 222,
          "action": false,
          "content": "But I must explain to you how all this mistaken idea of denouncing pleasure and praising pain was born and I will give you a complete account of the system, and expound the actual teachings of the great explorer of the truth, the master-builder of human happiness. No one rejects, dislikes, or avoids pleasure itself, because it is pleasure, but because those who do not know how to pursue pleasure rationally encounter consequences that are extremely painful. Nor again is there anyone who loves or pursues or desires to obtain pain of itself, because it is pain, but because occasionally circumstances occur in which toil and pain can procure him some great pleasure. To take a trivial example, which of us ever undertakes laborious physical exercise, except to obtain some advantage from it? But who has any right to find fault with a man who chooses to enjoy a pleasure that has no annoying consequences, or one who avoids a pain that produces no resultant pleasure?<figure class='mb-4 block animate animate-fade-down animate-duration-1000 animate-delay-300'><img src='/3.png' class='mb-4 h-auto w-full rounded-lg align-middle leading-none shadow-lg' alt='Taking up Water with a Spoon'><figcaption className='text-sm text-neutral-600 dark:text-neutral-400'>A caption for the above image.</figcaption></figure>My first emoji was the engagement ring, and I chose it because it had challenging textures like metal and a faceted gem, tricky to render for a beginner. The metal ring alone took me an entire day. Pretty soon, however, I could do two a day, then three, and so forth. Regardless of how fast I could crank one out, I constantly checked the details: the direction of the woodgrain, how freckles appeared on apples and eggplants, how leaf veins ran on a hibiscus, how leather was stitched on a football, the details were neverending. I tried really hard to capture all this in every pixel, zooming in and zooming out, because every detail mattered. And for three months I stared at hundreds of emoji on my screen. Somewhere in there we also had our first Steve Jobs review, which had created a shared experience of suspense and success when they were approved for launch. And if Steve said it was good to go, I’d say lesson in craftsmanship, check."
        },
        {
          "id": 6,
          "title": "Wild, The",
          "author": "Kiah",
          "email": "ksoughton5@auda.org.au",
          "createdAt": "5/5/2023",
          "updatedAt": "12/20/2023",
          "description": "Unsp dislocation of right sternoclavicular joint, subs",
          "tags": [
            "Purple"
          ],
          "image": "/7.png",
          "comments": [
            {
              "id": 111,
              "text": "comment.text",
              "user": {
                "name": "ABC",
                "avatar": "avatar"
              }
            }
          ],
          "clapCount": 222,
          "action": false,
          "content": "But I must explain to you how all this mistaken idea of denouncing pleasure and praising pain was born and I will give you a complete account of the system, and expound the actual teachings of the great explorer of the truth, the master-builder of human happiness. No one rejects, dislikes, or avoids pleasure itself, because it is pleasure, but because those who do not know how to pursue pleasure rationally encounter consequences that are extremely painful. Nor again is there anyone who loves or pursues or desires to obtain pain of itself, because it is pain, but because occasionally circumstances occur in which toil and pain can procure him some great pleasure. To take a trivial example, which of us ever undertakes laborious physical exercise, except to obtain some advantage from it? But who has any right to find fault with a man who chooses to enjoy a pleasure that has no annoying consequences, or one who avoids a pain that produces no resultant pleasure?<figure class='mb-4 block animate animate-fade-down animate-duration-1000 animate-delay-300'><img src='/3.png' class='mb-4 h-auto w-full rounded-lg align-middle leading-none shadow-lg' alt='Taking up Water with a Spoon'><figcaption className='text-sm text-neutral-600 dark:text-neutral-400'>A caption for the above image.</figcaption></figure>My first emoji was the engagement ring, and I chose it because it had challenging textures like metal and a faceted gem, tricky to render for a beginner. The metal ring alone took me an entire day. Pretty soon, however, I could do two a day, then three, and so forth. Regardless of how fast I could crank one out, I constantly checked the details: the direction of the woodgrain, how freckles appeared on apples and eggplants, how leaf veins ran on a hibiscus, how leather was stitched on a football, the details were neverending. I tried really hard to capture all this in every pixel, zooming in and zooming out, because every detail mattered. And for three months I stared at hundreds of emoji on my screen. Somewhere in there we also had our first Steve Jobs review, which had created a shared experience of suspense and success when they were approved for launch. And if Steve said it was good to go, I’d say lesson in craftsmanship, check."
        },
        {
          "id": 7,
          "title": "Never Die Alone",
          "author": "Laurette",
          "email": "lpeasee6@sbwire.com",
          "createdAt": "3/1/2023",
          "updatedAt": "3/6/2023",
          "description": "Aneurysmal bone cyst, right ankle and foot",
          "tags": [
            "Orange"
          ],
          "image": "/8.png",
          "comments": [
            {
              "id": 111,
              "text": "comment.text",
              "user": {
                "name": "ABC",
                "avatar": "avatar"
              }
            }
          ],
          "clapCount": 222,
          "action": true,
          "content": "But I must explain to you how all this mistaken idea of denouncing pleasure and praising pain was born and I will give you a complete account of the system, and expound the actual teachings of the great explorer of the truth, the master-builder of human happiness. No one rejects, dislikes, or avoids pleasure itself, because it is pleasure, but because those who do not know how to pursue pleasure rationally encounter consequences that are extremely painful. Nor again is there anyone who loves or pursues or desires to obtain pain of itself, because it is pain, but because occasionally circumstances occur in which toil and pain can procure him some great pleasure. To take a trivial example, which of us ever undertakes laborious physical exercise, except to obtain some advantage from it? But who has any right to find fault with a man who chooses to enjoy a pleasure that has no annoying consequences, or one who avoids a pain that produces no resultant pleasure?<figure class='mb-4 block animate animate-fade-down animate-duration-1000 animate-delay-300'><img src='/3.png' class='mb-4 h-auto w-full rounded-lg align-middle leading-none shadow-lg' alt='Taking up Water with a Spoon'><figcaption className='text-sm text-neutral-600 dark:text-neutral-400'>A caption for the above image.</figcaption></figure>My first emoji was the engagement ring, and I chose it because it had challenging textures like metal and a faceted gem, tricky to render for a beginner. The metal ring alone took me an entire day. Pretty soon, however, I could do two a day, then three, and so forth. Regardless of how fast I could crank one out, I constantly checked the details: the direction of the woodgrain, how freckles appeared on apples and eggplants, how leaf veins ran on a hibiscus, how leather was stitched on a football, the details were neverending. I tried really hard to capture all this in every pixel, zooming in and zooming out, because every detail mattered. And for three months I stared at hundreds of emoji on my screen. Somewhere in there we also had our first Steve Jobs review, which had created a shared experience of suspense and success when they were approved for launch. And if Steve said it was good to go, I’d say lesson in craftsmanship, check."
        },
        {
          "id": 8,
          "title": "Shooter, The",
          "author": "Averell",
          "email": "asawdy7@reverbnation.com",
          "createdAt": "8/29/2023",
          "updatedAt": "2/6/2023",
          "description": "Malocclusion, Angle's class, unspecified",
          "tags": [
            "Mauv"
          ],
          "image": "/9.png",
          "comments": [
            {
              "id": 111,
              "text": "comment.text",
              "user": {
                "name": "ABC",
                "avatar": "avatar"
              }
            }
          ],
          "clapCount": 222,
          "action": false,
          "content": "But I must explain to you how all this mistaken idea of denouncing pleasure and praising pain was born and I will give you a complete account of the system, and expound the actual teachings of the great explorer of the truth, the master-builder of human happiness. No one rejects, dislikes, or avoids pleasure itself, because it is pleasure, but because those who do not know how to pursue pleasure rationally encounter consequences that are extremely painful. Nor again is there anyone who loves or pursues or desires to obtain pain of itself, because it is pain, but because occasionally circumstances occur in which toil and pain can procure him some great pleasure. To take a trivial example, which of us ever undertakes laborious physical exercise, except to obtain some advantage from it? But who has any right to find fault with a man who chooses to enjoy a pleasure that has no annoying consequences, or one who avoids a pain that produces no resultant pleasure?<figure class='mb-4 block animate animate-fade-down animate-duration-1000 animate-delay-300'><img src='/3.png' class='mb-4 h-auto w-full rounded-lg align-middle leading-none shadow-lg' alt='Taking up Water with a Spoon'><figcaption className='text-sm text-neutral-600 dark:text-neutral-400'>A caption for the above image.</figcaption></figure>My first emoji was the engagement ring, and I chose it because it had challenging textures like metal and a faceted gem, tricky to render for a beginner. The metal ring alone took me an entire day. Pretty soon, however, I could do two a day, then three, and so forth. Regardless of how fast I could crank one out, I constantly checked the details: the direction of the woodgrain, how freckles appeared on apples and eggplants, how leaf veins ran on a hibiscus, how leather was stitched on a football, the details were neverending. I tried really hard to capture all this in every pixel, zooming in and zooming out, because every detail mattered. And for three months I stared at hundreds of emoji on my screen. Somewhere in there we also had our first Steve Jobs review, which had created a shared experience of suspense and success when they were approved for launch. And if Steve said it was good to go, I’d say lesson in craftsmanship, check."
        },
        {
          "id": 9,
          "title": "Fallen Angel",
          "author": "Calida",
          "email": "celtringham8@sourceforge.net",
          "createdAt": "3/29/2023",
          "updatedAt": "11/25/2023",
          "description": "Other specified injuries of left lower leg, init encntr",
          "tags": [
            "Teal"
          ],
          "image": "/1.png",
          "comments": [
            {
              "id": 111,
              "text": "comment.text",
              "user": {
                "name": "ABC",
                "avatar": "avatar"
              }
            }
          ],
          "clapCount": 222,
          "action": true,
          "content": "But I must explain to you how all this mistaken idea of denouncing pleasure and praising pain was born and I will give you a complete account of the system, and expound the actual teachings of the great explorer of the truth, the master-builder of human happiness. No one rejects, dislikes, or avoids pleasure itself, because it is pleasure, but because those who do not know how to pursue pleasure rationally encounter consequences that are extremely painful. Nor again is there anyone who loves or pursues or desires to obtain pain of itself, because it is pain, but because occasionally circumstances occur in which toil and pain can procure him some great pleasure. To take a trivial example, which of us ever undertakes laborious physical exercise, except to obtain some advantage from it? But who has any right to find fault with a man who chooses to enjoy a pleasure that has no annoying consequences, or one who avoids a pain that produces no resultant pleasure?<figure class='mb-4 block animate animate-fade-down animate-duration-1000 animate-delay-300'><img src='/3.png' class='mb-4 h-auto w-full rounded-lg align-middle leading-none shadow-lg' alt='Taking up Water with a Spoon'><figcaption className='text-sm text-neutral-600 dark:text-neutral-400'>A caption for the above image.</figcaption></figure>My first emoji was the engagement ring, and I chose it because it had challenging textures like metal and a faceted gem, tricky to render for a beginner. The metal ring alone took me an entire day. Pretty soon, however, I could do two a day, then three, and so forth. Regardless of how fast I could crank one out, I constantly checked the details: the direction of the woodgrain, how freckles appeared on apples and eggplants, how leaf veins ran on a hibiscus, how leather was stitched on a football, the details were neverending. I tried really hard to capture all this in every pixel, zooming in and zooming out, because every detail mattered. And for three months I stared at hundreds of emoji on my screen. Somewhere in there we also had our first Steve Jobs review, which had created a shared experience of suspense and success when they were approved for launch. And if Steve said it was good to go, I’d say lesson in craftsmanship, check."
        },
        {
          "id": 10,
          "title": "8 (8, the Play)",
          "author": "Karol",
          "email": "kfrankema9@lycos.com",
          "createdAt": "9/12/2023",
          "updatedAt": "1/4/2024",
          "description": "Anomalies of tooth position of fully erupted tooth or teeth",
          "tags": [
            "Mauv"
          ],
          "image": "/2.png",
          "comments": [
            {
              "id": 111,
              "text": "comment.text",
              "user": {
                "name": "ABC",
                "avatar": "avatar"
              }
            }
          ],
          "clapCount": 222,
          "action": true,
          "content": "But I must explain to you how all this mistaken idea of denouncing pleasure and praising pain was born and I will give you a complete account of the system, and expound the actual teachings of the great explorer of the truth, the master-builder of human happiness. No one rejects, dislikes, or avoids pleasure itself, because it is pleasure, but because those who do not know how to pursue pleasure rationally encounter consequences that are extremely painful. Nor again is there anyone who loves or pursues or desires to obtain pain of itself, because it is pain, but because occasionally circumstances occur in which toil and pain can procure him some great pleasure. To take a trivial example, which of us ever undertakes laborious physical exercise, except to obtain some advantage from it? But who has any right to find fault with a man who chooses to enjoy a pleasure that has no annoying consequences, or one who avoids a pain that produces no resultant pleasure?<figure class='mb-4 block animate animate-fade-down animate-duration-1000 animate-delay-300'><img src='/3.png' class='mb-4 h-auto w-full rounded-lg align-middle leading-none shadow-lg' alt='Taking up Water with a Spoon'><figcaption className='text-sm text-neutral-600 dark:text-neutral-400'>A caption for the above image.</figcaption></figure>My first emoji was the engagement ring, and I chose it because it had challenging textures like metal and a faceted gem, tricky to render for a beginner. The metal ring alone took me an entire day. Pretty soon, however, I could do two a day, then three, and so forth. Regardless of how fast I could crank one out, I constantly checked the details: the direction of the woodgrain, how freckles appeared on apples and eggplants, how leaf veins ran on a hibiscus, how leather was stitched on a football, the details were neverending. I tried really hard to capture all this in every pixel, zooming in and zooming out, because every detail mattered. And for three months I stared at hundreds of emoji on my screen. Somewhere in there we also had our first Steve Jobs review, which had created a shared experience of suspense and success when they were approved for launch. And if Steve said it was good to go, I’d say lesson in craftsmanship, check."
        },
        {
          "id": 11,
          "title": "Brothers: The Return",
          "author": "Renate",
          "email": "rcoombea@prlog.org",
          "createdAt": "1/4/2024",
          "updatedAt": "3/18/2023",
          "description": "Intentional self-harm by jumping from a high place, sequela",
          "tags": [
            "Red"
          ],
          "image": "/3.png",
          "comments": [
            {
              "id": 111,
              "text": "comment.text",
              "user": {
                "name": "ABC",
                "avatar": "avatar"
              }
            }
          ],
          "clapCount": 222,
          "action": true,
          "content": "But I must explain to you how all this mistaken idea of denouncing pleasure and praising pain was born and I will give you a complete account of the system, and expound the actual teachings of the great explorer of the truth, the master-builder of human happiness. No one rejects, dislikes, or avoids pleasure itself, because it is pleasure, but because those who do not know how to pursue pleasure rationally encounter consequences that are extremely painful. Nor again is there anyone who loves or pursues or desires to obtain pain of itself, because it is pain, but because occasionally circumstances occur in which toil and pain can procure him some great pleasure. To take a trivial example, which of us ever undertakes laborious physical exercise, except to obtain some advantage from it? But who has any right to find fault with a man who chooses to enjoy a pleasure that has no annoying consequences, or one who avoids a pain that produces no resultant pleasure?<figure class='mb-4 block animate animate-fade-down animate-duration-1000 animate-delay-300'><img src='/3.png' class='mb-4 h-auto w-full rounded-lg align-middle leading-none shadow-lg' alt='Taking up Water with a Spoon'><figcaption className='text-sm text-neutral-600 dark:text-neutral-400'>A caption for the above image.</figcaption></figure>My first emoji was the engagement ring, and I chose it because it had challenging textures like metal and a faceted gem, tricky to render for a beginner. The metal ring alone took me an entire day. Pretty soon, however, I could do two a day, then three, and so forth. Regardless of how fast I could crank one out, I constantly checked the details: the direction of the woodgrain, how freckles appeared on apples and eggplants, how leaf veins ran on a hibiscus, how leather was stitched on a football, the details were neverending. I tried really hard to capture all this in every pixel, zooming in and zooming out, because every detail mattered. And for three months I stared at hundreds of emoji on my screen. Somewhere in there we also had our first Steve Jobs review, which had created a shared experience of suspense and success when they were approved for launch. And if Steve said it was good to go, I’d say lesson in craftsmanship, check."
        },
        {
          "id": 12,
          "title": "Shamus",
          "author": "Amitie",
          "email": "agibbiesonb@pagesperso-orange.fr",
          "createdAt": "9/12/2023",
          "updatedAt": "9/8/2023",
          "description": "Burn of second degree of upper back",
          "tags": [
            "Blue"
          ],
          "image": "/5.png",
          "comments": [
            {
              "id": 111,
              "text": "comment.text",
              "user": {
                "name": "ABC",
                "avatar": "avatar"
              }
            }
          ],
          "clapCount": 222,
          "action": false,
          "content": "But I must explain to you how all this mistaken idea of denouncing pleasure and praising pain was born and I will give you a complete account of the system, and expound the actual teachings of the great explorer of the truth, the master-builder of human happiness. No one rejects, dislikes, or avoids pleasure itself, because it is pleasure, but because those who do not know how to pursue pleasure rationally encounter consequences that are extremely painful. Nor again is there anyone who loves or pursues or desires to obtain pain of itself, because it is pain, but because occasionally circumstances occur in which toil and pain can procure him some great pleasure. To take a trivial example, which of us ever undertakes laborious physical exercise, except to obtain some advantage from it? But who has any right to find fault with a man who chooses to enjoy a pleasure that has no annoying consequences, or one who avoids a pain that produces no resultant pleasure?<figure class='mb-4 block animate animate-fade-down animate-duration-1000 animate-delay-300'><img src='/3.png' class='mb-4 h-auto w-full rounded-lg align-middle leading-none shadow-lg' alt='Taking up Water with a Spoon'><figcaption className='text-sm text-neutral-600 dark:text-neutral-400'>A caption for the above image.</figcaption></figure>My first emoji was the engagement ring, and I chose it because it had challenging textures like metal and a faceted gem, tricky to render for a beginner. The metal ring alone took me an entire day. Pretty soon, however, I could do two a day, then three, and so forth. Regardless of how fast I could crank one out, I constantly checked the details: the direction of the woodgrain, how freckles appeared on apples and eggplants, how leaf veins ran on a hibiscus, how leather was stitched on a football, the details were neverending. I tried really hard to capture all this in every pixel, zooming in and zooming out, because every detail mattered. And for three months I stared at hundreds of emoji on my screen. Somewhere in there we also had our first Steve Jobs review, which had created a shared experience of suspense and success when they were approved for launch. And if Steve said it was good to go, I’d say lesson in craftsmanship, check."
        },
        {
          "id": 13,
          "title": "Trishna",
          "author": "Aveline",
          "email": "amckendryc@admin.ch",
          "createdAt": "7/31/2023",
          "updatedAt": "8/14/2023",
          "description": "Displ commnt fx shaft of r fibula, 7thP",
          "tags": [
            "Turquoise"
          ],
          "image": "/6.png",
          "comments": [
            {
              "id": 111,
              "text": "comment.text",
              "user": {
                "name": "ABC",
                "avatar": "avatar"
              }
            }
          ],
          "clapCount": 222,
          "action": true,
          "content": "But I must explain to you how all this mistaken idea of denouncing pleasure and praising pain was born and I will give you a complete account of the system, and expound the actual teachings of the great explorer of the truth, the master-builder of human happiness. No one rejects, dislikes, or avoids pleasure itself, because it is pleasure, but because those who do not know how to pursue pleasure rationally encounter consequences that are extremely painful. Nor again is there anyone who loves or pursues or desires to obtain pain of itself, because it is pain, but because occasionally circumstances occur in which toil and pain can procure him some great pleasure. To take a trivial example, which of us ever undertakes laborious physical exercise, except to obtain some advantage from it? But who has any right to find fault with a man who chooses to enjoy a pleasure that has no annoying consequences, or one who avoids a pain that produces no resultant pleasure?<figure class='mb-4 block animate animate-fade-down animate-duration-1000 animate-delay-300'><img src='/3.png' class='mb-4 h-auto w-full rounded-lg align-middle leading-none shadow-lg' alt='Taking up Water with a Spoon'><figcaption className='text-sm text-neutral-600 dark:text-neutral-400'>A caption for the above image.</figcaption></figure>My first emoji was the engagement ring, and I chose it because it had challenging textures like metal and a faceted gem, tricky to render for a beginner. The metal ring alone took me an entire day. Pretty soon, however, I could do two a day, then three, and so forth. Regardless of how fast I could crank one out, I constantly checked the details: the direction of the woodgrain, how freckles appeared on apples and eggplants, how leaf veins ran on a hibiscus, how leather was stitched on a football, the details were neverending. I tried really hard to capture all this in every pixel, zooming in and zooming out, because every detail mattered. And for three months I stared at hundreds of emoji on my screen. Somewhere in there we also had our first Steve Jobs review, which had created a shared experience of suspense and success when they were approved for launch. And if Steve said it was good to go, I’d say lesson in craftsmanship, check."
        },
        {
          "id": 14,
          "title": "Samaritan Zatoichi (Zatôichi kenka-daiko) (Zatôichi 19)",
          "author": "Noll",
          "email": "nhartlesd@mozilla.org",
          "createdAt": "9/15/2023",
          "updatedAt": "4/24/2023",
          "description": "Inj musc/tend peroneal grp at low leg level, unsp leg, init",
          "tags": [
            "Indigo"
          ],
          "image": "/7.png",
          "comments": [
            {
              "id": 111,
              "text": "comment.text",
              "user": {
                "name": "ABC",
                "avatar": "avatar"
              }
            }
          ],
          "clapCount": 222,
          "action": false,
          "content": "But I must explain to you how all this mistaken idea of denouncing pleasure and praising pain was born and I will give you a complete account of the system, and expound the actual teachings of the great explorer of the truth, the master-builder of human happiness. No one rejects, dislikes, or avoids pleasure itself, because it is pleasure, but because those who do not know how to pursue pleasure rationally encounter consequences that are extremely painful. Nor again is there anyone who loves or pursues or desires to obtain pain of itself, because it is pain, but because occasionally circumstances occur in which toil and pain can procure him some great pleasure. To take a trivial example, which of us ever undertakes laborious physical exercise, except to obtain some advantage from it? But who has any right to find fault with a man who chooses to enjoy a pleasure that has no annoying consequences, or one who avoids a pain that produces no resultant pleasure?<figure class='mb-4 block animate animate-fade-down animate-duration-1000 animate-delay-300'><img src='/3.png' class='mb-4 h-auto w-full rounded-lg align-middle leading-none shadow-lg' alt='Taking up Water with a Spoon'><figcaption className='text-sm text-neutral-600 dark:text-neutral-400'>A caption for the above image.</figcaption></figure>My first emoji was the engagement ring, and I chose it because it had challenging textures like metal and a faceted gem, tricky to render for a beginner. The metal ring alone took me an entire day. Pretty soon, however, I could do two a day, then three, and so forth. Regardless of how fast I could crank one out, I constantly checked the details: the direction of the woodgrain, how freckles appeared on apples and eggplants, how leaf veins ran on a hibiscus, how leather was stitched on a football, the details were neverending. I tried really hard to capture all this in every pixel, zooming in and zooming out, because every detail mattered. And for three months I stared at hundreds of emoji on my screen. Somewhere in there we also had our first Steve Jobs review, which had created a shared experience of suspense and success when they were approved for launch. And if Steve said it was good to go, I’d say lesson in craftsmanship, check."
        },
        {
          "id": 15,
          "title": "Prom Night IV: Deliver Us From Evil",
          "author": "Leyla",
          "email": "lcaccavarie@joomla.org",
          "createdAt": "4/23/2023",
          "updatedAt": "9/17/2023",
          "description": "Flail joint, ankle and foot",
          "tags": [
            "Green"
          ],
          "image": "/8.png",
          "comments": [
            {
              "id": 111,
              "text": "comment.text",
              "user": {
                "name": "ABC",
                "avatar": "avatar"
              }
            }
          ],
          "clapCount": 222,
          "action": true,
          "content": "But I must explain to you how all this mistaken idea of denouncing pleasure and praising pain was born and I will give you a complete account of the system, and expound the actual teachings of the great explorer of the truth, the master-builder of human happiness. No one rejects, dislikes, or avoids pleasure itself, because it is pleasure, but because those who do not know how to pursue pleasure rationally encounter consequences that are extremely painful. Nor again is there anyone who loves or pursues or desires to obtain pain of itself, because it is pain, but because occasionally circumstances occur in which toil and pain can procure him some great pleasure. To take a trivial example, which of us ever undertakes laborious physical exercise, except to obtain some advantage from it? But who has any right to find fault with a man who chooses to enjoy a pleasure that has no annoying consequences, or one who avoids a pain that produces no resultant pleasure?<figure class='mb-4 block animate animate-fade-down animate-duration-1000 animate-delay-300'><img src='/3.png' class='mb-4 h-auto w-full rounded-lg align-middle leading-none shadow-lg' alt='Taking up Water with a Spoon'><figcaption className='text-sm text-neutral-600 dark:text-neutral-400'>A caption for the above image.</figcaption></figure>My first emoji was the engagement ring, and I chose it because it had challenging textures like metal and a faceted gem, tricky to render for a beginner. The metal ring alone took me an entire day. Pretty soon, however, I could do two a day, then three, and so forth. Regardless of how fast I could crank one out, I constantly checked the details: the direction of the woodgrain, how freckles appeared on apples and eggplants, how leaf veins ran on a hibiscus, how leather was stitched on a football, the details were neverending. I tried really hard to capture all this in every pixel, zooming in and zooming out, because every detail mattered. And for three months I stared at hundreds of emoji on my screen. Somewhere in there we also had our first Steve Jobs review, which had created a shared experience of suspense and success when they were approved for launch. And if Steve said it was good to go, I’d say lesson in craftsmanship, check."
        }
      ]
    };
  res.json(posts);
});

app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});

module.exports = app; // For Vercel Functions