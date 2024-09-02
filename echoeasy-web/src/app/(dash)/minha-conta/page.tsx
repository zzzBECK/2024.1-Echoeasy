import AccountDetails from "@/components/account-details";
import { ContentLayout } from "@/components/content-layout";

export default function MinhaConta() {
  return (
    <ContentLayout
      className="flex justify-center items-center"
      title="Minha Conta"
    >
      <AccountDetails />
    </ContentLayout>
  );
}
