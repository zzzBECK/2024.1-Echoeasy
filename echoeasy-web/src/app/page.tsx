"use client";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { useState } from "react";

export default function Home() {
  const [count, setCount] = useState(0);
  return (
    <main className="flex flex-col min-h-screen w-full container justify-center items-center">
      <Card className="w-full lg:w-1/3">
        <CardHeader>
          <CardTitle>Dashboard for EchoEasy</CardTitle>
          <CardDescription>
            Card demonstrativo de uso do Shadcn rapaziada
          </CardDescription>
        </CardHeader>
        <CardContent>
          <p className="text-center text-2xl">{count}</p>
          <Button
            className="w-full"
            onClick={() => setCount((prev) => prev + 1)}
          >
            Click me
          </Button>
        </CardContent>
        <CardFooter>
          <Button className="w-full" onClick={() => setCount(0)}>
            Reset
          </Button>
        </CardFooter>
      </Card>
    </main>
  );
}
