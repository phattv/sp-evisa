// @flow
// vendor
import React from 'react';
import { Div } from 'glamorous';
// custom
import {
  Button,
  BlockHeader,
  PageHeader,
  Content,
  Flexbox,
  Image,
  Layout,
  Text,
} from '../components';

class ExtraServices extends React.Component {
  componentDidMount() {
    window.Intercom('update');
  }

  render() {
    return (
      <Layout>
        <Image src="/static/images/services-background.png" />
        <PageHeader header="EXTRA SERVICES" />
        <Content>
          <Flexbox width="100%" column>
            <Text p textAlign="center" bold>
              In order to help our customers in choosing a care-free service, we
              offer an all-in-one package which covers all your demands for a
              Vietnam trip.
            </Text>
            <BlockHeader header="EXTRA SERVICES UPON ARRIVAL" />

            <Flexbox column>
              <Flexbox
                column
                alignItems="flex-start"
                paddingTop={10}
                width="100%"
              >
                <BlockHeader header="AIRPORT FAST TRACK" />
                <Flexbox responsiveLayout width="100%">
                  <Flexbox flex={1} paddingHorizontal={5} paddingVertical={2}>
                    <Image
                      src="/static/images/airport-fast-track.png"
                      alt="passport"
                      maxWidth={400}
                    />
                  </Flexbox>
                  <Flexbox flex={2} column alignItems="flex-start">
                    <Div overflowX="auto">
                      <table>
                        <thead>
                          <tr>
                            <th>TYPE OF FAST TRACK</th>
                            <th colSpan="4">AIRPORT</th>
                          </tr>
                        </thead>
                        <tbody>
                          <tr>
                            <th />
                            <th>IN HA NOI</th>
                            <th>HA NOI</th>
                            <th>DA NANG</th>
                            <th>CAM RANH</th>
                          </tr>
                          <tr>
                            <td>Airport Fast Track</td>
                            <td>29 USD/pax</td>
                            <td>29 USD/pax</td>
                            <td>29 USD/pax</td>
                            <td>29 USD/pax</td>
                          </tr>
                          <tr>
                            <td>Airport VIP Fast Track</td>
                            <td>44 USD/pax</td>
                            <td>44 USD/pax</td>
                            <td>44 USD/pax</td>
                            <td>44 USD/pax</td>
                          </tr>
                        </tbody>
                      </table>
                    </Div>
                    <Text p>
                      A. Fast track: Our staff will meet you at the Visa Landing
                      Counter with your name on the welcome board and assist you
                      to get visa stamp and visa sticker without getting line as
                      others. Just 5 -10 minutes (it depends on the number of
                      applicants at Visa Landing Counter) you will at the
                      luggage lounge to wait for your belonging.
                    </Text>
                    <Text p>
                      B. VIP Fast track: Our staff will meet you at the Visa
                      Landing Counter with your name on the welcome board and
                      assist you to get visa stamp and visa sticker without
                      getting line as others. After that, our staff will escort
                      you go to luggage lounge to assist you take care of your
                      luggage as baggage porters.
                    </Text>
                    <Button solid marginTop={3}>
                      APPLY
                    </Button>
                  </Flexbox>
                </Flexbox>
              </Flexbox>

              <Flexbox
                column
                alignItems="flex-start"
                paddingTop={10}
                width="100%"
              >
                <BlockHeader header="PICK UP AT THE AIRPORT" />
                <Flexbox responsiveLayout width="100%">
                  <Flexbox flex={1} paddingHorizontal={5} paddingVertical={2}>
                    <Image
                      src="/static/images/car-pickup.png"
                      alt="passport"
                      maxWidth={400}
                    />
                  </Flexbox>
                  <Flexbox flex={2} column alignItems="flex-start">
                    <Div overflowX="auto">
                      <table>
                        <thead>
                          <tr>
                            <th>ECONOMY CAR</th>
                            <th colSpan="4">PICK-UP AIRPORT</th>
                          </tr>
                        </thead>
                        <tbody>
                          <tr>
                            <th />
                            <th>IN HA NOI</th>
                            <th>HA NOI</th>
                            <th>DA NANG</th>
                            <th>CAM RANH</th>
                          </tr>
                          <tr>
                            <td>4 seats</td>
                            <td>29 USD</td>
                            <td>29 USD</td>
                            <td>29 USD</td>
                            <td>29 USD</td>
                          </tr>
                          <tr>
                            <td>16 seats</td>
                            <td>34 USD</td>
                            <td>34 USD</td>
                            <td>34 USD</td>
                            <td>34 USD</td>
                          </tr>
                          <tr>
                            <td>16 seats</td>
                            <td>94 USD</td>
                            <td>94 USD</td>
                            <td>94 USD</td>
                            <td>94 USD</td>
                          </tr>
                          <tr>
                            <td>24 seats</td>
                            <td>154 USD</td>
                            <td>154 USD</td>
                            <td>154 USD</td>
                            <td>154 USD</td>
                          </tr>
                        </tbody>
                      </table>
                    </Div>
                    <Button solid marginTop={3}>
                      APPLY
                    </Button>
                  </Flexbox>
                </Flexbox>
              </Flexbox>

              {/*<Flexbox*/}
                {/*column*/}
                {/*alignItems="flex-start"*/}
                {/*paddingTop={10}*/}
                {/*width="100%"*/}
              {/*>*/}
                {/*<BlockHeader header="VIETNAM VISA EXTENSION" />*/}
                {/*<Flexbox responsiveLayout width="100%">*/}
                  {/*<Flexbox flex={1} paddingHorizontal={5} paddingVertical={2}>*/}
                    {/*<Image*/}
                      {/*src="/static/images/visa-renewal.png"*/}
                      {/*alt="passport"*/}
                      {/*maxWidth={400}*/}
                    {/*/>*/}
                  {/*</Flexbox>*/}
                  {/*<Flexbox flex={2} column alignItems="flex-start">*/}
                    {/*<Div overflowX="auto">*/}
                      {/*<table>*/}
                        {/*<thead>*/}
                          {/*<tr>*/}
                            {/*<th>TYPE OF VISA</th>*/}
                            {/*<th colSpan="2">EXTEND VIETNAM VISA</th>*/}
                            {/*<th colSpan="2">REVEW VIETNAM VISA</th>*/}
                          {/*</tr>*/}
                        {/*</thead>*/}
                        {/*<tbody>*/}
                          {/*<tr>*/}
                            {/*<th />*/}
                            {/*<th>IN HA NOI</th>*/}
                            {/*<th>IN HO CHI MINH</th>*/}
                            {/*<th>IN HA NOI</th>*/}
                            {/*<th>IN HO CHI MINH</th>*/}
                          {/*</tr>*/}
                          {/*<tr>*/}
                            {/*<td>1 month single</td>*/}
                            {/*<td>N/A</td>*/}
                            {/*<td>60-155 USD</td>*/}
                            {/*<td>N/A</td>*/}
                            {/*<td>200 USD</td>*/}
                          {/*</tr>*/}
                          {/*<tr>*/}
                            {/*<td>1 month multiple</td>*/}
                            {/*<td>N/A</td>*/}
                            {/*<td>N/A</td>*/}
                            {/*<td>N/A</td>*/}
                            {/*<td>N/A</td>*/}
                          {/*</tr>*/}
                          {/*<tr>*/}
                            {/*<td>3 months single</td>*/}
                            {/*<td>N/A</td>*/}
                            {/*<td>180-310 USD</td>*/}
                            {/*<td>N/A</td>*/}
                            {/*<td>330 USD</td>*/}
                          {/*</tr>*/}
                          {/*<tr>*/}
                            {/*<td>1 month single</td>*/}
                            {/*<td>N/A</td>*/}
                            {/*<td>N/A</td>*/}
                            {/*<td>N/A</td>*/}
                            {/*<td>350 USD</td>*/}
                          {/*</tr>*/}
                        {/*</tbody>*/}
                      {/*</table>*/}
                    {/*</Div>*/}
                    {/*<Text p>*/}
                      {/*Extend Vietnam Visa: Extend your stay in Vietnam base on*/}
                      {/*your original visa*/}
                    {/*</Text>*/}
                    {/*<Text p>*/}
                      {/*Renew Vietnam Visa: Extend your stay in Vietnam and get*/}
                      {/*new visa stamp into your passport*/}
                    {/*</Text>*/}
                    {/*<Button solid marginTop={3}>*/}
                      {/*APPLY*/}
                    {/*</Button>*/}
                  {/*</Flexbox>*/}
                {/*</Flexbox>*/}
              {/*</Flexbox>*/}

              {/*<Flexbox*/}
                {/*column*/}
                {/*alignItems="flex-start"*/}
                {/*paddingTop={10}*/}
                {/*width="100%"*/}
              {/*>*/}
                {/*<BlockHeader header="HOTEL BOOKING SERVICES" />*/}
                {/*<Flexbox responsiveLayout width="100%">*/}
                  {/*<Flexbox flex={1} paddingHorizontal={5} paddingVertical={2}>*/}
                    {/*<Image*/}
                      {/*src="/static/images/hotel-booking.png"*/}
                      {/*alt="passport"*/}
                      {/*maxWidth={400}*/}
                    {/*/>*/}
                  {/*</Flexbox>*/}
                  {/*<Flexbox flex={2} column alignItems="flex-start">*/}
                    {/*<Text p>*/}
                      {/*With more than 2000 hotels in our system stretching from*/}
                      {/*the north to the south of Viet Nam, we can recommend you a*/}
                      {/*good place for resting after a long flight. This is*/}
                      {/*special offer for your business trip or vacation.*/}
                    {/*</Text>*/}
                    {/*<Button solid marginTop={3}>*/}
                      {/*APPLY*/}
                    {/*</Button>*/}
                  {/*</Flexbox>*/}
                {/*</Flexbox>*/}
              {/*</Flexbox>*/}

              {/*<Flexbox*/}
                {/*column*/}
                {/*alignItems="flex-start"*/}
                {/*paddingTop={10}*/}
                {/*width="100%"*/}
              {/*>*/}
                {/*<BlockHeader header="VIETNAM DOMESTIC FLIGHTS" />*/}
                {/*<Flexbox responsiveLayout width="100%">*/}
                  {/*<Flexbox flex={1} paddingHorizontal={5} paddingVertical={2}>*/}
                    {/*<Image*/}
                      {/*src="/static/images/domestic-flight.png"*/}
                      {/*alt="passport"*/}
                      {/*maxWidth={400}*/}
                    {/*/>*/}
                  {/*</Flexbox>*/}
                  {/*<Flexbox flex={2} column alignItems="flex-start">*/}
                    {/*<Text p>*/}
                      {/*Vietnam airline, Jetstar airline or Vietjet airline ,*/}
                      {/*which airline do you prefer? Let us search it for you ,*/}
                      {/*business class or economy class ,we have enough*/}
                      {/*capabilities searching query flights to match for your*/}
                      {/*needs.*/}
                    {/*</Text>*/}
                    {/*<Button solid marginTop={3}>*/}
                      {/*APPLY*/}
                    {/*</Button>*/}
                  {/*</Flexbox>*/}
                {/*</Flexbox>*/}
              {/*</Flexbox>*/}

              {/*<Flexbox*/}
                {/*column*/}
                {/*alignItems="flex-start"*/}
                {/*paddingTop={10}*/}
                {/*width="100%"*/}
              {/*>*/}
                {/*<BlockHeader header="TOUR AND TRAVEL BOOKING" />*/}
                {/*<Flexbox responsiveLayout width="100%">*/}
                  {/*<Flexbox flex={1} paddingHorizontal={5} paddingVertical={2}>*/}
                    {/*<Image*/}
                      {/*src="/static/images/travel-booking.png"*/}
                      {/*alt="passport"*/}
                      {/*maxWidth={400}*/}
                    {/*/>*/}
                  {/*</Flexbox>*/}
                  {/*<Flexbox flex={2} column alignItems="flex-start">*/}
                    {/*<Text p>*/}
                      {/*With a wide knowledge about people and country of Vietnam,*/}
                      {/*we will help you with detailed information about History,*/}
                      {/*Culture, Tradition and Cuture of not only Vietnam but also*/}
                      {/*our relative countries.*/}
                    {/*</Text>*/}
                    {/*<Button solid marginTop={3}>*/}
                      {/*APPLY*/}
                    {/*</Button>*/}
                  {/*</Flexbox>*/}
                {/*</Flexbox>*/}
              {/*</Flexbox>*/}
            </Flexbox>
          </Flexbox>
        </Content>
      </Layout>
    );
  }
}

export default ExtraServices;
