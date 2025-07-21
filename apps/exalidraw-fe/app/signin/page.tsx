"use client";
import React, { useState } from "react";
import axios from "axios";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

const HTTP_BACKEND = "http://localhost:3001";

export default function SignInPage() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setError("");
    if (username.length < 5 || username.length > 20) {
      setError("Username must be 5-20 characters.");
      return;
    }
    setLoading(true);
    try {
      const res = await axios.post(`${HTTP_BACKEND}/signin`, {
        username,
        password,
      });
      if (res.data.token) {
        localStorage.setItem("token", res.data.token);
        router.push("/home");
      } else {
        setError(res.data.message || "Sign in failed");
      }
    } catch (err: any) {
      setError(err.response?.data?.message || "Sign in failed");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="flex min-h-screen items-center justify-center bg-black">
      <form
        onSubmit={handleSubmit}
        className="bg-[#18181b] p-8 rounded-lg shadow-lg w-full max-w-md flex flex-col gap-4 border border-lavender"
      >
        <h2 className="text-2xl font-bold mb-2 text-center text-lavender">
          Sign In to DrawByte
        </h2>
        <Input
          placeholder="Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          minLength={5}
          maxLength={20}
          required
        />
        <Input
          placeholder="Password"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        {error && (
          <div className="text-red-400 text-sm text-center">{error}</div>
        )}
        <Button type="submit" variant="primary" disabled={loading}>
          {loading ? "Signing In..." : "Sign In"}
        </Button>
        <div className="text-center text-lavender text-sm mt-2">
          Don't have an account?{" "}
          <a href="/signup" className="text-lavender hover:underline">
            Sign Up
          </a>
        </div>
      </form>
    </div>
  );
}
