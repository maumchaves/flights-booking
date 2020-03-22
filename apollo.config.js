module.exports = {
  client: {
    name: "FlightsBookingClient",
    includes: ["./graphql/operations/*.graphql"],
    service: {
      name: "FlightsBooking",
      localSchemaFile: "./graphql/schema.graphql",
    },
  },
};
