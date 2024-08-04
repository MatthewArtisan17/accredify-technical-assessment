export const getInitials = (name) => {
    if (!name) return "";
    const names = name.split(" ");
    const initials = names.map((n) => n[0]).join("");
    return initials.toUpperCase();
  };