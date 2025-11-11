"use client";

import { useEffect, useState } from "react";
import { getTokenCookie } from "@workspace/ui/lib/token-cookie";

export default function UserDashboard() {
  const [data, setData] = useState<any>(null);

  useEffect(() => {
    const token = getTokenCookie();
    if (!token) return;

    fetch("https://fitupapi-942q.onrender.com/api/exercise", {
      headers: { authorization: `Bearer ${token}` },
    })
      .then((r) => r.json().catch(() => null))
      .then((json) => setData(json))
      .catch(() => setData({ error: "Network error" }));
  }, []);

  return (
    <pre className="p-4 text-sm whitespace-pre-wrap">
      {JSON.stringify(data, null, 2)}
    </pre>
  );
}
