const handleLogin = () => {
  if (email === "admin@gmail.com" && password === "admin123") {
    localStorage.setItem("isAdminLoggedIn", "true");
    localStorage.setItem("role", "superadmin");
    navigate("/");
  } 
  else if (email === "staff@gmail.com" && password === "staff123") {
    localStorage.setItem("isAdminLoggedIn", "true");
    localStorage.setItem("role", "staff");
    navigate("/");
  } 
  else if (email === "viewer@gmail.com" && password === "viewer123") {
    localStorage.setItem("isAdminLoggedIn", "true");
    localStorage.setItem("role", "viewer");
    navigate("/");
  }
  else {
    alert("Invalid credentials");
  }
};
