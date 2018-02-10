// @flow
// vendor
import React from 'react'
// custom
import {
  Button,
  BlockHeader,
  Content,
  Flexbox,
  Image,
  Layout,
  Text,
} from '../components'

type Props = {}
type State = {}

class HowToApply extends React.Component<Props, State> {
  constructor(props: Object) {
    super(props)
  }

  static defaultProps: Props = {}

  state = {}

  render() {
    return (
      <Layout>
        <Image src="/static/images/contact-us-background.png" />
        <Content>
          <Flexbox width="100%" responsiveLayout>
            <Flexbox flex={1} column>
              <BlockHeader header="How Vietnam Visa Works" />
              <Text p textAlign="center">
                Just a few steps fill in online form, you are confident to have
                Vietnam visa approval on your hand.
              </Text>
              <Text p textAlign="center">
                A valid visa is required for almost foreign travelers to
                Vietnam. Today, application for a Vietnam visa has become much
                easier since there are two options to go about this matter.
              </Text>
              <Text p textAlign="center">
                The traditional way would be directly contact the nearest
                Vietnam Embassy to apply for one. Or, those who wish to save
                some time could consider applying for a visa on arrival. With
                the second option, you will need to apply online for a visa
                approval letter in advance, and then get the visa stamped onto
                your passport at the arrival airport in Vietnam.
              </Text>

              <BlockHeader header="You're 3 steps away from a Vietnam visa on arrival." />
              <Text p textAlign="center" bold color="visaBlue">
                No documents to send off. No need to stand in line at the
                consulate.
              </Text>

              <Flexbox column>
                <Flexbox>
                  <Flexbox flex={1} paddingRight={10}>
                    <Image
                      src="/static/images/passport.png"
                      alt="passport"
                      maxWidth={400}
                    />
                  </Flexbox>
                  <Flexbox flex={2} column alignItems="flex-start">
                    <BlockHeader header="1. Submit application" />
                    <Text p>
                      Fill out the secured online application form. You are
                      required to enter the exact personal information of the
                      applicant(s) that matches the information on your
                      passport(s).
                    </Text>
                    <Text p>
                      You are required to enter the exact personal information
                      of the applicant(s) : Full name – The same as in passport,
                      Date of birth, Nationality, Passport number, Date of
                      arrival, Type of Visa.
                    </Text>
                  </Flexbox>
                </Flexbox>
                <Flexbox>
                  <Flexbox flex={1} paddingRight={10}>
                    <Image
                      src="/static/images/passport.png"
                      alt="passport"
                      maxWidth={400}
                    />
                  </Flexbox>
                  <Flexbox flex={2} column alignItems="flex-start">
                    <BlockHeader header="2. Pay Service Fee" />
                    <Text p>
                      Fill out the secured online application form. You are
                      required to enter the exact personal information of the
                      applicant(s) that matches the information on your
                      passport(s). Please double check to ensure the information
                      is correct, select to use extra services (Airport Fast
                      Track/Car Pick-Up) if any.
                    </Text>
                    <Text p>
                      You can make payment with your Credit/ Debit Card via
                      OnePay/PayPal or pay via Western Union.
                    </Text>
                  </Flexbox>
                </Flexbox>
                <Flexbox>
                  <Flexbox flex={1} paddingRight={10}>
                    <Image
                      src="/static/images/passport.png"
                      alt="passport"
                      maxWidth={400}
                    />
                  </Flexbox>
                  <Flexbox flex={2} column alignItems="flex-start">
                    <BlockHeader header="3. Get approval letter" />
                    <Text p>
                      Fill out the secured online application form. You are
                      required to enter the exact personal information of the
                      applicant(s) that matches the information on your
                      passport(s).
                      <ul>
                        <li>
                          After 1 working day (urgent service) or 2 working days
                          (normal one), YOU WILL:
                        </li>
                        <li>
                          Get visa approval letter via email (attached with
                          entry-and-exit form)
                        </li>
                        <li>
                          Print out the letter and the entry-and-exit form
                        </li>
                        <li>Fill out the entry-and-exit form</li>
                        <li>
                          Prepare 2 passport sized photos 4x6cm and an amount of
                          USD for stamping fee ($25 for single entry; $50 for
                          multiple entry visa)
                        </li>
                        <li>
                          Put all above mentioned things along with your
                          passport in a package, then show them to Immigration
                          officer at Vietnam arrival airports.
                        </li>
                        <li>
                          Upon arrival to Vietnam International Airports (Hanoi,
                          Da Nang or Hochiminh), you present all things in the
                          prepared package (passport, visa approval letter, 2
                          passport sized photos 4x6cm, the entry-and-exit form
                          and stamping fee) to the Immigration officer to get
                          your visa stamped.
                        </li>
                      </ul>
                    </Text>
                  </Flexbox>
                </Flexbox>
              </Flexbox>

              <Text p textAlign="center" fontStyle="italic">
                In this case, your best option is to apply for a visa on arrival
                to Vietnam if your nationality is supported. If not, you should
                find the nearest Vietnam embassy in neighbor countries to apply
                for Vietnam visa.
              </Text>

              <Button solid marginBottom={3}>
                Apply vietnam visa on arrival
              </Button>

              <Text p textAlign="center" color="visaBlue" bold>
                To know the best way to apply for a visa to Vietnam from your
                country, please click on the country in the list below
              </Text>
            </Flexbox>
          </Flexbox>
        </Content>
      </Layout>
    )
  }
}

export default HowToApply
