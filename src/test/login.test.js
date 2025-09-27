/* eslint-env jest */
import React from "react";
import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import Login from "../Pages/login.jsx";
import { AuthProvider } from "../Context/AuthContext.jsx";
import { MemoryRouter } from "react-router-dom";

jest.mock("../../db.js", () => ({
  usuarios: [
    { username: "Josthin", password: "160515" },
    { username: "Dilan", password: "202585" },
  ],
}));

describe("Login", () => {
  beforeEach(() => {
    window.localStorage.clear();
  });

  test("muestra formulario y permite login exitoso", async () => {
    render(
      <AuthProvider>
        <MemoryRouter>
          <Login />
        </MemoryRouter>
      </AuthProvider>
    );

    expect(screen.getByLabelText(/usuario/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/contraseña/i)).toBeInTheDocument();

    await userEvent.type(screen.getByLabelText(/usuario/i), "Josthin");
    await userEvent.type(screen.getByLabelText(/contraseña/i), "160515");
    await userEvent.click(screen.getByRole("button", { name: /entrar/i }));

    await waitFor(() =>
      expect(screen.getByText(/bienvenido/i)).toBeInTheDocument()
    );
  });

  test("muestra error con login incorrecto", async () => {
    render(
      <AuthProvider>
        <MemoryRouter>
          <Login />
        </MemoryRouter>
      </AuthProvider>
    );

    await userEvent.type(screen.getByLabelText(/usuario/i), "wronguser");
    await userEvent.type(screen.getByLabelText(/contraseña/i), "wrongpass");
    await userEvent.click(screen.getByRole("button", { name: /entrar/i }));

    await waitFor(() =>
      expect(screen.getByText(/usuario o contraseña incorrectos/i)).toBeInTheDocument()
    );
  });
});
