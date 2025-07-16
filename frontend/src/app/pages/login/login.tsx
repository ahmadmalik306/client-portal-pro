"use client";
import { useState } from "react";
import { useAuth } from "../../hooks/useAuth";
import { Button, TextField, Box, Typography, CircularProgress } from "@mui/material";

export const LoginPage = () => {
  const { login, loginWithGoogle, loading, user } = useAuth();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [submitting, setSubmitting] = useState(false);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);
    setError("");
    try {
      await login(email, password);
    } catch (err: unknown) {
      if (err instanceof Error) {
        setError(err.message);
      } else {
        setError("An unknown error occurred.");
      }
    } finally {
      setSubmitting(false);
    }
  };

  const handleGoogle = async () => {
    setSubmitting(true);
    setError("");
    try {
      await loginWithGoogle();
    } catch (err: unknown) {
      if (err instanceof Error) {
        setError(err.message);
      } else {
        setError("An unknown error occurred.");
      }
    } finally {
      setSubmitting(false);
    }
  };

  if (loading) return <CircularProgress />;
  if (user) return <Typography>Welcome, {user.email}!</Typography>;

  return (
    <Box maxWidth={400} mx="auto" mt={8} p={4} boxShadow={2} borderRadius={2}>
      <Typography variant="h5" mb={2}>Login</Typography>
      <form onSubmit={handleLogin}>
        <TextField
          label="Email"
          type="email"
          value={email}
          onChange={e => setEmail(e.target.value)}
          fullWidth
          margin="normal"
          required
        />
        <TextField
          label="Password"
          type="password"
          value={password}
          onChange={e => setPassword(e.target.value)}
          fullWidth
          margin="normal"
          required
        />
        {error && <Typography color="error">{error}</Typography>}
        <Button
          type="submit"
          variant="contained"
          color="primary"
          fullWidth
          disabled={submitting}
          sx={{ mt: 2 }}
        >
          {submitting ? <CircularProgress size={24} /> : "Login"}
        </Button>
      </form>
      <Button
        variant="outlined"
        color="secondary"
        fullWidth
        onClick={handleGoogle}
        disabled={submitting}
        sx={{ mt: 2 }}
      >
        {submitting ? <CircularProgress size={24} /> : "Login with Google"}
      </Button>
    </Box>
  );
}
