Find [screenshots](#screenshots) at the end of this document.

## Running the project

```
npm i
npm run dev
```

and then go to http://localhost:3000/.

You can also access the GraphQL playground at http://localhost:3000/api/graphql.

## Stack

- ReactJS
- Node.js
- Next.js
- GraphQL
- Apollo GraphQL
- ChakraUI

## About the stack

The UI of the app is built using React and ChakraUI as the design system. The React app has been developed on top of Next.js, a powerful framework that, among many other benefits and features, provides a very convenient way to set up and serve a React app, routing (although this app has not navigation) and serverless functions.

Since Next.js is running in a server, it also allows us to set up an API to be consumed by the client, all in one single project. In this case, I have decided to implement that API using GraphQL. These are some of the reasons: the schema gives a strong and solid structure to the code and the data, it allows us to generate types definitions to be used in both the server and the client and, together with Apollo Client, it provides a great developer experience when it comes to consuming it.

## About the code

You can find most of the UI components in the `components` folder. I've tried to keep them specific so that they do only one thing, meaning that most of them are strictly presentational. The one serving as an orchestra director is `BookingPage`, although you will notice that in reality, the one with heavier logic is `BookingSeatsSelection`. I think that the latest could be split a bit more, but I also think that for the purposes of this demonstration, its design is appropriate.

Regarding the API, this is in charge of everything related to data (fetching, creation, updates) and also of the algorithms required to assign seats when a new booking is being made. In the file `datasources/flightsAPI.ts` you can find the most important methods and logic that enables the app to do what we want it to do. You will also notice that there are four files/functions that correspond to each of the specified rules to assign seats, these are: `getSeatsInRow`, `getBalancedSeats`, `getSeatsAcrossAisle` and `getRandomSeats`.

## About the database

Given that this project is expected to be easily run in a personal machine, without any complicated setup and configuration, I didn't really implemented and connected this app with a real database. Instead, I am just reading and writing `.json` files exiting in the `db` folder. This said, the project has been designed in a way that setting up and wiring a new and real database can be done modularly and without big changes to the current implementation and API.

According to the convention for this project, the name of the file corresponds to the flight number and its content has the following structure:

```
{
  // PlaneMap -> List of Rows
  "planeMap": [
    // Row -> List of Blocks
    [
      // Block -> List of Seats
      [
        {
          // Seat
        }
      ]
    ]
  ]
}
```

Currently, there is only support for one hard coded flight. If you want to apply changes directly to the database, go to `db/flights/GFJH876.json` and make your changes there. Just be careful about following the convention of the structure.

## To be implemented

- Error handling is very minimal. That could definitely be improved.
- The implementation (logic) assumes that the structure of the plane map follows is "more or less normal and symmetrical" and doesn't consider edge cases or much more complex variations and setups than the one requested for this project. More robust validations can be added.
- Tests: we need some confidence here and there is a lot of logic going on when assigning seats.
- The bonus features: adding aircraft to the fleet and changing seats after random assignment.
- Adding more flights and being able to book per flight.

## <a name="screenshots"></a>Screenshots

### Initial form
![Initial form](https://github.com/maumchaves/flights-booking/blob/master/screenshots/initial-form.png)

### Plane map
![Plane map](https://github.com/maumchaves/flights-booking/blob/master/screenshots/plane-map.png)

### Succeed
![Succeed](https://github.com/maumchaves/flights-booking/blob/master/screenshots/succeed.png)
