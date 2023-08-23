import React from "react";
import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import { BrowserRouter } from "react-router-dom";
import Dashboard from "./Dashboard";
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

  test("renders Dashboard Module", () => {
    render(
      <BrowserRouter>
        <Provider store={store}>
          <Dashboard />
        </Provider>
      </BrowserRouter>
    );
  });
  test("renders posts from mock API", async () => {
    mockResponses["https://fakerapi.it/api/v1/companies?_quantity=50"] =
      response;
    render(
      <BrowserRouter>
        <Provider store={store}>
          <Dashboard />
        </Provider>
      </BrowserRouter>
    );
  });
  test("renders loading spinner when loading data", async () => {
    render(
      <BrowserRouter>
        <Provider store={store}>
          <Dashboard />
        </Provider>
      </BrowserRouter>
    );

    // Ensure loading spinner is displayed
    const loadingSpinner = await screen.findByTestId(
      "loading-spinner-dashboard"
    );
    fireEvent.click(loadingSpinner);
  });
  test("fire event for searchbar", async () => {
    mockResponses["https://fakerapi.it/api/v1/companies?_quantity=50"] =
      response;
    render(
      <BrowserRouter>
        <Provider store={store}>
          <Dashboard />
        </Provider>
      </BrowserRouter>
    );
    const searchbarElement = await screen.findByLabelText("Search");
    // screen.debug(searchbarElement)
    fireEvent.change(searchbarElement, { target: { value: "abc" } });
    // screen.debug(searchbarElement)
    const searchIconElement = await screen.findByTestId("search-icon");
    fireEvent.click(searchIconElement);
  });
  test("fire event for handle searchbar result", async () => {
    render(
      <BrowserRouter>
        <Provider store={store}>
          <Dashboard />
        </Provider>
      </BrowserRouter>
    );
    const searchbarElement = await screen.findByLabelText("Search");
    fireEvent.change(searchbarElement, { target: { value: "" } });
    const searchIconElement = await screen.findByTestId("search-icon");
    fireEvent.click(searchIconElement);
  });
  test("fire event for handle add rows button", async () => {
    render(
      <BrowserRouter>
        <Provider store={store}>
          <Dashboard />
        </Provider>
      </BrowserRouter>
    );
    const addRowsButtonElement = await screen.findByText("Add Rows");
    fireEvent.click(addRowsButtonElement);
  });
  test("fire event for handle increment and decrement button", async () => {
    render(
      <BrowserRouter>
        <Provider store={store}>
          <Dashboard />
        </Provider>
      </BrowserRouter>
    );
    const incrementButtonElement = await screen.findByTitle("increment");
    const decrementButtonElement = await screen.findByTitle("decrement");
    fireEvent.click(incrementButtonElement);
    fireEvent.click(decrementButtonElement);
  });
  test("fire event for Delete icon in Stripe table", async () => {
    render(
      <BrowserRouter>
        <Provider store={store}>
          <Dashboard />
        </Provider>
      </BrowserRouter>
    );
    const deleteRowsStripeElement = await screen.findAllByTestId(
      "delete-button"
    ); // result will be array of element
    // we can't directly pass deleteRowsStripeElement because it will return array of element so we need to give single element
    // as deleteRowsStripeElement[0]
    fireEvent.click(deleteRowsStripeElement[0]);
    const deleteRowsModalElement = await screen.findByText("Delete"); //delete button in modal
    fireEvent.click(deleteRowsModalElement);
  });
  test("fire event for close icon in delete modal", async () => {
    render(
      <BrowserRouter>
        <Provider store={store}>
          <Dashboard />
        </Provider>
      </BrowserRouter>
    );
    const deleteRowsStripeElement = await screen.findAllByTestId(
      "delete-button"
    );
    fireEvent.click(deleteRowsStripeElement[0]);
    const closeDeleteModalIcon = await screen.findByTestId("close-icon"); //close icon in delete modal
    fireEvent.click(closeDeleteModalIcon);
  });
  test("fire event for close button in delete modal", async () => {
    render(
      <BrowserRouter>
        <Provider store={store}>
          <Dashboard />
        </Provider>
      </BrowserRouter>
    );
    const deleteRowsStripeElement = await screen.findAllByTestId(
      "delete-button"
    );
    fireEvent.click(deleteRowsStripeElement[0]);
    const closeDeleteModalButton = await screen.findByTestId("close-button"); //close button in delete modal
    fireEvent.click(closeDeleteModalButton);
  });
  test("fire event for open edit modal", async () => {
    render(
      <BrowserRouter>
        <Provider store={store}>
          <Dashboard />
        </Provider>
      </BrowserRouter>
    );
    const editButtonStripeElement = await screen.findAllByTestId("edit-button");
    fireEvent.click(editButtonStripeElement[0]);
  });
  test("fire event for close button in edit modal", async () => {
    render(
      <BrowserRouter>
        <Provider store={store}>
          <Dashboard />
        </Provider>
      </BrowserRouter>
    );
    const editButtonStripeElement = await screen.findAllByTestId("edit-button");
    fireEvent.click(editButtonStripeElement[0]);
    await waitFor(
      async () => {
        const closeButtonEditModal = await screen.findByTestId(
          "close-add-edit-modal"
        );
        fireEvent.click(closeButtonEditModal);
      },
      { timeout: 2000 }
    );
  });
});


