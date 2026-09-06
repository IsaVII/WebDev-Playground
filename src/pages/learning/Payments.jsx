import { useTranslation } from "react-i18next";
import paymentsContentEn from "../../data/en/learning/paymentsContent.json";
import paymentsContentSv from "../../data/sv/learning/paymentsContent.json";
import CheckoutVsElementsDemo from "../../components/demos/payments-demos/CheckoutVsElementsDemo";
import IdempotencyDemo from "../../components/demos/payments-demos/IdempotencyDemo";
import LearningTopicLayout from "../../components/LearningTopicLayout";
import PaymentFlowDemo from "../../components/demos/payments-demos/PaymentFlowDemo";
import PaymentIntentStatusDemo from "../../components/demos/payments-demos/PaymentIntentStatusDemo";
import RefundsDemo from "../../components/demos/payments-demos/RefundsDemo";
import TokenizationDemo from "../../components/demos/payments-demos/TokenizationDemo";
import WebhookVerificationDemo from "../../components/demos/payments-demos/WebhookVerificationDemo";

const CONTENT_MAP = {
  en: paymentsContentEn,
  sv: paymentsContentSv,
};

function Payments() {
  const { i18n } = useTranslation();
  const paymentsContent = CONTENT_MAP[i18n.language] || CONTENT_MAP.en;

  // Maps each practice topic (by title, from paymentsContent.json) to a
  // live, interactive demo. Keeping this separate from the JSON data means
  // the content stays data-driven while the runnable examples stay real
  // code.
  const practiceDemos = {
    [paymentsContent.practiceTopics[0].title]: TokenizationDemo,
    [paymentsContent.practiceTopics[1].title]: CheckoutVsElementsDemo,
    [paymentsContent.practiceTopics[2].title]: WebhookVerificationDemo,
    [paymentsContent.practiceTopics[3].title]: IdempotencyDemo,
    [paymentsContent.practiceTopics[4].title]: PaymentIntentStatusDemo,
    [paymentsContent.practiceTopics[5].title]: RefundsDemo,
  };

  return (
    <LearningTopicLayout
      title={paymentsContent.title}
      introduction={paymentsContent.introduction}
      coreConcepts={paymentsContent.coreConcepts}
      sections={[
        {
          heading: paymentsContent.flow.heading,
          description: paymentsContent.flow.description,
          content: <PaymentFlowDemo />,
        },
      ]}
      fullExample={paymentsContent.fullExample}
      gettingStarted={paymentsContent.gettingStarted}
      practiceTopics={paymentsContent.practiceTopics}
      practiceDemos={practiceDemos}
      topicKey="payments"
    />
  );
}

export default Payments;
