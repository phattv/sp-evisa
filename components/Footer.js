// @flow
import { Anchor, AnchorExternal, Flexbox, Text, Image } from "../components/ui";

export default class Footer extends React.Component<null> {
  render() {
    return (
      <Flexbox
        width="100%"
        border
        style={{
          backgroundImage: "url(/static/images/footer-background.png)",
          backgroundRepeat: "no-repeat",
          backgroundAttachment: "fixed",
          backgroundPosition: "center",
          backgroundSize: "cover"
        }}
        flexDirection="column"
      >
        <Flexbox
          paddingHorizontal={15}
          maxWidth={288}
          flexDirection="column"
          paddingBottom={5}
        >
          <Flexbox
            flexDirection="column"
            paddingTop={15}
            width="100%"
            responsiveAlignItemsCenter
          >
            <Anchor href="/" as="/">
              <Image
                src="/static/images/logo-white.png"
                alt="evisa logo"
                paddingBottom={8}
                maxWidth={80}
                clickable
              />
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
                paddingAll={3}
                maxWidth={8}
                src="/static/images/facebook-logo.svg"
                alt="facebook"
                clickable
              />
              <Image
                paddingAll={3}
                maxWidth={8}
                src="/static/images/instagram-logo.png"
                alt="instagram"
                clickable
              />
              <Image
                paddingAll={3}
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
            <Flexbox
              flex={1}
              flexDirection="column"
              alignItems="flex-start"
              paddingHorizontal={2}
            >
              <Text
                fontSize="m"
                color="lightGrey"
                fontWeight="bold"
                borderBottom
                borderColor="visaRed"
                marginBottom={5}
              >
                Contact
              </Text>
              <Image
                paddingBottom={5}
                maxWidth={50}
                src="/static/images/payment-logos.png"
                alt="payment logos"
              />
              <Flexbox flexDirection="column" alignItems="flex-start">
                <Text color="lightGrey" paddingBottom={1}>
                  Phone: +84.946.583.583
                </Text>
                <Text color="lightGrey" paddingBottom={1}>
                  Office: 74 Nguyen Khoai Street, HCMC
                </Text>
                <Text color="lightGrey" paddingBottom={1}>
                  Email: sales@vietnamvisafast-cheap.com
                  <br />
                  support@vietnamvisafast-cheap.com
                </Text>
              </Flexbox>
            </Flexbox>
            {/* Working hours */}
            <Flexbox
              flex={1}
              flexDirection="column"
              alignItems="flex-start"
              paddingHorizontal={2}
            >
              <Text
                fontSize="m"
                color="lightGrey"
                fontWeight="bold"
                borderBottom
                borderColor="visaRed"
                marginBottom={5}
              >
                Working Hours
              </Text>
              <Flexbox flexDirection="column" alignItems="flex-start">
                <Text color="lightGrey" paddingBottom={1}>
                  MON - FRI: 9:00 AM to 5:00 PM
                </Text>
                <Text color="lightGrey" paddingBottom={1}>
                  SAT - SUN: 11:00 AM to 3:00 PM
                </Text>
              </Flexbox>
            </Flexbox>
            {/* About us */}
            <Flexbox
              flex={1}
              flexDirection="column"
              alignItems="flex-start"
              paddingHorizontal={2}
            >
              <Text
                fontSize="m"
                color="lightGrey"
                fontWeight="bold"
                borderBottom
                borderColor="visaRed"
                marginBottom={5}
              >
                About us
              </Text>
              <Flexbox flexDirection="column" alignItems="flex-start">
                <Text color="lightGrey" paddingBottom={1}>
                  About Us
                </Text>
                <Text color="lightGrey" paddingBottom={1}>
                  Contact Us
                </Text>
                <Text color="lightGrey" paddingBottom={1}>
                  Terms of Use
                </Text>
                <Text color="lightGrey" paddingBottom={1}>
                  Privacy Policy
                </Text>
                <Text color="lightGrey" paddingBottom={1}>
                  Local Partners
                </Text>
                <Text color="lightGrey" paddingBottom={1}>
                  Local Websites
                </Text>
              </Flexbox>
            </Flexbox>
          </Flexbox>
        </Flexbox>

        <Flexbox width="100%" backgroundColor="visaRed" paddingVertical={3}>
          <Text color="lightGrey">
            Copyright © 2017 VIETNAM VISA FAST- CHEAP SERVICES
          </Text>
        </Flexbox>
      </Flexbox>
    );
  }
}
