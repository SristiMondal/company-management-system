import React from "react";
import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import { BrowserRouter } from "react-router-dom";
import CompanyProfile from "./CompanyProfile";
import { mockFetch, mockResponses } from "../../mocks/apiMocks";
import { Provider } from "react-redux";
import { store } from "../../redux/store";

let response = {
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
};

describe("Company Profile Module", () => {
  beforeEach(() => {
    global.fetch = mockFetch as any; // Override global fetch with mockFetch
  });

  afterEach(() => {
    jest.restoreAllMocks(); // Restore original fetch after each test
  });

  test("renders learn react link", () => {
    render(
      <BrowserRouter>
      <Provider store={store}>
        <CompanyProfile />
        </Provider>
      </BrowserRouter>
    );
  });

  test("renders loading spinner when loading data", async() => {
    render(
      <BrowserRouter>
      <Provider store={store}>
        <CompanyProfile />
        </Provider>
      </BrowserRouter>
    );

    // Ensure loading spinner is displayed
    const loadingSpinner =await screen.findByTestId("loading-spinner");
    fireEvent.click(loadingSpinner);
  });

  test("renders posts from mock API", async () => {
    mockResponses["https://fakerapi.it/api/v1/companies?_quantity=50"] =
    response;

    render(
      <BrowserRouter>
      <Provider store={store}>
        <CompanyProfile />
        </Provider>
      </BrowserRouter>
    );
    const profileImageElement: HTMLElement | null =await screen.findByAltText(
      "profile"
    );
    const companyNameValueElement: HTMLElement | null = await screen.findByText(
      "Pacocha-D'Amore"
    );
    const ownerValueElement: HTMLElement | null = await screen.findByText(
      "Van Little"
    );
    const websiteValueElement: HTMLElement | null = await screen.findByText(
      "http://homenick.info"
    );
    const phoneValueElement: HTMLElement | null = await screen.findByText(
      "+9822378074740"
    );
    // screen.debug(phoneValueElement);
  });
});
