import CreditCardAppBar from "./_components/CreditCardAppBar";
import CreditCardPageContainer from "./_components/CreditCardPageContainer";
import CreditCardView from "./_components/CreditCardView";

export default function Page() {
  return (
    <>
      <CreditCardPageContainer>
        <CreditCardAppBar />
        <CreditCardView />
      </CreditCardPageContainer>
    </>
  );
}
