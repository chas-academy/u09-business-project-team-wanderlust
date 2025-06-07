const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || "http://localhost:3000";

<button
    className="bg-red-500 text-white px-4 py-2 rounded"
    onClick={() => window.location.href = `${API_BASE_URL}/auth/google`}
    >
    Logga in med Google
</button>
