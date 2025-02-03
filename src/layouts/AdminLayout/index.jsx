import { Outlet, Navigate } from "react-router-dom";
import { SideNavAdmin } from "../../components/SideNavAdmin";
import { Container } from "./styles";

export function AdminLayout() {
  const storedUser = localStorage.getItem("devburger:userdata");
  const user = storedUser ? JSON.parse(storedUser) : null;
  const isAdmin = user?.admin ?? false;

  return isAdmin ? (
    <Container>
      <SideNavAdmin />
      <main>
        <section>
          <Outlet />
        </section>
      </main>
    </Container>
  ) : (
    <Navigate to="/login" />
  );
}
