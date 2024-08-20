import AccountDetails from "@/components/account-details";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import UsersTable from "@/components/users-table";

export default function Home() {
  return (
    <main className="flex flex-col min-h-screen w-full container py-20">
      <Tabs defaultValue="dashboard" className="w-full ">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="dashboard">Dashboard</TabsTrigger>
          <TabsTrigger value="account">Conta</TabsTrigger>
        </TabsList>
        <TabsContent value="dashboard">
          <UsersTable />
        </TabsContent>
        <TabsContent value="account">
          <AccountDetails />
        </TabsContent>
      </Tabs>
    </main>
  );
}
