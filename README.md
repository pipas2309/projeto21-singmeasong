<div align="center">
  <a href="https://github.com/pipas2309/projeto21-singmeasong">
    <img src="https://notion-emojis.s3-us-west-2.amazonaws.com/prod/svg-twitter/1f399-fe0f.svg" alt="JavaScriptLogo" width="100">
  </a>

  <h3 align="center">Sing me a Song</h3>
  <div align="center">
    21th Project of Driven Education
    <br />
  </div>
  <div align="center">
    This project aimed to create a test routine for the front and backend.
    <br />
  </div>
</div>

<div align="center">
  <h3>Built With</h3>

  <img src="https://img.shields.io/badge/TypeScript-007ACC?style=for-the-badge&logo=typescript&logoColor=white" height="30px"/>
  <img src="https://img.shields.io/badge/Jest-323330?style=for-the-badge&logo=Jest&logoColor=white" height="30px" />
  <img src="https://img.shields.io/endpoint?url=https://dashboard.cypress.io/badge/count/dv7ubv&style=flat-square&logo=cypress" height="30px" />
  

  <!-- Badges source: https://dev.to/envoy_/150-badges-for-github-pnk -->
</div>

<!-- Table of Contents -->

<div align="center" style="margin-top: 50px">
    <h1> Project Guide</h1>
</div>

## Features

-   Create a recommendation
-   Get the recommendations list
-   Upvote and Downvote any recommendation
-   Remove a song when the score is lower than -5
-   Get the top 10 list
-   Get a random recommendation

</br>

<div align="center" >
    <h1> API Reference</h1>
</div>


### Create a song recommendation

```http
POST /recommendations
```

#### Request:

| Body         | Type     | Description                              |
| :------------| :------- | :--------------------------------------- |
| `name` | `string`| **Required**.              |
| `youtubeLink`       | `string` | **Required**. must conform to youtube regex      |


####


</br>

#

### Upvote a song

```http
POST /recommendations/:id/upvote
```

#### Request:

| Params             | Type     | Description                        |
| :--------------- | :------- | :--------------------------------- |
| `id`         | `integer`| **Required**.          |


#


### Downvote a song

```http
POST /recommendations/:id/downvote
```

#### Request:

| Params             | Type     | Description                        |
| :--------------- | :------- | :--------------------------------- |
| `id`         | `integer`| **Required**.          |


#

### Gather recommendations

```http
GET /recommendations
```

#### Response:

```json
[
  {
    "id": 1,
    "name": "Lofi - chill",
    "youtubeLink": "https://www.youtube.com/watch?v=-R0UYHS8A_A",
    "score": 61
  },
  {
    "id": 2,
    "name": "Rain Sleep - Black Screen",
    "youtubeLink": "https://www.youtube.com/watch?v=yMRoNNKWuqQ",
    "score": 4
  },
  {
    "id": 3,
    "name": "Thunder & Lightning - NSP",
    "youtubeLink": "https://www.youtube.com/watch?v=-rSGoP5iGZQ",
    "score": 132
  }
]
```

#

### Get a recommendation by id

```http
GET /recommendations/:id
```

#### Request:

| Params             | Type     | Description                        |
| :--------------- | :------- | :--------------------------------- |
| `id`         | `integer`| **Required**.          |

### Example:

`id: 3`



#### Response:

```json
[
   {
    "id": 3,
    "name": "Chop Suey - TOP",
    "youtubeLink": "https://www.youtube.com/watch?v=6MLeME9PieI",
    "score": 10000
  }
]
```

#

### Get a random recommendation
```http
GET /recommendations/random
```

#### Response:

```json
[
   {
    "id": 2,
    "name": "Cool Patrol - NSP",
    "youtubeLink": "https://www.youtube.com/watch?v=-tW0G9XWaj0",
    "score": 10
  }
]
```

#

### Get a ranked list of song recommendations
```http
GET /recommendations/top/:amount
```


#### Request:

| Params             | Type     | Description                        |
| :--------------- | :------- | :--------------------------------- |
| `amount`         | `integer`| **Required**.          |



### Example:

`amount: 3`

#### Response:

```json
[
    {
    "id": 3,
    "name": "Musica Quente",
    "youtubeLink": "https://www.youtube.com/watch?v=dQw4w9WgXcQ",
    "score": 4223
  },
    {
    "id": 2,
    "name": "O Ovo",
    "youtubeLink": "https://www.youtube.com/watch?v=h6fcK_fRYaI",
    "score": 1240
  },
    {
    "id": 1,
    "name": "Balada",
    "youtubeLink": "https://www.youtube.com/watch?v=nVq2-gBz12w",
    "score": -5
  }
  
]
```

#

## Run Locally

Clone the project

```bash
    git clone https://github.com/pipas2309/projeto21-singmeasong
```

Go to the project directory

```bash
    cd projeto21-singmeasong/
```
#

 ## [Back-end](https://github.com/pipas2309/projeto21-singmeasong/tree/main/back-end#readme)
 <br/>

Go to the back-end directory

```bash
    cd back-end
```

Install dependencies

```bash
    npm install
```

Run prisma migrations
```bash
     npx prisma migrate dev
```

Start the server

```bash
     npm run start
```

Start Jest test

```bash
    npm run test
```

# 

## [Front-end](https://github.com/pipas2309/projeto21-singmeasong/tree/main/front-end#readme)

<br/>


Go to the front-end directory

```bash
    cd front-end
```

Install dependencies

```bash
    npm install
```

Start the server

```bash
    npm start
```

Start Cypress  - ( use E2E tests command in backend )

```bash
    npx cypress open
```
</br>

# 

## Lessons Learned
- Jest: integration tests
- Jest: unit tests
- Jest: mock data
- Cypress: E2E tests
- Cypress: create a command
- Cypress: DOM elements 

# 

## Acknowledgements

-   [Badges for Github](https://dev.to/envoy_/150-badges-for-github-pnk)
-   [README( ( inspiration ) => { return Darlon ♥ } )](https://github.com/DarlonGomes/DarlonGomes#readme)

#

## Authors

-   Lucas Palharini is a student at Driven Education and is putting effort into switch careers.
    looking forward to become a Fullstack Dev.
- Website: https://www.linkedin.com/in/lucas-palharini-749799166/
- Github: [@pipas2309](https://github.com/pipas2309)
<br/>