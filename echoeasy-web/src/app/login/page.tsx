import { LoginForm } from "@/components/login-form";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

export default function Login() {
  return (
    <div className="flex justify-center items-center w-screen h-screen">
      <Card className="w-full lg:w-1/3">
        <CardHeader>
          <CardTitle>Login</CardTitle>
          <CardDescription>Dashboard de admnistrador Echoeasy</CardDescription>
        </CardHeader>
        <CardContent>
          <LoginForm />
        </CardContent>
      </Card>
    </div>
  );
}
