const API_BASE_URL = "http://localhost:8000/api/v1";

export const syncUser = async (firebaseUser) => {
  if (!firebaseUser) return null;

  try {
    const response = await fetch(`${API_BASE_URL}/users/sync`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        uid: firebaseUser.uid,
        email: firebaseUser.email,
        displayName: firebaseUser.displayName,
        photoURL: firebaseUser.photoURL,
        provider: firebaseUser.providerData[0]?.providerId || 'password'
      }),
    });

    if (!response.ok) {
      throw new Error("Failed to sync user with database");
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error("User sync error:", error);
    return null;
  }
};
