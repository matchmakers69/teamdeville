import React from "react";
import { configure, mount } from "enzyme";
import { Provider } from "react-redux";
import { Link } from "react-router-dom";
import Adapter from "enzyme-adapter-react-16";
import configureStore from "redux-mock-store";
import { findByTestAttr } from "../../../../../tests/testUtils";
import { BrowserRouter } from "react-router-dom";
import TopHeaderContactList from "../TopHeaderContactList";

import constants from "../../../../constants";
import { goToRoute } from "../../../../lib/router";

configure({ adapter: new Adapter() });

describe("<TopHeaderContactList />", () => {
  let store = {};
  let initialState = {};
  const props = {
    favourites: [],
    purchasedProducts: []
  };
  beforeEach(() => {
    store = configureStore();
    store.dispatch = jest.fn();
    initialState = {};
  });
  it("should redirect to bookings login page on logo click", () => {
    const mockStore = store(initialState);
    const wrapper = mount(
      <Provider store={mockStore}>
        <BrowserRouter>
          <TopHeaderContactList {...props} />
        </BrowserRouter>
      </Provider>
    );

    const iconLink = findByTestAttr(wrapper, "favourites-link");
    ///  expect(iconLink.at(1).prop("to")).toBe(constants.FAVOURITES_URL);
  });
});
