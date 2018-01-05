// @flow
import { Anchor, Flexbox, Text, Image } from '../components/ui';

export default class Footer extends React.Component<null> {
  render() {
    return (
      <Flexbox
        width="100%"
        border
        style={{
          backgroundImage: 'url(/static/images/airplane-background.png)',
          backgroundRepeat: 'no-repeat',
          backgroundAttachment: 'fixed',
          backgroundPosition: 'center',
          backgroundSize: 'cover',
        }}
        column
      >
        <Flexbox paddingHorizontal={15} maxWidth={288} column paddingBottom={5}>
          <Flexbox
            column
            paddingTop={15}
            width="100%"
            responsiveAlignItemsCenter
          >
            <Anchor href="/" as="/">
              <Text color="white" size="xl">
                evisa-vn.com
              </Text>
              {/*<Image*/}
              {/*src="/static/images/logo-white.png"*/}
              {/*alt="evisa logo"*/}
              {/*paddingBottom={8}*/}
              {/*maxWidth={80}*/}
              {/*clickable*/}
              {/*/>*/}
            </Anchor>
            <Text
              color="lightGrey"
              fontStyle="italic"
              textAlign="center"
              paddingBottom={3}
            >
              In a continuous effort to best benefit regular customers and
              partners, we – Vietnam-visa.com – have developed an array of
              preferential rates and discounts for our
            </Text>
            <Flexbox>
              <Image
                marginVertical={2}
                marginHorizontal={2}
                maxWidth={8}
                src="/static/images/facebook-logo.svg"
                alt="facebook"
                clickable
              />
              <Image
                marginVertical={2}
                marginHorizontal={2}
                maxWidth={8}
                src="/static/images/instagram-logo.png"
                alt="instagram"
                clickable
              />
              <Image
                marginVertical={2}
                marginHorizontal={2}
                maxWidth={8}
                src="/static/images/gplus-logo.svg"
                alt="glus"
                clickable
              />
            </Flexbox>
          </Flexbox>

          {/* Contact */}
          <Flexbox
            width="100%"
            paddingTop={15}
            alignItems="flex-start"
            responsiveLayout
          >
            {/*Contact*/}
            <Flexbox
              flex={1}
              width="100%"
              column
              alignItems="flex-start"
              paddingHorizontal={2}
            >
              <Text
                size="m"
                color="white"
                bold
                borderBottom
                borderColor="visaRed"
                marginBottom={5}
                responsiveAlignItemsCenter
              >
                Contact
              </Text>
              <Image
                paddingBottom={5}
                maxWidth={50}
                src="/static/images/payment-logos.png"
                alt="payment logos"
              />
              <Flexbox column alignItems="flex-start">
                <Text color="white" paddingBottom={1}>
                  Phone: +84.946.583.583
                </Text>
                <Text color="white" paddingBottom={1}>
                  Office: 74 Nguyen Khoai Street, HCMC
                </Text>
                <Text color="white" paddingBottom={1}>
                  Email: sales@evisa-vn.com
                  <br />
                  support@evisa-vn.com
                </Text>
              </Flexbox>
            </Flexbox>
            {/* Working hours */}
            <Flexbox
              flex={1}
              width="100%"
              column
              alignItems="flex-start"
              paddingHorizontal={2}
            >
              <Text
                size="m"
                color="white"
                bold
                borderBottom
                borderColor="visaRed"
                marginBottom={5}
              >
                Working Hours
              </Text>
              <Flexbox column alignItems="flex-start">
                <Text color="white" paddingBottom={1}>
                  MON - FRI: 9:00 AM to 5:00 PM
                </Text>
                <Text color="white" paddingBottom={1}>
                  SAT - SUN: 11:00 AM to 3:00 PM
                </Text>
              </Flexbox>
            </Flexbox>
            {/* About us */}
            <Flexbox
              flex={1}
              width="100%"
              column
              alignItems="flex-start"
              paddingHorizontal={2}
            >
              <Text
                size="m"
                color="white"
                bold
                borderBottom
                borderColor="visaRed"
                marginBottom={5}
              >
                About us
              </Text>
              <Flexbox column alignItems="flex-start">
                <Anchor href="/about">
                  <Text color="white" paddingBottom={1}>
                    About Us
                  </Text>
                </Anchor>
                <Anchor href="/contact">
                  <Text color="white" paddingBottom={1}>
                    Contact Us
                  </Text>
                </Anchor>
                <Anchor href="/terms">
                  <Text color="white" paddingBottom={1}>
                    Terms of Use
                  </Text>
                </Anchor>
                <Anchor href="/privacy">
                  <Text color="white" paddingBottom={1}>
                    Privacy Policy
                  </Text>
                </Anchor>
                <Anchor href="/partners">
                  <Text color="white" paddingBottom={1}>
                    Local Partners
                  </Text>
                </Anchor>
                <Anchor href="/websites">
                  <Text color="white" paddingBottom={1}>
                    Local Websites
                  </Text>
                </Anchor>
              </Flexbox>
            </Flexbox>
          </Flexbox>
        </Flexbox>

        <Flexbox width="100%" backgroundColor="visaRed" paddingVertical={3}>
          <Text color="white">Copyright © 2017 evisa-vn</Text>
        </Flexbox>
      </Flexbox>
    );
  }
}
