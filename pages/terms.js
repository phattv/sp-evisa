// @flow
// vendor
import React from "react";
// custom
import {
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
    question: "Acceptance of Terms.",
    answer:
      "By using or visiting this Site, by sending or delivering your application(s) and other document(s) to evisa-vn.com, you are expressly agreeing to be bound by these Terms & Conditions as well as the Privacy Statement and to follow these Terms and any applicable laws and regulations. If you do not agree with the terms stated in this agreement or are dissatisfied with the site, please direct your complaints to Contact us. Your failure to follow these Terms & Conditions may result in legal action, suspension or termination of your access to this Site, without notice. evisa-vn.com reserves the right to change the Terms & Conditions, at any time, without notice. Please continue to review this agreement whenever accessing or using this site."
  },
  {
    question: "Processing time",
    answer:
      "NORMAL PROCESS: (weekday). Processing time for arranging visa pre-approval letter offered by VisaCenter.vn is based on processing time frame provided by Vietnam Immigration Department (The agency directly handles your Vietnam visa application): 8.00 am – 10.30 am and 13.30 pm – 15.00 pm (GMT+7) (Include Saturday, Sunday and national holidays). Under normal circumstances, it takes in case by case of 1 or 4 working hours (In emergency, urgent service) or 2 working days (normal service), starting immediately if your application and payment are delivered to us within the above stated time frames OR starting from the next working day/shift otherwise, to return visa approval letter to your registered email.\n" +
      "WEEKENDs & HOLIDAY PROCESS INCLUDE ( 24/7 support): The fee may be extra charged for weekend and holiday process ( Only Tourist visa available on these days, some nationalities are not be able to process, email us to check if possible). \n" +
      "The visa letter will sending to you via email immediately in case emergency, contact us by email, if you are not getting the visa letter from us via email.\n" +
      "In special cases, additional documents or confirmations may be required and processing time may be longer than usual. In such cases, we will inform you by email.\n" +
      "The Vietnam Immigration Department may delay and/or deny the visa processing without any explanation. VietnamEvisa.vn holds no responsibility for any delays, cancellations, financial and other losses due to denial or delay in processing. No service fees, embassy fees, courier fees, shipping charges or any portion thereof will be refunded due to delays or denial of service.\n"
  },
  {
    question: "Fees & payments",
    answer:
      "You agree to pay all the fees relating to Vietnam visa on arrival which are Service fee and stamping fee (at airport). \n" +
      "Service fee is the fee you pay directly to us for arranging visa pre-approval letter offered by Vietnam Immigration Department and then get approval letter delivered to your email within guaranteed time. When paying service fee, except for visa approval letter processing service fee quoted in our website, you are responsible for any additional charges associated with your Bank, no matter what your method of payment is. A payment of service fee is only accepted to be successful when our confirmation titled “Ordered confirmation for Vietnam visa-Payment Successful” was sent to your registered email. We are irresponsible for any situations arising due to unsuccessful payment or payment failed. \n" +
      "Stamping fee is the fee you must be paid in Cash (USD) at the international airport in Vietnam (landing visa counter or Visa on arrival counter) to get visa stamped onto your passport. We are not responsible for exceeding amount result from inaccurate exchange rate when you pay in other currencies.\n" +
      "You are also supposed to pay all additional fees if you wish to modify/correct any personal information in the visa approval letter which was issued by Vietnam Immigration Department.\n" +
      "Cancellation and Refund Policy." +
      "A. Visa On Arrival Vietnam\n" +
      "evisa-vn.com reserves the right to decline processing of your visa application for any reason, including but not limited to incomplete documentation, insufficient processing time, or unusual circumstances. In such cases, a full refund will be given.\n" +
      "If for any reason you wish to cancel your service before you make payment of service fee, you can do so without any charges and penalties even in case you do not inform us.\n" +
      "If for any reason you wish to cancel your service after your visa application was changed to status of “processing”, no refund will be given and the service will be completed.\n" +
      "No refund will be given once your visa approval letter was approved by Vietnam Immigration and was delivered to your email based on notification titled “Vietnam Visa On Arrival Has Approved For:”\n" +
      "No cancellation and no refund will be made in case you decline to get a visa approval letter containing incorrect details caused by mistakes from your side. We strongly recommend you check your visa confirmation letter against your passport and personal information prior to departure.\n" +
      "This kind of visa is applicable to air travel only, so by applying through our website, you agree that you will fly to Vietnam in order to get your visa stamped at the arrival airport. We will not refund in case you DO NOT enter Vietnam by air once your visa approval letter is issued.\n" +
      "While you submitted an application to get visa code and getting stamping visa at Vietnam embassy, We will charging fee to arranged visa code (approved visa code) then we will faxing the code to one of the Vietnamese embassy located as your chosen, We are not guarantee and not control for the stamping visa will issued by the embassy or not. In some case we will refundable for 40% of charged, almost is not able as Immigration department have already approved.\n" +
      " \n" +
      "B. E-Visa.\n" +
      "• Can I get a refund if I do not use my e-Visa or My e-Visa was declined?\n" +
      "** Non Refundable available. Please note that we’re run No-refund policy for unused e-Visas or any changing after that. As this is the Government policy, so we’re inform that you must reading carefully before choosing Visa On Arrival or e-Visa.\n" +
      " \n" +
      "C. Refund Processing time\n" +
      "All the fees will be refunded in case your application is declined by Government and depending on card issuers, the refund process may take 10-15 working days (pending on your local bank)\n" +
      "evisa-vn.com cannot process refunds for Credit Card payments over 3 months old. Credit cannot be applied to applications submitted through other agencies or applications submitted to Consulates directly.\n" +
      "We reserve the right to modify these refund policy without prior notice.\n" +
      "IMPORTANT NOTICE*:  In case of Rush, Urgently, Emergency visa requested, the cancellation to order a Visa approved letter will not permitted after you tick to agree with the Term & Conditions to settle for the payment, and the visa application fee and others additional charges, courier fee incurred will not be refunded.\n" +
      "To inform you that, we only refund for full amount in case of REJECT OR DENIED by Immigration Department of Vietnam in ordered for Normally, Express visa service and Rush, Urgently, Emergency. Do not cancellation and requested for refund in case of Airport FastTrack  (Pick up point at airport) or any other EXTRA SERVICES."
  },
  {
    question: "Assignment",
    answer:
      "You expressly agree that we may utilize the services of agents and third party contractors in the provisions of the services and the terms and conditions herein contained apply equally to the benefit of such persons or entities. The benefit of this agreement may be assigned by us, but not our obligations to you - to do that, you agree that we may give notice to you in writing, and your failure to respond will be deemed acceptance.\n" +
      "Changing the terms & conditions on renewal.\n" +
      " We may changing the terms and conditions of this Agreement at any time.\n"
  },
  {
    question: "Disclaimer",
    answer:
      "evisa-vn.com doesn’t warrant that all confirmation and notification will be successfully sent to your email due to objective and unexpected reasons relating to email delivery (email error, failure, etc.). You agree to contact our Support Team at least 2-3 days prior to date of arrival if you have not received a visa approval letter yet. evisa-vn.com will not be in charge of any losses/damages arising or won’t accept any request of refund afterward.\n" +
      "Applicant is responsible for checking accurate information on approval letter. In case of mistakes, applicants are required to contact us immediately for correction and it may be charge. Otherwise, applicant is fully responsible for the mistakes. If the errors are made on our part, we will process the letter of approval for free (Except weekend –holiday or period of night time proceed), and if it is on the applicants' part, the applicants must pay the full fee to obtain a new visa approval letter. The process of getting a new letter of approval, again, will take 1-2 working days, so it is recommended that applicants have to check the approval letter carefully before the trip.\n" +
      "Vietnam visa approval letter is usually issued in group and therefore, you may find your name, passport number and date of birth in the same letter as other people. In case you wish to have a private letter, a request should be sent to our email at contact@evisa-vn.com and extra pay to get private letter. evisa-vn.com is not to be held accountability for any issues arising from the group approval letter.\n" +
      "Otherwise. We’re happy and will trying the best to help you in case (If possible).\n" +
      "Contacting the website: evisa-vn.com\n" +
      "If you have any questions about the Terms, please contact us at contact@evisa-vn.com. You may also reach us by post or in person or Call via our Hotline: (+84) 092 022 762; or Email: contact@evisa-vn.com"
  }
];

type Props = {};
type State = {
  shouldShowMore: boolean
};
class TermsAndCondition extends React.Component<Props, State> {
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
        <Image src="/static/images/terms-background.png" />
        <PageHeader header="TERM OF USE" />
        <Content>
          <Flexbox width="100%" column flex={1} alignItems="flex-start">
            <BlockHeader header="Terms Of Use" />
            <Text p bold>
              PLEASE READING CAREFULLY THESE TERMS AND CONDITIONS OF
              VIETNAMEVISA.VN SERVICE BEFORE USING.
            </Text>
            <Text p>
              In these Terms and Conditions “we, our, us” refers to evisa-vn.com
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

export default TermsAndCondition;
