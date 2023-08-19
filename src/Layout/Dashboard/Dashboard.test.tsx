import React from "react";
import { fireEvent, render, screen } from "@testing-library/react";
import { BrowserRouter } from "react-router-dom";
import Dashboard from "./Dashboard";
import { mockFetch, mockResponses } from "../../mocks/apiMocks";

describe("Company Profile Module", () => {
  beforeEach(() => {
    global.fetch = mockFetch as any; // Override global fetch with mockFetch
  });

  afterEach(() => {
    jest.restoreAllMocks(); // Restore original fetch after each test
  });
test("renders Dashboard Module", () => {
  render(
    <BrowserRouter>
      <Dashboard />
    </BrowserRouter>
  );
});
test("renders posts from mock API", async () => {
  let response = {
    data: {
      data: [
        {
          id: 1,
          name: "Pacocha-D'Amore",
          email: "will.anthony@legros.com",
          vat: "61288708",
          phone: "+9822378074740",
          country: "Uganda",
          addresses: [
            {
              id: 0,
              street: "3824 Geoffrey Well Apt. 672",
              streetName: "Cecelia Ramp",
              buildingNumber: "171",
              city: "Marquardtfurt",
              zipcode: "47446-9651",
              country: "Peru",
              county_code: "BQ",
              latitude: 33.543786,
              longitude: -37.661127,
            },
            {
              id: 0,
              street: "78400 Nolan Crescent Suite 172",
              streetName: "Willie Ford",
              buildingNumber: "95032",
              city: "O'Reillymouth",
              zipcode: "50730-7556",
              country: "El Salvador",
              county_code: "DZ",
              latitude: 2.376101,
              longitude: 87.222259,
            },
          ],
          website: "http://homenick.info",
          image: "http://placeimg.com/640/480/people",
          contact: {
            id: 0,
            firstname: "Van",
            lastname: "Little",
            email: "ankunding.barrett@wiza.info",
            phone: "+4318734455652",
            birthday: "1948-11-03",
            gender: "male",
            address: {
              id: 0,
              street: "8620 Bartell Light Apt. 060",
              streetName: "Mikayla Plains",
              buildingNumber: "6358",
              city: "Port Jamiemouth",
              zipcode: "55932",
              country: "Japan",
              county_code: "CD",
              latitude: -76.124617,
              longitude: 159.83794,
            },
            website: "http://collier.com",
            image: "http://placeimg.com/640/480/people",
          },
        },
      ],
    },
  };
  mockResponses["https://fakerapi.it/api/v1/companies?_quantity=50"] =
    response;

  render(
    <BrowserRouter>
      <Dashboard />
    </BrowserRouter>
  );
 
});
test("renders loading spinner when loading data", async() => {
  render(
    <BrowserRouter>
      <Dashboard />
    </BrowserRouter>
  );

  // Ensure loading spinner is displayed
  const loadingSpinner = await screen.findByTestId("loading-spinner-dashboard");
  fireEvent.click(loadingSpinner);
});
test("fire event for searchbar", async() => {
  render(
    <BrowserRouter>
      <Dashboard />
    </BrowserRouter>
  );

  const searchbarElement = await screen.findByLabelText("Search");
  // screen.debug(searchbarElement)
  fireEvent.change(searchbarElement,{target:{value:"abc"}})
  // screen.debug(searchbarElement)
  const searchIconElement=await screen.findByTestId("search-icon");
  fireEvent.click(searchIconElement);
});
test("fire event for handle searchbar result", async() => {
  render(
    <BrowserRouter>
      <Dashboard />
    </BrowserRouter>
  );
  const searchbarElement = await screen.findByLabelText("Search");
  fireEvent.change(searchbarElement,{target:{value:""}})
  const searchIconElement=await screen.findByTestId("search-icon");
  fireEvent.click(searchIconElement);
});
})