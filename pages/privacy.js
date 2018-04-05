// @flow
// vendor
import React from "react";
// custom
import {
  Anchor,
  Button,
  BlockHeader,
  PageHeader,
  Content,
  Flexbox,
  Image,
  Layout,
  Text
} from "../components";

const faqs = [
  {
    question: "1. Security",
    answer:
      "Evisa-vn.com  is committed to providing the highest level of security and privacy. All transactions of user authentication including credit cards processing are conducted using SSL (Secure Socket Layer) technology, supported by your browser, which encrypts all information that is sent to us. Our security certificate has been verified by SiteLock Website Security (USA), using the best commercially available encryption on the Internet. We take every precaution to protect personal information from loss, misuse, unauthorized access, disclosure, alteration or destruction by implementing policies and procedures to ensure that personal information is kept only for the purposes for which it has been gathered."
  },
  {
    question: "2. Information",
    answer:
      "We take measures to ensure that the information you provide is recorded accurately and completely. We provide you with access to your personal information at all times for correcting or modifying that information where appropriate.\n" +
      "a. Information Collected from/about Customers is used exclusively for the purpose of providing better service. It is never released to third parties except when expressly permitted by the customer. Any information you provide is completely confidential and will be protected from unauthorized use. Information required for membership is confidentially kept in our database; other information will be deleted after 15 days.\n" +
      "b. Financial Transactions. \n" +
      "Credit card transactions are processed through one of the major third-party credit card processing companies: PayPal.com, OnePay.vn and G2S.Com payment gate. All your information is encrypted and is used only to complete the appropriate transactions. Our database stores your email address as username to login on our system for discount policy.\n" +
      'c. Evisa-vn.com  uses cookies to recognize our clients when they visit our site. That allows us to customize their experience on our web site. You may need to have cookies "turned on" or enabled in the browser you use in order to register. But if you choose to disable cookies you still will be able to navigate the site. Cookies do not store any personal information. All the information is entirely confidential and is never sold or seen outside of the company. Evisa-vn.com  may display links or advertisement of /to other sites and companies that may also use cookies. In such cases, Evisa-vn.com  cannot be held responsible for any and all information that these parties collect through the use of cookies. You are hereby advised to familiarize yourself with privacy policies and information sharing standards of these sites as they may be different from Evisa-vn.com  policies and standards.\n' +
      "d. System information. \n" +
      "Evisa-vn.com  reserves the right to collect and store such information as IP address, browser type or operating system type. All the information is highly confidential and will be used exclusively for system administration purposes. This information helps diagnose problems, monitor traffic and site usage.\n" +
      "e. E-mail.  \n" +
      "Evisa-vn.com  uses e-mail to notify our members or clients about changes in the status of their applications, changes in the database, on our web site, or when new services or features are added. As part of the service, Evisa-vn.com  may send e-mails notifications whenever there are special discounts, new products added, or new features developed. You may unsubscribe our news letter at anytime. Our e-mail list is confidential and is never sold or given to third parties.\n" +
      "f. Change or Modify Your Information. \n" +
      "You can change or modify your profile at any time by emailing to contact@evisa-vn.com. This approach guaranties safety of your information."
  },
  {
    question: "3. Disclaimer",
    answer:
      "Communication over the Internet as well as applications used to provide services over the Internet are subject to various security risks. In no event shall Evisa-vn.com  be responsible for any damages or losses whatsoever, direct or indirect, incidental or consequential, special or punitive, arising from or relating to the unauthorized use, change, deletion or exposure of any information, confidential or not, resulting from unauthorized breaking into the system or any other breach of security, or system failure. Evisa-vn.com  hereby disclaims all warranties with regard to the hardware and software used to provide security and support this web site including all implied warranties, fitness for a particular purpose and incidental, special, direct or consequential damages. Accordingly, Evisa-vn.com ,its officers and employees, partners, affiliates, subsidiaries, successors and assigns, and its third-party agents shall not, directly or indirectly, be liable, in any way, to you or any other person for any inaccuracies, misuse, errors, third party interceptions, viruses, or hacker attacks resulting in loss of data or services including, but not limited to errors or interruptions in the transmission or delivery of services. Evisa-vn.com  contains links to other sites. These links are provided exclusively for information purposes and to assist in locating other Internet resources. Therefore, we are not responsible for the privacy practices or the content of such web sites."
  },
  {
    question: "4. Summary",
    answer:
      "By accessing this site and using its services, you unconditionally agree with the terms of this Privacy Statement and our Terms & Conditions. You agree to comply with the terms that govern the use of this site and its services and that also govern all information provided by you and other users of Evisa-vn.com. If you do not agree to all or any of the terms of this Privacy Statement, please do not use this site.\n"
  },
  {
    question: "5. Processing time",
    answer:
      "Processing time is the time for arranging your visa approval letter and returning it to your registered email. The processing time offered by Evisa-vn.com is based on the processing time frame provided by the Vietnam Immigration Department (the agency directly handles your Vietnam visa application and issues your visa approval letter): 8.00 am – 12:00 am and 13.00 pm – 17.00 pm (GMT+7) (except for Saturday, Sunday and national holidays). Under normal circumstances, it takes 2 working days (normal processing) or 1 working (urgent processing), starting immediately if your application and payment are delivered to us within the above stated time frames OR starting from the next working day/shift otherwise, to return visa approval letter to your registered email. In special cases, additional documents or confirmations may be required and processing time may be longer than usual. In such cases, we will inform you by email. The Vietnam Immigration Department may delay and/or deny the visa processing without any explanation. Evisa-vn.com has no responsibility for any delay, cancellation, financial and other losses due to denial or delay in processing. No service fees, embassy fees, courier fees, shipping charges or any portion therefore will be refunded in case of delay or denial."
  },
  {
    question: "6. Fees & payment",
    answer:
      "Processing time is the time for arranging your visa approval letter and returning it to your registered email. The processing time offered by Evisa-vn.com is based on the processing time frame provided by the Vietnam Immigration Department (the agency directly handles your Vietnam visa application and issues your visa approval letter): 8.00 am – 12:00 am and 13.00 pm – 17.00 pm (GMT+7) (except for Saturday, Sunday and national holidays). Under normal circumstances, it takes 2 working days (normal processing) or 1 working (urgent processing), starting immediately if your application and payment are delivered to us within the above stated time frames OR starting from the next working day/shift otherwise, to return visa approval letter to your registered email. In special cases, additional documents or confirmations may be required and processing time may be longer than usual. In such cases, we will inform you by email. The Vietnam Immigration Department may delay and/or deny the visa processing without any explanation. Evisa-vn.com has no responsibility for any delay, cancellation, financial and other losses due to denial or delay in processing. No service fees, embassy fees, courier fees, shipping charges or any portion thereofe will be refunded in case of delay or denial."
  },
  {
    question: "7. Cancellation and Refund Policy",
    answer:
      "a. Cancellation. \n" +
      "We guarantee to give clients the pre-approval letter within 24 -48 hours or less ( for case of normal process from Monday to Friday 8.00 AM to 5.00 PM, weekend and holiday will take other way and fee to process in rush or emergency service), so applications will be processed as soon as completed. If for any reason you wish to cancel a service before your passport and other supporting documents were received by www.Evisa-vn.com  you can do so without any penalties or charges using Cancel/Delete function by email to contact@evisa-vn.com\n" +
      "You will receive a full refund of any fees paid for this particular service and for return shipping (if prepaid). However, no refund will be given after your visa application under processing or incase we have sent to you via email or you have received the approved letter for your visa requested from Vietnam Immigration Department." +
      "b. Refund Policy" +
      "In case of denied applications without changes or changes are made in appropriate time, refund will be as:\n" +
      "- Denied applications will be refund 100%\n" +
      "- With errors made by client and request to arrange a new correct one, we will charge as follow : 1 month single entry visa (VOA) will be requested again for free; charge extra 50% for arrange new approval letter 3 month visa on arrival, and charge extra 80% fee to request again for new approval letter of Vietnam On Arrival Visa and Vietnam embassy visa.\n" +
      "- With our company's errors, we will arrange the new one correctly.\n" +
      "- For clients unable to use the approved letter for Vietnam visa because of objective reasons such as accident, disease, natural disasters, etc., the refund will be 35% fee or another application is free in the future.\n" +
      "Quick Noted*: Evisa-vn.com  (new visa service system provided by Vietnamese Government for 40 eligible countries in list at this moment). The cancellation are not available any any reason and the fee will be not refund in case, So the applicant must considering about e-Visa or Visa On Arrival Vietnam before submitting the applciation form.\n" +
      "Evisa-vn.com  cannot process refunds for Credit Card payments over 3- 6 months old. Credit cannot be applied to applications submitted through other agencies or applications submitted to Consulates directly.\n" +
      "We reserve the right to modify these refund policy without prior notice.\n" +
      "***Please noted that: For the case of Rush visa, Urgent visa, Emergency visa application,  The cancellation are not allow after review for payment and the visa application fee and other additional charges, courier fee incurred will not be refunded.\n" +
      "- Processing time to get refund: If paying with ONEPAY will takes for 10 - 25 days to process, it's depending on the country bank. If paying by PayPal, the refunding will takes 1-3 days.\n" +
      "For further request, please email to contact@evisa-vn.com"
  },
  {
    question: "",
    answer: ""
  }
];

