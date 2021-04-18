import React from "react";
import "./scss/Home.scss";
import { useState } from "react";
import { Tabs, Tab } from "react-bootstrap";

export default function Home() {
  const [key, setKey] = useState("about");

  return (
    <Tabs
      id="controlled-tab-example"
      activeKey={key}
      onSelect={(k) => setKey(k)}
    >
      <Tab eventKey="about" title="About us?">
        <p>
          Holy-Rest is a website which serves to publicize small hotels that do
          not They have a website, or yours is out of date.
        </p>
        <p>
          To do this, they will access with an Administrator account of the
          hotel in question, which will be will deliver.
        </p>
        <p>
          In it you can put information about the hotel that will be: the rooms
          you have and the rates, whether or not it includes food, the price of
          accommodation, availability and photos of the hotel.
        </p>
        <p>
          In turn, they will be able to access a section in which they will be
          able to see statistical information about the feedback from your hotel
        </p>
        <p>
          On the other hand, normal users of the web will be able to rate and
          comment on the hotels, functionalities which the Administrator
          accounts will also have
        </p>
      </Tab>
      <Tab eventKey="whatDoWeDo" title="What do we do?">
        <p>
          We are the perfect intermediary between the navigators of our website
          and the hotels.
        </p>
        <p>
          Providing users with the most relevant information about our hotels.
        </p>
        <p>
          Users will be able to receive feedback from the hotels thanks to the
          comments and ratings provided by the web.
        </p>
        <p>
          With which the hotels will be able to attend to the needs expressed in
          those comments and evaluations.
        </p>
      </Tab>
      <Tab eventKey="howToUseWeb" title="How to use our website?">
        <p>
          Thanks to our responsive and intuitive design, we do not create a
          barrier between users and hotels.
        </p>
        <p>
          With what the users will be able to find the hotels with the
          characteristics that they require as quickly as possible.
        </p>
        <p>
          In addition to knowing the opinion of users who have previously stayed
          at said hotel.
        </p>
        <p>Finding your ideal hotel has never been so easy.</p>
      </Tab>
    </Tabs>
  );
}
