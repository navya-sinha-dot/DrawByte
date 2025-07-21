"use client";
import React, { useState } from "react";
import axios from "axios";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

const HTTP_BACKEND = "http://localhost:3001";

export default function SignUpPage() {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setError("");
    setSuccess("");
    if (username.length < 5 || username.length > 20) {
      setError("Username must be 5-20 characters.");
      return;
    }
    if (email.length < 5 || email.length > 100) {
      setError("Email must be 5-100 characters.");
      return;
    }
    setLoading(true);
    try {
      const res = await axios.post(`${HTTP_BACKEND}/signup`, {
        username,
        email,
        password,
      });
      if (res.data.userId) {
        // Optionally, auto-login after signup
        const loginRes = await axios.post(`${HTTP_BACKEND}/signin`, {
          username,
          password,
        });
        if (loginRes.data.token) {
          localStorage.setItem("token", loginRes.data.token);
          router.push("/home");
        } else {
          setSuccess("Account created! Please sign in.");
        }
      } else {
        setError(res.data.message || "Sign up failed");
      }
    } catch (err: any) {
      setError(err.response?.data?.message || "Sign up failed");
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
          Sign Up to DrawByte
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
          placeholder="Email"
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          minLength={5}
          maxLength={100}
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
        {success && (
          <div className="text-green-400 text-sm text-center">{success}</div>
        )}
        <Button type="submit" variant="primary" disabled={loading}>
          {loading ? "Signing Up..." : "Sign Up"}
        </Button>
        <div className="text-center text-lavender text-sm mt-2">
          Already have an account?{" "}
          <a href="/signin" className="text-lavender hover:underline">
            Sign In
          </a>
        </div>
      </form>
    </div>
  );
}