type Props = {};
type State = {
  shouldShowMore: boolean
};
class PrivacyPolicy extends React.Component<Props, State> {
  state = {
    shouldShowMore: false
  };

  toggleShouldShowMore = () => {
    this.setState({
      shouldShowMore: !this.state.shouldShowMore
    });
  };

  componentDidMount() {
    window.Intercom("update");
  }

  render() {
    const { shouldShowMore } = this.state;

    return (
      <Layout>
        <Image src="/static/images/privacy-background.png" />
        <PageHeader header="PRIVACY POLICY" />
        <Content>
          <Flexbox width="100%" column flex={1} alignItems="flex-start">
            <BlockHeader header="Privacy Policy" />
            <Text p>
              It is the policy of evisa-vn.com to protect and preserve the
              privacy of its users and customers, and the confidentiality of the
              information they provide, subject to conditions described below.
              To demonstrate our commitment to privacy we encourage all of our
              current and prospective users to read this Privacy Statement
              carefully before using the system. This privacy statement
              discloses what information we gather, how we use it, and how to
              correct or change it. It is our intention to give you as much
              control as possible over your privacy in regard to your
              Information. Be assured that we will not disclose personal
              Information to third parties without your consent. By using our
              site, you agree to the terms of the <Anchor href="/terms">
                Terms and Conditions
              </Anchor> and our Privacy Statement. Evisa-vn.com reserves the
              right to expand and/or modify this Statement at any time.
            </Text>
            {shouldShowMore
              ? faqs.map((faq, index) => (
                  <Flexbox column alignItems="flex-start" key={index}>
                    <Text p bold size="l">
                      {faq.question}
                    </Text>
                    <Text
                      p
                      dangerouslySetInnerHTML={{ __html: faq.answer }}
                      whiteSpace="pre-line"
                    />
                  </Flexbox>
                ))
              : faqs.slice(0, 2).map((faq, index) => (
                  <Flexbox column alignItems="flex-start" key={index}>
                    <Text p bold size="l">
                      {faq.question}
                    </Text>
                    <Text
                      p
                      dangerouslySetInnerHTML={{ __html: faq.answer }}
                      whiteSpace="pre-line"
                    />
                  </Flexbox>
                ))}

            <Button
              solid
              marginVertical={3}
              onClick={this.toggleShouldShowMore}
            >
              {shouldShowMore ? (
                <Text alignItems="center" color="white">
                  SHOW LESS <i className="fa fa-arrow-up" />
                </Text>
              ) : (
                <Text alignItems="center" color="white">
                  READ MORE <i className="fa fa-arrow-down" />
                </Text>
              )}
            </Button>
          </Flexbox>
        </Content>
      </Layout>
    );
  }
}

export default PrivacyPolicy;
