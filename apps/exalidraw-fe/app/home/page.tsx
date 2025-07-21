"use client";
import React, { useEffect, useState } from "react";
import axios from "axios";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

const HTTP_BACKEND = "http://localhost:3001"; // Adjust if needed

export default function HomePage() {
  const [rooms, setRooms] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [showJoinModal, setShowJoinModal] = useState(false);
  const [joinRoomName, setJoinRoomName] = useState("");
  const [joinError, setJoinError] = useState("");
  const router = useRouter();
  const [isSignedIn, setIsSignedIn] = useState(false);

  useEffect(() => {
    setIsSignedIn(!!localStorage.getItem("token"));
  }, []);

  useEffect(() => {
    async function fetchRooms() {
      try {
        const res = await axios.get(`${HTTP_BACKEND}/rooms`);
        setRooms(res.data.rooms);
      } catch (e) {
        setError("Failed to fetch drawings");
      } finally {
        setLoading(false);
      }
    }
    fetchRooms();
  }, []);

  async function handleNewDrawing() {
    // For demo, create a random slug. In real app, ask user for name.
    const slug = `drawing-${Math.random().toString(36).substring(2, 8)}`;
    try {
      const res = await axios.post(
        `${HTTP_BACKEND}/room`,
        { name: slug },
        {
          headers: {
            authorization:
              "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOjEsImlhdCI6MTc1MDc0ODY0OH0.bA9poO7ZOOpOfPPXXmmepvdnqN8juJMX34pScV2dvrQ",
          },
        }
      );
      const roomId = res.data.roomId;
      router.push(`/canvas/${roomId}`);
    } catch (e) {
      alert("Failed to create new drawing");
    }
  }

  async function handleJoinRoom(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setJoinError("");
    try {
      const res = await axios.get(`${HTTP_BACKEND}/room/${joinRoomName}`);
      if (res.data.room && res.data.room.id) {
        router.push(`/canvas/${res.data.room.id}`);
        setShowJoinModal(false);
        setJoinRoomName("");
      } else {
        setJoinError("Room not found");
      }
    } catch {
      setJoinError("Room not found");
    }
  }

  function handleLogout() {
    localStorage.removeItem("token");
    setIsSignedIn(false);
    router.push("/signin");
  }

  return (
    <div className="flex min-h-screen bg-black text-white">
      {/* Main Content */}
      <div className="flex-1 flex flex-col">
        {/* Navbar */}
        <nav className="w-full flex items-center justify-between px-8 py-4 border-b border-gray-800 bg-gray-950">
          <div className="text-2xl font-bold tracking-tight">DrawByte</div>
          <div className="flex gap-3">
            {!isSignedIn ? (
              <>
                <Button variant="primary" onClick={() => router.push("/signin")}>Sign In</Button>
                <Button variant="primary" onClick={() => router.push("/signup")}>Sign Up</Button>
              </>
            ) : (
              <Button variant="primary" onClick={handleLogout}>Logout</Button>
            )}
            <Button
              variant="accent"
              onClick={() => setShowJoinModal(true)}
            >
              Join Room
            </Button>
            <Button
              className="px-4 py-2 rounded bg-primary text-primary-foreground hover:bg-purple-300 hover:text-black transition"
              onClick={handleNewDrawing}
            >
              New Drawing
            </Button>
          </div>
        </nav>
        {/* Join Room Modal */}
        {showJoinModal && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-60">
            <form
              onSubmit={handleJoinRoom}
              className="bg-[#18181b] p-8 rounded-lg shadow-lg flex flex-col gap-4 min-w-[300px] border border-lavender"
            >
              <div className="text-lg font-semibold mb-2 text-lavender">Join Room</div>
              <Input
                placeholder="Enter room name (slug)"
                value={joinRoomName}
                onChange={(e) => setJoinRoomName(e.target.value)}
                required
              />
              {joinError && (
                <div className="text-red-400 text-sm">{joinError}</div>
              )}
              <div className="flex gap-2 mt-2">
                <Button type="submit" variant="primary" className="flex-1">
                  Join
                </Button>
                <Button
                  type="button"
                  variant="secondary"
                  className="flex-1"
                  onClick={() => setShowJoinModal(false)}
                >
                  Cancel
                </Button>
              </div>
            </form>
          </div>
        )}
        {/* Main grid */}
        <main className="flex-1 p-8">
          <h1 className="text-3xl font-bold mb-6">All Drawings</h1>
          {loading && <div>Loading...</div>}
          {error && <div className="text-red-400">{error}</div>}
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {rooms.length === 0 && !loading && <div>No drawings found.</div>}
            {rooms.map((room) => (
              <Link
                key={room.id}
                href={`/canvas/${room.id}`}
                className="block p-4 rounded-lg bg-gray-800 hover:bg-gray-700 transition border border-gray-700 shadow-md"
              >
                <div className="text-lg font-semibold mb-1 truncate">
                  {room.slug}
                </div>
                <div className="text-xs text-gray-400 mb-2">
                  Created: {new Date(room.createdAt).toLocaleString()}
                </div>
                <div className="h-16 flex items-center justify-center text-4xl">
                  🎨
                </div>
              </Link>
            ))}
          </div>
        </main>
      </div>
    </div>
  );
}
